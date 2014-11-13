(function () {
    var crawl = require('../modules/crawler/crawler').crawl;
    var download = require('../modules/crawler/crawler').download;
    var run = require('../modules/es6/container.js').run;

    var cheerio = require('cheerio');
    var _ = require('underscore');

    run(function *(cb) {
        //var url = 'http://zu.fang.com/default.aspx';
        //console.log('staring crawl..', url);
        //var res = yield crawl('get', url)(cb);
        //
        //var $ = cheerio.load(res, {
        //    normalizeWhitespace: true,
        //    xmlMode: true
        //});
        //var items = [];
        //$('div.houseList dl.list').each(function () {
        //    var $elements = $(this).children();
        //    var $title = $($elements[1]).find('p.title a');
        //    items.push($title.text());
        //});
        //console.log(items);

        var url = 'http://img3n.soufunimg.com/viewimage/rent/2014_11/12/M03/09/49/wKgFklRixhGIBZYAAAJ7gfeD9eAAAOgxgHrc7YAAnuZ880/180x135.jpg';
        var fileDir = _.last(url.split('/'));
        var referer = 'http://zu.fang.com/default.aspx';
        console.log('downloading picture..', url);
        yield download(url, referer, fileDir)(cb);
        console.log('download picture accomplished.');
    });
})();