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

  capture.loadPixels();
  if(capture.pixels.length > 0)
  {
    for(let y = 0; y < h; y++) {
      for(let x = 0; x < w; x++) {
        const index = (x + y * w) * 4;

        let r = capture.pixels[index+0]; // red channel
        let g = capture.pixels[index+1]; // blue channel
        let b = capture.pixels[index+2]; // green channel

        // creates a negative color effect
        capture.pixels[index+0] = 255-r
        capture.pixels[index+1] = 255-g
        capture.pixels[index+2] = 255-b

      }
    }
    capture.updatePixels();
  }

  push();
    translate(w, 0);
    scale(-1, 1);
    image(capture, 0, 0);
  pop();
}