let bases = [];
let baseGroups = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(0);

  baseGroups.forEach((bg) => {
    bg.draw();
  });
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

function mouseDragged() {
  baseGroups.push(new BaseGroup(mouseX, mouseY));
}

class BaseGroup {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.numBases = floor(random(3, 12));
    this.bases = this.createBases();
  }

  createBases() {
    let bases = [];
    for (let i = 0; i < this.numBases; i++) {
      const size = floor(random(10, 40));
      const numPetals = floor(random(3, 12));
      let base = new Base(this.pos.x, this.pos.y, size, numPetals);
      bases.push(base);
    }
    return bases;
  }

  draw() {
    this.bases.forEach((b) => {
      b.draw();
    });
  }
}

class Base {
  constructor(x, y, size, numPetals) {
    this.pos = createVector(x, y);
    this.color = color(
      floor(random(256)),
      floor(random(256)),
      floor(random(256))
    );
    this.size = size;
    this.numPetals = numPetals;
    this.rotation = 0;
    this.rotationSpeed = map(this.size, 10, 40, .05, .01);
    this.strokeWeight = random(1, 4);
  }

  update() {
    this.rotation += this.rotationSpeed;
  }

  draw() {
    this.update();
    stroke(this.color);
    strokeWeight(this.strokeWeight);

    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.rotation);

    for (let i = 0; i < this.numPetals; i++) {
      push();
      const angle = map(i, 0, this.numPetals, 0, 2 * PI);
      rotate(angle);
      line(0, 0, this.size, this.size);
      pop();
    }
    pop();
  }
}
