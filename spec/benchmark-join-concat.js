/* jshint
eqeqeq: true, undef: true, unused: true, indent: 4, plusplus: false, curly: false, forin: true, trailing: true, white: true, sub:true,
browser: true, node: true, devel: true, mocha: true
*/
/* global require */

// if these vars are undefined, assume we are in node.js
if (!simpleQueryString) { var simpleQueryString = require('../src/simplequerystring.js'); }
if (!_) { var _ = require("lodash"); }
var utils = require('../spec/test-utils.js');

// console coloring
var colors = require('colors/safe');

console.log('------------------');
console.log('join vs concat');

var suite = new require('benchmark').Suite();

var data = utils.generateQS(30, { large: true });

suite.add('join simple', function() {
    var i, list = [data.length];
    for (i = 0; i < data.length; i++) {
        list.push(data[i]);
    }
    list.join('&');
})
.add('concat simple', function() {
    var i, list = '';
    for (i = 0; i < data.length; i++) {
        list += data[i];
    }
})
.on('cycle', function(event) { console.log(colors.magenta('    B '), event.target.toString()); })
.on('complete', function() { console.log(colors.cyan('    B '), 'Fastest is ' + this.filter('fastest').map('name')); })
.run({ 'async': false });
