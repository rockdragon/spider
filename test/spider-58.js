var list = require('../spiders/58/list');
var run = require('../modules/es6/container').run;

describe('58 testing', function () {
    it('list testing', function (done) {
        run(function*(cb) {
            var listPage = yield list.getHouses()(cb);
            expect(listPage).not.toBe(null);
            expect(listPage.houses).not.toBe(null);
            expect(listPage.houses.length).toBeGreaterThan(10);
            done();
        });
    });
});
