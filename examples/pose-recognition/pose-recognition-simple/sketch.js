const w = 640;
const h = 480;
let capture;
let predictions;

const imageModelURL = 'models/tm-my-image-model/model.json';

function preload() {
  classifier = ml5.imageClassifier(imageModelURL);
}

function setup() {
  createCanvas(w, h);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();

  // flip the capture so it's properly mirrored
  capture = ml5.flipImage(capture);
}

function draw() {
  background(200);

  if(capture.loadedmetadata) {
    image(capture, 0, 0);

    console.log(predictions)
    noLoop()
  }
  
}

// Get a prediction for the current video frame
function classifyVideo() {
  // const flippedCapture = ml5.flipImage(capture)
  classifier.classify(capture, gotResult);
}

function gotResult(error, results) {
  if(error) {
    console.error(error);
    return;
  }

  predictions = results;

  classifyVideo();
}