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
module.exports = Houses;
function Houses(url) {
    this.url = url;
    this.rootURL = getRootURL(this.url);
}

/*
 crawl houses list
 * */
Houses.prototype.getHouses = function () {
    var boundParse = parse.bind(this);
    return crawlPage(this.url, boundParse);
};


function parse(fn) {
    var url = this.rootURL;
    return function (err, res) {
        var $ = cheerio.load(res, {
            normalizeWhitespace: true,
            xmlMode: true
        });
        var locations = $('meta[name="location"]').attr('content');
        if (locations) {
            var province = locations.match('province=([^;]+)')[1];
            var city = locations.match('city=([^;]+)')[1];
        }
        var listPage = new model.listPage({url: url, houses: [], pages: []});
        $('div.fanye a').each(function(idx, ele){
            if(idx > 0) {
                var pageHref = $(ele).attr('href');
                if (pageHref) {
                    var pageUrl = resolve(url, pageHref);
                    listPage.pages.push(pageUrl);
                }
            }
        });
        $('div.houseList dl.list').each(function () {
            var house = new model.house({province: province, city: city});

            var $elements = $(this).children();

            house.thumbnail = $($elements[0]).find('a img').attr('src');

            var $href = $($elements[1]).find('p.title a');
            house.title = $href.text();
            house.href = $href.attr('href');
            var $publisher = $($elements[1]).find('span.txt');
            if($publisher && _s.contains($($publisher).text(), '个人'))
                house.publisher = '个人';
            var $infos = $($elements[1]).find('p.gray6');
            if($infos.length > 2) {
                var $address = $($infos[0]).find('a span');
                house.district = $($address[0]).text();
                house.bizDistrict = $($address[1]).text();
                house.building = $($address[2]).text();
                house.address = $($infos[0]).find('span.iconAdress').text();
                var $infoDetails = $($infos[1]).text().split('/');
                house.houseType = $infoDetails[0];
                house.area = $infoDetails[1];
                house.fitment = $infoDetails[2];
                house.floor = $infoDetails[3];
                house.orientation = $infoDetails[4];
                house.convenience = $($infos[2]).text();
            }

            house.price = $($elements[1]).find('div.moreInfo span.price').text();

            listPage.houses.push(house);
        });
        fn(err, listPage);
    }
}

//co(function*() {
//    var h = new Houses('http://zu.fang.com/house/list/');
//    var houses = yield h.getHouses();
//    console.log(houses);
//});
