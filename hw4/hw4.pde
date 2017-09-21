// GLOBAL VARIABLES
int GRID_WIDTH = 400;
int GRID_HEIGHT = 800;
int GRID_PADDING = 10;
int GRID_LEFT_BOUNDARY = GRID_PADDING;
int GRID_RIGHT_BOUNDARY = GRID_WIDTH + GRID_PADDING;
int GRID_UPPER_BOUNDARY = GRID_PADDING + 10;
int GRID_BOTTOM_BOUNDARY = GRID_HEIGHT + GRID_PADDING;
int SPAWN_POINT_X = (GRID_WIDTH / 2) + GRID_PADDING;
int FRAME_RATE = 30;
Player player = new Player(SPAWN_POINT_X, GRID_HEIGHT - GRID_PADDING);
boolean isGameOver = false;
boolean leftPressed = false;
boolean rightPressed = false;
boolean spacePressed = false;
ArrayList<CircleMonster> allMonsters = new ArrayList<CircleMonster>();
ArrayList<Bullet> allBullets = new ArrayList<Bullet>();
float timePassed = 0;
float timeDelay = 0;
float randX;
int monstersKilled = 0;
float lastTime = 0;
int numSpawns = 1;

void setup() {
  size(500, 820);
  background(100);
  frameRate(FRAME_RATE);
  
  timeDelay = random(5000, 5000);
  timePassed = timeDelay;
}

void renderGrid() {
  fill(32,36,51);
  rect(GRID_PADDING, GRID_PADDING, GRID_WIDTH, GRID_HEIGHT);
  
}

void spawnMonster() {
  randX = random(GRID_LEFT_BOUNDARY + 30, GRID_RIGHT_BOUNDARY - 30);
  allMonsters.add(new CircleMonster(randX, GRID_UPPER_BOUNDARY + 30));
}

void updateTimeDelay() {
  if (monstersKilled > 5) {
    timeDelay = random(4000, 5000);
    numSpawns = 2;
  }
  else if (monstersKilled > 15) {
   timeDelay = random(3000, 4500); 
   numSpawns = 3;
  }
  else if (monstersKilled > 30) {
   timeDelay = random(2500, 4000); 
   numSpawns = 4;
  }
  else if (monstersKilled > 50) {
   timeDelay = random(2000, 3000);
   numSpawns = 5;
  }
}

void draw() {
  renderGrid();
  if (timePassed >= timeDelay) {
    for (int i = 0; i < numSpawns; i ++) {
      spawnMonster();
    }
    updateTimeDelay();
    timePassed = 0;
  } else {
    timePassed += millis() - lastTime;
  }
  player.update(leftPressed, rightPressed, spacePressed);
  for (int i = 0; i < allMonsters.size(); i++) {
    allMonsters.get(i).update();
  }
  for (int i = 0; i < allBullets.size(); i++) {
    allBullets.get(i).update();
  }
  lastTime = millis();
}

void keyPressed() { 
  setBool(keyCode, true);
}

void keyReleased() { 
  setBool(keyCode, false);
}

boolean setBool(int target, boolean val) {
  switch(target) {
    case LEFT:
      return leftPressed = val;
    case RIGHT:
      return rightPressed = val;
    case 32:
      return spacePressed = val;
    default:
      return val;
  }
}