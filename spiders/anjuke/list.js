var crawlPage = require('../biz').carwlPage;
//var run = require('../../modules/es6/container.js').run;

var cheerio = require('cheerio');
var url = 'http://bj.zu.anjuke.com/';

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
        $('div.main_content dl.dl_list_house').each(function () {
            var $elements = $(this).children();
            var $title = $($elements[1]).find('h3 a');
            items.push($title.text().trim());
        });
        fn(err, items);
    };
}

//run(function*(cb) {
//    var houses = yield getHouses()(cb);
//    console.log(houses);
//});

