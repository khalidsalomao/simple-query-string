# [simple-query-string](https://github.com/khalidsalomao/simple-query-string)

[![Build Status](http://img.shields.io/travis/khalidsalomao/simple-query-string/master.svg?style=flat-square)](https://travis-ci.org/khalidsalomao/simple-query-string "See test builds")
[![npm version](http://img.shields.io/npm/v/simple-query-string.svg?style=flat-square)](https://npmjs.org/package/simple-query-string "View this project on npm")
[![npm downloads](http://img.shields.io/npm/dt/simple-query-string.svg?style=flat-square)](https://npmjs.org/package/simple-query-string "npm downloads")
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://raw.githubusercontent.com/khalidsalomao/simple-query-string/master/LICENSE.txt)

Fast and simple way to parse and stringify URL query strings.

Utility javascript methods to encode and decode query string parameters with extreme performance and low memory usage.


-----

## Installation


#### NPM

```
$ npm install simple-query-string --save
```


#### Bower

```
$ bower install simple-query-string
```


#### Download


* [simplequerystring.js - development](https://github.com/khalidsalomao/simple-query-string/releases/download/1.2.5/simplequerystring.js)

* [simplequerystring.min.js - production](https://github.com/khalidsalomao/simple-query-string/releases/download/1.2.5/simplequerystring.min.js)


#### Browser - CDN

```html
<script src="https://cdn.rawgit.com/khalidsalomao/simple-query-string/1.2.5/src/simplequerystring.min.js"></script>
```


-----

## Features


### Query String Decoding


* #### fast

    Several benchmarks are run at each release to ensure maximum performance.


* #### query string parsing

    ```javascript
    simpleQueryString.parse("key=val&param=1")
    ```


* #### url with query string detection

    There is no need to use `url.split('?')[1]` or any other code, just put the entire string!

    ```javascript
    simpleQueryString.parse("http://example.org/test/?key=val&param=1")
    ```


* #### *location.hash* support

    ```javascript
    simpleQueryString.parse(location.hash)
    ```


* #### *location.search* support

    ```javascript
    simpleQueryString.parse(location.search)
    ```


* #### array detection

    ```javascript
    simpleQueryString.parse("myarr=1&myarr=2&myarr=3&myarr=4") // myarr: [1,2,3,4]
    ```


* #### anchor detection

    ```javascript
    simpleQueryString.parse("http://example.org/test/?key=val&param=1#anchor") // #anchor will be ignored
    ```


* #### *node.js* module

    ```javascript
    var qs = require('simple-query-string');

    var parsed = qs.parse("key=val&param=1");

    console.log(parsed["key"]);
    console.log(parsed["param"]);

    ```


* #### browser

    ```html
    <script src="https://cdn.rawgit.com/khalidsalomao/simple-query-string/1.2.5/src/simplequerystring.js"></script>
    <script>
        var parsed = simpleQueryString.parse('key=val&param=1');

        console.log(parsed["key"]);
    </script>
    ```

* #### AMD module

    ```javascript
    require(['simple-query-string'], function(qs){
        var p = qs.parse('key=val&param=1');
        console.log(p);
    });
    ```

* #### `for..in` safe

    Safe to be used in a for in loop. The object is created with `Object.create(null)`.

    ```javascript
    var dic = simpleQueryString.parse("http://example.org/?p1=val&p2=true&p3=3&p4=str");
    for (var k in dic) {
        console.log(dic[k]);
    }
    ```


* #### *safely* deals with invalid/empty input

    ```javascript
    simpleQueryString.parse(null) // equals to {}
    ```


* #### Custom delimiter

    In some cases, you may want to use another separator instead of ampersand.
    Example using semicolon (';') as separator:

    ```javascript
    simpleQueryString.parse('p1=a;p2=1', ';') // equals to '{ p1:'a', p2: 1}'
    ```


### Query String Encoding

* #### fast

    Several benchmarks are run at each release to ensure maximum performance.


* #### properties detection

    ```javascript
    simpleQueryString.stringify({ key: "val", param: 1 })
    //=> 'key=val&param=1'
    ```


* #### type detection

    ```javascript
    simpleQueryString.stringify({ p: 1, p2: true, p3: false }) // equals to 'p=1&p2=true&p3=false'
    ```


* #### array encoding

    ```javascript
    simpleQueryString.stringify({ myarr: [1,2,3,4] }) // equals to 'myarr=1&myarr=2&myarr=3&myarr=4'
    ```


* #### *node.js* module

    ```javascript
    var qs = require('simple-query-string');

    var str = qs.stringify({ param: 1, p2: true, p3: false });

    console.log(str); // equals to 'param=1&p2=true&p3=false'

    ```


* #### browser

    ```html
    <script src="https://cdn.rawgit.com/khalidsalomao/simple-query-string/1.2.5/src/simplequerystring.js"></script>
    <script>
        var str = simpleQueryString.stringify({ param: 1, p2: true, p3: false });

        console.log(str);
    </script>
    ```


* #### AMD module

    ```javascript
    require(['simple-query-string'], function(qs){
        var str = qs.stringify({ param: 1, p2: true, p3: false });
        console.log(str);
    });
    ```


* #### *safely* ignore functions and prototype properties

    ```javascript
    simpleQueryString.stringify({ p1: function(){ return 0; }, p2: 1 }) // equals to 'p2=1'
    ```


* #### *safely* deals with invalid/empty input

    ```javascript
    simpleQueryString.stringify(null) // equals to ''
    ```

* #### Custom delimiter

    In some cases, you may want to use another separator instead of ampersand.
    Example using semicolon (';') as separator:

    ```javascript
    simpleQueryString.stringify({ p1: 'a', p2: 1 }, ';') // equals to 'p1=a;p2=1'
    ```

-----

## Getting Started

Decode example:

```javascript
var obj = simpleQueryString.parse("http://example.org/test/?key=val&param=1");

// obj["key"] === "val"

// obj["param"] === "1"

```


Encode example:

```javascript
var p = {
    key1: true,
    key2: [0, 1, 2],
    key3: "string",
    key4: 4321
};

var qStr = simpleQueryString.stringify(p);

```

-----

## How to Test


### Node.js

#### Install dependencies

```
$ npm install mocha -g
```


#### Run tests in node.js

Use npm to run the test script 'spec/simplequerystring-test.js'

```
$ npm test
```


#### Run tests in any browser

Run the tests by opening `./spec/testpage.html`.


-----

## Query string references

Some documentation for future reference.

[Wikipedia on Query string structure](https://en.wikipedia.org/wiki/Query_string#Structure)

> * The query string is composed of a series of field-value pairs.
> * Within each pair, the field name and value are separated by an equals sign, '='.
> * The series of pairs is separated by the ampersand, '&' (or semicolon, ';' for URLs embedded in HTML and not generated by a `<form>...</form>;` see below).


##### W3C semicolon recommendation

[W3C - Ampersands in URI attribute values](https://www.w3.org/TR/html401/appendix/notes.html#h-B.2.2)


> We recommend that HTTP server implementors, and in particular, CGI implementors support the use of ";" in place of "&" to save authors the trouble of escaping "&" characters in this manner.


##### RFC 3986 on Query component

[RFC 3986](https://tools.ietf.org/html/rfc3986)


Some relevant parts of the documentation for future reference.


<https://tools.ietf.org/html/rfc3986#section-3.4>

> The query component is indicated by the first question
mark ("?") character and terminated by a number sign ("#") character
or by the end of the URI

<https://tools.ietf.org/html/rfc3986#section-4.2>

> relative-ref  = relative-part [ "?" query ] [ "#" fragment ]

-----

## License

MIT © 2016 Khalid Salomão
