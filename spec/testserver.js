/* jshint
eqeqeq: true, undef: true, unused: true, indent: 4, plusplus: false, curly: false, forin: true, trailing: true, white: true, sub:true,
browser: true, node: true, devel: true, mocha: true
*/

var koa = require('koa');
var app = koa();

var staticfiles = require('koa-static');

// $ GET /everything
app.use(staticfiles('.'));

app.listen(8080);

console.log('Test page server app listening on port 8080!');