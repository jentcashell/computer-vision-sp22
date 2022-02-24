
// detections is a global variable that contains the hand detection information
// the detections variable can be used in other files (like sketch.js)
let detections = {}
const videoElement = document.getElementById('input_video');

function gotHands(results) {
  detections = results;
  //console.log(detections);
}

const hands = new Hands({locateFile: (file) => {
  return `file/${file}`;
}});

hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

hands.onResults(gotHands);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  // do your detections on a lower resolution for better performance (but slightly reduced accuracy)
  width: 320,
  height: 240
});
camera.start();