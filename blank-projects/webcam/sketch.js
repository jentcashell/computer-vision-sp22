let w = 640;
let h = 480;
let capture;

function setup() {
  createCanvas(w, h);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();
}

function draw() {
  background(200);

  push();
    translate(w, 0);
    scale(-1, 1);
     image(capture, 0, 0, capture.width, capture.height);
  pop();
}