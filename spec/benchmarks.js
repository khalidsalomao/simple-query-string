/* jshint
eqeqeq: true, undef: true, unused: true, indent: 4, plusplus: false, curly: false, forin: true, trailing: true, white: true, sub:true,
browser: true, node: true, devel: true, mocha: true
*/
/* global require */

// benchmarks
var Benchmark = require('benchmark');
if (!Benchmark) return;

Benchmark.options.initCount = 2;
Benchmark.options.delay = 0;
Benchmark.options.maxTime = 1; // secs
Benchmark.options.minSamples = 5;
Benchmark.options.minTime = 0;

// run benchmarks
var Path = require('path');
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
}).then(function(){
    console.timeEnd('benchmark');
});
