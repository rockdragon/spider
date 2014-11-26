var Houses = require('../spiders/soufun/houses');
var HotZone = require('../spiders/soufun/hotZone');
var co = require('co');
var expect = require('expect.js');
require('should');

describe('soufun testing', function () {
    it('houses testing', function (done) {
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

    it('hot zone testing', function(done){
        co(function*() {
            var zone = new HotZone('http://zu.fang.com/house/list/');
            var hotZones = yield zone.getHotZones();
            expect(hotZones).not.to.be(null);
            Object.prototype.toString.call(hotZones).should.equal('[object Array]');
            hotZones.length.should.greaterThan(10);
            done();
        });
    });
});
