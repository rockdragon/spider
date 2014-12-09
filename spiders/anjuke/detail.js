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
var sleep = require('../biz').sleep;
var getURL = require('../biz').getURL;
var ent = require('ent');
var onSuccess = require('../biz').onSuccess;
var onError = require('../biz').onError;
var bravo = require('bravo');
var path = require('path');
var moment = require('moment');
var util = require('util');
var getAbsolutePath = require('../../modules/other/pathUtils').getAbsolutePath;

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
        var $ = cheerio.load(html, {
            normalizeWhitespace: true,
            xmlMode: true
        });

        //collect page info
        var jsonFile = getAbsolutePath('spiders/anjuke/detail.json');
        var house = bravo.Parse(jsonFile, html);
        house.zone = house.city + ' - ' + house.zone;
        house.source = 'anjuke';
        house.href = extractRequestHref(res.request.uri.href, res.request.uri.search);
        house.publisher = '个人';
        house.publishDate = moment(house.publishDate).toDate();

        house.pics = [];//bg_nopic.jpg / bg_default.jpg
        $('div.bigps div.picCon ul li a img').each(function (idx, ele) {
            var bigSize = '600x450.jpg';
            var src = $(this).attr('src');
            var dataSrc = $(this).attr('data-src');
            var picURL = _s.endsWith(src, bigSize)
                ? src
                : (_s.endsWith(dataSrc, bigSize) ? dataSrc : null);
            if (picURL)
                house.pics.push(picURL);
        });

        fn(err, house);
    };
}

//co(function*() {
//    var d = new Detail('http://cd.zu.anjuke.com/gfangyuan/36469193');
//    //var d = new Detail('http://cd.zu.anjuke.com/gfangyuan/36255669');
//    var house = yield d.getDetail();
//    if (house.pics) {
//        //'http://xx.com/tiny/n_t009ef5c407ad080034589.jpg,http://xx.cn/p1/tiny/n_t009eadb5f17458003456c.jpg'
//        house.housePics = [];
//        for (var i = 0, len = house.pics.length; i < len; i++) {
//            var blob = yield download2Buffer(house.pics[i], house.href);
//            house.housePics.push({housePic: blob});
//            sleep(1);
//        }
//        delete house.pics;
//    }
//    console.log(house);
//
//    yield model.synchronize();
//    onSuccess('synchronization successfully.');
//
//    yield model.bulkCreate(house);
//    onSuccess('creation successfully.');
//}).catch(onError);