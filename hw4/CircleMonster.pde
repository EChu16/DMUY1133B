class CircleMonster {
  Player player;
  float xPos, yPos;
  float timePassed = 0;
  float timeDelay = random(5000, 50000);
  float speed = 10;
  boolean dead = false;
  float movementAmt;
  int direction = 1;
  int r =int(random(0, 250));
  int b = int(random(0, 250));
  int g = int(random(0, 250));
  
  int lives = int(random(1, 3));
  int ellipseSize = int(random(10, 30));
  
  CircleMonster(float x, float y, Player p) {
    xPos = x;
    yPos = y;
    player = p;
  }
  
  void move() {
    if (!this.dead) {
      if (timePassed >= timeDelay) {
        if (int(timeDelay %2) == 0) {
          direction *= -1;
        }
        timePassed = 0;
        timeDelay = random(5000, 50000);
      } else {
        timePassed += millis(); 
      }
      movementAmt = direction * speed;
      if (xPos + movementAmt >= GRID_LEFT_BOUNDARY && xPos + movementAmt <= GRID_RIGHT_BOUNDARY - 10) {
        xPos += movementAmt;
      } else {
        xPos -= movementAmt;
        direction *= -1;
      }
      yPos += speed;
    }  
  }
  
  void renderShape() {
    stroke(255, 255, 255);
    fill(r,g,b);
    ellipse(xPos, yPos, ellipseSize, ellipseSize);
  }
  
  boolean isHittingPlayer() {
      float distance = sqrt(sq(this.xPos - this.player.xPos + 20) + sq(this.yPos - this.player.yPos - 5));
      println(distance);
      if (distance <= this.ellipseSize) {
        return true;
      }
      return false;
  }
  
  void update() {
    if(!this.dead) {
      move();
      renderShape();
      if(this.isHittingPlayer()) {
        this.dead = true;
        this.player.lives -= 1;
      }
    }
  }
}