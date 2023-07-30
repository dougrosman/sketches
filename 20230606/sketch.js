let figures = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(0);

  figures.forEach(f => {
    f.update();
    f.draw();
  })
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

function mousePressed() {
  figures.push(new Figure(mouseX, mouseY));
}

class Figure {


  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0.8175);
    this.acc = createVector(0, 0.001);
    this.size = 24;
    this.strokeWeight = this.size/4;

    this.angles = {
      torso: random(TWO_PI),
      leftArm: random(TWO_PI),
      rightArm: random(TWO_PI),
      leftLeg: random(TWO_PI),
      rightLeg: random(TWO_PI)
    }

    this.torso = createVector(this.size * 2 * cos(this.angles.torso),
                              this.size * 2 * sin(this.angles.torso));
    

    // ARMS
    this.armAnchor = p5.Vector.lerp(this.torso, createVector(0, 0), 0.5);
    
    this.leftArm = createVector(this.size * 0.8 * cos(this.angles.leftArm),
                                this.size * 0.8 * sin(this.angles.leftArm));
  
    this.rightArm = createVector(this.size * 0.8 * cos(this.angles.rightArm),
                                 this.size * 0.8 * sin(this.angles.rightArm));

    


    // LEGS

    this.legAnchor = createVector(this.torso.x, this.torso.y);

    this.leftLeg = createVector(this.size * 1.1 * cos(this.angles.leftLeg),
                                this.size * 1.1 * sin(this.angles.leftLeg));

    this.rightLeg = createVector(this.size * 1.1 * cos(this.angles.rightLeg),
                                 this.size * 1.1 * sin(this.angles.rightLeg));
  }

  update() {

    this.vel.add(this.acc);

    this.pos.add(this.vel);

    if(this.pos.y > height + (this.size * 3)) {
      this.pos.y = -this.size*3;
    }

  }

  draw() {
    push();

      translate(this.pos.x, this.pos.y);

      // head
      fill(255);
      noStroke();
      ellipse(0, 0, this.size);


      // torso
      stroke(255);
      strokeWeight(this.strokeWeight);
      line(0, 0, this.torso.x, this.torso.y);

      // arms
      push()
        translate(this.armAnchor.x, this.armAnchor.y)
        stroke(0, 255, 0);
        line(0, 0, this.leftArm.x, this.leftArm.y);
        stroke(255, 0, 0);
        line(0, 0, this.rightArm.x, this.rightArm.y);
      pop();

      // legs
      push()
        translate(this.legAnchor.x, this.legAnchor.y)
        stroke(0, 0, 255);
        line(0, 0, this.leftLeg.x, this.leftLeg.y);
        stroke(255, 0, 255);
        line(0, 0, this.rightLeg.x, this.rightLeg.y);
      pop();

    pop();
  }
}