/* jshint
eqeqeq: true, undef: true, unused: true, indent: 4, plusplus: false, curly: false, forin: true, trailing: true, white: true, sub:true,
browser: true, node: true, devel: true, mocha: true
*/
/* global simple-query-string tests, describe, it, expect, should, require */

// if these vars are undefined, assume we are in node.js
if (!simpleQueryString) { var simpleQueryString = require('../src/simplequerystring.js'); }
if (!_) { var _ = require("lodash"); }

// console coloring
var colors = require('colors/safe');

console.log('------------------');
console.log('parse vs stringify');

var suite = new require('benchmark').Suite();

suite.add('parse', function() {
    simpleQueryString.parse('a1=1&a1=5&a1=6&a1=&a1=&a1=test&a1');
})
.add('stringify', function() {
    simpleQueryString.stringify({ p0:0, p1: 1, p2: 2, p3: 10.0001, p4: -9, p5: 0.0001 });
})
.on('cycle', function(event) { console.log(colors.magenta('    B '), event.target.toString()); })
.on('complete', function() { console.log(colors.cyan('    B '), 'Fastest is ' + this.filter('fastest').map('name')); })
.run({ 'async': false });
