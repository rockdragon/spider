var BloomFilter = require('../modules/repeater/repeater');
var should = require('should');

describe('bloom filter testing', function () {
    var bloomFilter = new BloomFilter();
    var url = 'http://www.ooxx.com/';

    it('existence testing', function () {
        bloomFilter.exists(url).should.equal(false);
        bloomFilter.add(url);
        bloomFilter.exists(url).should.equal(true);
    });

    after(function(){
        bloomFilter.destroy();
    });
});