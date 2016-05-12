/* global simpleQueryString, describe, it, expect, should */

describe('simpleQueryString()', function () {
    'use strict';

    it('exists', function () {
        expect(simpleQueryString).to.be.a('object');

    });
    
    it('parse validation: empty', function () {
        expect(simpleQueryString.parse('')).to.be.a('object');
        expect(simpleQueryString.parse()).to.be.a('object');
        expect(simpleQueryString.parse(null)).to.be.a('object');
        
        var obj = simpleQueryString.parse('http://www.whatever.com#kk');
        expect(_.keys(obj).length).to.equal(0);
    });

    it('parse validation: with anchor', function () {
        var obj = simpleQueryString.parse('http://www.whatever.com?var=val#anchor');

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