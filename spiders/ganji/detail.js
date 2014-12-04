var crawlPage = require('../biz').crawlPage;
var model = require('../model');
var co = require('co');
var cheerio = require('cheerio');
var _ = require('underscore');
var _s = require('underscore.string');
var resolve = require('url').resolve;
var getRootURL = require('../../modules/other/pathUtils').getRootURL;
var extractImgSrc = require('../biz').extractImgSrc;
var extractRequestHref = require('../biz').extractRequestHref;
var getURL = require('../biz').getURL;
var ent = require('ent');
var bravo = require('bravo');
var path = require('path');
var moment = require('moment');
var util = require('util');

/*
 详情
 * */
module.exports = Detail;
function Detail(url) {
    this.url = url;
}

/*
 crawl detail page
 * */
Detail.prototype.getDetail = function () {
    var boundParse = parse.bind(this);
    return crawlPage(this.url, boundParse);
};

/*
 * parse houses
 * */
function parse(fn) {
    var url = this.url;
    return function (err, res, html) {
        //var $ = cheerio.load(html, {
        //    normalizeWhitespace: true,
        //    xmlMode: true
        //});

        //collect page info
        var jsonFile = path.join(process.cwd(), 'detail.json');
        var house = bravo.Parse(jsonFile, html);
        house.source = 'ganji';
        house.href = extractRequestHref(res.request.uri.href, res.request.uri.search);

        fn(err, house);
    };
}

co(function*() {
    var d = new Detail('http://bj.ganji.com/fang1/1276725667x.htm');
    //var d = new Detail('http://bj.ganji.com/fang3/1248504994x.htm');
    //var d = new Detail('http://cd.ganji.com/fang1/1267272567x.htm');
    var house = yield d.getDetail();
    console.log(house);
});