/*
 crawl chinese page by Encoding:gb2312 & utf-8
 */
var config = require('../config/configUtils').getConfigs();
var request = require('request-gb');

module.exports.crawlWithOpts = function (method, url, opts) {
    return function (fn) {
        var req = method === 'get' ? request.get : request.post;
        opts.gzip = opts.gzip || true;
        req(url, opts, fn);
    };
};

module.exports.crawl = function (method, url) {
    return function (fn) {
        var req = method === 'get' ? request.get : request.post;
        var opts = {gzip: true};
        if (config && config.proxy)
            opts.proxy = config.proxy;
        req(url, opts, fn);
    };
};

module.exports.download = function (url, referer, path) {
    return function (fn) {
        var opts = {gzip: true};
        if (config && config.proxy)
            opts.proxy = config.proxy;
        request.download(url, referer, opts, path, fn);
    };
};

module.exports.download2Buffer = function (url, referer) {
    return function (fn) {
        var opts = {gzip: true};
        if (config && config.proxy)
            opts.proxy = config.proxy;
        request.download2Buffer(url, referer, opts, fn);
    };
};