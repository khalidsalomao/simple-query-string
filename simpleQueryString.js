/*! simpleQueryString v1.0.0 - MIT license */
var simpleQueryString = (function () {
    "use strict";

    // is Array polyfill: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
    if (!Array.isArray) {
        Array.isArray = function (vArg) {
            return Object.prototype.toString.call(vArg) === "[object Array]";
        };
    }
    
    /**
     * internal method to encapsulate enumerate keys to avoid optimization problems in v8
     */
    function getKeys(obj) {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            list = [], key;
        for (key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                list[list.length] = key;
            }
        }
        return list;
    }    
    
    function decode(v) {
        if (v === undefined) { return null; }
        if (v) { return decodeURIComponent(v); }
        return v;
    }

    function encode(v) {
        if (v === undefined || v === null) { return ''; }
        if (typeof v === 'string') { return encodeURIComponent(v); }
        if (JSON && JSON.stringify) { return encodeURIComponent(JSON.stringify(v)); }
        return encodeURIComponent(v.toString());
    }

    /**
     * simple Query String utilities
     */
    var simpleQueryString = {     

        /**
         * parse a query string.
         * Can receive as parameter the full url or `url.split('?')[1]` or `location.search` or `location.hash`
         * @param {string} str - the string containing the query string to be parsed.
         */
        parse: function (str) {
            var dic, i, s, key, val, e;

            // create an object with no prototype
            dic = Object.create(null);

            // step 0: sanity checks
            if (typeof str !== 'string') { return dic; }

            // step 1: prepare query string
            // split by '?'
            i = str.indexOf('?');
            if (i >= 0) {
                str = str.substr(i + 1);
            } else if (str.indexOf('=') < 0) {
                // detect if we have or not a query string
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
            var parts = str.split('&');

            for (i = 0; i < parts.length; ++i) {
                // step 3: split key/value pair
                s = parts[i].replace(/\+/g, ' ').split('=');

                // key
                key = decode(s.shift());
                if (!key) { continue; }

                // Firefox (pre 40) decodes `%3D` to `=`
                val = s.length > 1 ? s.join('=') : s[0];

                // missing `=` should be `null`:
                val = decode(val);

                // check existing dic and add
                e = dic[key];

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
         * @param {object} obj - the object that will have its properties parsed into a key/value string.
         */
        stringify: function (obj) {
            var i, j, k, v, keys, list = [], l2, v2;

            // get obj keys
            keys = getKeys(obj);
            if (!keys) { return ''; }

            // sanity check
            if ((typeof obj !== 'object' && typeof obj !== 'function') || obj === null) { return ''; }

            // enumerate key/values
            for (i = 0; i < keys.length; i++) {
                k = keys[i];
                v = obj[k];
                // check value type
                if (v !== undefined) {
                    if (Array.isArray(v)) {
                        l2 = [];
                        for (j = 0; j < v.length; ++j) {
                            v2 = v[j];
                            if (j !== undefined) {
                                l2[l2.length] = j === null ? encode(k) : encode(k) + '=' + encode(v2);
                            }
                        }
                        list[list.length] = l2.join('&');
                    } else if (v === null) {
                        list[list.length] = k;
                    } else {
                        list[list.length] = encode(k) + '=' + encode(v);
                    }
                }
            }
            return list.join('&');
        }
    };
    
    return simpleQueryString;
}());

// node.js (CommonJS-like) module support
if (typeof module === 'object' && module.exports) {
    module.exports = simpleQueryString;
}

