var koa = require('koa');
var render = require('koa-ejs');

var route = koa();

route.use(function *() {
    yield this.render('index', {title: 'index'});
});
module.exports = route;