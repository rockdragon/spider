var crawl = require('../modules/crawler/crawler').crawl;
/*
*   crawl page common logic
*   @url
*   @parse: a function which parse page, it uses fn to callback
*/
module.exports.crawlPage = crawlPage;
function crawlPage(url, parse) {
    return function (fn) {
        console.log('staring crawl..', url);
        crawl('get', url)(parse(fn));
    };
}

var log = require('../modules/logger/logUtils').log;
module.exports.log = log;

var sleep = require('../modules/other/timeUtils').sleep;
module.exports.sleep = sleep;

module.exports.extractImgSrc = extractImgSrc;
function extractImgSrc(html){
    var regExp = new RegExp('<img src=[\"\']([^\"\']+)[\"\']/>');
    var matched = regExp.exec(html);
    if(matched && matched.length > 1)
        return matched[1];
    return null;
}