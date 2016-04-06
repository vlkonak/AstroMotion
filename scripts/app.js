/*
* This script contains application setup and main loop.
*/
var canvas, grid;

function setup() {
  canvas = createCanvas(windowWidth-20, windowHeight-20);
  canvas.parent('container');
  frameRate(15);
  grid = new Grid(demo);
}

function draw() {
  background(255);
  ellipse(mouseX, mouseY, 3, 3);
  grid.computeNextState(settings);
  grid.render(settings);
}
