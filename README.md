# [simple-query-string](https://github.com/khalidsalomao/simple-query-string)

[![Build Status](http://img.shields.io/travis/khalidsalomao/simple-query-string/master.svg?style=flat-square)](https://travis-ci.org/khalidsalomao/simple-query-string "See test builds")
[![CodeClimate](http://img.shields.io/codeclimate/github/khalidsalomao/simple-query-string.svg?style=flat-square)](https://codeclimate.com/github/khalidsalomao/simple-query-string 
"CodeClimate")
[![Codecov](http://img.shields.io/codecov/c/github/khalidsalomao/simple-query-string.svg?style=flat-square)](https://codecov.io/gh/khalidsalomao/simple-query-string)
[![npm version](http://img.shields.io/npm/v/simple-query-string.svg?style=flat-square)](https://npmjs.org/package/simple-query-string "View this project on npm")
[![npm downloads](http://img.shields.io/npm/dt/simple-query-string.svg?style=flat-square)](https://npmjs.org/package/simple-query-string "npm downloads")
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://raw.githubusercontent.com/khalidsalomao/simple-query-string/master/LICENSE.txt)

Fast and simple way to parse and stringify URL query strings.

Utility javascript methods to encode and decode query string parameters with extreme performance and low memory usage.


-----
### Installation


**NPM**

```
$ npm install simple-query-string
```


**Bower**

```
$ bower install simple-query-string
```


**Download**


* [simplequerystring.js - development](https://github.com/khalidsalomao/simple-query-string/releases/download/1.2.3/simplequerystring.js)

* [simplequerystring.min.js - production](https://github.com/khalidsalomao/simple-query-string/releases/download/1.2.3/simplequerystring.min.js)


**Browser - CDN**
```
<script src="https://cdn.rawgit.com/khalidsalomao/simple-query-string/1.2.3/src/simplequerystring.min.js"></script>
```


----
### Features


#### Query String Decoding


* **query string parsing**

    `simpleQueryString.parse("key=val&param=1")`


* **full url** detection

    There is no need to use url.split('?')[1] or any other code, just put the entire string!

    `simpleQueryString.parse("http://example.org/test/?key=val&param=1")`


* support for **location.hash**
    
    `simpleQueryString.parse(location.hash)`


* support for **location.search**
    
    `simpleQueryString.parse(location.search)`


* **anchor detection**
    
    `simpleQueryString.parse("http://example.org/test/?key=val&param=1#anchor") // #anchor will be ignored`


* **array detection**
    
    `simpleQueryString.parse("myarr=1&myarr=2&myarr=3&myarr=4") // myarr: [1,2,3,4]`


* **node.js** module

```
    var qs = require('simple-query-string');

    var parsed = qs.parse("key=val&param=1");
    
    console.log(parsed["key"]);
    console.log(parsed["param"]);

```


* **browser**

```
    <script src="https://cdn.rawgit.com/khalidsalomao/simple-query-string/1.2.3/src/simplequerystring.js"></script>
    <script>
        var parsed = simpleQueryString.parse("key=val&param=1");
            
        console.log(parsed["key"]);
    </script>
```


* **`for..in` safe**

    Safe to be used in a for in loop. The object is created with `Object.create(null)`.


* **safely** deals with invalid/empty input

    `simpleQueryString.parse(null) // equals to {}`


* **fast**
    


#### Query String Encoding


* **properties detection**

    `simpleQueryString.stringify({ key: "val", param: 1 })`


* **type detection**

    `simpleQueryString.stringify({ param: 1, p2: true, p3: false })`


* **array detection**

    `simpleQueryString.stringify({ myarr: [1,2,3,4] }) // myarr=1&myarr=2&myarr=3&myarr=4`


* **node.js** module

```
    var qs = require('simple-query-string');

    var str = qs.stringify({ param: 1, p2: true, p3: false });
    
    console.log(str);

```


* **browser**

```
    <script src="https://cdn.rawgit.com/khalidsalomao/simple-query-string/1.2.3/src/simplequerystring.js"></script>
    <script>
        var str = simpleQueryString.stringify({ param: 1, p2: true, p3: false });
            
        console.log(str);
    </script>
```


* **safely** ignore functions and prototype properties

    `simpleQueryString.stringify({ p1: function(){ return 0; } }) // equals to ''`


* **safely** deals with invalid/empty input

    `simpleQueryString.stringify(null) // equals to ''`

    
* **fast**


### Getting Started

Decode example:
```
var obj = simpleQueryString.parse("http://example.org/test/?key=val&param=1");

// obj["key"] === "val"

// obj["param"] === "1"

```


Encode example:
```
var p = {
    key1: true,
    key2: [0, 1, 2],
    key3: "string",
    key4: 4321
};

var qStr = simpleQueryString.stringify(p);

```

-----
### How to Test


#### Node.js

##### Install dependencies

```
$ npm install mocha -g
```


##### Run tests in node.js

Use npm to run the test script 'spec/simplequerystring-test.js'

```
$ npm test
```


#### Browser

##### Install dependencies

```
$ npm install bower -g

$ bower update
```


##### Run tests in browser

Run the tests by opening `./spec/testpage.html`.


-----
### Additional Information

Project generated by [yeoman generator-test](https://github.com/phillipalexander/generator-test): 
`yo test`.


### License

MIT © 2016 Khalid Salomão
