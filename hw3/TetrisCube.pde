class TetrisCube extends TetrisPiece{
  TetrisCube(int x, int y) {
    xPos = x;
    yPos = y;
  }
  
  void renderCube(int pointX, int pointY) {
    stroke(0, 0, 0);
    fill(240, 240, 0);
    
    rect(pointX - CUBE_SIZE, pointY - CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
    rect(pointX - CUBE_SIZE, pointY, CUBE_SIZE, CUBE_SIZE);
    rect(pointX, pointY - CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
    rect(pointX, pointY, CUBE_SIZE, CUBE_SIZE);
  }
    
  void update() {
    renderCube(xPos, yPos);
    super.update();
  }
}