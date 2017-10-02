float LAYER_SIZE = 20;
float GRID_WIDTH = 560;
float GRID_HEIGHT = 560;
float LEFT_X = 0;
float LEFT_Y = 0;
float TOP_X = 0;
float TOP_Y = 0;
float RIGHT_X = 540;
float RIGHT_Y = 0;
float BOTTOM_X = 0;
float BOTTOM_Y = 560;

color LIGHT_RED = color(207, 59, 55);
color MEDIUM_RED = color(205, 63, 61);
color DARK_RED = color(218, 76, 56);

color GENERIC_ORANGE = color(205, 86, 52);

color GENERIC_YELLOW = color(251, 229, 0);

color LIGHT_BLUE_GREEN = color(72, 91, 57);
color MEDIUM_BLUE_GREEN = color(64, 78, 65);
color DARK_BLUE_GREEN = color(58, 67, 64);

color LIGHT_BLUE = color(71, 78, 84);
color MEDIUM_BLUE = color(54, 68, 81);
color DARK_BLUE = color(49, 65, 88);

void resetConstants() {
  LEFT_X = 0;
  LEFT_Y = 0;
  TOP_X = 0;
  TOP_Y = 0;
  RIGHT_X = 540;
  RIGHT_Y = 0;
  BOTTOM_X = 0;
  BOTTOM_Y = 560;
}

void setup() {
  size(560, 560);
  background(100);
  frameRate(30);
}

void trapezoid(float x1, float y1, float x2, float y2, float x3, float y3, float x4, float y4) {
  beginShape();
  vertex(x1, y1);
  vertex(x2, y2);
  vertex(x3, y3);
  vertex(x4, y4);
  endShape();
}

void nextBottomTrapezoid() {
  trapezoid(BOTTOM_X, BOTTOM_Y, BOTTOM_X + LAYER_SIZE, BOTTOM_Y - LAYER_SIZE, GRID_WIDTH - BOTTOM_X - LAYER_SIZE, BOTTOM_Y - LAYER_SIZE, GRID_WIDTH - BOTTOM_X, BOTTOM_Y);
  BOTTOM_X += LAYER_SIZE;
  BOTTOM_Y -= LAYER_SIZE;
}

void nextLeftTrapezoid() {
  trapezoid(LEFT_X, LEFT_Y, LEFT_X + LAYER_SIZE, LEFT_Y + LAYER_SIZE, LEFT_X + LAYER_SIZE, GRID_HEIGHT - LEFT_Y - LAYER_SIZE, LEFT_X, GRID_HEIGHT - LEFT_Y);
  LEFT_X += LAYER_SIZE;
  LEFT_Y += LAYER_SIZE;
}

void nextTopTrapezoid() {
  trapezoid(TOP_X, TOP_Y, GRID_WIDTH - TOP_X - LAYER_SIZE, TOP_Y, GRID_WIDTH - TOP_X - LAYER_SIZE - LAYER_SIZE, TOP_Y + LAYER_SIZE, TOP_X + LAYER_SIZE, TOP_Y + LAYER_SIZE);
  TOP_X += LAYER_SIZE;
  TOP_Y += LAYER_SIZE;
}

void nextRightTrapezoid() {
  trapezoid(RIGHT_X - LAYER_SIZE, RIGHT_Y + LAYER_SIZE, RIGHT_X, RIGHT_Y, RIGHT_X, GRID_HEIGHT - RIGHT_Y - LAYER_SIZE, RIGHT_X - LAYER_SIZE, GRID_HEIGHT - RIGHT_Y - LAYER_SIZE - LAYER_SIZE);
  RIGHT_X -= LAYER_SIZE;
  RIGHT_Y += LAYER_SIZE;
}

void draw() {
  noStroke();
  // Start on the right and build clockwise
  fill(LIGHT_RED);
  trapezoid(540, 0, 560, 0, 560, 560, 540, 540);
  
  // Every shape has white outline
  stroke(255,255,255);
  fill(MEDIUM_RED);
  nextBottomTrapezoid();
  fill(DARK_RED);
  nextLeftTrapezoid();
  fill(GENERIC_ORANGE);
  nextTopTrapezoid();
  fill(GENERIC_YELLOW);
  nextRightTrapezoid();
  
  fill(LIGHT_BLUE_GREEN);
  nextBottomTrapezoid();
  fill(MEDIUM_BLUE_GREEN);
  nextLeftTrapezoid();
  fill(DARK_BLUE_GREEN);
  nextTopTrapezoid();
  fill(DARK_BLUE);
  nextRightTrapezoid();
  
  fill(MEDIUM_BLUE);
  nextBottomTrapezoid();
  fill(LIGHT_BLUE);
  nextLeftTrapezoid();
  fill(LIGHT_RED);
  nextTopTrapezoid();
  fill(MEDIUM_RED);
  nextRightTrapezoid();
  
  fill(DARK_RED);
  nextBottomTrapezoid();
  fill(GENERIC_ORANGE);
  nextLeftTrapezoid();
  fill(GENERIC_YELLOW);
  nextTopTrapezoid();
  fill(LIGHT_BLUE_GREEN);
  nextRightTrapezoid();
  
  fill(MEDIUM_BLUE_GREEN);
  nextBottomTrapezoid();
  fill(DARK_BLUE_GREEN);
  nextLeftTrapezoid();
  fill(DARK_BLUE);
  nextTopTrapezoid();
  fill(MEDIUM_BLUE);
  nextRightTrapezoid();
    
  fill(LIGHT_BLUE);
  nextBottomTrapezoid();
  fill(DARK_RED);
  nextLeftTrapezoid();
  fill(MEDIUM_RED);
  nextTopTrapezoid();
  fill(LIGHT_RED);
  nextRightTrapezoid();
    
  fill(GENERIC_ORANGE);
  nextBottomTrapezoid();
  fill(GENERIC_YELLOW);
  nextLeftTrapezoid();
  fill(LIGHT_BLUE_GREEN);
  nextTopTrapezoid();
  fill(DARK_BLUE_GREEN);
  nextRightTrapezoid();
    
  fill(LIGHT_BLUE);
  nextBottomTrapezoid();
  fill(DARK_BLUE);
  nextLeftTrapezoid();
  fill(MEDIUM_BLUE);
  nextTopTrapezoid();
  fill(LIGHT_BLUE);
  nextRightTrapezoid();
    
  fill(MEDIUM_RED);
  nextBottomTrapezoid();
  fill(DARK_RED);
  nextLeftTrapezoid();
  fill(LIGHT_RED);
  nextTopTrapezoid();
  fill(GENERIC_ORANGE);
  nextRightTrapezoid();
    
  fill(GENERIC_YELLOW);
  nextBottomTrapezoid();
  fill(LIGHT_BLUE_GREEN);
  nextLeftTrapezoid();
  fill(DARK_BLUE_GREEN);
  nextTopTrapezoid();
  fill(DARK_BLUE);
  nextRightTrapezoid();
  
  fill(MEDIUM_BLUE);
  nextBottomTrapezoid();
  fill(MEDIUM_BLUE);
  nextLeftTrapezoid();
  fill(LIGHT_BLUE);
  nextTopTrapezoid();
  fill(DARK_RED);
  nextRightTrapezoid();
    
  fill(LIGHT_RED);
  nextBottomTrapezoid();
  fill(MEDIUM_RED);
  nextLeftTrapezoid();
  fill(GENERIC_ORANGE);
  nextTopTrapezoid();
  fill(GENERIC_YELLOW);
  nextRightTrapezoid();
  
    
  fill(LIGHT_BLUE_GREEN);
  nextBottomTrapezoid();
  fill(MEDIUM_BLUE_GREEN);
  nextLeftTrapezoid();
  fill(DARK_BLUE_GREEN);
  nextTopTrapezoid();
  fill(DARK_BLUE);
  nextRightTrapezoid();
  
  fill(MEDIUM_BLUE);
  nextBottomTrapezoid();
  fill(LIGHT_BLUE);
  nextLeftTrapezoid();
  fill(LIGHT_RED);
  triangle(TOP_X, TOP_Y, TOP_X + LAYER_SIZE, TOP_Y, TOP_X + 10, TOP_Y + 10); 
  fill(MEDIUM_RED);
  triangle(RIGHT_X, RIGHT_Y, RIGHT_X, RIGHT_Y + LAYER_SIZE, RIGHT_X - 10, RIGHT_Y + 10);
  
  // Reset all constants so that the picture remains static
  resetConstants();
}