var superagent = require('superagent');
var cheerio = require('cheerio');

var config = require('../config/configUtils');
var proxy = config.getConfigs().proxy;

module.exports.crawl = function(method, url){
    return function(fn){
        if(proxy)
            require('superagent-proxy')(superagent);
        var req = method === 'get' ? superagent.get(url) : superagent.post(url);
        if(proxy)
            req = req.proxy(proxy);
        req.end(fn);
    };
};