var crawl = require('../modules/crawler/crawler').crawl;

/*
*   crawl page common logic
*   @url
*   @parse: a function which parse page, it uses fn to callback
*/
module.exports.carwlPage = carwlPage;
function carwlPage(url, parse) {
    return function (fn) {
        console.log('staring crawl..', url);
        crawl('get', url)(parse(fn));
    };
}