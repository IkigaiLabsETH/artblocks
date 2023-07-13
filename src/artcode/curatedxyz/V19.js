let noiseOffset;

function setup() {
  createCanvas(300, 300);
  noiseOffset = random(1000);
}

function draw() {
  background(240);
  drawFace();
}

function drawFace() {
  // Head
  fill(213, 114, 84);
  ellipse(150, 150, 100, 120);

  // Eyes
  fill(255);
  ellipse(130, 130, 30, 20);
  ellipse(170, 130, 30, 20);

  // Pupils
  let pupilOffsetX = map(mouseX, 0, width, -5, 5);
  let pupilOffsetY = map(mouseY, 0, height, -5, 5);

  fill(0);
  ellipse(130 + pupilOffsetX, 130 + pupilOffsetY, 10, 10);
  ellipse(170 + pupilOffsetX, 130 + pupilOffsetY, 10, 10);

  // Nose
  fill(240, 199, 60);
  beginShape();
  vertex(150, 140);
  vertex(150, 160);
  vertex(165, 150);
  endShape(CLOSE);

  // Mouth
  let mouthHeight = map(mouseY, 0, height, -20, 20);
  let mouthArcStart = map(mouseY, 0, height, 0, PI);
  let mouthArcEnd = map(mouseY, 0, height, PI, 0);

  fill(60, 48, 41);
  arc(150, 175, 50, mouthHeight, mouthArcStart, mouthArcEnd);

  // Eyebrows
  let eyebrowRotation = map(mouseY, 0, height, -PI / 4, PI / 4);
  
  push();
  translate(130, 110);
  rotate(eyebrowRotation);
  fill(0);
  rect(-15, -5, 30, 5);
  pop();

  push();
  translate(170, 110);
  rotate(-eyebrowRotation);
  fill(0);
  rect(-15, -5, 30, 5);
  pop();

  // Hair
  noFill();
  stroke(0);
  for (let i = 180; i < 360; i += 10) {
    let angle = radians(i);
    let x1 = 150 + cos(angle) * 50;
    let y1 = 150 + sin(angle) * 60;
    let windStrength = map(mouseX, 0, width, 50, -50);
    let x2 = x1 + windStrength + noise(noiseOffset + i) * 50 - 25;
    let y2 = y1 + 50 + noise(noiseOffset + i + 100) * 50 - 25;

    let controlX1 = x1 + windStrength / 2;
    let controlY1 = y1 + (y2 - y1) / 2;
    let controlX2 = x2 - windStrength / 2;
    let controlY2 = y1 + (y2 - y1) / 2;

    bezier(x1, y1, controlX1, controlY1, controlX2, controlY2, x2, y2);
  }

  // Update noise offset
  noiseOffset += 0.01;
}
