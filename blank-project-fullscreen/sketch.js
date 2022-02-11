let w = innerWidth;
let h = innerHeight;

function setup() {
  createCanvas(w, h);
}

function draw() {
  background(0, 40, 50);
  
  loading(); // just a little placeholder animation, you can delete this
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}


// You can delete this :)
function loading() {
  const size = 5;
  const numCircles = 20;
  
  let offset = (numCircles-1) * size;
  push()
    translate(width/2 - offset, height/2)
    for(let x = 0; x < numCircles; x++) {

      const y = map(sin((frameCount/40) + x), -1, 1, -size*2, size*2)
      noStroke();
      fill(map(y, -size*2, size*2, 0, 255), 150, 255);
      ellipse(x*size*2, y, size);
    }
  pop()
}