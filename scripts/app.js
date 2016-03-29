/*
* This script contains application setup and main loop.
*/
var canvas, grid;

function setup() {
  canvas = createCanvas(windowWidth-20, windowHeight - 100);
  canvas.parent('container');
  frameRate(15);
  grid = new Grid(demo);
  background(255);
  stroke(0);
  fill(0);
}

function draw() {
  background(255);
    ellipse(mouseX, mouseY, 3, 3);
  grid.computeNextState();
  translate(settings.offset.x, settings.offset.y);
  grid.render(settings);
  // TODO: display UI stuff
}
