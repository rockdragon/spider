var koa = require('koa');
var route = koa();
var getAbsolutePath = require('../../modules/other/pathUtils').getAbsolutePath;
var model = require(getAbsolutePath('spiders/model'));

route.use(function *() {
    this.body = '';
});
module.exports = route;