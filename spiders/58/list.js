var crawlPage = require('../biz').carwlPage;
//var run = require('../../modules/es6/container.js').run;
var cheerio = require('cheerio');

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
        var items = [];
        $('table.tbimg tr').each(function () {
            var $elements = $(this).children();
            var $title = $($elements[1]).find('h1');
            items.push($title.text().trim());
        });
        fn(err, items);
    };
}

//run(function*(cb) {
//    var houses = yield getHouses()(cb);
//    console.log(houses);
//});
