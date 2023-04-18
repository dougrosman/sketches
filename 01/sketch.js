let followers = [];

function setup() {
    createCanvas(3 * innerWidth/4, 3 * innerHeight/4);
    background(255);

}

function draw() {
    background(255);
    followers.forEach((f)=> {
        f.draw();
        f.update();
    })
}

function windowResized() {
    resizeCanvas(3 * innerWidth/4, 3 * innerHeight/4);
}

class Follower {

    constructor(_x, _y) {
        this.size = 20;
        this.position = createVector(_x, _y);
        this.fill = color(0, 0, 0);
        this.stroke = color(0, 255, 0);
        this.age = 0;
        this.angle = 0;
    }

    draw() {
        fill(this.fill);
            stroke(this.stroke);
            push();
            translate(this.position.x, this.position.y);
            rotate(this.angle);
            triangle(0, -this.size/2, -this.size, this.size, this.size, this.size);
        pop();
    }

    update() {
        this.age++;
        this.angle = sin(this.age/2*PI);
        
    }
}

function mouseDragged() {

    followers.push(new Follower(mouseX, mouseY));

}