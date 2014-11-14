var crawlPage = require('../biz').carwlPage;
var model = require('../model');
var run = require('../../modules/es6/container').run;
var cheerio = require('cheerio');
var _ = require('underscore');
var _s = require('underscore.string');
var resolve = require('url').resolve;

var url = 'http://bj.58.com/chuzu/';

module.exports.getHouses = getHouses;
function getHouses() {
    return crawlPage(url, parse);
}

/*
 * parse business
 * */
function parse(fn) {
    return function (err, res) {
        var $ = cheerio.load(res, {
            normalizeWhitespace: true,
            xmlMode: true
        });
        //collect page info
        var locations = $('meta[name="location"]').attr('content');
        var province = locations.match('province=([^;]+)')[1];
        var city = locations.match('city=([^;]+)')[1];

        var listPage = new model.listPage({url: url, houses: [], pages: []});
        _.each($('div.pager a'), function(a){
            var pageUrl = resolve(url, $(a).attr('href'));
            listPage.pages.push(pageUrl);
        });
        $('table.tbimg tr').each(function () {
            var house = new model.house({province: province, city: city});
            var $elements = $(this).children();
            house.thumbnail = $($elements[0]).find('div a img').attr('src');
            house.title = $($elements[1]).find('h1').text().trim();
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

run(function*(cb) {
    var houses = yield getHouses()(cb);
    console.log(houses);
});
