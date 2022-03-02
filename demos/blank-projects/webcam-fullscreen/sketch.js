let w = 640;
let h = 480;
let capture;

let moveableX = false;
let moveableY = false;
let offset;

function setup() {
  createCanvas(innerWidth, innerHeight);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();
  offset = createVector(0, 0);
}

function draw() {
  background(100, 0, 0);

  // press the X key or Y key and then move your mouse to position the feed;
  if(moveableX) { offset.x = map(mouseX, 0, width, -width/2, width/2) }
  if(moveableY) { offset.y = map(mouseY, 0, height, -height/2, height/2) }

  push();
    scale(setScale(), setScale());
    translate(w+offset.x, offset.y);
    scale(-1, 1);
    image(capture, 0, 0);
  pop();

}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

function setScale() {
  if(innerWidth/w >= innerHeight/h) { return innerWidth/w; }
  else { return innerHeight/h; }
}

function keyPressed() {
  if(key == 'x') {
    moveableX = !moveableX;
  } else if(key == 'y') {
    moveableY = !moveableY;
  } else if(key == 'r') {
    moveableX = false;
    moveableY = false;
    offset.x = 0;
    offset.y = 0;
  }
}