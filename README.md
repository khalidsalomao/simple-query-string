# [simple-query-string](https://github.com/khalidsalomao/simple-query-string)

Fast and simple way to parse and stringify URL query strings.

Utility javascript methods to encode and decode query string parameters with extreme performance and low memory usage.


### Installation

**NPM**

```
$ npm install simple-query-string
```


**Bower**

```
$ bower i simple-query-string
```


**Browser - CDN**
```
<script src="https://cdn.rawgit.com/khalidsalomao/simple-query-string/1.2.0/src/simplequerystring.min.js"></script>
```


### Features

#### Query String Decoding

* query string parsing

    `simpleQueryString.parse("key=val&param=1")`


* full url detection

    There is no need to use url.split('?')[1] or any other code, just put the entire string!

    `simpleQueryString.parse("http://example.org/test/?key=val&param=1")`



* support for location.hash 
    
    `simpleQueryString.parse(location.hash)`


* support for location.search
    
    `simpleQueryString.parse(location.search)`


* anchor detection
    
    `simpleQueryString.parse("http://example.org/test/?key=val&param=1#anchor")`


* array detection
    
    `simpleQueryString.parse("myarr=1&myarr=2&myarr=3&myarr=4")`


* node.js module

```
    var qs = require('simple-query-string');

    var parsed = qs.parse("key=val&param=1");
    
    console.log(parsed["key"]);
    console.log(parsed["param"]);

```


* browser

```
    <script src="https://cdn.rawgit.com/khalidsalomao/simple-query-string/1.2.0/src/simplequerystring.js"></script>
    <script>
        var parsed = simpleQueryString.parse("key=val&param=1");
            
        console.log(parsed["key"]);
    </script>
```

#### Query String Encoding

* properties detection

    `simpleQueryString.stringify({ key: "val", param: 1 })`


* type detection

    `simpleQueryString.stringify({ param: 1, p2: true, p3: false })`


* array detection

    `simpleQueryString.stringify({ myarr: [1,2,3,4] })`



* node.js module

```
    var qs = require('simple-query-string');

    var str = qs.stringify({ param: 1, p2: true, p3: false });
    
    console.log(str);

```


* browser

```
    <script src="https://cdn.rawgit.com/khalidsalomao/simple-query-string/1.2.0/src/simplequerystring.js"></script>
    <script>
        var str = simpleQueryString.stringify({ param: 1, p2: true, p3: false });
            
        console.log(str);
    </script>
```


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


### How to Test


#### Install dependencies

`npm install bower -g`

`bower update`


#### Run tests

Run the tests by opening `index.html`.


### Additional Information

Project generated by [yeoman generator-test](https://github.com/phillipalexander/generator-test): 
`yo test`.


### License

MIT © 2016 Khalid Salomão
