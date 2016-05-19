/* jshint
eqeqeq: true, undef: true, unused: true, indent: 4, plusplus: false, curly: false, forin: true, trailing: true, white: true, sub:true,
browser: true, node: true, devel: true, mocha: true
*/
/* global exports */

/**
 * generates a random string.
 *
 * @param length (description)
 * @returns {String} string with random chars
 */
function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

/**
 * generates a random number.
 *
 * @param max max value
 * @returns {Number} random number
 */
function randomNumber(max) {
    return Math.random() * max;
}

/**
 * generates a random integer number.
 *
 * @param max max value
 * @returns {Number} random integer number
 */
function randomInt(max) {
    return Math.floor((Math.random() * max) + 1);
}

/**
 * generates a random query string formated as 'key=value&...&keyN=valueN'
 *
 * @param {Number} count - number of key/value pairs
 * @param {Object} [options] - query string generation options
 * @param {Boolean} [options.large] - increase the length of each key to 1 - 40 chars and values to 40 - 80 chars.
 * @param {Boolean} [options.numeric] - all values should be random numbers.
 * @returns {String} random query string
 */
function generateQS(count, options) {
    var qs = '';
    options = options || {};
    var sz = !!options.large ? 40 : 10;
    var numeric = !!options.numeric;
    var i = 0;
    for (; i < count; i++) {
        qs += encodeURIComponent(randomString(randomInt(sz) + (sz/3))) + '=' + encodeURIComponent(!numeric ? randomString(randomInt(sz) + sz) : randomNumber(sz * 2)) + '&';
    }
    return qs;
}

/**
 * eval a script and returns its exports as in `require`.
 *
 * @param {String} src - extenal module source code
 * @returns {Object} compiled module exports
 */
function requireFromUrl(src) {
    var m = require('module');
    var res = require('vm').runInThisContext(m.wrap(src))(exports, require, module, __filename, __dirname);
    if (res) {
        console.error('requireFromUrl error: ' + res);
    }
    return module.exports;
}

function padString(str, len, paddingChar, padLeft) {
    str = str || '';
    paddingChar = paddingChar || ' ';
    len = len > 0 ? len : len || 1;
    paddingChar = (new Array(len)).join(paddingChar);
    if (padLeft) {
        return (paddingChar + str).slice(-len);
    } else {
        return (str + paddingChar).substring(0, len);
    }
}

module.exports = {
    randomString: randomString,
    randomNumber: randomNumber,
    randomInt: randomInt,
    generateQS: generateQS,
    requireFromUrl: requireFromUrl,
    padString: padString
};