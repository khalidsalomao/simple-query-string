/* jshint
eqeqeq: true, undef: true, unused: true, indent: 4, plusplus: false, curly: false, forin: true, trailing: true, white: true, sub:true,
browser: true, node: true, devel: true, mocha: true
*/
/* global simple-query-string tests, describe, it, expect, should, require */

// if these vars are undefined, assume we are in node.js
if (!simpleQueryString) { var simpleQueryString = require('../src/simplequerystring.js'); }
if (!_) { var _ = require("lodash"); }

// benchmarks
var Benchmark = require('benchmark');
if (!Benchmark) return;

Benchmark.options.initCount = 1;
Benchmark.options.maxTime = 5; // secs
Benchmark.options.minSamples = 5;
Benchmark.options.minTime = 0;

// run benchmarks
var Path = require('path')
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var dir = __dirname;

console.time('benchmark');
console.log("searching files...");
fs.readdirAsync(dir).map(function (file) {
    if (file.indexOf('.js') < 0 || file.indexOf('benchmark-') !== 0) {
        return;
    }
    console.log('------------------');
    console.log("loading file: " + file);
    require(Path.join(dir, file));
}).catch(function (e) {
    console.error(e);
}).finally(function(){
    console.timeEnd('benchmark');
});
