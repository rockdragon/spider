var koa = require('koa');
var mount = require('koa-mount');
var render = require('koa-ejs');
var serve = require('koa-static');
var getAbsolutePath = require('../modules/other/pathUtils').getAbsolutePath;

//settings
var app = koa();
app.use(serve(getAbsolutePath('bower_components')));
render(app, {
    root: getAbsolutePath('web/views'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: true
});

//routes
var index = require(getAbsolutePath('web/routes/index'));
var data = require(getAbsolutePath('web/routes/data'));
app.use(mount('/data', data));
app.use(mount('/admin', index));

//listen
app.listen(3000);