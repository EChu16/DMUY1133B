class Player {
  float xPos, yPos;
  float timePassed = 0;
  float shootDelay = 150;
  float lastTime = millis();
  float direction = 0;
  float speed = 8;
  boolean dead = false;
  float movementAmt;
  int lives = 3;
  
  Player(int x, int y) {
    xPos = x;
    yPos = y;
  }
  
  void move(boolean leftPressed, boolean rightPressed) {
    if (!this.dead) {
      if (leftPressed && rightPressed) {
        direction = 0;
      } else if (leftPressed) {
        direction = -1;
      } else if (rightPressed) {
        direction = 1;
      } else {
        direction = 0; 
      }
      movementAmt = direction * speed;
      if (xPos + movementAmt >= GRID_LEFT_BOUNDARY && xPos + movementAmt + 40 <= GRID_RIGHT_BOUNDARY) {
        xPos += movementAmt;
      }
    }  
  }
  
  void renderPlayer() {
    fill(255, 255, 255);
    triangle(xPos, yPos, xPos + 20, yPos - 20, xPos + 40, yPos);
  }
  
  void shoot(boolean spacePressed) {
    if (spacePressed && allBullets.size() < 10) {
      if (timePassed >= shootDelay) {
        allBullets.add(new Bullet(xPos + 20, yPos - 40));
        timePassed = 0;
      } else {
        timePassed += millis() - lastTime;
      }
    }
  }
  
  boolean isDead() {
    return this.lives == 0;
  }
  
  void update(boolean leftPressed, boolean rightPressed, boolean spacePressed) {
    move(leftPressed, rightPressed);
    shoot(spacePressed);
    if(!this.isDead()) {
      this.renderPlayer();
      lastTime = millis();
    }
  }
}