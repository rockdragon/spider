var crawlPage = require('../biz').crawlPage;
var model = require('../model');
var co = require('co');
var cheerio = require('cheerio');
var _ = require('underscore');
var _s = require('underscore.string');
var resolve = require('url').resolve;

/*
 热门商圈
 * */
module.exports = HotZone;
function HotZone(cityUrl){
    this.cityUrl = cityUrl;
    this.url = cityUrl + 'chuzu';
}

HotZone.prototype.getHotZones = function () {
    var boundParse = parse.bind(this);
    return crawlPage(this.url, boundParse);
};

/*
 * parse houses
 * */
function parse(fn) {
    var cityUrl = this.cityUrl;
    return function (err, res) {
        var $ = cheerio.load(res, {
            normalizeWhitespace: true,
            xmlMode: true
        });
        //collect page info
        var listBizDistricts = [];
        var hotArea =  $('dl#hotarea')[0];
        if(hotArea) {
            _.each($(hotArea).find('dd a'), function(a){
                var href = resolve(cityUrl, $(a).attr('href'));
                var name = $(a).text();
                listBizDistricts.push({ name:name, href:href });
            });
        }
        fn(err, listBizDistricts);
    };
}

//co(function*() {
//    var zone = new HotZone('http://bj.58.com/');
//    var hotZones = yield zone.getHotZones();
//    console.log(hotZones);
//});
