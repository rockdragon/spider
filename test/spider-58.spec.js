var Houses = require('../spiders/58/houses');
var HotZone = require('../spiders/58/hotZone');
var co = require('co');
var expect = require('expect.js');
require('should');

describe('58 testing', function () {
    it('houses testing', function (done) {
        co(function*() {
            var h = new Houses('http://bj.58.com/chuzu/');
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
            var zone = new HotZone('http://sh.58.com/chuzu/');
            var hotZones = yield zone.getHotZones();
            expect(hotZones).not.to.be(null);
            Object.prototype.toString.call(hotZones).should.equal('[object Array]');
            hotZones.length.should.greaterThan(10);
            done();
        });
    });
});
