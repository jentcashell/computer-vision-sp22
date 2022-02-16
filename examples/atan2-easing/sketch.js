let chasingPoint; // the position of the thing that's chasing you
let easing = 0.025; // how quickly the chasing point reaches you (lower = slower)

function setup() {
  createCanvas(640, 360);
  chasingPoint = createVector(0, 0);
  rectMode(CENTER);
}


function draw() {
  background(204);

  let targetPos = createVector(mouseX, mouseY);
  let angle = atan2(targetPos.y - chasingPoint.y, targetPos.x - chasingPoint.x);
  chasingPoint = p5.Vector.lerp(chasingPoint, targetPos, easing);

  push();
    translate(chasingPoint.x, chasingPoint.y);
    rotate(angle);
    rect(0, 0, 60, 10);
  pop();
}