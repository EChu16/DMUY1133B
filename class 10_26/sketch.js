var loopMode = "sustain";
var sfx;	

function preload() {
	sfx = loadSound('waterfall.mp3');
}

function setup() {
  	createCanvas(800, 800);
  	background(230, 230, 230);
  	sfx.playMode(loopMode);
  	sfx.play()
}

function keyPressed() {
  if (keyCode === 13) {
    if (loopMode == "sustain") {
    	loopMode = "restart";
    	sfx.playMode(loopMode);
    	console.log(loopMode);
    } else {
    	loopMode = "sustain";
    	sfx.playMode(loopMode);
    	console.log(loopMode);
    }
  }
}