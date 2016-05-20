/*! simple-query-string v1.3-beta - MIT license */

/* jshint
eqeqeq: true, undef: true, unused: true, indent: 4, plusplus: false, curly: false, forin: true, trailing: true, white: true, sub:true,
browser: true, node: true, devel: true, mocha: true
*/

/* global define:true */

//
// Cross module loader - UMD (Universal Module Definition)
// Supported: Node, AMD, Browser globals
//
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('simple-query-string', factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports, like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.simpleQueryString = factory();
    }
}(this, function () {
    'use strict';

    // is Array polyfill: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
    if (!Array.isArray) {
        Array.isArray = function (vArg) {
            return Object.prototype.toString.call(vArg) === '[object Array]';
        };
    }

    /**
     * Enumerate all object properties, ignoring prototype properties.
     * Internal method to encapsulate enumerate keys to avoid optimization problems in v8.
     *
     * @param   {Object} obj - input object
     */
    function getKeys(obj) {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            list = [], key;
        for (key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                list.push(key);
            }
        }
        return list;
    }

    /**
     * internal method: uri string decoding
     */
    function decode(v) {
        if (v === undefined) { return null; }
        if (v) { return decodeURIComponent(v); }
        return v;
    }

    /**
     * internal method: uri string encoding with type convertion to string
     */
    function encode(v) {
        switch (typeof v) {
            case 'string':
                return encodeURIComponent(v);
            case 'boolean':
                return v ? 'true' : 'false';
            case 'number':
                return isFinite(v) ? v : '';
            case 'object':
                if (v === undefined || v === null) { return ''; }
                if (JSON && JSON.stringify) { return encodeURIComponent(JSON.stringify(v)); }
                return '';
            default:
                return '';
        }
    }

    /**
     * return our simple Query String object
     */
    return {
        version: '1.3-beta',

        /**
         * parse a query string.
         * Can receive as parameter the full url or `url.split('?')[1]` or `location.search` or `location.hash`.
         *
         * @param {String} str - the string containing the query string to be parsed.
         * @param {String} [delimiter] - if undefined (no value) the default ampersand '&' will be the pairs separator.
         * Else you can provide an alternative separator, for instance the semicolon ';' in case of URLs embedded in HTML.
         * @param {String} [eq] - key/pair separator.
         * @returns {Object} parsed object (use as a dictionary)
         */
        parse: function (str, delimiter, eq) {
            var i;
            delimiter = delimiter || '&';
            eq = eq || '=';
            // create an object with no prototype
            var dic = Object.create(null);

            // step 0: sanity checks
            if (typeof str !== 'string') { return dic; }

            // step 1: prepare query string
            // split by '?'
            i = str.indexOf('?');
            if (i >= 0) {
                str = str.substr(i + 1);
            }

            // detect if we have or not a query string
            if (str.indexOf(eq) < 0) {
                return dic;
            }

            // trim space (see MDN polyfill), ?, # and & (allow passing location.search or location.hash as parameter)
            str = str.replace(/^[\s\uFEFF\xA0\?#&]+|[\s\uFEFF\xA0&]+$/g, '');

            // remove anchor [ "#" fragment ]
            i = str.lastIndexOf('#');
            if (i > 0) {
                str = str.substr(0, i);
            }

            // step 2: split by key/value pair
            var parts = str.split(delimiter);

            for (i = 0; i < parts.length; ++i) {
                // step 3: split key/value pair
                var s = parts[i].replace(/\+/g, ' ');
                var p = s.indexOf(eq);
                var key, val;

                // key must exist
                if (p === 0 || s.length === 0){
                    continue;
                }

                // split
                if (p < 0){
                    key = decode(s);
                    val = null; // missing `=` should be `null`:
                } else {
                    key = decode(s.substr(0, p));
                    val = decode(s.substr(p + 1));
                }

                // check existing dic and add
                var e = dic[key];

                // step 4: add to dictionary
                if (e === undefined) {
                    dic[key] = val;
                } else if (Array.isArray(e)) {
                    e.push(val);
                } else {
                    dic[key] = [e, val];
                }
            }
            return dic;
        },

        /**
         * creates a query string from an object/dictionary.
         *
         * @param {Object} obj - the object that will have its properties parsed into a key/value string.
         * @param {String} [delimiter] - if undefined (no value) the default ampersand '&' will be the pairs separator.
         * Else you can provide an alternative separator, for instance the semicolon ';' in case of URLs embedded in HTML.
         * @returns {String} query string
         */
        stringify: function (obj, delimiter, eq) {
            delimiter = delimiter || '&';
            eq = eq || '=';

            // sanity check
            if ((typeof obj !== 'object' && typeof obj !== 'function') || obj === null) { return ''; }

            // get obj keys
            var keys = getKeys(obj);

            // sanity check
            if (!keys || !keys.length) { return ''; }

            var list = [];
            var i = 0, j, k, v;

            // enumerate key/values
            for (; i < keys.length; i++) {
                k = encode(keys[i]);
                v = obj[k];
                // check value type (ignore undefined and function)
                if (v !== undefined && typeof v !== 'function') {
                    if (Array.isArray(v)) {
                        for (j = 0; j < v.length; ++j) {
                            list.push(k + eq + (v[j] ? encode(v[j]) : ''));
                        }
                    } else {
                        // try to encode
                        if (v !== null) {
                            v = encode(v);
                        }
                        // check final v value and add to list
                        list.push((v === null || v === undefined) ? k : k + eq + v);
                    }
                }
            }
            // concatenate final string
            return list.join(delimiter);
        }
    };

}));
