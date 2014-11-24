var interval = 1000;
var livingSeconds = 5;
var stoppedTime = new Date(new Date().getTime() + livingSeconds * 1000);

function heartbeat() {
    var msg = 'child-process is working';
    process.send({category: 'heartbeat', 'message': msg});
    if (new Date() < stoppedTime)
        beatLoop();
    else
        process.send({category: 'stop'});
}
function beatLoop() {
    setTimeout(heartbeat, interval);
}

function work() {
    beatLoop();
}

work();