// The actual helpful link: https://www.npmjs.com/package/@tensorflow-models/face-landmarks-detection


// let faces;
// // let detector;
let model;
let faces;

const w = 640;
const h = 480;

function setup() {
    createCanvas(w, h);

    capture = createCapture(VIDEO);
    capture.size(w, h);
    capture.hide();

    loadFaceModel();

    colorMode(HSB, 255);
}


function draw() {
    background(200);
    if (capture.loadedmetadata && model !== undefined) {
        getFaces();
    }

    push();
        translate(w, 0);
        scale(-1, 1);
        image(capture, 0, 0);
    pop();

    noStroke();
    if(faces !== undefined) {
        for(const f of faces) {

            let h = 0;
            for(const kp of f.scaledMesh) {
                
                const hue = map(h, 0, f.scaledMesh.length, 0, 255);
                fill(hue, 255, 255);
                ellipse(kp[0], kp[1], 2, 2);
                h++;
            }
            
        }
    }
}

function drawSilhouette(f) {
    beginShape();
    for (const kp of f.annotations.silhouette) {
        const keyPoint = createVector(kp[0], kp[1]);
        vertex(keyPoint.x, keyPoint.y);
    }
    endShape(CLOSE);
}

function drawEyes(f) {

    textSize(4);
    noStroke();
    for (const kp of f.annotations.leftEyeLower0) {
        fill(0, 259, 259);
        // ellipse(kp[0], kp[1], 2, 2);
        text("l0", kp[0], kp[1]);
    }

    for (const kp of f.annotations.leftEyeLower1) {
        fill(37, 259, 259);
        // ellipse(kp[0], kp[1], 2, 2);
        text("l1", kp[0], kp[1]);
    }

    for (const kp of f.annotations.leftEyeLower2) {
        fill(74, 259, 259);
        // ellipse(kp[0], kp[1], 2, 2);
        text("l2", kp[0], kp[1]);
    }

    for (const kp of f.annotations.leftEyeLower3) {
        fill(111, 259, 259);
        // ellipse(kp[0], kp[1], 2, 2);
        text("l3", kp[0], kp[1]);
    }

    for (const kp of f.annotations.leftEyeUpper0) {
        fill(148, 259, 259);
        // ellipse(kp[0], kp[1], 2, 2);
        text("u0", kp[0], kp[1]);
    }

    for (const kp of f.annotations.leftEyeUpper1) {
        fill(185, 259, 259);
        // ellipse(kp[0], kp[1], 2, 2);
        text("u1", kp[0], kp[1]);
    }

    for (const kp of f.annotations.leftEyeUpper2) {
        fill(222, 259, 259);
        // ellipse(kp[0], kp[1], 2, 2);
        text("u2", kp[0], kp[1]);
    }
}


async function loadFaceModel() {
    model = await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh)

    console.log(model);
}

async function getFaces() {
    const predictions = await model.estimateFaces({
        input: document.querySelector("video"),
        returnTensors: false,
        flipHorizontal: true,
        predictIrises: true // set to 'false' if sketch is running too slowly
    })

    if (predictions.length === 0) {
        faces = undefined;
    } else {
        faces = predictions;
    }
}