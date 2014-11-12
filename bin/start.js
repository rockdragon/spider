(function () {
    var crawl = require('../modules/crawler/crawler').crawl;
    var run = require('../modules/es6/container.js').run;

    run(function *(cb) {
        var url = 'http://bj.58.com/chuzu/';
        console.log('staring crawl..', url);
        var res = yield crawl('get', url)(cb);
        console.log(res.text);
    });
})();