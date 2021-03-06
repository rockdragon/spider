/*
*   crawl page common logic
*   @url
*   @parse: a function which parse page, it uses fn to callback
*/
var crawl = require('../modules/crawler/crawler').crawl;
module.exports.crawlPage = crawlPage;
function crawlPage(url, parse) {
    return function (fn) {
        crawl('get', url)(parse(fn));
    };
}

var crawlWithOpts = require('../modules/crawler/crawler').crawlWithOpts;
module.exports.crawlPageWithOpts = crawlPageWithOpts;
function crawlPageWithOpts(url, parse, opts) {
    return function (fn) {
        crawlWithOpts('get', url, opts)(parse(fn));
    };
}

/*
 * getURL
 * */
module.exports.getURL = getURL;
function getURL(url){
    return crawl('get', url);
}

/*
 download file into buffer
* */
module.exports.download2Buffer = require('../modules/crawler/crawler').download2Buffer;

/*
* Logger
* */
module.exports.log = require('../modules/logger/logUtils').log;

/*
* Sleep
* */
module.exports.sleep = require('../modules/other/timeUtils').sleep;

/*
* Extract Img Src
* */
module.exports.extractImgSrc = extractImgSrc;
function extractImgSrc(html){
    var regExp = new RegExp('<img src=["\']([^"\']+)["\']');
    var matched = regExp.exec(html);
    if(matched && matched.length > 1)
        return matched[1];
    return null;
}

/*
* Extract Link Href
* */
module.exports.extractRequestHref = extractRequestHref;
function extractRequestHref(href, path){
    if(href && path){
        return href.replace(path, '');
    }
    return href;
}

/*
* BASIC Auth url
* */
module.exports.makeBasicAuthURL = function(url, name, pass){
    return util.format('http://%s:%s@%s', name, pass, url);
};

/*
 Promise callback handler
* */
module.exports.onSuccess = onSuccess;
function onSuccess(msg) {
    console.log(msg);
}
module.exports.onError = onError;
function onError(err) {
    console.log(err.stack);
}
