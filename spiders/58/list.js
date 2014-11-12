(function () {
    var crawl = require('../../modules/crawler/crawler').crawl;
    var run = require('../../modules/es6/container.js').run;

    var cheerio = require('cheerio');

    run(function *(cb) {
        var url = 'http://bj.58.com/chuzu/';
        console.log('staring crawl..', url);
        var res = yield crawl('get', url)(cb);

        var $ = cheerio.load(res.text, {
            normalizeWhitespace: true,
            xmlMode: true
        });
        var items = [];
        $('table.tbimg tr').each(function () {
            var $elements = $(this).children();
            var $title = $($elements[1]).find('h1');
            items.push($title.text().trim());
        });
        console.log(items);
    });
})();