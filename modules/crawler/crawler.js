///*
// crawl ordinary utf-8 page
// */
//var superagent = require('superagent');

//
//module.exports.crawl = function (method, url) {
//    return function (fn) {
//        if (proxy)
//            require('superagent-proxy')(superagent);
//        var req = method === 'get' ? superagent.get(url) : superagent.post(url);
//        if (proxy)
//            req = req.proxy(proxy);
//        req.end(fn);
//    };
//};

/*
 crawl chinese page by Encoding:gb2312 & utf-8
 */
var config = require('../config/configUtils');
var proxy = config.getConfigs().proxy;
var request = require('request');
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');

module.exports.crawl = function (method, url) {
    return function (fn) {
        var buffer = new BufferHelper();
        var opts = {
            method: method,
            gzip: true,
            url: url
        };
        if (proxy)
            opts.proxy = proxy;
        request(opts, function(err, res){
            var encoding = res.headers['content-type'].split('charset=')[1] || 'UTF-8';
            console.log(url, ' encoding:', encoding);
            var html = iconv.decode(buffer.toBuffer(), encoding);
            fn(err, html);
        }).on('data', function (data) {
            buffer.concat(data);
        });
    };
};