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
    return function (err, res, html) {
        var $ = cheerio.load(html, {
            normalizeWhitespace: true,
            xmlMode: true
        });
        //collect page info
        var listPage = new model.listPage({url: url, houses: [], pages: []});
        _.each($('div.pager a'), function(a){
            var pageUrl = resolve(url, $(a).attr('href'));
            listPage.pages.push(pageUrl);
        });
        $('table.tbimg tr').each(function () {
            var house = new model.House();
            var $elements = $(this).children();
            var href = $($elements[1]).find('h1 a');
            house.href = $(href).attr('href');
            listPage.houses.push(house);
        });
        fn(err, listPage);
    };
}

//co(function*() {
//    var h = new Houses('http://bj.58.com/chaoyang/zufang/0/');
//    var houses = yield h.getHouses();
//    console.log(houses);
//});
