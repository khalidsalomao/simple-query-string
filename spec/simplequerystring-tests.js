/* jshint
eqeqeq: true, undef: true, unused: true, indent: 4, plusplus: false, curly: false, forin: true, trailing: true, white: true, sub:true,
browser: true, node: true, devel: true, mocha: true
*/
/* global describe, it, require */

// if these vars are undefined, assume we are in node.js
if (!expect) { var expect = require('chai').expect; }
if (!assert) { var assert = require('chai').assert; }
if (!simpleQueryString) { var simpleQueryString = require('../src/simplequerystring.js'); }
if (!_) { var _ = require("lodash"); }
if (!utils) { var utils = require('../spec/test-utils.js'); }

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
        expect(_.keys(obj).length).to.equal(0);

        obj = simpleQueryString.parse('//example.org/teste?');
        expect(_.keys(obj).length).to.equal(0);

        obj = simpleQueryString.parse('//example.org/teste?#');
        expect(_.keys(obj).length).to.equal(0);

        obj = simpleQueryString.parse('//example.org/teste??#??');
        expect(_.keys(obj).length).to.equal(0);
    });

    it('parse validation: simple query string', function () {
        var obj = simpleQueryString.parse('http://example.org?k1=val&k2=val2');
        assert.strictEqual(obj["k1"], "val");
        assert.strictEqual(obj["k2"], "val2");
        assert.strictEqual(_.keys(obj).length, 2);

        obj = simpleQueryString.parse('http://example.org????k1=val&k2=val2');
        assert.strictEqual(obj["k1"], "val");
        assert.strictEqual(obj["k2"], "val2");
        assert.strictEqual(_.keys(obj).length, 2);

        obj = simpleQueryString.parse('http://example.org?k1===val&&&k2=val2&');
        assert.strictEqual(obj["k1"], "==val");
        assert.strictEqual(_.keys(obj).length, 2);
    });

    it('parse validation: with anchor', function () {
        var obj = simpleQueryString.parse('http://example.org?var=val#anchor');

        expect(obj["var"]).to.equal("val");
    });

    it('parse validation: string with spaces', function () {
        var obj = simpleQueryString.parse('str=my string with double  spaces&string key with spaces= my other string &b1=true&nullkey&emptykey=');

        assert.strictEqual(obj["str"], 'my string with double  spaces');
        assert.strictEqual(obj["string key with spaces"], ' my other string ');
        assert.strictEqual(obj["b1"], 'true');
        assert.isNull(obj["nullkey"]);
        assert.strictEqual(obj["emptykey"], '');

        // now lets test encoded white space
        obj = simpleQueryString.parse('str=my%20string%20with%20double%20%20spaces&string%20key%20with%20spaces=%20my%20other%20string%20');

        assert.strictEqual(obj["str"], 'my string with double  spaces');
        assert.strictEqual(obj["string key with spaces"], ' my other string ');
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

    it('parse validation: random qs strings', function () {
        var i = 0;
        for (;i < 3; i++)
        {
            var qs = utils.generateQS(30, { large: false });
            var obj = simpleQueryString.parse(qs);
            assert.strictEqual(_.keys(obj).length, 30);
        }
    });

    it('parse validation: random qs with numbers', function () {
        var i = 0;
        for (;i < 3; i++)
        {
            var qs = utils.generateQS(30, { large: false, numeric: true });
            var obj = simpleQueryString.parse(qs);
            assert.strictEqual(_.keys(obj).length, 30);
        }
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
