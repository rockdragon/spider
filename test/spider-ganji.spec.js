var Houses = require('../spiders/ganji/houses');
var co = require('co');
var expect = require('expect.js');
require('should');

describe('ganji testing', function () {
    it('list testing', function (done) {
        co(function*() {
            var h = new Houses('http://bj.ganji.com/fang1/');
            var listPage = yield h.getHouses();
            expect(listPage).not.to.be(null);
            expect(listPage.houses).not.to.be(null);
            Object.prototype.toString.call(listPage.houses).should.equal('[object Array]');
            listPage.houses.length.should.greaterThan(10);
            done();
        });
    });
});
