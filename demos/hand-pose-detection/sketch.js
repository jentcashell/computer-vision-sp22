/* Hand Pose Detection with MediaPipe. Detects two hands simultaneously. Each hand has 21 landmarks */
// Original Code: https://google.github.io/mediapipe/solutions/hands.html
// Tutorial: Kazuki Umeda, Multiple Hands Detection in p5.js - https://www.youtube.com/watch?v=BX8ibqq0MJU

const w = 640;
const h = 480;

function setup() {
    createCanvas(w, h);
    noStroke();
    textAlign(CENTER);
}

function draw() {

    clear() // comment this out if you dont want to draw to the canvas

    if (detections.multiHandLandmarks !== undefined) {

        // draw all keypoints for any visible hands
        for (const hand of detections.multiHandLandmarks) {
            let keyPointIndex = 0;
            for (let i = 0; i < hand.length; i++) {
                fill(255, 0, 0);
                // we need to multiply the x and y positions by width and height
                // to scale the landmarks to our canvas
                ellipse(hand[i].x * w, hand[i].y * h, 5, 5);

                fill(255)
                push()
                translate(hand[i].x * w, hand[i].y * h)
                scale(-1, 1);
                text(keyPointIndex, 0, 0)
                pop()
                keyPointIndex++;
            }
        }

        // if both hands are detected, then draw them both using different colors
        if (detections.multiHandLandmarks.length > 1) {

            // store the left and right hands in their own variables
            let leftHand, rightHand;
            if (detections.multiHandedness[0].label == "Left") {
                leftHand = detections.multiHandLandmarks[1];
                rightHand = detections.multiHandLandmarks[0];
            } else {
                leftHand = detections.multiHandLandmarks[0];
                rightHand = detections.multiHandLandmarks[1];
            }

            // loop through the hand landmarks
            for (let i = 0; i < leftHand.length; i++) {

                // draw the left hand in green
                fill(0, 255, 0);
                ellipse(leftHand[i].x * w, leftHand[i].y * h, 5, 5);

                // draw the right hand in blue
                fill(0, 0, 255);
                ellipse(rightHand[i].x * w, rightHand[i].y * h, 5, 5);

                // draw the keypoints as text. Since the whole canvas is flipped,
                // we need to flip the individual letters back so that they're legible
                fill(255);
                push()
                translate(leftHand[i].x * w, leftHand[i].y * h)
                scale(-1, 1);
                text(i, 0, 0)
                pop()
                push()
                translate(rightHand[i].x * w, rightHand[i].y * h)
                scale(-1, 1);
                text(i, 0, 0)
                pop()
            }
        }
    } else {
        clear();
    }
}