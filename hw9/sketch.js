var sfx;

function preload() {
  ballSfx = loadSound('sfx/bounce.wav');
  blipSfx = loadSound('sfx/blip.wav');
  starSfx = loadSound('sfx/starSound.wav');
  blip2Sfx = loadSound('sfx/blip2.wav');
}

function setup() {
  createCanvas(500,500)
  soundSequencer = new SoundSequencer(blipSfx, starSfx);
  xShape = new HorizontalBall(250, 120, 5, 50, ballSfx);
  yShape = new VerticalBall(250, 120, 5, 50, ballSfx);
  star = new Star(150, 220, 80, starSfx);
  xShape2 = new HorizontalBall(250, 350, 15, 40, starSfx);
}

function draw() {
  background(0);
  xShape.animate();
  yShape.animate();
  star.animate();
  xShape2.animate();

  soundSequencer.sequenceSound(xShape, yShape);
  //soundSequencer.sequenceSound(xShape, star);
  //soundSequencer.sequenceSound(yShape, star);
  soundSequencer.sequenceSound(xShape2, yShape);
}

function SoundSequencer(blipSfx, starSfx) {
  this.blipSfx = blipSfx;
  this.starSfx = starSfx;

  this.sequenceSound = function(obj1, obj2) {
    if (obj1.type == "XBALL" && obj2.type == "YBALL") {
      if(obj1.x == obj2.x && obj1.y == obj2.y) {
        if(this.blipSfx.isPlaying()) {
          this.blipSfx.stop();
        }
        this.blipSfx.play();
      }
    }
    else if ((obj1.type == "XBALL" || obj1.type == "YBALL") && obj2.type == "STAR") {
      obj2.currentStarPoints.forEach(collidingWithStarSound);

      function collidingWithStarSound(starCoords, idx) {
        if(ballCollidingWithStar(obj1, starCoords)) {
          if(this.starSfx.isPlaying()) {
            this.starSfx.stop();
          }
          this.starSfx.play();
        }
      }

      function ballCollidingWithStar(ballObj, starCoords) {
        var ballEdge = ballObj.size / 2;
        return (ballObj.x - ballEdge < starCoords.x && ballObj.x + ballEdge > starCoords.x 
          && ballObj.y - ballEdge < starCoords.y && ballObj.y + ballEdge > starCoords.y);
      }
    }
  }
}

function HorizontalBall(xPos, yPos, myXVel, mySize, mySfx) {
  this.x = xPos;
  this.y = yPos;
  this.xVel = myXVel;
  this.size = mySize;
  this.color = color(random(255), random(255), random(255))
  this.sfx = mySfx;
  this.type = "XBALL"

  this.playSound = function() {
    if(this.sfx.isPlaying()) {
      this.sfx.stop();
    }
    this.sfx.play();
  }

  this.animate = function() {
    this.x = this.x + this.xVel;

    if(this.x > width || this.x < 0) {
      this.xVel *= -1;
      this.playSound();
    }

    this.display();
  }

  this.display = function() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

function VerticalBall(xPos, yPos, myYVel, mySize, mySfx) {
  this.x = xPos;
  this.y = yPos;
  this.yVel = myYVel;
  this.size = mySize;
  this.color = color(random(255), random(255), random(255))
  this.sfx = mySfx;
  this.type = "YBALL"

  this.playSound = function() {
    if(this.sfx.isPlaying()) {
      this.sfx.stop();
    }
    this.sfx.play();
  }

  this.animate = function() {
    this.y = this.y + this.yVel;

    if (this.y > height || this.y < 0) {
      this.yVel *= -1;
      this.playSound();
    }

    this.display();
  }

  this.display = function() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

function Star(xPos, yPos, mySize, mySfx) {
  this.x = xPos;
  this.y = yPos;
  this.size = mySize;
  this.color = color(random(255), random(255), random(255))
  this.sfx = mySfx;
  this.type = "STAR"
  this.angle = TWO_PI/5;
  this.halfAngle = this.angle / 2;
  this.currentStarPoints = [];

  this.playSound = function() {
    if(this.sfx.isPlaying()) {
      this.sfx.stop();
    }
    this.sfx.play();
  }

  this.animate = function() {
    push();
    translate(this.x, this.y);
    rotate(frameCount / 50);
    this.display();
    pop();
  }

  this.display = function() {
    noStroke();
    fill(this.color);
    // Reset star points
    this.currentStarPoints = [];
    beginShape();
    for (a = 0; a < TWO_PI; a += this.angle) {
      // Outer star points
      sx = cos(a) * 100;
      sy = sin(a) * 100;
      vertex(sx, sy);
      // Push outer star points to array for sound sequencing
      this.currentStarPoints.push({'x': sx, 'y': sy});

      // Inner star points
      sx = cos(a+this.halfAngle) * 40;
      sy = sin(a+this.halfAngle) * 40;
      vertex(sx, sy);
    }
    endShape();
  }
}
