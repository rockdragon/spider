(function () {
    var crawl = require('../../modules/crawler/crawler').crawl;
    var run = require('../../modules/es6/container.js').run;

    var cheerio = require('cheerio');

    run(function *(cb) {
        var url = 'http://bj.ganji.com/fang1/';
        console.log('staring crawl..', url);
        var res = yield crawl('get', url)(cb);

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
        console.log(items);
    });
})();