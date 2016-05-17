/* jshint
eqeqeq: true, undef: true, unused: true, indent: 4, plusplus: false, curly: false, forin: true, trailing: true, white: true, sub:true,
browser: true, node: true, devel: true, mocha: true
*/

var express = require('express');
var app = express();

app.use('/', express.static('./'));

app.listen(8080, function () {
  console.log('Test page server app listening on port 8080!');
});