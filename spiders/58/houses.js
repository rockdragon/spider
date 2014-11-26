var crawlPage = require('../biz').crawlPage;
var model = require('../model');
var co = require('co');
var cheerio = require('cheerio');
var _ = require('underscore');
var _s = require('underscore.string');
var resolve = require('url').resolve;
var getRootURL = require('../../modules/other/pathUtils').getRootURL;

/*
 列表
 * */
module.exports = Houses;
function Houses(url){
    this.url = url;
}
/*
 crawl houses list
* */
Houses.prototype.getHouses = function() {
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
        var locations = $('meta[name="location"]').attr('content');
        if(locations) {
            var province = locations.match('province=([^;]+)')[1];
            var city = locations.match('city=([^;]+)')[1];
        }
        var listPage = new model.listPage({url: url, houses: [], pages: []});
        _.each($('div.pager a'), function(a){
            var pageUrl = resolve(url, $(a).attr('href'));
            listPage.pages.push(pageUrl);
        });
        $('table.tbimg tr').each(function () {
            var house = new model.house({province: province, city: city});
            var $elements = $(this).children();
            house.thumbnail = $($elements[0]).find('div a img').attr('src');
            var href = $($elements[1]).find('h1 a');
            house.title = $(href).text().trim();
            house.href = $(href).attr('href');
            house.price = $($elements[2]).find('b.pri').text().trim();
            house.houseType = $($elements[2]).find('span.showroom').text().trim();
            if(_s.include(house.title, '(个人)'))
                house.publisher = '个人';
            var addrs = $($elements[1]).find('p.qj-renaddr a');
            house.bizDistrict = $(addrs[0]).text();
            house.building = $(addrs[1]).text();

            listPage.houses.push(house);
        });
        fn(err, listPage);
    };
}

//co(function*() {
//    var h = new Houses('http://bj.58.com/chuzu/');
//    var houses = yield h.getHouses();
//    console.log(houses);
//});
