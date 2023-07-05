// ALOHA

let shapes = [];
const shapesNum = 10;

const palette = ["#0276D1", "#011E60", "#79BCC9", "#F6F5BE", "#269182"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  for (let i = 0; i < shapesNum; i++) {
    shapes.push(new Shape());
  }
}

function draw() {
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].move();
    shapes[i].display();
  }
}

class Shape {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.d = random(10, 50);
    this.nx = random(1000);
    this.ny = random(1000);
    this.n = random(1000);
    this.rotateSpeed = random(3, 10) * random([-1, 1]);
    this.c = random(palette);
  }

  move() {
    this.x = map(noise(this.n, this.nx), 0, 1, -width * 0.5, width * 1.5);
    this.y = map(noise(this.n, this.ny), 0, 1, -height * 0.5, height * 1.5);
    this.n += 0.005;
  }

  display() {
    fill(this.c);
    push();
    translate(this.x, this.y);
    rotate(frameCount * this.rotateSpeed);
    beginShape();
    for (let i = 0; i < 360; i += 360 / 6) {
      vertex(cos(i) * this.d, sin(i) * this.d);
    }
    endShape(CLOSE);
    pop();
  }
}
