/* global simple-query-string tests, describe, it, expect, should */

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

    it('stringify validation: array', function () {
        var str = simpleQueryString.stringify({ my: [1, 2, 3, 4] });

        expect(str).to.equal("my=1&my=2&my=3&my=4");
    });

    it('stringify validation: boolean', function () {
        var str = simpleQueryString.stringify({ p1: true, p2: false});

        expect(str).to.equal("p1=true&p2=false");
    });

    // Add more assertions here
});