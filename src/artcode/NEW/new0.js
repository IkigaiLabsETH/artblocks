let margin = 48;

function setup() {
  createCanvas(1000, 1000);
  noLoop();
  strokeWeight(24);
}

function draw() {
  let thirdColor = random([[252, 48, 50], [254, 213, 48], [51, 195, 251], [255, 123, 172], [253, 169, 41]]);
  let colors = [255, 0, thirdColor];
  
  background(colors[0]);
  let n = floor(random(12, 17));
  
  fill(colors[2]);
  stroke(colors[2]);
  rect(margin, margin, width-2*margin, height-2*margin);
  noFill();
  
  stroke(colors[1]);
  let wSize = (width-2*margin)/n;
  let hSize = (height-2*margin)/n;
  for (let i = 0; i < n; i++) {
    stroke(colors[1]);
    let i = floor(random(n-1));
    let j = floor(random(n-1));
    let x = i*wSize+margin;
    let y = j*hSize+margin;
    let w = floor(random(1, n-i+1))*wSize;
    let h = floor(random(1, n-j+1))*hSize;
    rect(x, y, w, h);
  }
}

function keyPressed() {
  if (key === "D") {
    draw();
  }
}