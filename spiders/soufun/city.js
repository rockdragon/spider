var util = require('util');
var co = require('co');
var _ = require('underscore');

var model = require('../model');
var HotCity = require('../hotCity');
var HotZone = require('./hotZone');
var Houses = require('./houses');
var log = require('../biz').log;
var sleep = require('../biz').sleep;

module.exports.fetchCities = fetchCities;
function* fetchCities () {
    var cities = HotCity['soufun'];

    for (var i = 0, len = cities.length; i < len; i++) {
        var city = cities[i];
        try {
            var zones = yield new HotZone(city).getHotZones();
            sleep(10);
            //name=安贞出租, href=http://bj.58.com/anzhenqiao/chuzu/
            for (var j = 0, len2 = zones.length; j < len2; j++) {
                var zone = zones[j];
                log(util.format('%s --------- BEGIN',zone.name));

                var houses = yield new Houses(zone.href).getHouses();
                log(houses);

                log(util.format('%s --------- END',zone.name));
                log('\r\n');
                sleep(10);
            }
        } catch (e) {
            log(util.format('%s: ---------ERROR', city));
            log(e.stack);
        }
    }
}
