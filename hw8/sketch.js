var sfx;
var direction = 1;
var x = 400;
var y = 400;
var ballSize = 100;
var gravity = 9.8
var mass = 30;
var lastElapsedTime = 0;
var elapsedTime;
var velocity;
var ballColor;

function preload() {
	sfx = loadSound('bounce.wav');
}

function setup() {
  	createCanvas(800, 800);
    changeBallColor();
}

function drawBall(x, y, ballSize) {
  fill(ballColor);
  noStroke();
  ellipse(x, y, ballSize, ballSize);
}

function playSound(argument) {
  if(sfx.isPlaying()) {
    sfx.stop();
  }
  sfx.play();
}

function changeBallColor() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  ballColor = color(r,g,b);
}

function draw() {
  background(230, 230, 230);
  elapsedTime = (millis() - lastElapsedTime) / 1000;
  lastElapsedTime = millis();
  velocity = mass * gravity * elapsedTime;
  if (y + 50 >= 800) {
    direction = -1;
    playSound();
    changeBallColor();
  } else if (y - 50 <= 300) {
    direction = 1
  }
  y += velocity * direction;
  drawBall(x, y, 100)
}