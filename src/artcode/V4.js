// ALOHA

let shapes = [];
const shapesNum = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  for (let i = 0; i < shapesNum; i++) {
    shapes.push(new Shape());
  }
}

function draw() {
  // background("#E7ECF2");

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
  }

  move() {
    this.x = width * noise(this.n, this.nx);
    this.y = height * noise(this.n, this.ny);
    this.n += 0.005;
  }

  display() {
    circle(this.x, this.y, this.d);
  }
}