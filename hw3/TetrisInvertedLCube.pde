class TetrisInvertedLCube extends TetrisPiece {
  TetrisInvertedLCube(int x, int y) {
    xPos = x;
    yPos = y;
  }
  
  void renderInvertedLCube(int pointX, int pointY) {
    stroke(0, 0, 0);
    fill(30, 144, 255);
    
    rect(pointX - CUBE_SIZE, pointY, CUBE_SIZE, CUBE_SIZE);
    rect(pointX - (2 * CUBE_SIZE), pointY, CUBE_SIZE, CUBE_SIZE);
    rect(pointX - (2 * CUBE_SIZE), pointY - CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
    rect(pointX, pointY, CUBE_SIZE, CUBE_SIZE);
  }
    
  void update() {
    renderInvertedLCube(xPos, yPos);
    super.update();
  }
}