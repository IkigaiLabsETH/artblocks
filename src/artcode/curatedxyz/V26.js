const numParticles = 1000;
const maxStepSize = 5;
const flowScale = 0.005;
const flowForce = 0.1;
const noiseSpeed = 0.001;
const colorScheme = ["#B15533", "#BE968D", "#FFF78D", "#F2EFC1", "#FFC171"];
let particles = [];
let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < numParticles; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 10);
  for (let i = 0; i < particles.length; i++) {
    particles[i].move();
    particles[i].draw();
  }
  time += noiseSpeed;
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.prevPos = this.pos.copy();
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.color = random(colorScheme);
    this.size = random(1, 5);
  }

  move() {
    this.prevPos = this.pos.copy();
    this.acc = p5.Vector.fromAngle(flowField(this.pos.x, this.pos.y) * 360);
    this.acc.mult(flowForce);
    this.vel.add(this.acc);
    this.vel.limit(maxStepSize);
    this.pos.add(this.vel);
    this.edges();
  }

  draw() {
    stroke(this.color);
    strokeWeight(this.size);
    line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
  }

  edges() {
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  }
}

function flowField(x, y) {
  let angle = noise(x * flowScale, y * flowScale, time) * TWO_PI;
  return angle;
}
