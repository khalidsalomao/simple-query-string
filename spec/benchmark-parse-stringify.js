/* jshint
eqeqeq: true, undef: true, unused: true, indent: 4, plusplus: false, curly: false, forin: true, trailing: true, white: true, sub:true,
browser: true, node: true, devel: true, mocha: true, esversion: 6
*/
/* global require */

// console coloring
var colors = require('colors/safe');

// -----------------------
var utils = require('../spec/test-utils.js');
var Promise = require('bluebird');
var got = require('got');
var moduleFilename = require('path').join(__dirname, '../src/simplequerystring.js');

// list of files to be benchmarked
var releases = [
    { qs: null, tag: 'current', remote: false, path: moduleFilename },
    { qs: null, tag: '1.3-alpha', remote: true, path: 'https://github.com/khalidsalomao/simple-query-string/releases/download/1.3-alpha/simplequerystring.js' },
    { qs: null, tag: '1.2.5', remote: true, path: 'https://github.com/khalidsalomao/simple-query-string/releases/download/1.2.5/simplequerystring.js' }
];

// our test data
var utils = require('../spec/test-utils.js');
var qsData = utils.generateQS(50, { large: false });
let qs = require('../src/simplequerystring.js');
var qsObj = qs.parse(qsData);
var qsObjNumeric = qs.parse(utils.generateQS(50, { large: false, numeric: true }));

// our benchmark codes
function benchmarkParse_qsData(qs) {
    qs.parse(qsData);
}

function benchmarkStringify_qsObj(qs) {
    qs.stringify(qsObj);
}

function benchmarkStringify_qsObjNumeric(qs) {
    qs.stringify(qsObjNumeric);
}

// our bootstrap method

function benchmarkBootstrap(item, name, benchmarkMethod){ // note bluebird has a delay method
    var timerTag = 'loading ' + utils.padString(item.tag, 12, ' ');
    // prepare promise
    return Promise.delay(0, item)
    // load module
    .then(item => {
        console.time(timerTag);
        if (!item.qs && item.remote) {
            return got(item.path)
                .then(response => {
                    item.qs = utils.requireFromUrl(response.body);
                    console.timeEnd(timerTag);
                    return item.qs;
                });
        } else {
            return Promise.delay(0, item).then(item => {
                item.qs = item.qs || require(item.path);
                console.timeEnd(timerTag);
                return item.qs;
            });
        }
    })
    // run benckmark
    .then(qs => {
        suite.add(utils.padString(name + ' ' + item.tag, 20), function() {
            benchmarkMethod(qs);
        });
    });
}

// run!

// our benchmark suite
var bench = require('benchmark');
var suite = new bench.Suite();

console.log('------------------');
console.time('benchmark suite');
Promise.each(releases, function(item){
    return benchmarkBootstrap(item, 'parse', benchmarkParse_qsData);
})
.delay(0)
.then(function() {
    console.log('------------------');
    suite.on('cycle', function(event) {
        console.log(colors.magenta('    B '), event.target.toString());
    })
    .on('complete', function() {
        console.log(colors.cyan('    B '), 'Fastest is ' + this.filter('fastest').map('name'));
        console.log(colors.cyan('    B '), 'Slowest is ' + this.filter('slowest').map('name'));
    })
    .run({ 'async': false });

    console.timeEnd('benchmark suite');
})
.delay(100)
// another benchmark run
.then(function(){
    suite.reset();
    suite = new bench.Suite();

    console.log('------------------');
    console.time('benchmark suite');

    Promise.each(releases, function(item){
        return benchmarkBootstrap(item, 'stringify', benchmarkStringify_qsObj);
    })
    .delay(0)
    .then(function() {
        console.log('------------------');
        suite.on('cycle', function(event) {
            console.log(colors.magenta('    B '), event.target.toString());
        })
        .on('complete', function() {
            console.log(colors.cyan('    B '), 'Fastest is ' + this.filter('fastest').map('name'));
            console.log(colors.cyan('    B '), 'Slowest is ' + this.filter('slowest').map('name'));
        })
        .run({ 'async': false });

        console.timeEnd('benchmark suite');
    })
})
.delay(100)
// another benchmark run
.then(function(){
    suite.reset();
    suite = new bench.Suite();

    console.log('------------------');
    console.time('benchmark suite');

    Promise.each(releases, function(item){
        return benchmarkBootstrap(item, 'stringify', benchmarkStringify_qsObjNumeric);
    })
    .delay(0)
    .then(function() {
        console.log('------------------');
        suite.on('cycle', function(event) {
            console.log(colors.magenta('    B '), event.target.toString());
        })
        .on('complete', function() {
            console.log(colors.cyan('    B '), 'Fastest is ' + this.filter('fastest').map('name'));
            console.log(colors.cyan('    B '), 'Slowest is ' + this.filter('slowest').map('name'));
        })
        .run({ 'async': false });

        console.timeEnd('benchmark suite');
    });
});
