let w = 640;
let h = 480;
let capture;
let model;
let face;
let prevFace;
const easing = 0.5;

function setup() {
  createCanvas(w, h);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();

  loadFaceModel();
}

function draw() {
  background(200);

  // make sure the video feed is loaded AND the model is loaded before getting a face.
  if(capture.loadedmetadata && model !== undefined) {
    getFace();
  }

  // draw the capture first
  push();
    translate(w, 0);
    scale(-1, 1);
    image(capture, 0, 0);
  pop();

  // if we see faces
  if(face !== undefined && prevFace !== undefined) {

    

    // only draw if the confidence is over 95%
    if(face.probability[0] > 0.95) {

      let tl = createVector(1, 1);
      let br = createVector(1, 1);

      //////////// DRAW THE BOUNDING BOX /////////////////
      // we need the w- in order to account for the flipped video

      // current frame
      const topLeft = createVector(w-face.topLeft[0], face.topLeft[1]);
      const bottomRight = createVector(w-face.bottomRight[0], face.bottomRight[1]);

      // prev frame
      const topLeftPrev = createVector(w-prevFace.topLeft[0], prevFace.topLeft[1]);
      const bottomRightPrev = createVector(w-prevFace.bottomRight[0], prevFace.bottomRight[1]);

      let tlTargetX = topLeft.x
      let tldx = topLeft.x - topLeftPrev.x;
      tl.x += tldx*easing;

      let tldy = topLeft.y - tl.y;
      tl.y += tldy*easing;

      let brdx = topLeft.x - br.x;
      br.x += brdx*easing;

      let brdy = topLeft.y - br.y;
      br.y += brdy*easing;

      const bbWidth = br.x - tl.x;
      const bbHeight = br.y - tl.y;

      
      const bbWidthPrev = br.x - tl.x;
      const bbHeightPrev = br.y - tl.y;

      
      
      fill(255, 0, 255, 100);
      rect(topLeft.x, topLeft.y, bbWidth, bbHeight);

      fill(255, 0, 0);
      ellipse(topLeft.x, topLeft.y, 10, 10);
      
      fill(0, 0, 255);
      ellipse(bottomRight.x, bottomRight.y, 10, 10);
      
      // //////////// DRAW THE FACE LANDMARKS ///////////////
      // // store the invidual landmarks for the current face
      // const rightEye = f.landmarks[0];
      // const leftEye = f.landmarks[1];
      // const nose = f.landmarks[2];
      // const mouth = f.landmarks[3]
      // const rightEar = f.landmarks[4];
      // const leftEar = f.landmarks[5];

      // // OR, loop through all the landmarks of current face and do uniform action to all
      // // (like draw a green ellipse on each face landmark)
      // for(let lm of f.landmarks) {
      //   lm = createVector(w-lm[0], lm[1])

      //   fill(0, 255, 0);
      //   noStroke();
      //   ellipse(lm.x, lm.y, 10, 10);
      // }
    }
    prevFace = face;
  }
}

async function loadFaceModel() {
  model = await blazeface.load();
}

async function getFace() {

  const predictions = await model.estimateFaces(
    document.querySelector('video'),
    false 
  );

  if (predictions.length === 0) {
    face = undefined;
  } else {
    face = predictions[0];
  }
}