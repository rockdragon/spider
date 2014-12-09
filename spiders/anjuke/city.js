var util = require('util');
var co = require('co');
var _ = require('underscore');

var model = require('../model');
var HotCity = require('../hotCity');
var HotZone = require('./hotZone');
var Houses = require('./houses');
var Detail = require('./Detail');
var log = require('../biz').log;

var getRootURL = require('../../modules/other/pathUtils').getRootURL;
var extractImgSrc = require('../biz').extractImgSrc;
var extractRequestHref = require('../biz').extractRequestHref;
var download2Buffer = require('../biz').download2Buffer;
var sleep = require('../biz').sleep;
var getURL = require('../biz').getURL;
var onSuccess = require('../biz').onSuccess;
var onError = require('../biz').onError;

module.exports.fetchCities = fetchCities;
function* fetchCities (sleepSeconds) {
    var cities = HotCity['anjuke'];

    for (var i = 0, len = cities.length; i < len; i++) {
        var city = cities[i];
        try {
            var zones = yield new HotZone(city).getHotZones();
            sleep(sleepSeconds);
            //name=安贞出租, href=http://bj.58.com/anzhenqiao/chuzu/
            for (var j = 0, len2 = zones.length; j < len2; j++) {
                var zone = zones[j];
                //log(util.format('%s --------- BEGIN',zone.name));

                var listPage = yield new Houses(zone.href).getHouses();
                for (var k = 0, len3 = listPage.houses.length; k < len3; k++) {
                    var href = listPage.houses[k].href;
                    var house = yield new Detail(href).getDetail();

                    if (house.phoneURL) {
                        var phoneJSON = yield getURL(house.phoneURL);
                        house.phoneURL = extractImgSrc(phoneJSON);
                        house.phonePic = yield download2Buffer(house.phoneURL, house.href);
                        delete house.phoneURL;
                    }
                    if (house.housePics) {
                        //'http://xx.com/tiny/n_t009ef5c407ad080034589.jpg,http://xx.cn/p1/tiny/n_t009eadb5f17458003456c.jpg'
                        var pics = house.housePics.split(',');
                        house.housePics = [];
                        for (var l = 0, len4 = pics.length; l < len4; l++) {
                            var blob = yield download2Buffer(pics[l], house.href);
                            house.housePics.push({housePic: blob});
                            sleep(sleepSeconds);
                        }
                    }
                    console.log(house);

                    yield model.synchronize();
                    onSuccess('synchronization successfully.');

                    yield model.bulkCreate(house);
                    onSuccess('creation successfully.');

                    sleep(sleepSeconds);
                }

                //log(util.format('%s --------- END',zone.name));
                //log('\r\n');
                sleep(sleepSeconds);
            }
        } catch (e) {
            log(util.format('%s: ---------ERROR', city));
            log(e.stack);
        }
    }
}
