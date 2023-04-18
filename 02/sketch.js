let followers = [];
let sizeTracker = 0;

function setup() {
    createCanvas(innerWidth, innerHeight);
    background(0);

}

function draw() {
    background(0);
    followers.forEach((f) => {
        f.update();
        f.draw();
    })
}

function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
}

class Follower {

    constructor(_x, _y, _size) {
        this.size = _size;
        this.position = createVector(_x, _y);
        this.fill = color(0, 0, 0);
        this.stroke = color(255, 255, 255);
        this.strokeWeight = .125;
        this.age = 0;
        this.angle = 0;
        this.speed = 200;
    }

    draw() {
        fill(this.fill);
        noFill();
        stroke(this.stroke);
        strokeWeight(this.strokeWeight);
        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        triangle(0, -this.size / 2, -this.size / 2, this.size / 2, this.size / 2, this.size / 2);
        pop();
    }

    update() {
        this.age++;
        this.speed-=(1/15);
        this.angle = this.age/this.speed;
        if(this.speed < 0) {
            this.angle = this.age/(this.speed*-1);
        }
        this.strokeWeight = map(cos(this.age/50), -1, 1, .1, .5);
        this.stroke = color(this.strokeWeight*500, 60, 80);
    }
}

function mouseDragged() {

    followers.push(new Follower(mouseX, mouseY, sizeTracker));
    sizeTracker+=0.05;

}

function mouseReleased() {
    sizeTracker = 0;
}