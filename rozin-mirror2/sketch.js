let w = 640;
let h = 480;
let capture;

function setup() {
  createCanvas(innerWidth, innerHeight);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();
  ellipseMode(CORNER);
  rectMode(CENTER);
  strokeCap(ROUND);
  strokeWeight(3);
  stroke(0);
}

function draw() {
  background(255, 1);

  // const stepSize = floor(map(sin(frameCount/100), -1, 1, 10, 100));

  let stepSize = 20;

  let vidScale;
  let xOffset = 0;
  if(innerWidth/innerHeight > (w/h)) {
    vidScale = innerWidth/w;
    xOffset = 0;
  } else {
    vidScale = innerHeight/h;
    
  }

  if(w > width) {
    xOffset = (w - width)/2
  }
  
  
  capture.loadPixels();
  
  if(capture.pixels.length > 0)
  {
    push();
    translate(width, 0);
    scale(-vidScale, vidScale);
    translate(-xOffset, 0);
    for(let y = 0; y < h; y+=stepSize) {
      for(let x = 0; x < w; x+=stepSize) {
        const index = (x + y * w) * 4;

        const r = capture.pixels[index+0]; // red channel
        const g = capture.pixels[index+1]; // blue channel
        const b = capture.pixels[index+2]; // green channel

        const brightness = (r+g+b)/3;

        const rotation = map(brightness, 0, 255, 0, PI) - PI/4

        const size = map(brightness, 0, 255, -.5, .5);

        
        
        push()
          translate(x+stepSize, y);
          rotate(frameCount/20)
          stroke(r, g, b);
          scale(size, size);
          line(-stepSize, -stepSize, stepSize, stepSize);
          line(stepSize, -stepSize, -stepSize, stepSize);
        pop();
      }
    }
    pop();
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}