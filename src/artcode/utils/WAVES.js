let w = 3000
let h = 3000
let scl = 20;
let cols;
let rows;
let xoff = 0;
let displacement = 0;

function setup() {
  createCanvas(800, 1000);
  cols = w / scl;
  rows = h / scl;
}

function draw() {
  displacement += 0.000009999;
  background(240);
	
  xoff = displacement;
  
  for (let y = 0; y <= h; y += scl) {
    strokeWeight(1.3);
    stroke(50, 100, 250);
    noFill();
    
    beginShape();
    vertex(0, y);
    
    

    for (let x = 0; x <= w; x += scl) {
    	let noiseScale = map(noise(x * xoff, y), 0, 1, 0, 20)  
			curveVertex(x, y + noiseScale);
    }
    xoff += 0.02;

    vertex(w, y);
    endShape();
  }
}