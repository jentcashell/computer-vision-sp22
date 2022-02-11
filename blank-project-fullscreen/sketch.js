function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(220);
  textSize(20);
  textAlign(CENTER)
  text("Fullscreen responsive sketch", width/2, height/2)
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}