class TetrisInvertedSCube extends TetrisPiece {
  TetrisInvertedSCube(int x, int y) {
    xPos = x;
    yPos = y;
  }
  
  void renderInvertedSCube(int pointX, int pointY) {
    stroke(0, 0, 0);
    fill(244, 67, 54);
    
    rect(pointX - CUBE_SIZE, pointY, CUBE_SIZE, CUBE_SIZE);
    rect(pointX - CUBE_SIZE, pointY - CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
    rect(pointX - (2 * CUBE_SIZE), pointY - CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
    rect(pointX, pointY, CUBE_SIZE, CUBE_SIZE);
  }
    
  void update() {
    renderInvertedSCube(xPos, yPos);
    super.update();
  }
}