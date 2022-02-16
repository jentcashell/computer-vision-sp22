let radius = 40;

function setup() {
  createCanvas(640, 360);
  colorMode(HSB, 255);
  noStroke();
}

function draw() {
  background(200);

  const rate = 20;

  let x = map(sin(frameCount/rate), -1, 1, -radius, radius);
  let y = map(cos(frameCount/rate), -1, 1, -radius, radius);
  let h = map(sin(frameCount/rate/2), -1, 1, 0, 255);

  push()
    fill(h, 255, 255);
    translate(width/2, height/2);
    ellipse(x, y, radius, radius);
  pop()

}
