var co = require('co');
var bf = require('bloomfilter');

module.exports = BloomFilter;
function BloomFilter(p, n) {
    this.p = p || 0.0001;                                       //误判率
    this.n = n || 1000000;                                      //集合大小
    this.m = parseInt(2 * this.n * Math.log(1 / this.p));       //位数组大小
    this.k = parseInt(0.7 * (this.m / this.n));                 //Hash函数个数

    this.bloomFilter = new bf.BloomFilter(this.m, this.k);
}

BloomFilter.prototype.exists = function (url) {
    return this.bloomFilter.test(url);
};
BloomFilter.prototype.add = function (url) {
    return this.bloomFilter.add(url);
};
BloomFilter.prototype.destroy = function () {
    this.bloomFilter.buckets = [];
};


