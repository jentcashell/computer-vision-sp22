/* Holistic Body Detection with MediaPipe: Capture FaceMesh, Pose, Hands with one model */
// Original Code: https://google.github.io/mediapipe/solutions/holistic.html

const w = 640;
const h = 480;
let canvasCtx;

function setup() {
    createCanvas(w, h);
    noStroke();
    canvasCtx = document.querySelector('canvas').getContext('2d');
    textAlign(CENTER);
}

// The MediaPipe library comes with useful built-in tools to easily draw
// the landmarks and connections. If you want to debug with those, set
// this to true. 
let usingDrawingUtils = true; // false means you're using your own drawing solutions

function draw() {
    clear();
    // don't start drawing until we have received results 
    if (detections !== undefined) {

        if (!usingDrawingUtils) {
            // draw the face mesh landmarks
            if (detections.faceLandmarks !== undefined) {
                for (let lm of detections.faceLandmarks) {
                    lm = createVector(lm.x * w, lm.y * h);
                    fill(255, 0, 255);
                    ellipse(lm.x, lm.y, 2, 2);
                }
            }


            // draw the pose landmarks
            if (detections.poseLandmarks !== undefined) {
                for (let lm of detections.poseLandmarks) {
                    lm = createVector(lm.x * w, lm.y * h);
                    fill(0, 255, 255);
                    ellipse(lm.x, lm.y, 4, 4);
                }
            }


            // draw the left hand
            if (detections.leftHandLandmarks !== undefined) {
                for (let lm of detections.leftHandLandmarks) {
                    lm = createVector(lm.x * w, lm.y * h);
                    fill(0, 255, 0);
                    ellipse(lm.x, lm.y, 4, 4);
                }
            }

            // draw the right hand
            if (detections.rightHandLandmarks !== undefined) {
                for (let lm of detections.rightHandLandmarks) {
                    lm = createVector(lm.x * w, lm.y * h);
                    fill(0, 0, 255);
                    ellipse(lm.x, lm.y, 4, 4);
                }
            }
        } else {

            // use the built-in MediaPipe drawing functions
            drawConnectors(canvasCtx, detections.faceLandmarks, FACEMESH_TESSELATION,
                { color: '#C0FFC070', lineWidth: 1 });
            // drawConnectors(canvasCtx, detections.poseLandmarks, POSE_CONNECTIONS,
            //     { color: '#00FF00', lineWidth: 3 });
            // drawLandmarks(canvasCtx, detections.poseLandmarks,
            //     { color: '#FF0000', lineWidth: 2 });
            // drawConnectors(canvasCtx, detections.leftHandLandmarks, HAND_CONNECTIONS,
            //     { color: '#CC0000', lineWidth: 2 });
            // drawLandmarks(canvasCtx, detections.leftHandLandmarks,
            //     { color: '#00FF00', lineWidth: 2 });
            // drawConnectors(canvasCtx, detections.rightHandLandmarks, HAND_CONNECTIONS,
            //     { color: '#00CC00', lineWidth: 2 });
            // drawLandmarks(canvasCtx, detections.rightHandLandmarks,
            //     { color: '#FF0000', lineWidth: 2 });
        }

    } else {
        loading();
    }
}

function loading() {

    //fill(255)
    //rect(0, 0, width, height);
    push();
    textSize(40);
    fill(255);
    translate(width / 2, height / 2);
    scale(-1, 1);
    fill(255, 0, 0);
    text("loading", 0, 0);
    pop();
}