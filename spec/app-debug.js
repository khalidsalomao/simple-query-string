var qs = require('../src/simplequerystring.js');

var str = qs.parse('http://example.org/?key1=val1&key2=100&&&key3&&key4=&&key5=5#anchor');
console.log(str);
//=> { key1: 'val1', key2: '100' }

var dic = qs.stringify({ key1: 'val1', key2: 100, key3: true, key4: null, key5: undefined });
console.log(dic);
//=> 'key1=val1&key2=100&key3=true'
