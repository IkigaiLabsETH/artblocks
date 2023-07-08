let angle = 0;
let kitten;

function preload() {
  kitten = loadImage('kitten0.jpg');
}

function setup() {
  createCanvas(400, 300, WEBGL);
}

function draw() {
  let dx = mouseX - width / 2;
  let dy = mouseY - height / 2;
  let v = createVector(dx, dy, 0);
  v.div(100);

  // Don't add lighting
  // ambientLight(255);
  // directionalLight(255, 255, 255, v);
  background(175);

  push();
  rotateX(angle);
  rotateY(angle * 0.3);
  rotateZ(angle * 1.2);

  noStroke();
  //ambientMaterial(0, 0, 255);
  texture(kitten);
  box(100);
  pop();

  // translate(0, 100);
  // rotateX(HALF_PI);
  // ambientMaterial(255);
  // plane(500, 500);

  angle += 0.03;
}