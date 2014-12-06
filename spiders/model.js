module.exports.House = House;
module.exports.listPage = listPage;
module.exports.HouseModel = HouseModel;

/*
 房模型
 @opt:{
 id             hash(source + '_' +  '35997962' or '20160857713541' or '53050553')
 province       '北京'
 city           '北京'
 zone           '北京 - 昌平 - 沙河镇'
 address        '东风北桥北，酒仙桥路甲12号'
 overview       '1室1厅2卫 76㎡ 商住两用 精装修 朝向西 2层/3层'
 furniture      '床 / 家具 / 煤气 / 暖气 / 宽带 / 电视 / 冰箱 / 洗衣机 / 热水器'
 phone          '15801429451'
 phonePic       图片<BLOB>
 title          '【21世纪官方推荐】3室2厅125平 出租,南北通透-整租'
 price          '15000元/月'
 payment        '押一付三' '季付' '半年付' '年付' '面议'
 publisher      '个人' '中介'
 contact        '郑小姐'
 thumbnail      图片<BLOB>
 href           'http://bj.58.com/hezu/19996422443272x.shtml'
 source         'ganji' '58' 'anjuke' 'soufun'
 publishDate    '2014/11/15'
 description    '...'
 longitude      '116.465118408203'   经度
 latitude       '39.9008178710938'   纬度
 cityId         '1'
 }
 */
function House(opt) {
    opt = opt || {};
    if (opt.id)this.id = opt.id;
    if (opt.province)this.province = opt.province;
    if (opt.city)this.city = opt.city;
    if (opt.zone)this.zone = opt.zone;
    if (opt.address)this.address = opt.address;
    if (opt.overview)this.overview = opt.overview;
    if (opt.furniture)this.furniture = opt.furniture;
    if (opt.phone)this.phone = opt.phone;
    if (opt.phonePic)this.phonePic = opt.phonePic;
    if (opt.title)this.title = opt.title;
    if (opt.price)this.price = opt.price;
    if (opt.payment)this.payment = opt.payment;
    if (opt.publisher)this.publisher = opt.publisher;
    if (opt.contact)this.contact = opt.contact;
    if (opt.thumbnail)this.thumbnail = opt.thumbnail;
    if (opt.href)this.href = opt.href;
    if (opt.source)this.source = opt.source;
    if (opt.publishDate)this.publishDate = opt.publishDate;
    if (opt.description)this.description = opt.description;
    if (opt.longitude)this.longitude = opt.longitude;
    if (opt.latitude)this.latitude = opt.latitude;
    if (opt.cityId)this.cityId = opt.cityId;
}

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

var Sequelize = require('sequelize')
    , sequelize = new Sequelize('mysql://root:system@127.0.0.1:3306/spider');
/*
 Data Model

 * 没有经纬度的不收录
 */
var HouseModel = sequelize.define('Houses', {
    id: {type: Sequelize.STRING, primaryKey: true, unique: true},
    province: {type: Sequelize.STRING},
    city: {type: Sequelize.STRING},
    zone: {type: Sequelize.STRING},
    address: {type: Sequelize.STRING},
    overview: {type: Sequelize.STRING},
    furniture: {type: Sequelize.STRING},
    phone: {type: Sequelize.STRING},
    phonePic: {type: Sequelize.BLOB},
    title: {type: Sequelize.STRING, allowNull: false},
    price: {type: Sequelize.DECIMAL, allowNull: false},
    payment: {type: Sequelize.STRING},
    publisher: {type: Sequelize.STRING},
    contact: {type: Sequelize.STRING},
    thumbnail: {type: Sequelize.BLOB},
    href: {type: Sequelize.STRING, allowNull: false},
    source: {type: Sequelize.STRING},
    publishDate: {type: Sequelize.DATE, allowNull: false},
    description: {type: Sequelize.STRING},
    longitude: {type: Sequelize.DECIMAL},
    latitude: {type: Sequelize.DECIMAL},
    cityId: {type: Sequelize.INTEGER}
}, {
    // add the timestamp attributes (updatedAt, createdAt)
    timestamps: true,

    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'Houses'
});

