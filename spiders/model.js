module.exports.house = house;
module.exports.listPage = listPage;
/*
 房模型
 @opt:{
 id             hash('5820038458323847x' or 'fang3/1268317789x')
 province       '北京'
 city           '北京'
 district       '朝阳'
 bizDistrict    '望京'
 building       '丽都水岸'
 address        '东风北桥北，酒仙桥路甲12号'
 houseType      '3室2厅'
 area           '180㎡'
 floor          '15/23层'
 orientation    '朝南北'
 fitment        '精装修'
 phone          '15801429451'
 phonePic       'http://bj.ganji.com/tel_img/?c=UdxKaqrVYooZg055sS0ramfjr968g__PtQyV'
 title          '【21世纪官方推荐】3室2厅125平 出租,南北通透-整租'
 price          '15000元/月'
 publisher      '个人'
 thumbnail      'http://pic4.58cdn.com.cn/p1/tiny/n_s02512217763172548164.jpg'
 href           'http://bj.58.com/hezu/19996422443272x.shtml'
 category       '[整租]' '[单间]'
 convenience    '距10号线芍药居站约392米'
 source         'ganji' '58' 'anjuke' 'soufun'
 publishDate    '2014/11/15'
 }
 */
function house(opt) {
    opt = opt || {};
    if (opt.id)this.id = opt.id;
    if (opt.province)this.province = opt.province;
    if (opt.city)this.city = opt.city;
    if (opt.district)this.district = opt.district;
    if (opt.bizDistrict)this.bizDistrict = opt.bizDistrict;
    if (opt.building)this.building = opt.building;
    if (opt.address)this.address = opt.address;
    if (opt.houseType)this.houseType = opt.houseType;
    if (opt.area)this.area = opt.area;
    if (opt.floor)this.floor = opt.floor;
    if (opt.orientation)this.orientation = opt.orientation;
    if (opt.fitment)this.fitment = opt.fitment;
    if (opt.phone)this.phone = opt.phone;
    if (opt.title)this.title = opt.title;
    if (opt.price)this.price = opt.price;
    if (opt.publisher)this.publisher = opt.publisher;
    if (opt.thumbnail)this.thumbnail = opt.thumbnail;
    if (opt.href)this.href = opt.href;
    if (opt.category)this.category = opt.category;
    if (opt.convenience)this.convenience = opt.convenience;
    if (opt.source)this.source = opt.source;
    if (opt.publishDate)this.publishDate = opt.publishDate;
}

var Sequelize = require('sequelize')
    , sequelize = new Sequelize('mysql://root:system@127.0.0.1:3306/spider');

var House = sequelize.define('house', {
    id          : {type: Sequelize.STRING, primaryKey: true, unique: true},
    province    : {type: Sequelize.STRING},
    city        : {type: Sequelize.STRING},
    district    : {type: Sequelize.STRING},
    bizDistrict : {type: Sequelize.STRING},
    building    : {type: Sequelize.STRING},
    address     : {type: Sequelize.STRING},
    houseType   : {type: Sequelize.STRING},
    area        : {type: Sequelize.STRING},
    floor       : {type: Sequelize.STRING},
    orientation : {type: Sequelize.STRING},
    fitment     : {type: Sequelize.STRING},
    phone       : {type: Sequelize.STRING},
    phonePic    : {type: Sequelize.BLOB},
    title       : {type: Sequelize.STRING, allowNull: false},
    price       : {type: Sequelize.DECIMAL, allowNull: false},
    publisher   : {type: Sequelize.STRING},
    thumbnail   : {type: Sequelize.BLOB},
    href        : {type: Sequelize.STRING, allowNull: false},
    category    : {type: Sequelize.STRING},
    convenience : {type: Sequelize.STRING},
    source      : {type: Sequelize.STRING},
    publishDate : {type: Sequelize.DATE, allowNull: false}
});

/*
 列表模块
 @opt{
 url:       http://zu.fang.com/house/list/
 houses:    [house, house, ...]
 pages:     ['http://zu.fang.com/house/list/i32/', 'http://zu.fang.com/house/list/i33/', ...]
 }
 */
function listPage(opt) {
    opt = opt || {};
    if (opt.url)this.url = opt.url;
    if (opt.houses)this.houses = opt.houses;
    if (opt.pages)this.pages = opt.pages;
}

