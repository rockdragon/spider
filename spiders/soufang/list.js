(function () {
    var crawl = require('../../modules/crawler/crawler').crawl;
    var run = require('../../modules/es6/container.js').run;

    var cheerio = require('cheerio');

    run(function *(cb) {
        var url = 'http://zu.fang.com/default.aspx';
        console.log('staring crawl..', url);
        var res = yield crawl('get', url)(cb);

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
        console.log(items);
    });
})();