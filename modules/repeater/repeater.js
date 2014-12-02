var co = require('co');
var BloomFilter = require('bloomfilter').BloomFilter;
var key = 'spider_bloom';
var cache = {};

function instance(){
    if(!cache[key]) {
        console.log('bloom non exist.')
        var p = 0.0001;                               //误判率
        var n = 1000000;                              //集合大小
        var m = parseInt(2 * n * Math.log(1 / p));    //位数组大小
        var k = parseInt(0.7 * (m / n));              //Hash函数个数

        cache[key] = new BloomFilter(m, k);
    }
    return cache[key];
}

module.exports.exists = exists;
module.exports.add = add;
//module.exports.clearAll = clearAll;

function exists(url){
    return instance().test(url);
}

function add(url){
    return instance().add(url);
}

//function clearAll(){
//
//}

