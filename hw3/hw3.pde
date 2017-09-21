// GLOBAL VARIABLES
int CUBE_SIZE = 40;
int GRID_WIDTH = 400;
int GRID_HEIGHT = 800;
int GRID_PADDING = 10;
int GRID_LEFT_BOUNDARY = GRID_PADDING;
int GRID_RIGHT_BOUNDARY = GRID_WIDTH + GRID_PADDING;
int GRID_UPPER_BOUNDARY = GRID_PADDING;
int GRID_BOTTOM_BOUNDARY = GRID_HEIGHT + GRID_PADDING;
int SPAWN_POINT_X = (GRID_WIDTH / 2) + GRID_PADDING;
int SPAWN_POINT_Y = GRID_PADDING;
int FRAME_RATE = 20;
boolean downPressed = false;
boolean isGameOver = false;

TetrisPiece[][] grid = new TetrisPiece[10][20];
TetrisPiece[] allPieces = new TetrisPiece[7];
TetrisPiece activePiece = null;

void setup() {
  size(600, 820);
  background(100);
  frameRate(FRAME_RATE);
  
  allPieces[0] = new TetrisCube(SPAWN_POINT_X, SPAWN_POINT_Y);
  allPieces[1] = new TetrisInvertedLCube(SPAWN_POINT_X, SPAWN_POINT_Y);
  allPieces[2] = new TetrisLCube(SPAWN_POINT_X, SPAWN_POINT_Y);
  allPieces[3] = new TetrisInvertedSCube(SPAWN_POINT_X, SPAWN_POINT_Y);
  allPieces[4] = new TetrisSCube(SPAWN_POINT_X, SPAWN_POINT_Y);
  allPieces[5] = new TetrisTCube(SPAWN_POINT_X, SPAWN_POINT_Y);
  allPieces[6] = new TetrisBarCube(SPAWN_POINT_X, SPAWN_POINT_Y);
}

void renderGridLines() {
  stroke(160,160,160);
  for(int x = GRID_PADDING + CUBE_SIZE; x <= GRID_RIGHT_BOUNDARY; x += CUBE_SIZE) {
    line(x, GRID_UPPER_BOUNDARY, x, GRID_BOTTOM_BOUNDARY);
  }
  for(int y = GRID_PADDING; y <= GRID_BOTTOM_BOUNDARY; y += CUBE_SIZE) {
    line(GRID_LEFT_BOUNDARY, y, GRID_RIGHT_BOUNDARY, y);
  }
}

void renderGrid() {
  fill(32,36,51);
  rect(GRID_PADDING, GRID_PADDING, GRID_WIDTH, GRID_HEIGHT);
  renderGridLines();  
}

void renderGridPieces() {
  
}

TetrisPiece spawnRandomPiece() {
  return allPieces[int(random(0, allPieces.length))];
}

void checkGameOver() {
  
}

void draw() {
  renderGrid();
  renderGridPieces();
  if (activePiece == null && !isGameOver) {
    checkGameOver();
    activePiece = spawnRandomPiece();
  }
  activePiece.update();
}

void keyPressed() { 
  if (key == CODED) {
    if (keyCode == LEFT) {
      activePiece.moveLeft();
    } else if (keyCode == RIGHT) {
      activePiece.moveRight();
    } else if (keyCode == DOWN) {
      downPressed = true;
      activePiece.softDrop(); 
    }
  }
}

void keyReleased() {
  if (key == CODED) {
    if (keyCode == DOWN && downPressed) {
      downPressed = false;
      activePiece.normalDrop();
    }
  }
}