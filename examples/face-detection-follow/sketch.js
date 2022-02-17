let w = 640;
let h = 480;
let capture;
let model;
let faces;

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
  if(faces !== undefined) {

    // loop through all the faces
    for(let f of faces) {

      // only grab a face if the confidence is over 95%
      if(f.probability[0] > 0.95) {

        //////////// DRAW THE BOUNDING BOX /////////////////
        // we need the w- in order to account for the flipped video
        const topLeft = createVector(w-f.topLeft[0], f.topLeft[1]);
        const bottomRight = createVector(w-f.bottomRight[0], f.bottomRight[1]);
        const bbWidth = bottomRight.x - topLeft.x;
        const bbHeight = bottomRight.y - topLeft.y;
        
        fill(255, 0, 255, 100);
        rect(topLeft.x, topLeft.y, bbWidth, bbHeight);

        fill(255, 0, 0);
        ellipse(topLeft.x, topLeft.y, 10, 10);
        
        fill(0, 0, 255);
        ellipse(bottomRight.x, bottomRight.y, 10, 10);
        
        //////////// DRAW THE FACE LANDMARKS ///////////////
        // store the invidual landmarks for the current face
        const rightEye = f.landmarks[0];
        const leftEye = f.landmarks[1];
        const nose = f.landmarks[2];
        const mouth = f.landmarks[3]
        const rightEar = f.landmarks[4];
        const leftEar = f.landmarks[5];

        // OR, loop through all the landmarks of current face and do uniform action to all
        // (like draw a green ellipse on each face landmark)
        for(let lm of f.landmarks) {
          lm = createVector(w-lm[0], lm[1])

          fill(0, 255, 0);
          noStroke();
          ellipse(lm.x, lm.y, 10, 10);
        }
      }
    }
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
    faces = undefined;
  } else {
    faces = predictions;
  }
}