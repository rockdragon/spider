var interval = 1000;
var livingSeconds = 5;
var stoppedTime = null;

function heartbeat() {
    var msg = 'child-process is working';
    process.send({category: 'heartbeat', 'message': msg});
    if (new Date() < stoppedTime)
        beatLoop();
    else
        stop();
}
function beatLoop() {
    setTimeout(heartbeat, interval);
}

function stop(){
    process.send({category: 'stop'});
}

function work() {
    stoppedTime =  new Date(new Date().getTime() + livingSeconds * 1000);
    beatLoop();
}

work();