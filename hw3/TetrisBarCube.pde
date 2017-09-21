class TetrisBarCube extends TetrisPiece {
  TetrisBarCube(int x, int y) {
    xPos = x;
    yPos = y;
  }
  
  void renderBarCube(int pointX, int pointY) {
    stroke(0, 0, 0);
    fill(187, 237, 255);
    
    rect(pointX - (2 * CUBE_SIZE), pointY, CUBE_SIZE, CUBE_SIZE);
    rect(pointX - CUBE_SIZE, pointY, CUBE_SIZE, CUBE_SIZE);
    rect(pointX + CUBE_SIZE, pointY, CUBE_SIZE, CUBE_SIZE);
    rect(pointX, pointY, CUBE_SIZE, CUBE_SIZE);
  }
    
  void update() {
    renderBarCube(xPos, yPos);
    super.update();
  }
}