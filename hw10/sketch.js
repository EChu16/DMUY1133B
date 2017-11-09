/*
  Erich Chu
  Graph of bird data extracted from JSON
  Bird family group names vs number of members
*/

var birdData = [];
var maxMembers;
var birdsJson;
var MAX_INITIALS = 2;


function preload() {
  birdsJson = loadJSON('birds.json');
}

function setup() {
  createCanvas(1650, 800);
  maxMembers = unpackJSONData();
  birdGraph = new BirdGraph(birdData, maxMembers, 1650, 800);
  birdGraph.setUp();
}

function draw() {
  background(200);
  birdGraph.displayData();
}

function unpackJSONData() {
  var birdFamilies = birdsJson.birds;
  var maxMembers = 0;
  var numMembers, familyInitials;

  for (i = 0; i < birdFamilies.length; i++) {
    numMembers = birdFamilies[i].members.length;
    familyInitials = stripToInitials(birdFamilies[i].family).substring(0, MAX_INITIALS);
    birdData.push({'familyInitials': familyInitials, 'family': birdFamilies[i].family, 'num_members': numMembers});
    maxMembers = (maxMembers < numMembers) ? numMembers : maxMembers;
  }
  return maxMembers;
}

function stripToInitials(name) {
  return name.replace(/\W*(\w)\w*/g, '$1').toUpperCase();
}

function BirdGraph(birdData, maxMembers, canvasWidth, canvasHeight) {
  this.birdData = birdData;
  this.maxMembers = maxMembers;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.GRAPH_PADDING = 50;
  this.xIncrAmt, this.yIncrAmt;
  this.birdBars = [];

  this.setUp = function() {
    this.xIncrAmt = this.determineIncrementAmts(birdData.length, this.canvasWidth);
    this.yIncrAmt = this.determineIncrementAmts(this.maxMembers, this.canvasHeight);
    this.instantiateBirdBars();
  }

  this.determineIncrementAmts = function(num, canvasSize) {
    var remainingSpace = canvasSize - (this.GRAPH_PADDING * 3);
    return Math.ceil(remainingSpace / num);
  }

  this.instantiateBirdBars = function() {
    var yCoord = this.canvasHeight - this.GRAPH_PADDING;
    var allBirdsLength = this.birdData.length;
    for(xCoord = this.GRAPH_PADDING, birdIdx = 0; xCoord < this.canvasWidth - this.GRAPH_PADDING && birdIdx < allBirdsLength; xCoord += this.xIncrAmt, birdIdx++) {
      var currentBird = birdData[birdIdx]
      this.birdBars.push(new BirdBar(currentBird.family, currentBird.num_members, xCoord+1, yCoord, this.xIncrAmt, this.yIncrAmt))
      this.birdBars[birdIdx].setUp()
    }
  }

  this.displayData = function() {
    this.drawAxis();
    this.drawAxisInfo();
    this.drawBirdBars();
    this.displayInfoBoxIfMouseHover();
  }

  this.drawAxis = function() {
    fill(0);
    // Vertical Line
    line(this.GRAPH_PADDING, this.GRAPH_PADDING, this.GRAPH_PADDING, this.canvasHeight - this.GRAPH_PADDING);
    // Horizontal Line
    line(this.GRAPH_PADDING, this.canvasHeight - this.GRAPH_PADDING, this.canvasWidth - this.GRAPH_PADDING, this.canvasHeight - this.GRAPH_PADDING);
  }

  this.drawAxisInfo = function() {
    fill(0);
    textAlign(RIGHT);
    textSize(8);
    // Y Axis Numbers
    var xCoord = this.GRAPH_PADDING - 5;
    for(yCoord = (this.canvasHeight - this.GRAPH_PADDING), yVal = 0; yCoord > this.GRAPH_PADDING; yCoord -= this.yIncrAmt, yVal += this.yIncrAmt) {
      text(yVal, xCoord, yCoord);
    }

    // X Axis 
    var yCoord = this.canvasHeight - this.GRAPH_PADDING + 10;
    var allBirdsLength = this.birdData.length;
    for(xCoord = this.GRAPH_PADDING, birdIdx = 0; xCoord < this.canvasWidth - this.GRAPH_PADDING && birdIdx < allBirdsLength; xCoord += this.xIncrAmt, birdIdx++) {
      text(birdData[birdIdx].familyInitials, xCoord + 15, yCoord);
    }

    textAlign(CENTER);
    textSize(14);
    // Y Axis Title
    push();
    translate(this.GRAPH_PADDING/3 + 5, this.canvasHeight/2);
    rotate(-PI/2);
    text("# of bird members", 0, 0)
    pop();

    // X Axis Title
    text("Abbreviated Family Members", (this.canvasWidth/2) + 15, this.canvasHeight - (this.GRAPH_PADDING/3));
  }

  this.drawBirdBars = function() {
    for(i = 0; i < this.birdBars.length; i++) {
      this.birdBars[i].display();
    }
  }

  this.displayInfoBoxIfMouseHover = function() {
    for(i = 0; i < this.birdBars.length; i++) {
      this.birdBars[i].displayInfoBox();
    }
  }
}

function BirdBar(familyName, numMembers, xCoord, yCoord, xSize, yIncrAmt) {
  this.familyName = familyName;
  this.numMembers = numMembers;
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.xSize = xSize;
  this.ySize = -numMembers * yIncrAmt;
  this.color = [random(255), random(255), random(255)];
  this.infoBoxWidth = 200;
  this.infoBoxHeight = 180;
  this.formattedInfoText;

  this.setUp = function() {
    this.formattedInfoText = this.getFormattedInfo();
  }

  this.getFormattedInfo = function() {
    var formattedName = "";
    var name = this.familyName.split(" ");
    for (i = 0; i < name.length; i++) {
      if (name[i].length > 10 || this.familyName.length > 12) {
        if (i != name.length - 1) {
          formattedName += name[i] + "\n";
        } else {
          formattedName += name[i] + " "
        }
      } else {
        formattedName += name[i] + " "
      }
    }
    return "Family: " + formattedName + "\n\n" + "# Members: " + this.numMembers;
  }

  this.display = function() {
    fill(this.color[0], this.color[1], this.color[2]);
    rect(this.xCoord, this.yCoord, this.xSize, this.ySize);
  }

  this.displayInfoBox = function() {
    if(this.mouseOver()) {
      push();
      translate(mouseX - (this.infoBoxWidth / 2), mouseY - (this.infoBoxHeight / 2));
      fill(225);
      rect(0, 0, this.infoBoxWidth, this.infoBoxHeight);

      textAlign(CENTER);
      textSize(14);
      fill(0);
      text(this.formattedInfoText, 100, 30);
      pop();
    }
  }

  this.mouseOver = function() {
    if(mouseX >= this.xCoord && mouseX < this.xCoord + this.xSize && mouseY < this.yCoord && mouseY >= this.yCoord + this.ySize) {
      return true;
    }
    return false;
  }
}