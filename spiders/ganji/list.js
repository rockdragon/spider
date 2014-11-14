var crawlPage = require('../biz').carwlPage;
//var run = require('../../modules/es6/container.js').run;

var cheerio = require('cheerio');
var url = 'http://bj.ganji.com/fang1/';

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
        $('div.listBox ul.list-style1 li').each(function () {
            var $elements = $(this).children();
            var $title = $($elements[1]).find('a.list-info-title');
            items.push($title.text().trim());
        });
        fn(err, items);
    };
}

//run(function*(cb) {
//    var houses = yield getHouses()(cb);
//    console.log(houses);
//});
