var qs = require('simple-query-string');

var str = qs.parse('http://example.org/?key1=val1&key2=100&key3');
console.log(str);
//=> { key1: 'val1', key2: '100', key3: null }

var dic = qs.stringify({ key1: 'val1', key2: 100, key3: true });
console.log(dic);
//=> 'key1=val1&key2=100&key3=true'
