// Partner: Linda Nguyen
function setup() {
	// create greyish 800 by 800 canvas
  	createCanvas(800, 800);
  	background(230, 230, 230);
}

function drawHex( x, y, len, shapeColor) {
	// color the hexagon
	fill(shapeColor);
	beginShape();
	vertex(x - len, y - sqrt(3) * len);
	vertex(x + len, y - sqrt(3) * len);
	vertex(x + 2 * len, y);
	vertex(x + len, y + sqrt(3) * len);
	vertex(x - len, y + sqrt(3) * len);
	vertex(x - 2 * len, y);
	endShape(CLOSE);
}

function draw() {
	// change background per frame to 'erase' old drawings
	background(230, 230, 230);

	// center drawings at mouse location
	translate(mouseX, mouseY);

	// adapted from a Perlin noise tutorial
	// http://genekogan.com/code/p5js-transformations/_____PERLIN_TUTORIAL_____


	for (var i = 0; i < 8; i++) {
		push();
		rotate(TWO_PI * i / 8);
		var tx = 200 * noise(0.01*frameCount);
		translate(tx, 0);
		for (var j = 0; j < 6; j++) {
			push();
			rotate(TWO_PI * j / 6);
			var rx = 60 * noise(0.01*frameCount + 10);
			// create a random color
			randomColor = color(random(255), random(255), random(255));
			// create a hexagon
			drawHex(rx, 0, random(5), randomColor);
			pop();
		}		
		translate();
		pop();
	}
}
