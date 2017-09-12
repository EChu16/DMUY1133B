void setup() {
  size(500,500);
}

void draw() {
  background(100);
  
  int r, g, b;
  
  
  if(mouseY<= height/2) {
   ellipse(mouseX, mouseY, mouseX/2, mouseX/2); 
  }
  if(mouseY > height/2) {
     rect(mouseX, mouseY, mouseX/2, mouseX/2); 
  }
}

void mouseClicked() {
  rect(mouseX, mouseY, 20, 20);
}

void mouseReleased() {
  
}

void mouseDragged() {
  
}

void mouseMoved() {
  
}

void keyPressed() { 
  println(key);
}