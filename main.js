objects = [];
status = "";

function preload() {
    sound = loadSound("Emergency_Sound.mp3");
}

function setup() {
    canvas = createCanvas(500,500);
    canvas.position(720, 250);

    video = createCapture(VIDEO);
    video.hide();

    detector = ml5.objectDetector("cocossd", modelLoaded);
}

function draw() {
        image(video, 0, 0, 500, 500);

        if (status != "") {
            detector.detect(video, gotResult);

            if (objects.length == 0) {
                document.getElementById("findBaby").innerHTML = "Baby Not Found";
                playMusic();
            }

            for ( i = 0; i < objects.length; i++) {
                myText = objects[i].label + ": " + Math.floor(objects[i].confidence * 100);
                myX = objects[i].x;
                myY = objects[i].y;
                myWidth = objects[i].width;
                myHeight = objects[i].height;

                r = random(255);
                g = random(255);
                b = random(255);

                fill(r, g, b)
                stroke("Red");
                text(myText, myX, myY)
                textSize(30);

                stroke("Blue");
                noFill();
                rect(myX, myY, myWidth, myHeight)

                document.getElementById("status").innerHTML = "Status: Object Detected";

                if (objects[i].label == "person") {
                    document.getElementById("findBaby").innerHTML = "Baby Found";
                    stopMusic();
                }

                if (objects[i].label != "person") {
                    document.getElementById("findBaby").innerHTML = "Baby Not Found";
                    playMusic();
                }
            }
        }
}

function modelLoaded() {
    console.log("Your Model Is Loaded");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        objects = results;
        console.log(results);
    }
}

function playMusic() {
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}

function stopMusic() {
    sound.stop();
    sound.setVolume(1);
    sound.rate(1);
}