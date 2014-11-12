/*
 crawl ordinary utf-8 page
 */
var superagent = require('superagent');
var config = require('../config/configUtils');
var proxy = config.getConfigs().proxy;

module.exports.crawl = function (method, url) {
    return function (fn) {
        if (proxy)
            require('superagent-proxy')(superagent);
        var req = method === 'get' ? superagent.get(url) : superagent.post(url);
        if (proxy)
            req = req.proxy(proxy);
        req.end(fn);
    };
};

/*
 crawl chinese page by Encoding:gb2312
 */
var request = require('request');
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');

module.exports.crawlGB2312 = function (method, url) {
    return function (fn) {
        var buffer = new BufferHelper();
        var opts = {
            method: method,
            gzip: true,
            url: url
        };
        if (proxy)
            opts.proxy = proxy;
        request(opts, function(err){
            fn(err, iconv.decode(buffer.toBuffer(), 'gb2312'));
        }).on('data', function (data) {
            buffer.concat(data);
        });
    };
};