var Houses = require('../spiders/58/houses');
var HotZone = require('../spiders/58/hotZone');
var co = require('co');
var expect = require('expect.js');
require('should');
var configUtils = require('../modules/config/configUtils'),
    config = configUtils.getConfigs();

describe('58 testing', function () {
    it('houses testing', function (done) {
        co(function*() {
            if(!config)
                done();
            var h = new Houses('http://tj.58.com/chuzu/0/');
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
            if(!config)
                done();
            var zone = new HotZone('http://cq.58.com/chuzu/0/');
            var hotZones = yield zone.getHotZones();
            expect(hotZones).not.to.be(null);
            Object.prototype.toString.call(hotZones).should.equal('[object Array]');
            hotZones.length.should.greaterThan(10);
            done();
        });
    });
});
