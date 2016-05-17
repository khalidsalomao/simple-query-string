/* jshint
eqeqeq: true, undef: true, unused: true, indent: 4, plusplus: false, curly: false, forin: true, trailing: true, white: true, sub:true,
browser: true, node: true, devel: true, mocha: true
*/
/* global simple-query-string tests, describe, it, expect, should, require */

// if these vars are undefined, assume we are in node.js
if (!expect) { var expect = require('chai').expect; }
if (!assert) { var assert = require('chai').assert; }
if (!simpleQueryString) { var simpleQueryString = require('../src/simplequerystring.js'); }
if (!_) { var _ = require("lodash"); }


// run tests!
describe('simple-query-string - parse', function () {
    'use strict';

    it('exists', function () {
        expect(simpleQueryString).to.be.a('object');
    });

    it('parse validation: empty', function () {
        expect(simpleQueryString.parse('')).to.be.a('object');
        expect(simpleQueryString.parse()).to.be.a('object');
        expect(simpleQueryString.parse(null)).to.be.a('object');
    });

    it('parse validation: full url without query string', function () {
        var obj = simpleQueryString.parse('http://example.org');
        expect(obj).to.be.a('object');
        expect(_.keys(obj).length).to.equal(0);

        obj = simpleQueryString.parse('http://example.org/teste');
        expect(obj).to.be.a('object');
        expect(_.keys(obj).length).to.equal(0);

        obj = simpleQueryString.parse('//example.org/teste');
        expect(obj).to.be.a('object');
        expect(_.keys(obj).length).to.equal(0);

        obj = simpleQueryString.parse('//example.org/teste#anchor');
        expect(obj).to.be.a('object');
        expect(_.keys(obj).length).to.equal(0);
    });

    it('parse validation: with anchor', function () {
        var obj = simpleQueryString.parse('http://example.org?var=val#anchor');

        expect(obj["var"]).to.equal("val");
    });

    it('parse validation: parameters as array', function () {
        var obj = simpleQueryString.parse('my=1&my=2&k1=v1&my=3&my=4');

        expect(obj["k1"]).to.equal("v1");
        expect(obj["my"].length).to.equal(4);
        assert.strictEqual(obj["my"][2], "3");

        obj = simpleQueryString.parse('a1=1&a1=5&a1=6&a1=&a1=&a1=test&a1');

        assert.strictEqual(obj["a1"][0], "1");
        assert.strictEqual(obj["a1"][1], "5");
        assert.strictEqual(obj["a1"][2], "6");
        assert.strictEqual(obj["a1"][3], "");
        assert.strictEqual(obj["a1"][4], "");
        assert.strictEqual(obj["a1"][5], "test");
        assert.strictEqual(obj["a1"][6], null);
    });

    it('parse validation: with anchor partial url', function () {
        var obj = simpleQueryString.parse('var=val#anchor');

        assert.strictEqual(obj["var"], "val");
    });

    it('parse validation: tolerate invalid anchor position', function () {
        var obj = simpleQueryString.parse('http://example.org#anchor?var=val');

        assert.strictEqual(obj["var"], "val");

        obj = simpleQueryString.parse('http://example.org?k1=v1#anchor&k2=v2');

        assert.strictEqual(obj["k1"], "v1");
        assert.isUndefined(obj["k2"]);
    });

});


describe('simple-query-string - stringify', function () {
    'use strict';

  it('stringify validation: boolean', function () {
        var str = simpleQueryString.stringify({ p1: true, p2: false});

        assert.strictEqual(str, "p1=true&p2=false");
    });

    it('stringify validation: numeric', function () {
        var str = simpleQueryString.stringify({ p0:0, p1: 1, p2: 2, p3: 10.0001, p4: -9, p5: 0.0001 });

        assert.strictEqual(str, 'p0=0&p1=1&p2=2&p3=10.0001&p4=-9&p5=0.0001');
    });

    it('stringify validation: array', function () {
        var str = simpleQueryString.stringify({ my: [1, 2, 3, 4] });

        expect(str).to.equal("my=1&my=2&my=3&my=4");

        str = simpleQueryString.stringify({ a1: [1, 5, 6], a2: [2], a3: [3], a4: [4] });

        assert.strictEqual(str, "a1=1&a1=5&a1=6&a2=2&a3=3&a4=4");

        str = simpleQueryString.stringify({ k1: 'hi', a1: [1, 5, 6], a2: [2], k2: 2, a3: [3], a4: [4] });

        assert.strictEqual(str, "k1=hi&a1=1&a1=5&a1=6&a2=2&k2=2&a3=3&a4=4");

        str = simpleQueryString.stringify({ a1: [1, 5, 6, undefined, null, 'test'] });

        assert.strictEqual(str, 'a1=1&a1=5&a1=6&a1=&a1=&a1=test');
    });

    it('stringify validation: null/empty input', function () {
        assert.isOk(simpleQueryString.stringify() === '');
        assert.isOk(simpleQueryString.stringify(null) === '');
        assert.isOk(simpleQueryString.stringify({}) === '');
    });

    it('stringify validation: ignore functions', function () {
        var str = simpleQueryString.stringify({ p0: function() { return 0; }});

        assert.strictEqual(str, '');
    });

    it('stringify validation: ignore prototype properties', function () {
        var ctr = function () {};
        ctr.prototype.p1 = function(){ return 0;};
        ctr.prototype.p2 = 'test';

        // create an instance and validate
        var obj = new ctr();
        assert.strictEqual(obj.p2, 'test');

        // stringify and validate
        var str = simpleQueryString.stringify(obj);

        assert.strictEqual(str, '');
    });

});


describe('simple-query-string - benchmarks', function () {
    'use strict';

    // increase mocha timeout
    this.timeout(15000);

    // benchmarks
    var Benchmark = require('benchmark');
    if (!Benchmark) return;

    Benchmark.options.initCount = 1;
    Benchmark.options.maxTime = 1; // secs
    Benchmark.options.minSamples = 5;
    Benchmark.options.minTime = 0;

    // console coloring
    var colors = require('colors/safe');

    it('parse vs stringify', function () {
      var suite = new Benchmark.Suite();
      assert.isObject(suite);

      suite.add('parse', function() {
        simpleQueryString.parse('a1=1&a1=5&a1=6&a1=&a1=&a1=test&a1');
      })
      .add('stringify', function() {
        simpleQueryString.stringify({ p0:0, p1: 1, p2: 2, p3: 10.0001, p4: -9, p5: 0.0001 });
      })
      .on('cycle', function(event) { console.log(colors.magenta('    B '), event.target.toString()); })
      .on('complete', function() { console.log(colors.cyan('    B '), 'Fastest is ' + this.filter('fastest').map('name')); })
      .run({ 'async': false });
    });

    it('join vs concat', function () {
      var suite = new Benchmark.Suite();
      assert.isObject(suite);

      var data = 'a1=1asdasda&a1=adsasda5&a1=6asdasda&a1=adsasdasasas&a1=adasdasdasdasda&a1=test&a1=adsasdasdasd&a1=asdasdadsas1&a1=5adsasdasdasdasdas&a1=6&a1=&a1=&a1=test&a1'.split('&');

      suite.add('join', function() {
        var i, list = [];
        for (i = 0; i < data.length; i++) {
            list.push(data[i]);
        }
        list.join('&');
      })
      .add('concat', function() {
          var i, list = '';
          for (i = 0; i < data.length; i++) {
              list += data[i];
          }
      })
      .on('cycle', function(event) { console.log(colors.magenta('    B '), event.target.toString()); })
      .on('complete', function() { console.log(colors.cyan('    B '), 'Fastest is ' + this.filter('fastest').map('name')); })
      .run({ 'async': false });
    });

});
