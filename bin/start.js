(function () {
    var crawl = require('../modules/crawler/crawler').crawl;
    var download = require('../modules/crawler/crawler').download;
    var co = require('co');
    var cheerio = require('cheerio');
    var _ = require('underscore');

    co(function *() {
        var url = 'http://img3n.soufunimg.com/viewimage/rent/2014_11/12/M03/09/49/wKgFklRixhGIBZYAAAJ7gfeD9eAAAOgxgHrc7YAAnuZ880/180x135.jpg';
        var fileDir = _.last(url.split('/'));
        var referer = 'http://zu.fang.com/default.aspx';
        console.log('downloading picture..', url);
        yield download(url, referer, fileDir);
        console.log('download picture accomplished.');
    });
})();