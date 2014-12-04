var crawlPage = require('../biz').crawlPage;
var model = require('../model');
var co = require('co');
var cheerio = require('cheerio');
var _ = require('underscore');
var _s = require('underscore.string');
var resolve = require('url').resolve;
var getRootURL = require('../../modules/other/pathUtils').getRootURL;
var extractImgSrc = require('../biz').extractImgSrc;
var extractRequestHref = require('../biz').extractRequestHref;
var download2Buffer = require('../biz').download2Buffer;
var getURL = require('../biz').getURL;
var ent = require('ent');
var bravo = require('bravo');
var path = require('path');
var moment = require('moment');
var util = require('util');

/*
 详情
 * */
module.exports = Detail;
function Detail(url) {
    this.url = url;
}

/*
 crawl detail page
 * */
Detail.prototype.getDetail = function () {
    var boundParse = parse.bind(this);
    return crawlPage(this.url, boundParse);
};

/*
 * parse houses
 * */
function parse(fn) {
    var url = this.url;
    return function (err, res, html) {
        //var $ = cheerio.load(html, {
        //    normalizeWhitespace: true,
        //    xmlMode: true
        //});

        //collect page info
        var jsonFile = path.join(process.cwd(), 'detail.json');
        var house = bravo.Parse(jsonFile, html);
        house.source = '58';
        house.href = extractRequestHref(res.request.uri.href, res.request.uri.search);

        if (_s.contains(house.publishDate, '<script>')) {
            house.publishDate = new Date();
            house.publisher = '中介';
        }
        else {
            house.publishDate = moment(house.publishDate).toDate();
            house.publisher = '个人';
        }
        house.overview = ent.decode(house.overview);
        house.zone = house.zone.trim();
        if (!house.furniture)
            house.furniture = '床,衣柜,沙发,电视,冰箱,洗衣机,空调,热水器,宽带,暖气';

        if (house.publisher === '个人') {
            //个人Phone分两步走:获取JSON,提取图片；下载图片
            house.phoneURL = util.format('http://yuzufang.house.58.com/common/getinfophonebyauth?infoid=%s&cityId=%s',
                house.id, house.cityid);
            delete house.cityid;
        }
        fn(err, house);
    };
}

co(function*() {
    var d = new Detail('http://jing.58.com/adJump?adType=3&target=pZwY0jCfsvFJsWN3shPfUiqlIyu6Uh0fnWTQPWT3PH0LnHndPj73sMPCIAd_sjT8nHnznHTdrHDQn1c3nHTYP1bYnjbOrjE1nHnLnj9OPHE3nzkQrjnvn1mYrik_FhQfuvIGU-qd0vRzgv-b5HThuA-107qWmgw-5H9huA-107q_UvP6UjYQnHEzFhP_pyR8I7qd0vRzgv-b5iu-UMwGIZ-GujYznjDvnj9dP10Qn1NYniud0vRzpyEqnW01njb1nHDhpyd-pHYhuyOYpgwOIZ-kuHYkFhR8IA-YXRqWmgw-5iu-UMwGIZ-xUAqWmykqFhwG0LKxIA-VuHYQPjDLPHDznWT3PjcdFMKf0v-Ypyq85HEOFhP_pyPopyEqujIBnhFhuHnVPHcOuBYYujn1syD3nW0VP1nYPhcvnvNYPvEvFMK60h7V5iukUA7YuhqzUHYVnE&end=end');
    //var d = new Detail('http://cd.58.com/zufang/20059098777351x.shtml');
    //var d = new Detail('http://bj.58.com/zufang/20114437262986x.shtml');
    //var d = new Detail('http://bj.58.com/zufang/19562028299138x.shtml');
    var house = yield d.getDetail();
    if (house.phoneURL) {
        var phoneJSON = yield getURL(house.phoneURL);
        house.phoneURL = extractImgSrc(phoneJSON);
        house.phonePic = yield download2Buffer(house.phoneURL, house.href);
        delete house.phoneURL;
    }
    console.log(house);
});