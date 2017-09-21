class TetrisLCube extends TetrisPiece {
  TetrisLCube(int x, int y) {
    xPos = x;
    yPos = y;
  }
  
  void renderLCube(int pointX, int pointY) {
    stroke(0, 0, 0);
    fill(240, 160, 39);
    
    rect(pointX - CUBE_SIZE, pointY, CUBE_SIZE, CUBE_SIZE);
    rect(pointX - (2 * CUBE_SIZE), pointY, CUBE_SIZE, CUBE_SIZE);
    rect(pointX, pointY - CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
    rect(pointX, pointY, CUBE_SIZE, CUBE_SIZE);

  
}

  void update() {
    renderLCube(xPos, yPos);
    super.update();
  }
}