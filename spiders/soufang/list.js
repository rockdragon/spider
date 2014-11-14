var crawlPage = require('../biz').carwlPage;
//var run = require('../../modules/es6/container.js').run;

var cheerio = require('cheerio');
var url = 'http://zu.fang.com/default.aspx';

module.exports.getHouses = getHouses;
function getHouses() {
    return crawlPage(url, parse);
}
function parse(fn) {
    return function (err, res) {
        var $ = cheerio.load(res, {
            normalizeWhitespace: true,
            xmlMode: true
        });
        var items = [];
        $('div.houseList dl.list').each(function () {
            var $elements = $(this).children();
            var $title = $($elements[1]).find('p.title a');
            items.push($title.text());
        });
        fn(err, items);
    }
}

//run(function*(cb) {
//    var houses = yield getHouses()(cb);
//    console.log(houses);
//});
