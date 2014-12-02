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
    return function (err, res, html) {
        var $ = cheerio.load(html, {
            normalizeWhitespace: true,
            xmlMode: true
        });
        var locations = $('meta[name="location"]').attr('content');
        if (locations) {
            var province = locations.match('province=([^;]+)')[1];
            var city = locations.match('city=([^;]+)')[1];
        }
        var listPage = new model.listPage({url: url, houses: [], pages: []});
        _.each($('div.pageLink a'), function(a){
            var pageHref = $(a).attr('href');
            if(pageHref) {
                var pageUrl = resolve(url, pageHref);
                listPage.pages.push(pageUrl);
            }
        });
        $('div.listBox ul.list-style1 li').each(function () {
            var house = new model.house({province: province, city: city});
            var $elements = $(this).children();

            house.thumbnail = $($elements[0]).find('a img').attr('src');

            var $infos = $($elements[1]).children();
            var $href = $($infos[0]).find('a');
            house.href =  $href.attr('href');
            if(house.href) {
                house.href = resolve(url, house.href);
                house.title = $href.text();
                var $adds = $($infos[1]).find('div.list-word span');
                house.building = $($adds[0]).text();
                var $districts = $($adds[1]).text().split('-');
                if ($districts.length > 1) {
                    house.bizDistrict = _s.trim($districts[0], '租房').trim();
                    house.address = $districts[1].trim();
                }
                $($infos[1]).find('span.lbls').each(function (idx, ele) {
                    if (_s.contains($(ele).text(), '精装修'))
                        house.fitment = '精装修';
                });
                var $infoDetails = $($infos[1]).find('p.list-word').text().split('/');
                if ($infoDetails.length > 6) {
                    house.houseType = $infoDetails[0];
                    house.area = $infoDetails[1];
                    house.floor = $infoDetails[3];
                    house.orientation = _s.contains($infoDetails[4], '向') ? $infoDetails[4] : $infoDetails[5];
                }
                house.price = $($infos[2]).find('p em.sale-price').text();

                listPage.houses.push(house);
            }
        });
        fn(err, listPage);
    };
}

//co(function*() {
//    var h = new Houses('http://bj.ganji.com/fang1/');
//    var houses = yield h.getHouses();
//    console.log(houses);
//});