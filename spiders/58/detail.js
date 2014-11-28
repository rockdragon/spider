var crawlPage = require('../biz').crawlPage;
var model = require('../model');
var co = require('co');
var cheerio = require('cheerio');
var _ = require('underscore');
var _s = require('underscore.string');
var resolve = require('url').resolve;
var getRootURL = require('../../modules/other/pathUtils').getRootURL;

/*
 详情
 * */
module.exports = Detail;
function Detail(url){
    this.url = url;
}

/*
 crawl detail page
 * */
Houses.prototype.getDetail = function() {
    var boundParse = parse.bind(this);
    return crawlPage(this.url, boundParse);
};

/*
 * parse houses
 * */
function parse(fn) {
    var url = this.url;
    return function (err, res) {
        var $ = cheerio.load(res, {
            normalizeWhitespace: true,
            xmlMode: true
        });
        //collect page info
        var house = {};
        fn(err, house);
    };
}

//co(function*() {
//    var d = new Detail('http://bj.58.com/zufang/20107446936330x.shtml');
//    var house = yield d.getDetail();
//    console.log(house);
//});