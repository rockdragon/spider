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

function parse(fn) {
    var url = this.url;
    return function (err, res, html) {
        var $ = cheerio.load(html, {
            normalizeWhitespace: true,
            xmlMode: true
        });
        var city = $('span.city').text();

        var listPage = new model.listPage({url: url, houses: [], pages: []});
        _.each($('div.multi-page a'), function(a){
            var pageUrl = resolve(url, $(a).attr('href'));
            listPage.pages.push(pageUrl);
        });
        $('div.main_content dl.dl_list_house').each(function () {
            var house = new model.house({city: city});
            var $elements = $(this).children();

            house.thumbnail = $($elements[0]).find('a img').attr('src');

            var $href = $($elements[1]).find('h3 a');
            house.title = $href.text();
            house.href = $href.attr('href');
            var $span = $($elements[1]).find('h3 span');
            if(_s.include($span, '个人'))
                house.publisher = '个人';
            var $infos = $($elements[1]).find('p.p_tag').text().split('|');
            house.houseType = $infos[0].trim();
            house.category = $infos[1].trim();
            house.fitment = $infos[2].trim();
            house.floor = $infos[3].trim();
            var $address = $($elements[1]).find('address').text().split('&nbsp;&nbsp;');
            house.building = $address[0];
            var $districts = $address[1].split('-');
            house.district = _s.trim($districts[0],'[');
            house.bizDistrict = $districts[1];
            house.address = _s.trim($address[2], ']');

            house.price =   $($elements[2]).find('strong').text();

            listPage.houses.push(house);
        });
        fn(err, listPage);
    };
}

//co(function*(cb) {
//    var h = new Houses('http://bj.zu.anjuke.com/');
//    var houses = yield h.getHouses();
//    console.log(houses);
//});
