var koa = require('koa');
var route = koa();
var getAbsolutePath = require('../../modules/other/pathUtils').getAbsolutePath;
var model = require(getAbsolutePath('spiders/model'));

route.use(function *() {
    this.type = 'application/json';
    this.body = yield model.countBySource(['soufun', '58', 'anjuke']);
});
module.exports = route;