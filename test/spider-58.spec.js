var list = require('../spiders/58/list');
var run = require('../modules/es6/container').run;
var expect = require('expect.js');
require('should');

describe('58 testing', function () {
    it('list testing', function (done) {
        run(function*(cb) {
            var listPage = yield list.getHouses()(cb);
            expect(listPage).not.to.be.null;
            expect(listPage.houses).not.to.be.null;
            Object.prototype.toString.call(listPage.houses).should.equal('[object Array]');
            listPage.houses.length.should.greaterThan(10);
            done();
        });
    });
});
