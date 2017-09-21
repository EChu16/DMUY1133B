class TetrisTCube extends TetrisPiece{
  int xPos, yPos;
  boolean active = true;
  TetrisTCube(int x, int y) {
    xPos = x;
    yPos = y;
  }
  
  void renderTCube(int pointX, int pointY) {
    stroke(0, 0, 0);
    fill(202, 71, 224);
    
    rect(pointX - (2 * CUBE_SIZE), pointY, CUBE_SIZE, CUBE_SIZE);
    rect(pointX - CUBE_SIZE, pointY - CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
    rect(pointX - CUBE_SIZE, pointY, CUBE_SIZE, CUBE_SIZE);
    rect(pointX, pointY, CUBE_SIZE, CUBE_SIZE);
  }
    
  void update() {
    renderTCube(xPos, yPos);
    int nextYPos = yPos + CUBE_SIZE;
    if (nextYPos >= GRID_BOTTOM_BOUNDARY) {
      active = false;
    }
    if(active) {
      yPos += CUBE_SIZE;
    }
  }
}