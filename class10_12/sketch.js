
function setup() {
	// create greyish 800 by 800 canvas
  	createCanvas(1200, 1200);
  	background(230, 230, 230);
  	img = loadImage("apple.jpg");
}



function draw() {
	noStroke()
	image(img, 0,0)
	var color;
	for (var x = 0; x < img.width; x+=100) {
		for (var y = 0; y < img.height; y+=100) {
			color = img.get(x,y);
			fill(color);
			rect(x, y, 100, 100);
		}
	}
}
