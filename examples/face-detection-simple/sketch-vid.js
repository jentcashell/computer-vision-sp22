let w = 854;
let h = 480;
let video;
let model;
let faces;

function setup() {
  createCanvas(w, h);
  video = createVideo('vid/multi-face-video.mp4')
  video.size(w, h);
  video.hide();

  video.loop();
  loadFaceModel();
}

function draw() {
  background(200);

  // make sure the video feed is loaded AND the model is loaded before getting a face.
  if(video.loadedmetadata && model !== undefined) {
    getFace();
  }

  // draw the video first
  image(video, 0, 0);

  // if we see faces
  if(faces !== undefined) {

    // loop through all the faces
    for(let f of faces) {

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
        fill(0, 255, 0);
        noStroke();
        ellipse(lm[0], lm[1], 10, 10);
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
    false // false returns more human-usable screen coordinates
  );

  if (predictions.length === 0) {
    faces = undefined;
  } else {
    faces = predictions;
  }
}