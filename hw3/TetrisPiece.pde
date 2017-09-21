class TetrisPiece {
  int xPos, yPos;
  int timePassed = 0;
  int timeDelay = 10000;
  boolean active = true;
  
  void moveLeft() {
    if (this.active) {
      int nextXPos = xPos - CUBE_SIZE;
      if (nextXPos >= GRID_LEFT_BOUNDARY) {
        this.xPos = nextXPos;
      }
    }  
  }
  
  void moveRight() {
    if (this.active) {
      int nextXPos = xPos + CUBE_SIZE;
      if (nextXPos <= GRID_RIGHT_BOUNDARY) {
        this.xPos = nextXPos;
      }
    }
  }
  
  void softDrop() {
    this.timeDelay = 5000;
  }
  
  void normalDrop() {
    this.timeDelay = 10000;
  }
  
  void update() {
    if(this.active) {
      if (this.timePassed >= this.timeDelay) {
        int nextYPos = yPos + CUBE_SIZE;
        if (nextYPos >= GRID_BOTTOM_BOUNDARY) {
          this.active = false;
        } else {
          this.yPos += CUBE_SIZE;
        }
        this.timePassed = 0;
      } else {
        this.timePassed += millis();
      }
    } else {
      activePiece = null;
    }
 }
}