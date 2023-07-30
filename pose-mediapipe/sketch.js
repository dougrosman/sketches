// Pose detection with mediapipe
// https://google.github.io/mediapipe/solutions/pose.html

let sketch = function(p) {

  p.setup = function() {
    p.createCanvas(cam_w, cam_h);
    p.rectMode(p.CENTER);
  }

  p.draw = function() {
    p.clear(0);

    //console.log(detections);
    
    if(detections != undefined) {
      if(detections.poseLandmarks != undefined) {
        //p.drawPoses();
        console.log(detections);
      }
    }
  }

  p.drawPoses = function() {
    p.strokeWeight(8);


    for(let i = 0; i < detections.poseLandmarks.length; i++) {

    
      p.stroke(0, 255, 0);
      for(let j = 0; j < detections.detections[i].landmarks.length; j++) {
        const facePoint = detections.detections[i].landmarks[j]
        const x = p.width - (facePoint.x * p.width)
        const y = facePoint.y * p.height
        p.point(x, y);
      }
    }
  }
}

let myp5 = new p5(sketch)