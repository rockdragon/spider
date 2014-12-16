var koa = require('koa');
var mount = require('koa-mount');
var render = require('koa-ejs');
var getAbsolutePath = require('../modules/other/pathUtils').getAbsolutePath;
var index = require(getAbsolutePath('web/routes/index'));

//settings
var app = koa();
render(app, {
    root: getAbsolutePath('web/views'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: true
});

//routes
app.use(mount('/', index));

//listen
app.listen(3000);