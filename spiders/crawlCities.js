var util = require('util');
var co = require('co');
var _ = require('underscore');
var _s = require('underscore.string');
var resolve = require('url').resolve;

var model = require('./model');
var log = require('./biz').log;

var getRootURL = require('../modules/other/pathUtils').getRootURL;
var readFile = require('../modules/other/pathUtils').readFile;
var getAbsolutePath = require('../modules/other/pathUtils').getAbsolutePath;
var extractImgSrc = require('./biz').extractImgSrc;
var extractRequestHref = require('./biz').extractRequestHref;
var download2Buffer = require('./biz').download2Buffer;
var sleep = require('./biz').sleep;
var getURL = require('./biz').getURL;
var onSuccess = require('./biz').onSuccess;
var onError = require('./biz').onError;

/*
 * @site 站点
 * @sleepSeconds 休眠秒数
 * */
module.exports.fetchCities = fetchCities;
function* fetchCities(site) {
    var hotCities = JSON.parse(yield readFile(getAbsolutePath('spiders/hotCities.json')));
    var cities = hotCities[site].cities;
    var sleepSeconds = hotCities[site].sleepSeconds;
    var HotZone = require(getAbsolutePath('spiders/' + site + '/hotZone'));
    var Houses = require(getAbsolutePath('spiders/' + site + '/houses'));
    var Detail = require(getAbsolutePath('spiders/' + site + '/detail'));

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
                    if(!_s.startsWith(href, 'http'))
                        href = resolve(getRootURL(city), href);
                    var detail = new Detail(href);
                    var house = yield detail.getDetail();

                    yield co(detail.moreDetail(house));

                    console.log(house);

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

//co(fetchCities(10));
