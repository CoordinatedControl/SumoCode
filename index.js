var sumo = require('node-sumo');

var drone = sumo.createClient({ ip: '192.168.1.30' });

drone.connect(function() {
    console.log('Connected');
    drone.postureJumper();

    /*    var interval = setInterval(function() {
            drone.left(50);
            setTimeout(function() {
                drone.forward(10);
            }, 315);
        }, 2200);*/
/*    function findSignal(x1, y1, x2, y2) {
        return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
    }*/

/*    var targetX=3;
    var targetY=2;
    var x=0;
    var y=0;*/
    var list = [5,4,3,9,10,20,2,0];


    var oldSignal=list[0];

    var forwardTime=1900;
    var forwardSpeed=10;

    var turnTime=315;
    var turnSpeed=50;

    var moveRight=false;
    var moveLeft=false;

    var step=0;

    var interval = setInterval(function() {
/*        console.log(x);
        console.log(y);
        console.log(targetX);
        console.log(targetY);
        console.log('---');
*/      

        drone.forward(forwardSpeed);
        console.log('\nfwd');
        step++;

        //var signal = findSignal(x,y,targetX,targetY);
        var signal = list[step];


        if (signal == 0) {
            // what to do.
            // found the target, so stop
            drone.stop();
            clearInterval(interval);
            console.log("found");
        } else if (signal > oldSignal) {
            if (moveRight == false) {

                drone.backward(forwardSpeed);

                setTimeout(function() {
                    drone.right(turnSpeed);
                    moveRight = true;

                    setTimeout(function() {
                        drone.stop();
                    }, turnTime);
                }, forwardTime);
                
                console.log('right');
                //x++;

            } else if (moveLeft == false) {

                drone.backward(forwardSpeed);

                setTimeout(function() {
                    drone.left(turnSpeed);
                    //drone.left(turnSpeed);
                    moveLeft = true;

                    setTimeout(function() {
                        drone.stop();
                    }, 2*turnTime);
                }, forwardTime);
                
                console.log('left');
                //x--;

            } else if (moveRight == true && moveLeft == true) {

                drone.backward(forwardSpeed);

                setTimeout(function() {
                    drone.left(turnSpeed);
                    moveLeft = true;

                    setTimeout(function() {
                        drone.stop();
                    }, turnTime);
                }, forwardTime);
                
                console.log('bck');
                //y--;
            }
        } else if (signal < oldSignal) {
            moveRight = false;
            moveLeft = false;

            //y++;
        }

        oldSignal = signal;
    }, 2*forwardTime+2*turnTime+1000);







    /*setTimeout(function() {
        clearInterval(interval);
        drone.stop();
    }, 20000);*/
});
