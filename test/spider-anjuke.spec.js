var Houses = require('../spiders/anjuke/houses');
var HotZone = require('../spiders/anjuke/hotZone');
var co = require('co');
var expect = require('expect.js');
require('should');
var configUtils = require('../modules/config/configUtils'),
    config = configUtils.getConfigs();

describe('anjuke testing', function () {
    it('houses testing', function (done) {
        co(function*() {
            if(!config)
                done();
            var h = new Houses('http://sh.zu.anjuke.com/fangyuan/l2/');
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
            var zone = new HotZone('http://sz.zu.anjuke.com/fangyuan/l2/');
            var hotZones = yield zone.getHotZones();
            expect(hotZones).not.to.be(null);
            Object.prototype.toString.call(hotZones).should.equal('[object Array]');
            hotZones.length.should.greaterThan(10);
            done();
        });
    });
});
