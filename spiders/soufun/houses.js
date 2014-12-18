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
        $('div.fanye a').each(function(idx, ele){
            if(idx > 0) {
                var pageHref = $(ele).attr('href');
                if (pageHref) {
                    var pageUrl = resolve(url, pageHref);
                    if(pageUrl && !_.contains(listPage.pages, pageUrl)) {
                        listPage.pages.push(pageUrl);
                    }
                }
            }
        });
        $('div.houseList dl.list').each(function () {
            var $elements = $(this).children();

            if($elements[1]) {
                var $href = $($elements[1]).find('p.title a');
                if ($href) {
                    var href = $href.attr('href');
                    if(!_.contains(listPage.houses, href)) {
                        var house = new model.House({province: province, city: city});
                        if (!_s.startsWith(href, 'http'))
                            href = resolve(url, href);
                        house.href = href;
                        listPage.houses.push(house);
                    }
                }
            }
        });
        fn(err, listPage);
    }
}

//co(function*() {
//    var h = new Houses('http://zu.fang.com/house/list/');
//    var houses = yield h.getHouses();
//    console.log(houses);
//});
