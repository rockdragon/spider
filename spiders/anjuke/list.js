(function () {
    var crawl = require('../../modules/crawler/crawler').crawl;
    var run = require('../../modules/es6/container.js').run;

    var cheerio = require('cheerio');

    run(function *(cb) {
        var url = 'http://bj.zu.anjuke.com/';
        console.log('staring crawl..', url);
        var res = yield crawl('get', url)(cb);

        var $ = cheerio.load(res.text, {
            normalizeWhitespace: true,
            xmlMode: true
        });
        var items = [];
        $('div.main_content dl.dl_list_house').each(function () {
            var $elements = $(this).children();
            var $title = $($elements[1]).find('h3 a');
            items.push($title.text().trim());
        });
        console.log(items);
    });
})();