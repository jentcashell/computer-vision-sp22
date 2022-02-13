let w = 640;
let h = 480;
let capture;
let backgroundPixels;
let RGB = false;

function setup() {
  createCanvas(w, h);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();
}

function draw() {

  capture.loadPixels();

  // don't start capturing pixel data until the webcam has initialized
  if(capture.pixels.length > 0)
  {
    if(!backgroundPixels) {
      backgroundPixels = copyImage(capture.pixels, backgroundPixels);
    }
    let thresholdAmount = select('#thresholdAmount').value();
    for(let y = 0; y < h; y++) {
      for(let x = 0; x < w; x++) {
        const i = (x + y * w) * 4;

        // RGB
        if(RGB) {
          capture.pixels[i+0] = capture.pixels[i+0] - backgroundPixels[i+0] > thresholdAmount ? 255 : 0;
          capture.pixels[i+1] = capture.pixels[i+1] - backgroundPixels[i+1] > thresholdAmount ? 255 : 0;
          capture.pixels[i+2] = capture.pixels[i+2] - backgroundPixels[i+2] > thresholdAmount ? 255 : 0;
        } else {

          const rdiff = Math.abs(capture.pixels[i+0] - backgroundPixels[i+0]) > thresholdAmount;
          const gdiff = Math.abs(capture.pixels[i+1] - backgroundPixels[i+1]) > thresholdAmount;
          const bdiff = Math.abs(capture.pixels[i+2] - backgroundPixels[i+2]) > thresholdAmount;
          const anydiff = rdiff || gdiff || bdiff;
          let output = 0;
          if (anydiff) {
              output = 255;
          }
          capture.pixels[i+0] = output;
          capture.pixels[i+1] = output;
          capture.pixels[i+2] = output;
        }      
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

function copyImage(src, dst) {
  let n = src.length; // the length of the pixel array from the webcam feed
  
  // if there is no destination pixel array, create a new one based on the length of the source webcam's pixel array
  if (!dst || dst.length != n) {
      dst = new src.constructor(n);
  }
  // copies the pixel data from the source pixel array into the destination pixel array, one piece of data at a time
  while (n--) {
      dst[n] = src[n];
  }

  // return the destination pixel array (which is a stored version of the webcam feed at the time)
  return dst;
}

function resetBackground() {
  backgroundPixels = undefined;
}