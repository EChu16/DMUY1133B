class TetrisSCube extends TetrisPiece {
  TetrisSCube(int x, int y) {
    xPos = x;
    yPos = y;
  }
  
  void renderSCube(int pointX, int pointY) {
    stroke(0, 0, 0);
    fill(164, 232, 84);
    
    rect(pointX - (2 * CUBE_SIZE), pointY, CUBE_SIZE, CUBE_SIZE);
    rect(pointX - CUBE_SIZE, pointY - CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
    rect(pointX - CUBE_SIZE, pointY, CUBE_SIZE, CUBE_SIZE);
    rect(pointX, pointY - CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
  }
    
  void update() {
    renderSCube(xPos, yPos);
    super.update();
  }
}