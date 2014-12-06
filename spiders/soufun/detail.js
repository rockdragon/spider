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
var download2Buffer = require('../biz').download2Buffer;
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
        house.source = 'soufun';
        house.publisher = '个人';
        house.href = extractRequestHref(res.request.uri.href, res.request.uri.search);
        house.publishDate = moment(house.publishDate).toDate();

        fn(err, house);
    };
}

co(function*() {
    //var d = new Detail('http://zu.fang.com/chuzu/1_58826182_-1.htm');
    //var d = new Detail('http://zu.fang.com/chuzu/1_58826292_-1.htm');
    //var d = new Detail('http://zu.fang.com/chuzu/1_58826425_-1.htm');
    var d = new Detail('http://zu.sh.fang.com/chuzu/1_53050553_-1.htm');
    //var d = new Detail('http://zu.cq.fang.com/chuzu/1_51072822_-1.htm');
    var house = yield d.getDetail();
    if (house.mapUrl) {//没有经纬度的不收录
        var content = yield getURL(house.mapUrl);
        var matched = new RegExp('px:"([^"]+)",py:"([^"]+)"').exec(content);
        if (matched) {
            house.longitude = matched[1];
            house.latitude = matched[2];
        }
        delete house.mapUrl;

        if (house.housePics) {//图片
            house.housePics = yield download2Buffer(house.housePics, house.href);
        }
    }
    console.log(house);
});