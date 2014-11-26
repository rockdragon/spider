var Houses = require('../spiders/ganji/houses');
var HotZone = require('../spiders/ganji/hotZone');
var co = require('co');
var expect = require('expect.js');
require('should');

describe('ganji testing', function () {
    it('houses testing', function (done) {
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

    it('hot zone testing', function(done){
        co(function*() {
            var zone = new HotZone('http://bj.ganji.com/fang1/');
            var hotZones = yield zone.getHotZones();
            expect(hotZones).not.to.be(null);
            Object.prototype.toString.call(hotZones).should.equal('[object Array]');
            hotZones.length.should.greaterThan(10);
            done();
        });
    });
});
