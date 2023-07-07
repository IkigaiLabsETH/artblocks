let armLength = 240;
let armWidth = armLength * 0.42;
let startRadialSpace = 800;
let startSpaceDifference = 400;
let innerSpace = 5;
let numLogos = 18;
let allLogos = [];
let allShapeColors = [];
let speedMax = 0.5;
let speedMin = 0.5;
let minOpacityMin = 1;
let minOpacityMax = 10;
let opacityDifference = 8;


function initColors() {
  
  // actual desaturated color as alpha values
  allShapeColors[0] = 91;
  allShapeColors[1] = 91;
  allShapeColors[2] = 50;
  allShapeColors[3] = 50;
  allShapeColors[4] = 47;
  allShapeColors[5] = 47;
  allShapeColors[6] = 81;
  allShapeColors[7] = 81;
  allShapeColors[8] = 140;
  allShapeColors[9] = 140;
  allShapeColors[10] = 148;
  allShapeColors[11] = 148;
  
}


function getShapeColors(minOpacity = -1, maxOpacity = -1) {
  // return an array of colors based on default logo palette 
  // modified to be between minOpacity and maxOpacity
  // minOpacity or maxOpacity values: 0-255
  // if no parameters, then use the existing default palette
  let curMin = allShapeColors[0];
  let curMax = allShapeColors[0];
  let shapeColors = [];
  
  // Get min and max opacities for default palette
  for (let i=0; i<allShapeColors.length; i++) {
    if (allShapeColors[i] < curMin) {
      curMin = allShapeColors[i];
    }
    if (allShapeColors[i] > curMax) {
      curMax = allShapeColors[i];
    }
  }
  
  // if not using the default palette, 
  // then scale all colors to be between the new min and max opacity
  for (let i=0; i<allShapeColors.length; i++) {
    if (minOpacity > maxOpacity || minOpacity == -1 || maxOpacity == -1) {
      shapeColors[i] = color(0, allShapeColors[i]);
    } else {
      shapeColors[i] = color(0, minOpacity + ((maxOpacity - minOpacity) * (allShapeColors[i] / curMax)));
    }    
  }
  
  return shapeColors;
  
}


function addLogo(logoX,logoY) {

  let allShapes = [];
  for (let i=0; i<12; i++) {
    let currentPoints = [];
    for (let j=0; j<4; j++) {
      currentPoints.push(createVector(0,0));
    }
    const curShape = {
      points: currentPoints,
      speed: random(speedMax,speedMin),
      curRadialSpace: startRadialSpace + random(-startSpaceDifference, startSpaceDifference)      
    }
    allShapes.push(curShape);
  }
  
  let curMinOpacity = random(minOpacityMin, minOpacityMax);
  let curMaxOpacity = curMinOpacity + opacityDifference;
  
  const curLogo = {
    x:logoX,
    y:logoY,
    shapes: allShapes,
    //curRadialSpace: startRadialSpace,
    //speed: random(speedMax,speedMin),
    minOpacity: curMinOpacity,
    maxOpacity: curMaxOpacity
  };
  
  allLogos.push(curLogo);
  
}

function updateSpace() {
  
  for (let curLogo=0; curLogo<allLogos.length; curLogo++) {
    //console.log("hi");
    for (let curShape=0; curShape<allLogos[curLogo].shapes.length; curShape++) {
      //console.log(allLogos[curLogo].shapes[curShape].curRadialSpace);
      if (allLogos[curLogo].shapes[curShape].curRadialSpace != 0) {
        allLogos[curLogo].shapes[curShape].curRadialSpace *= allLogos[curLogo].shapes[curShape].speed;
        //console.log(allLogos[curLogo].shapes[curShape].curRadialSpace);
      }

      if (allLogos[curLogo].shapes[curShape].curRadialSpace < 0.1) {
        allLogos[curLogo].shapes[curShape].curRadialSpace = 0;
      }
    }

  }
  
}

function updateLength() {
  
}

function updateLogos() {
  // shapes start at top and go around clockwise, s1-s12
  
  for (let curLogo=0; curLogo<allLogos.length; curLogo++) {
    for (let curShape=0; curShape<allLogos[curLogo].shapes.length; curShape++) {
      let curLogoX = allLogos[curLogo].x;
      let curLogoY = allLogos[curLogo].y;
      let curRadialSpace = allLogos[curLogo].shapes[curShape].curRadialSpace;
      
      if (curShape % 2 == 0) {
        
        // left half of "V"
        
        // outer left corner
        allLogos[curLogo].shapes[curShape].points[0].x = 
          curLogoX + 
          (cos(90 - (Math.floor((curShape+2)/4)*120)) * innerSpace) + 
          (cos(90 - (curShape * 30)) * curRadialSpace) +
          (cos(90 - (curShape * 30)) * armLength);
        allLogos[curLogo].shapes[curShape].points[0].y = 
          curLogoY - 
          (sin(90 - (Math.floor((curShape+2)/4)*120)) * innerSpace) - 
          (sin(90 - (curShape * 30)) * curRadialSpace) -
          (sin(90 - (curShape * 30)) * armLength);

        // outer right corner
        allLogos[curLogo].shapes[curShape].points[1].x = 
          curLogoX + 
          (cos(90 - (Math.floor((curShape+2)/4)*120)) * innerSpace) +
          (cos(90 - (curShape * 30)) * curRadialSpace) +
          (cos(90 - (curShape * 30)) * armLength) +
          (sin(60 - (curShape * 30)) * armWidth);
        allLogos[curLogo].shapes[curShape].points[1].y = 
          curLogoY - 
          (sin(90 - (Math.floor((curShape+2)/4)*120)) * innerSpace) - 
          (sin(90 - (curShape * 30)) * curRadialSpace) -
          (sin(90 - (curShape * 30)) * armLength) +
          (cos(60 - (curShape * 30)) * armWidth);

        // inner right corner
        allLogos[curLogo].shapes[curShape].points[2].x = 
          curLogoX + 
          (cos(90 - (Math.floor((curShape+2)/4)*120)) * innerSpace) +
          (cos(90 - (curShape * 30)) * curRadialSpace) +
          (cos(30 - (curShape * 30)) * armWidth);
        allLogos[curLogo].shapes[curShape].points[2].y = 
          curLogoY - 
          (sin(90 - (Math.floor((curShape+2)/4)*120)) * innerSpace) - 
          (sin(90 - (curShape * 30)) * curRadialSpace) -
          (sin(30 - (curShape * 30)) * armWidth);

        // inner left corner (logo center)
        allLogos[curLogo].shapes[curShape].points[3].x = 
          curLogoX + 
          (cos(90 - (Math.floor((curShape+2)/4)*120)) * innerSpace) +
          (cos(90 - (curShape * 30)) * curRadialSpace);
        allLogos[curLogo].shapes[curShape].points[3].y = 
          curLogoY - 
          (sin(90 - (Math.floor((curShape+2)/4)*120)) * innerSpace) -
          (sin(90 - (curShape * 30)) * curRadialSpace); 
        
      } else {
        
        // right half of "V"
      
        // outer left corner
        allLogos[curLogo].shapes[curShape].points[0].x = 
          curLogoX + 
          (cos(90 - (Math.floor((curShape+1)/4)*120)) * innerSpace) + 
          (cos(60 - ((curShape) * 30)) * curRadialSpace) +
          (cos(60 - ((curShape) * 30)) * armLength) -
          (sin(90 - (curShape * 30)) * armWidth);
        allLogos[curLogo].shapes[curShape].points[0].y = 
          curLogoY - 
          (sin(90 - (Math.floor((curShape+1)/4)*120)) * innerSpace) - 
          (sin(60 - ((curShape) * 30)) * curRadialSpace) -
          (sin(60 - ((curShape) * 30)) * armLength) -
          (cos(90 - (curShape * 30)) * armWidth);

        // outer right corner
        allLogos[curLogo].shapes[curShape].points[1].x = 
          curLogoX + 
          (cos(90 - (Math.floor((curShape+1)/4)*120)) * innerSpace) + 
          (cos(60 - ((curShape) * 30)) * curRadialSpace) +
          (cos(60 - ((curShape) * 30)) * armLength);
        allLogos[curLogo].shapes[curShape].points[1].y = 
          curLogoY - 
          (sin(90 - (Math.floor((curShape+1)/4)*120)) * innerSpace) - 
          (sin(60 - ((curShape) * 30)) * curRadialSpace) -
          (sin(60 - ((curShape) * 30)) * armLength);       

        // inner right corner (logo center)
        allLogos[curLogo].shapes[curShape].points[2].x = 
          curLogoX + 
          (cos(90 - (Math.floor((curShape+1)/4)*120)) * innerSpace) +
          (cos(60 - (curShape * 30)) * curRadialSpace);
        allLogos[curLogo].shapes[curShape].points[2].y = 
          curLogoY - 
          (sin(90 - (Math.floor((curShape+1)/4)*120)) * innerSpace) -
          (sin(60 - (curShape * 30)) * curRadialSpace);      
   
        // inner left corner
        allLogos[curLogo].shapes[curShape].points[3].x = 
          curLogoX + 
          (cos(90 - (Math.floor((curShape+2)/4)*120)) * innerSpace) +
          (cos(60 - (curShape * 30)) * curRadialSpace) +
          (cos(120 - ((curShape) * 30)) * armWidth);
        allLogos[curLogo].shapes[curShape].points[3].y = 
          curLogoY - 
          (sin(90 - (Math.floor((curShape+2)/4)*120)) * innerSpace) - 
          (sin(60 - (curShape * 30)) * curRadialSpace) -
          (sin(120 - ((curShape) * 30)) * armWidth);        
        
      }      
    }
  }  
}


function drawLogos() {
  
  for (let curLogo=0; curLogo<allLogos.length; curLogo++) {
    let curColors = getShapeColors(allLogos[curLogo].minOpacity, allLogos[curLogo].maxOpacity);
    for (let curShape=0; curShape<allLogos[curLogo].shapes.length; curShape++) {
      beginShape();
      fill(curColors[curShape]);
      vertex(allLogos[curLogo].shapes[curShape].points[0].x, allLogos[curLogo].shapes[curShape].points[0].y);
      vertex(allLogos[curLogo].shapes[curShape].points[1].x, allLogos[curLogo].shapes[curShape].points[1].y);
      vertex(allLogos[curLogo].shapes[curShape].points[2].x, allLogos[curLogo].shapes[curShape].points[2].y);
      vertex(allLogos[curLogo].shapes[curShape].points[3].x, allLogos[curLogo].shapes[curShape].points[3].y);
      endShape();
    }
  }
  
}

function setup() {
  
  angleMode(DEGREES);
  //createCanvas(artWidth, artHeight);
  createCanvas(windowWidth, windowHeight);
  initColors();
  background(255);
  noStroke();
  
  for (let i=0; i< numLogos/2; i++) {
    addLogo(random(width * 0.01, width * 0.50), random(height / numLogos * i * 2, height / numLogos * (i+1) * 2));
    addLogo(random(width * 0.50, width * 0.99), random(height / numLogos * i * 2, height / numLogos * (i+1) * 2));
  }

}

function draw() {
  
  background(255);
  updateSpace();
  updateLogos();
  drawLogos();

}


