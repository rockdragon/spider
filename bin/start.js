(function () {
    var crawl = require('../modules/crawler/crawler').crawl;
    var run = require('../modules/es6/container.js').run;

    var cheerio = require('cheerio');

    var iconv = require('iconv-lite');
    var chardet = require('chardet');

    run(function *(cb) {
        var url = 'http://zu.fang.com/';
        console.log('staring crawl..', url);
        var res = yield crawl('get', url)(cb);

        console.log(chardet.detect(res.text));

        var html = iconv.decode(new Buffer(res.text, 'binary'), 'utf8');
        //console.log(html);

        var $ = cheerio.load(html, {
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

    //var n = require('needle');
    //var iconv = require('iconv-lite');
    //var BufferHelper = require('bufferhelper');
    //var url = 'http://zu.fang.com/';
    //var opts = {encoding: 'utf-8', proxy: 'http://192.168.20.6:3128'};
    //
    //var buffer = new BufferHelper();
    //n.get(url, opts)
    //    .on('data', function(chunk){
    //    bufferHelper.concat(chunk);
    //}).on('end', function(){
    //        console.log(iconv.decode(buffer.toBuffer(),'gb2312'));
    //    });
})();