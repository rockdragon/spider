/*
 crawl chinese page by Encoding:gb2312 & utf-8
 */
var config = require('../config/configUtils');
var proxy = config.getConfigs().proxy;
var request = require('request-gb');

module.exports.crawl = function (method, url) {
    return function (fn) {
        var req = method === 'get' ? request.get : request.post;
        var opts = {gzip: true};
        if (proxy)
            opts.proxy = proxy;
        req(url, opts, fn);
    };
};