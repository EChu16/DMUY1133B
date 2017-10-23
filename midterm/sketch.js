// Erich Chu
// Constants
var sunPeriod = 400;
var moonPeriod = 800;
var sunPeak = 200;
var moonPeak = 600;
var Y_AXIS = 1;
var X_AXIS = 2;
var sectionPeriod = 200;

function setup() {
  	var canvas = createCanvas(800, 800);
  	canvas.parent(document.getElementById('sketch-canvas'));
  	background(230, 230, 230);
}

function drawPrePeakSunBg() {
	var top_init_color = color(255, 249, 200);
	var top_final_color = color(255, 255, 0);
	var bg1 = lerpColor(top_init_color, top_final_color, mouseX/sectionPeriod);

	var bot_init_color = color(7, 13, 43);
	var bot_final_color = color(255, 222, 122);
	var bg2 = lerpColor(bot_init_color, bot_final_color, mouseX/sectionPeriod);
	setGradient(0, 0, 800, 800, bg1, bg2, Y_AXIS);
}

function drawPostPeakSunBg() {
	var mouse_x = mouseX % sectionPeriod;
	var top_init_color = color(255, 255, 0);
	var top_final_color = color(27, 69, 95);
	var bg1 = lerpColor(top_init_color, top_final_color, mouse_x/sectionPeriod);

	var bot_init_color = color(255, 222, 122);
	var bot_final_color = color(7, 13, 43);
	var bg2 = lerpColor(bot_init_color, bot_final_color, mouse_x/sectionPeriod);
	setGradient(0, 0, 800, 800, bg1, bg2, Y_AXIS);
}

function sunIsRisingToPeak() {
	return (mouseX >= 0 && mouseX < sunPeak);
}

function sunIsSettingFromPeak() {
	return (mouseX >= sunPeak && mouseX < sunPeriod);
}

function drawSunBg() {
	if (sunIsRisingToPeak()) {
		drawPrePeakSunBg();
	} else if (sunIsSettingFromPeak()){
		drawPostPeakSunBg();
	}
}

function drawPrePeakMoonBg() {
	var mouse_x = mouseX % sectionPeriod;
	var top_init_color = color(27, 69, 95);
	var top_final_color = color(0, 0, 0);
	var bg1 = lerpColor(top_init_color, top_final_color, mouse_x/sectionPeriod);

	var bot_init_color = color(7, 13, 43);
	var bot_final_color = color(47, 101, 46);
	var bg2 = lerpColor(bot_init_color, bot_final_color, mouse_x/sectionPeriod);
	setGradient(0, 0, 800, 800, bg1, bg2, Y_AXIS);
}

function drawPostPeakMoonBg() {
	var mouse_x = mouseX % sectionPeriod;
	var top_init_color = color(0, 0, 0);
	var top_final_color = color(255, 249, 200);
	var bg1 = lerpColor(top_init_color, top_final_color, mouse_x/sectionPeriod);

	var bot_init_color = color(47, 101, 46);
	var bot_final_color = color(7, 13, 43);
	var bg2 = lerpColor(bot_init_color, bot_final_color, mouse_x/sectionPeriod);
	setGradient(0, 0, 800, 800, bg1, bg2, Y_AXIS);
}

function moonIsRisingToPeak() {
	return (mouseX >= sunPeriod && mouseX < moonPeak);
}

function moonIsSettingFromPeak() {
	return (mouseX >= moonPeak && mouseX <= moonPeriod);
}

function drawMoonBg() {
	if (moonIsRisingToPeak()) {
		drawPrePeakMoonBg();
	} else if(moonIsSettingFromPeak()) {
		drawPostPeakMoonBg();
	}
}

function drawBGColor() {
	if (mouseX >= 0 && mouseX < sunPeriod) {
		drawSunBg();
	} else if (mouseX >= sunPeriod && mouseX <= moonPeriod) {
		drawMoonBg();
	}
}

// Taken from https://p5js.org/examples/color-linear-gradient.html
function setGradient(x, y, w, h, c1, c2, axis) {
	noFill();
	if (axis == Y_AXIS) {  // Top to bottom gradient
		for (var i = y; i <= y+h; i++) {
			var inter = map(i, y, y+h, 0, 1);
			var c = lerpColor(c1, c2, inter);
			stroke(c);
			line(x, i, x+w, i);
		}
	}  
	else if (axis == X_AXIS) {  // Left to right gradient
		for (var i = x; i <= x+w; i++) {
			var inter = map(i, x, x+w, 0, 1);
			var c = lerpColor(c1, c2, inter);
			stroke(c);
			line(i, y, i, y+h);
		}
	}
}

function drawSun() {
	mouse_x = mouseX % sunPeriod;
	fill(color(255, 235, 0));
	push();
	translate(400, 400);
	rotate(radians(mouse_x * (180/sunPeriod)))
	ellipse(-400, 0, 60, 60);
	pop();
}

function drawMoon() {
	mouse_x = mouseX % sunPeriod;
	fill(color(255, 255, 255));
	push();
	translate(400, 400);
	rotate(radians(mouse_x * (180/sunPeriod)))
	ellipse(-400, 0, 60, 60);
	pop();
}

function drawSunOrMoon() {
	if(mouseX >= 0 && mouseX < sunPeriod) {
		drawSun();
	} else if (mouseX >= sunPeriod && mouseX < moonPeriod){
		drawMoon();
	}
}

function drawTree() {
	noStroke();
	var r = 103;
	var g = 67;
	var b = 13;

	fill(r, g, b);
	triangle(100, 800, 250, 770, 350, 800);

	fill(r-13, g-2, b-3);
	triangle(250, 770, 350, 800, 450, 785);

	fill(r, g, b);
	triangle(350, 800, 450, 785, 600, 800);

	fill(r+3, g-5, b-2);
	beginShape();
	vertex(350, 780);
	vertex(550, 700);
	vertex(650, 800);
	vertex(600, 800);
	endShape();

	fill(r-13, g+5, b+49);
	beginShape()	;
	vertex(250, 770);
	vertex(350, 780);
	vertex(550, 700);
	vertex(520, 580);
	vertex(320, 600);
	endShape();

	fill(r, g, b);
	beginShape();
	vertex(320, 600);
	vertex(520, 580);
	vertex(480, 400);
	vertex(380, 400);
	endShape();

	fill(r-13, g-2, b-3);
	beginShape()
	vertex(370, 430);
	vertex(390, 400);
	vertex(260, 300);
	vertex(240, 300);
	endShape();

	beginShape()
	vertex(340, 400);
	vertex(320, 380);
	vertex(200, 380);
	vertex(180, 400);
	endShape();

	beginShape()
	vertex(480, 430);
	vertex(450, 400);
	vertex(520, 200);
	vertex(540, 250);
	endShape();

	beginShape()
	vertex(500, 330);
	vertex(650, 300);
	vertex(650, 300);
	vertex(500, 350);
	endShape();

	beginShape()
	vertex(350, 240);
	vertex(500, 310);
	vertex(500, 320);
	vertex(350, 260);
	endShape();
}

function determineLeafColor(mouse_x) {
	var init_color, final_color;
	if(sunIsRisingToPeak()) {
		init_color = color(139, 195, 74);
		final_color = color(238, 27, 86);
		return lerpColor(init_color, final_color, mouse_x/sectionPeriod);
	} else if(sunIsSettingFromPeak()) {
		init_color = color(238, 27, 86);
		final_color = color(0, 0, 0);
		return lerpColor(init_color, final_color, mouse_x/sectionPeriod);
	} else if(moonIsRisingToPeak()) {
		init_color = color(0, 0, 0);
		final_color = color(84, 55, 63);
		return lerpColor(init_color, final_color, mouse_x/sectionPeriod);
	} else if(moonIsSettingFromPeak()) {
		init_color = color(84, 55, 63);
		final_color = color(139, 195, 74);
		return lerpColor(init_color, final_color, mouse_x/sectionPeriod);
	} else {
		return color(139,195,74);
	}
}

function determineLeafSizes(mouse_x) {
	var base_leaves = [70, 100, 80, 120, 140];
	console.log(mouse_x)
	if(sunIsSettingFromPeak()) {
		for(i = 0; i < base_leaves.length; i++) {
			base_leaves[i] = lerp(base_leaves[i], 0, mouse_x/sectionPeriod);
		}
	} else if (moonIsRisingToPeak()) {
		for(i = 0; i < base_leaves.length; i++) {
			base_leaves[i] = lerp(0, base_leaves[i], mouse_x/sectionPeriod);
		}
	}
	return base_leaves;
}

function drawLeaf(x, y, size, degree, leaf_color) {
	fill(leaf_color);
	push();
	translate(width/2, height/2);
	rotate(radians(degree));
	beginShape();
	vertex(x, y);
	vertex(x-size, y-size-10);
	vertex(x, y-(2*size)-20);
	vertex(x+size, y-size-10);
	endShape();
	pop();
}

function drawLeaves() {
	noStroke();
	var mouse_x = mouseX % sectionPeriod;
	var leaf_color = determineLeafColor(mouse_x);
	var base_leaves = determineLeafSizes(mouse_x);

	drawLeaf(-60, -190, base_leaves[0], 290, leaf_color);
	drawLeaf(0, -150, base_leaves[1], 310, leaf_color);
	drawLeaf(0, -150, base_leaves[2], 340, leaf_color);
	drawLeaf(-120, -70, base_leaves[3], 50, leaf_color);
	drawLeaf(260, -10, base_leaves[4], 0, leaf_color);
}

function draw() {
	drawBGColor();
	drawSunOrMoon();
	drawTree();
	drawLeaves();
}
