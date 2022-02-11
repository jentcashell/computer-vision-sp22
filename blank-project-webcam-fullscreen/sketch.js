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
    let vidScale;
    if(innerWidth >= innerHeight) {
      vidScale = innerWidth/w;
    } else {
      vidScale = innerHeight/h;
    }
    scale(vidScale, vidScale);
    translate(w, 0);
    scale(-1, 1);
    image(capture, 0, 0);
  pop();
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}