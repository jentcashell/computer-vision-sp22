let w = 640;
let h = 480;
let capture;
let poses;

// console.log(poseDetection);

const model = poseDetection.SupportedModels.BlazePose;
let detector;
const detectorConfig = {
  runtime: 'mediapipe', // or 'tfjs'
  modelType: 'lite', // or 'lite', 'full', 'heavy'
};

function setup() {
  createCanvas(w, h);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();

  loadPoseModel();
}

function draw() {
  background(200);

  // make sure the video feed is loaded AND the model is loaded before getting a face.
  // if(capture.loadedmetadata && detector !== undefined) {
  //   getPoses();
  // }

  // draw the capture first
  push();
    translate(w, 0);
    scale(-1, 1);
    image(capture, 0, 0);
  pop();

  // // if we see poses
  // if(poses !== undefined) {

  //   for(let p of poses) {

  //     console.log(p);
  //   }
  // }
}

async function loadPoseModel() {
  detector = await poseDetection.createDetector(model, detectorConfig);
  console.log(detector)
}

async function getPoses() {

  const predictions = await detector.estimatePoses(
    document.querySelector('video')
  );

  // if (predictions.length === 0) {
  //   poses = undefined;
  // } else {
  //   poses = predictions;
  //   console.log(poses);
  // }
}