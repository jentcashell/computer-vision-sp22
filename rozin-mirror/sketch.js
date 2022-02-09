let capture;
const w = 320;
const h = 240;

function setup() {
  createCanvas(w, h);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();
  
  // colorMode(HSB, 255);
  
  rectMode(CENTER)
}

function draw() {
  background(255);
  
  const stepSize = 20;
  noStroke();
  capture.loadPixels();
  
  push()
    translate(width, 0);
    scale(-1, 1);
  for(let y = 0; y < capture.height; y+=stepSize) {
    for(let x = 0; x < capture.width; x+=stepSize) {
      
      const i = (x + y * width) * 4;
      
      const r = capture.pixels[i]; // red channel
      const g = capture.pixels[i+1]; // green channel
      const b = capture.pixels[i+2]; // blue channel
      // capture.pixels[i+3] = 1; // alpha channel
      
      const brightness = (r + g + b) / 3
      
      fill(r,g,b);
      
      const size = map(brightness, 0, 255, stepSize/2, stepSize)
      const rotation = map(brightness, 0, 255, 0, PI)
      
      push()
        translate(x, y)
        rotate(rotation)
        strokeWeight(1);
        stroke(0);
        textSize(stepSize);
        textAlign(CENTER);
      
        if(brightness < 100) {
          text("😵‍💫", 0, 0);
        } else if(brightness > 100 && brightness < 150) {
          text("👁", 0, 0);
        } else {
          text("🪳", 0, 0);
        }
        
       
      pop()
    }
  }
  pop();
  
  capture.updatePixels();
  
  // image(capture, 0, 0);
  //print(capture.pixels.length)
  
}