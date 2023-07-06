// example using lingdong's jumpflood.js to do signed distance function for a contour
// in p5.js
//
// more demos:
// https://jfa.glitch.me/
//
// library documentation:
// https://glitch.com/edit/#!/jfa?path=README.md

let contours;
let scaling = 512/800;

let jfa;

function preload(){
  // some interesing shapes to try: https://github.com/LingDong-/interesting-polygon-archive
  contours = loadJSON("https://raw.githubusercontent.com/LingDong-/interesting-polygon-archive/master/json/skimage-horse.json");
}
function setup() {
  pixelDensity(1);
  
  createCanvas(512,512);
  background(0);
  
  // init input graphics
  let pg_inp = createGraphics(512,512);
  
  // init output graphics
  let pg_out = createGraphics(pg_inp.width,pg_inp.height);
  
  // draw the input shape
  // - background should be transparent
  // - foreground can be any OPAQUE color
  
  // use stroke if sign is unimportant:
  // pg_inp.stroke(255);
  // pg_inp.strokeWeight(2);
  // pg_inp.noFill();
  
  // use fill and do two passes (for interior and exterior):
  pg_inp.noStroke();
  pg_inp.fill(255);
  
  pg_inp.beginShape();
  for (let i in contours){ // stupid loadJSON() parses arrays into objects
                           // otherwise should be (let i = 0; i < contours.length; i++)
    if (Number(i)) pg_inp.beginContour();
    for (let j = 0; j < contours[i].length; j++){
      pg_inp.vertex(contours[i][j][0]*scaling,contours[i][j][1]*scaling);
    }
    if (Number(i)) pg_inp.endContour();
  }
  pg_inp.endShape(CLOSE);
  
  // initialize jumpflooding shaders (once only)
  jfa = new JumpFlood(pg_inp.canvas);
  
  // process the image (every time the image changes)
  jfa.process();
  jfa.distanceTransform();
  jfa.readout(pg_out.canvas);
  
  // visualize the output inverted, so that pixels closer to the contour is brighter
  // (just easier to see what the thing is)
  pg_out.filter(INVERT);
  tint(255,0,0);
  image(pg_out,0,0);
  
  // again for the interior:
  
  pg_inp.clear();
  pg_inp.noStroke();
  pg_inp.fill(255);
  
  // draw the "inverted" contour as holes in a canvas-sized rect
  pg_inp.beginShape();
  pg_inp.vertex(0,0);
  pg_inp.vertex(pg_inp.width,0);
  pg_inp.vertex(pg_inp.width,pg_inp.height);
  pg_inp.vertex(0,pg_inp.height);
  pg_inp.vertex(0,0);
  for (let i in contours){
    pg_inp.beginContour();
    for (let j = contours[i].length-1; j>=0; j--){
      pg_inp.vertex(contours[i][j][0]*scaling,contours[i][j][1]*scaling);
    }
    pg_inp.endContour();
  }
  pg_inp.endShape(CLOSE);

  
  jfa.process();
  jfa.distanceTransform();
  jfa.readout(pg_out.canvas);
  
  pg_out.filter(INVERT);
  blendMode(LIGHTEST)
  tint(0,255,0);
  image(pg_out,0,0);
}

function draw() {
  
}