const w = 640;
const h = 480;
let capture;

function setup() {
    createCanvas(w, h);
    background(255, 200, 200);
    //noStroke();
    strokeWeight(10);
}

function draw() {

    clear(); // comment this out if you want to draw to the screen

    if (detections.multiHandLandmarks !== undefined) {

        // draw all keypoints for any visible hands
        for (const hand of detections.multiHandLandmarks) {
            for (let i = 0; i < hand.length; i++) {
                stroke(255, 0, 0);
                // we need to multiply the x and y positions by width and height
                // to scale the landmarks to our canvas
                point(hand[i].x * w, hand[i].y * h);
            }
        }

        // if both hands are detected, then draw them both using different colors
        if (detections.multiHandLandmarks.length > 1) {
            
            // store the left and right hands in their own variables
            let leftHand, rightHand;
            if(detections.multiHandedness[0].label == "Left") {
                leftHand = detections.multiHandLandmarks[1];
                rightHand = detections.multiHandLandmarks[0];
            } else {
                leftHand = detections.multiHandLandmarks[0];
                rightHand = detections.multiHandLandmarks[1];
            }

            // loop through the hand landmarks
            for (let i = 0; i < leftHand.length; i++) {
                
                // draw the left hand in green
                stroke(0, 255, 0);
                point(leftHand[i].x * w, leftHand[i].y * h);
                

                // draw the right hand in blue
                stroke(0, 0, 255);
                point(rightHand[i].x * w, rightHand[i].y * h);

                push()
                noStroke();
                    fill(255, 0, 0);
                    
                    text(i, leftHand[i].x * w, leftHand[i].y * h)
                    text(i, rightHand[i].x * w, rightHand[i].y * h)
                pop();
            }
        }
    } else {
        clear();
    }


}