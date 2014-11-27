module.exports.sleep = function(seconds){
    var stopped = new Date(new Date().getTime() + seconds * 1000);
    while(new Date() < stopped){
        ;
    }
};
