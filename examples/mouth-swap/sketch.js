/* Holistic Body Detection with MediaPipe: Capture FaceMesh, Pose, Hands with one model */
// Original Code: https://google.github.io/mediapipe/solutions/holistic.html

const w = 640;
const h = 480;
let canvasCtx;
const FACE_OVAL = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379,
378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109]

let facePixels = [];

let mask;
let capture;

function setup() {
    createCanvas(w, h);
    noStroke();
    canvasCtx = document.querySelector('canvas').getContext('2d');
    textAlign(CENTER);
    mask = createGraphics(w, h);
    capture = createCapture(VIDEO);
    capture.size(w, h);
    capture.hide();
}

// The MediaPipe library comes with useful built-in tools to easily draw
// the landmarks and connections. If you want to debug with those, set
// this to true. 
let usingDrawingUtils = false; // false means you're using your own drawing solutions

function draw() {
    clear();
    // don't start drawing until we have received results 
    if (detections !== undefined) {

        if (detections.faceLandmarks !== undefined) {
            // for (let lm of detections.faceLandmarks) {
            //     lm = createVector(lm.x * w, lm.y * h);
            //     fill(255, 0, 255);
            //     ellipse(lm.x, lm.y, 2, 2);
            // }
            mask.fill(0, 255, 0);
            mask.noStroke();
            mask.beginShape()
            for (let i = 0; i < FACE_OVAL.length; i++) {
                let lmIndex = FACE_OVAL[i];
                //console.log(detections.faceLandmarks);

                let lm = createVector(detections.faceLandmarks[lmIndex].x * w, detections.faceLandmarks[lmIndex].y * h)

                mask.curveVertex(lm.x, lm.y);
            }
            mask.endShape(CLOSE)

            mask.loadPixels();
            capture.loadPixels();

            for(let _y = 0; _y < mask.height; _y++) {
                for(let _x = 0; _x < mask.width; _x++) {
                    const i = (_x + _y * width) * 4;

                    let _r = mask.pixels[i];
                    let _g = mask.pixels[i+1];
                    let _b = mask.pixels[i+2];

                    if(_r == 0 && _g == 255 && _b == 0) {
                        const c = [capture.pixels[i], capture.pixels[i+1], capture.pixels[i+2]];
                        facePixels.push({x: _x, y: _y, color: c});
                    }
                }
            }

            // console.log(facePixels)

            for(let p of facePixels) {
                
                const i = (p.x + p.y * width) * 4;

                mask.pixels[i] = p.color[0];
                mask.pixels[i+1] = p.color[1];
                mask.pixels[i+2] = p.color[2];
                // mask.stroke(p.color);
                // mask.point(p.x, p.y);
            }
            mask.updatePixels();

            image(mask, 0, 0);
            facePixels = [];
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