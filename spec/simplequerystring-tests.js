/* global simple-query-string tests, describe, it, expect, should, require */

// if these vars are undefined, assume we are in node.js
if (!expect) { var expect = require('chai').expect; }
if (!assert) { var assert = require('chai').assert; }
if (!simpleQueryString) { var simpleQueryString = require('../src/simplequerystring.js'); }
if (!_) { var _ = require("lodash"); }

// run tests!
describe('simpleQueryString()', function () {
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
    
    it('parse validation: with anchor partial url', function () {
        var obj = simpleQueryString.parse('var=val#anchor');

        expect(obj["var"]).to.equal("val");
    });
    
    it('parse validation: parameters as array', function () {
        var obj = simpleQueryString.parse('my=1&my=2&k1=v1&my=3&my=4');

        expect(obj["k1"]).to.equal("v1");
        expect(obj["my"].length).to.equal(4);
        assert.strictEqual(obj["my"][2], "3");
    });

    it('stringify validation: boolean', function () {
        var str = simpleQueryString.stringify({ p1: true, p2: false});

        expect(str).to.equal("p1=true&p2=false");
    });
    
    it('stringify validation: numeric', function () {
        var str = simpleQueryString.stringify({ p0:0, p1: 1, p2: 2});

        assert.strictEqual(str, "p0=0&p1=1&p2=2");
    });
    
    it('stringify validation: array', function () {
        var str = simpleQueryString.stringify({ my: [1, 2, 3, 4] });

        expect(str).to.equal("my=1&my=2&my=3&my=4");
        
        str = simpleQueryString.stringify({ a1: [1, 5, 6], a2: [2], a3: [3], a4: [4] });

        assert.strictEqual(str, "a1=1&a1=5&a1=6&a2=2&a3=3&a4=4");
        
        str = simpleQueryString.stringify({ k1: 'hi', a1: [1, 5, 6], a2: [2], k2: 2, a3: [3], a4: [4] });

        assert.strictEqual(str, "k1=hi&a1=1&a1=5&a1=6&a2=2&k2=2&a3=3&a4=4");
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
    
    // Add more assertions here
});