/*
 @opt:{
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
 phone          '15801429451' or 'http://bj.ganji.com/tel_img/?c=UdxKaqrVYooZg055sS0ramfjr968g__PtQyV'
 title          '【21世纪官方推荐】3室2厅125平 出租,南北通透-整租'
 price          '15000元/月'
 }
 */
function house(opt) {
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
}