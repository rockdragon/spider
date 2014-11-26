var Houses = require('../spiders/soufun/houses');
var co = require('co');
var expect = require('expect.js');
require('should');

describe('soufun testing', function () {
    it('list testing', function (done) {
        co(function*() {
            var h = new Houses('http://zu.fang.com/house/list/');
            var listPage = yield h.getHouses();
            expect(listPage).not.to.be(null);
            expect(listPage.houses).not.to.be(null);
            Object.prototype.toString.call(listPage.houses).should.equal('[object Array]');
            listPage.houses.length.should.greaterThan(10);
            done();
        });
    });
});
