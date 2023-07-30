// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// https://learn.ml5js.org/#/reference/posenet

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let poseNet;
let poses = [];
let img;

function setup() {
  createCanvas(1280, 1280);
  img = createImg("pose1.jpg", imageReady);
  img.hide();
  frameRate(1);
}

// when the image is ready, then load up poseNet
function imageReady() {
  // set some options
  let options = {
    imageScaleFactor: 1,
    minConfidence: 0.1,
  };
  // assign poseNet
  poseNet = ml5.poseNet(modelReady, options);
  // This sets up an event that listens to 'pose' events
  poseNet.on("pose", function (results) {
    poses = results;
  });
}

function modelReady() {
  select("#status").html("Model Loaded");
  poseNet;

  poseNet.multiPose(img);
  // poseNet.singlePose(img);
}

function draw() {
  if (poses.length > 0) {
    console.log(poses.length);
    //image(img, 0, 0);
    drawKeypoints();
    drawSkeleton();
    noLoop();
  }
}

function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      //if (keypoint.score > 0.01) {
      stroke(255, 0, 0);
      strokeWeight(16);
      point(keypoint.position.x, keypoint.position.y);
      fill(0);
      noStroke();
      textSize(20);
      text(j, keypoint.position.x, keypoint.position.y);
      //}
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    let pose = poses[i].pose;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      strokeWeight(3);
      stroke(255, 0, 0);
      line(
        partA.position.x,
        partA.position.y,
        partB.position.x,
        partB.position.y
      );
    }
    // draw face connecting lines
    // 4, 2, 0, 1, 3
    // let facePoints = [4, 2, 0, 1, 3]

    // for(let k = 0; k < facePointsl)
    // line(poses.keypoints[4].position.x,
    //      poses.keypoints[4].position.y,
    //      poses.keypoints[2].)

  }
}

// example stuff

// let img;
// let poseNet;

// function preload() {
//   // load an image for pose detection
//   img = loadImage('data/runner.jpg');
// }

// function setup() {
//   createCanvas(640, 360);
//   image(img, 0, 0);
//   poseNet = ml5.poseNet(modelReady);
// }

// // when poseNet is ready, do the detection
// function modelReady() {
//   select('#status').html('Model Loaded');
//   // If/When a pose is detected, poseNet.on('pose', ...) will be listening for the detection results
//   poseNet.on('pose', function (poses) {
//     if (poses.length > 0) {
//       drawSkeleton(poses);
//       drawKeypoints(poses);
//     }
//   });
//   // When the model is ready, run the singlePose() function...
//   poseNet.singlePose(img);
// }

// // The following comes from https://ml5js.org/docs/posenet-webcam
// // A function to draw ellipses over the detected keypoints
// function drawKeypoints(poses) {
//   // Loop through all the poses detected
//   for (let i = 0; i < poses.length; i++) {
//     // For each pose detected, loop through all the keypoints
//     let pose = poses[i].pose;
//     for (let j = 0; j < pose.keypoints.length; j++) {
//       // A keypoint is an object describing a body part (like rightArm or leftShoulder)
//       let keypoint = pose.keypoints[j];
//       // Only draw an ellipse is the pose probability is bigger than 0.2
//       if (keypoint.score > 0.2) {
//         fill(255);
//         stroke(20);
//         strokeWeight(4);
//         ellipse(round(keypoint.position.x), round(keypoint.position.y), 8, 8);
//       }
//     }
//   }
// }

// // A function to draw the skeletons
// function drawSkeleton(poses) {
//   // Loop through all the skeletons detected
//   for (let i = 0; i < poses.length; i++) {
//     let skeleton = poses[i].skeleton;
//     // For every skeleton, loop through all body connections
//     for (let j = 0; j < skeleton.length; j++) {
//       let partA = skeleton[j][0];
//       let partB = skeleton[j][1];
//       stroke(255);
//       strokeWeight(1);
//       line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
//     }
//   }
// }
