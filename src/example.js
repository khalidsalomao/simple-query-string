var qs = require('simple-query-string');

var str = qs.parse('http://example.org/?key1=val1&key2=100');
console.log(str);
//=> { key1: 'val1', key2: '100' }

var dic = qs.stringify({ key1: 'val1', key2: 100, key3: true });
console.log(str);
//=> 'key1=val1&key2=100&key3=true'