var crawlPage = require('../biz').crawlPage;
var model = require('../model');
var co = require('co');
var cheerio = require('cheerio');
var _ = require('underscore');
var _s = require('underscore.string');
var resolve = require('url').resolve;
var getRootURL = require('../../modules/other/pathUtils').getRootURL;

/*
 热门商圈
 * */
module.exports = HotZone;
function HotZone(url) {
    this.url = url;
    this.rootURL = getRootURL(url);
}

HotZone.prototype.getHotZones = function () {
    var boundParse = parse.bind(this);
    return crawlPage(this.url, boundParse);
};

/*
 * parse houses
 * */
function parse(fn) {
    var url = this.rootURL;
    return function (err, res) {
        var $ = cheerio.load(res, {
            normalizeWhitespace: true,
            xmlMode: true
        });
        //collect page info
        var listBizDistricts = [];
        $('div.letter-tab-con a').each(function (idx, ele) {
            var href = resolve(url, $(ele).attr('href'));
            var name = $(ele).text();
            listBizDistricts.push({name: name, href: href});
        });
        fn(err, listBizDistricts);
    };
}

co(function*() {
    var zone = new HotZone('http://bj.ganji.com/fang1/');
    var hotZones = yield zone.getHotZones();
    console.log(hotZones);
});
