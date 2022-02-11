let w = 640;
let h = 480;
let capture;

function setup() {
  createCanvas(innerWidth, innerHeight);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();
}

function draw() {
  background(0);

  push();
    const vidScale = innerWidth/w;
    const yTranslate = (innerHeight-h)/2
    scale(vidScale, vidScale);
    translate(w, yTranslate);
    scale(-1, 1);
    image(capture, 0, 0);
  pop();
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}