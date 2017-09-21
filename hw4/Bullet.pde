class Bullet {
  float xPos, yPos;
  float middle;
  float speed = 10;
  boolean dead = false;
  float movementAmt, distance;
  float leftX, rightX;
  
  Bullet(float x, float y) {
    xPos = x;
    yPos = y - 30;
    middle = xPos + 5;
  }
  
  void move() {
    if (!this.dead) {
      if (yPos <= GRID_UPPER_BOUNDARY) {
        this.dead = true;
      }
      yPos -= speed;
      if (collidingWithMonster()) {
        this.dead = true; 
      }
    } else {
      allBullets.remove(this);
    }
  }
  
  boolean collidingWithMonster() {    
    for (int i = 0; i< allMonsters.size(); i++) {
      distance = sqrt(sq(middle - allMonsters.get(i).xPos) + sq(yPos - allMonsters.get(i).yPos));
      if (distance <= allMonsters.get(i).ellipseSize) {
        allMonsters.get(i).dead = true;
        allMonsters.remove(allMonsters.get(i));
        monstersKilled += 1;
        return true;
      }
    }
    return false;
  }
  
  void renderShape() {
    fill(255,255,255);
    rect(xPos, yPos, 10, 30);
  }
  
  void update() {
    move();
    if(!this.dead) {
      renderShape();
    }
  }
}