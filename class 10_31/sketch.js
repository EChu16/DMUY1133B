var sfx;

function preload() {
  sfx = loadSound('bounce.wav');
}

function setup() {
  createCanvas(500,500)
  myShape = new Shape(250, 120, 5, 5, 12, sfx);
  myShape1 = new Shape(100, 280, 6, 8, 20, sfx);
  myShape2 = new Shape(400, 100, 3, 10, 15, sfx);
}

function draw() {
  background(200);
  myShape.animate();
  myShape.display();
  myShape1.animate();
  myShape1.display();
  myShape2.animate();
  myShape2.display();
}

function keyPressed() {

}

function Shape(xPos, yPos, myXVel, myYVel, mySize, mySfx) {
  this.x = xPos;
  this.y = yPos;
  this.xVel = myXVel;
  this.yVel = myYVel;
  this.size = mySize;
  this.color = color(random(255), random(255), random(255))


  this.playSound = function() {
    if(sfx.isPlaying()) {
      sfx.stop();
    }
    sfx.play();
  }

  this.animate = function() {
    this.x = this.x + this.xVel;
    this.y = this.y + this.yVel;

    if(this.x > width || this.x < 0) {
      this.xVel *= -1;
      this.playSound();
    }

    if (this.y > height || this.y < 0) {
      this.yVel *= -1;
      this.playSound();
    }
  }

  this.display = function() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
}