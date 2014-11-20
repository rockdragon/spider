var list = require('../spiders/58/list');
var co = require('co');
var expect = require('expect.js');
require('should');

describe('58 testing', function () {
    it('list testing', function (done) {
        co(function*() {
            var listPage = yield list.getHouses();
            expect(listPage).not.to.be(null);
            expect(listPage.houses).not.to.be(null);
            Object.prototype.toString.call(listPage.houses).should.equal('[object Array]');
            listPage.houses.length.should.greaterThan(10);
            done();
        });
    });
});
