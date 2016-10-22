var sumo = require('node-sumo');

var drone = sumo.createClient({ip: '192.168.1.1'});

var step=0;

drone.connect(function() {
    console.log('Connected');
    drone.postureJumper();

    var interval = setInterval(function() {
        step++;
        if(step%2==0) drone.right(50);
        else drone.left(50);
        setTimeout(function() {
            drone.forward(10);
        }, 315);
    }, 2200);

    setTimeout(function() {
        clearInterval(interval);
        drone.stop();
    }, 20000);
});
