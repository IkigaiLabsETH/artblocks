
var colorInc = 0.3;  // Color change speed
var sat = 100; // saturation max 100
var brt = 100; // brightness max 100
var alph = 5; // alpha max 100
var numbPart = 300; // number of particles
var partStroke = 1; // line width
var angMult = 2; // 0.1 = straighter lines; 25+ = sharp curves
var angTurn = 3.8; // adjust angle for straight lines (after adjusting angMult)
var zOffInc = 0.0003; // speed of vector changes
var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff = 0;
var fr;
var particles = [];
var flowfield;
var hu = 0;
var p = 1;

function setup() {
  createCanvas(500,500);   //windowWidth-20, windowHeight-20);
  colorMode(HSB,359,100,100,100);

  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < numbPart; i++) {
    particles[i] = new Particle();
  }
  background(90);
}

function draw() {
  if (p>0){
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff)*angMult+angTurn;  
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      // stroke(100, 50);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;
    zoff += zOffInc;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  // fr.html(floor(frameRate()));
  hu +=colorInc; if (hu >359){hu=0}
}
  partStroke = partStroke + random (-1,1);
  if (partStroke < 1){partStroke = 1} 
  if (partStroke >10){partStroke = 10}
  angTurn = angTurn + random(-0.1,0.1);
  colorInc = colorInc +random (-0.01,0.01); if (colorInc < 0.5){colorInc = 0.5} if (colorInc > 1.5){colorInc = 1.5}
  sat = sat + random (-2,2); if (sat<70){sat = 70} if (sat >100) {sat = 100}
  brt = brt + random (-2,2); if (brt<70){brt = 70} if (brt >100) {brt = 100}
  alph = alph + random (-0.5,0.5); if (alph<2){alph = 2} if (alph >20) {alph = 20}
  angMult = angMult + random (-0.5,0.5); if (angMult <0.5){angMult = 0.5} if (angMult > 7) {angMult = 7} 
}
function mousePressed(){
  p=p*-1;
}
// Save art as jpg.
function keyTyped() {
  if (key === "s") {
    save("myCanvas.jpg");
  }
}