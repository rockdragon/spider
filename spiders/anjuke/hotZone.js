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
}

HotZone.prototype.getHotZones = function () {
    return crawlPage(this.url, parse);
};

/*
 * parse houses
 * */
function parse(fn) {
    return function (err, res) {
        var $ = cheerio.load(res, {
            normalizeWhitespace: true,
            xmlMode: true
        });
        //collect page info
        var listBizDistricts = [];
        $('div#relative_plate_list ul').each(function (idx, ele) {
            $(ele).find('a').each(function (idx2, ele2) {
                if(idx2 > 0) {
                    var href = $(ele2).attr('href');
                    var name = $(ele2).text();
                    listBizDistricts.push({name: name, href: href});
                }
            });
        });
        fn(err, listBizDistricts);
    };
}

//co(function*() {
//    var zone = new HotZone('http://bj.zu.anjuke.com/');
//    var hotZones = yield zone.getHotZones();
//    console.log(hotZones);
//});
