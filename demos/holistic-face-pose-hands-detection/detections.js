
// detections is a global variable that contains the hand detection information
// the detections variable can be used in other files (like sketch.js)
let detections = undefined;
const videoElement = document.getElementById('input_video');
const imgElement = document.getElementById('input_image');

const videoFeed = false; // set to false if using a still image

function gotHolistic(results) {

  detections = results;

}

const holistic = new Holistic({
  locateFile: (file) => {
    // return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
    return `file/${file}`;
  }
});

holistic.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: true,
  smoothSegmentation: true,
  refineFaceLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
  staticImageMode: !videoFeed
});

holistic.onResults(gotHolistic);





if (videoFeed) {
  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await holistic.send({ image: videoElement });
    },
    width: 640,
    height: 480
  });
  camera.start();
} else {
  sendImage();
}


async function sendImage() {
  await holistic.send({ image: imgElement })
}