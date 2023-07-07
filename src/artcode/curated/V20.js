// -----------------------------------------------------------------------------------------------------
/*
Variables and functions only needed for testing
Remove when publishing
*/

function randomHash(nChar) {
    // convert number of characters to number of bytes
    var nBytes = Math.ceil(nChar = (+nChar || 8) / 2);

    // create a typed array of that many bytes
    var u = new Uint8Array(nBytes);

    // populate it with crypto-random values
    window.crypto.getRandomValues(u);

    // convert it to an Array of Strings (e.g. "01", "AF", ..)
    var zpad = function (str) {
        return '00'.slice(str.length) + str
    };
    var a = Array.prototype.map.call(u, function (x) {
        return zpad(x.toString(16))
    });

    // Array of String to String
    var str = a.join('').toUpperCase();
    // and snip off the excess digit if we want an odd number
    if (nChar % 2) str = str.slice(1);

    // return what we made
    return str;
}

// -----------------------------------------------------------------------------------------------------

/*
Intrinsic Element Variables

Palette
  Warm
  Cool
  Mixed
Complexity
  Minimal
  Balanced
  Complex
Organization
  Chaotic
  Ordered
  Emergent

*/

let Palette; // Warm, Cool, Mixed
let Complexity; // Minimal, Balanced, Complex
let Organization; // Chaotic, Ordered, Emergent

let seed;
let imageDimension;
let referenceRatio;
let referenceDimension;

let colors = [];
let colorCategory, colorScheme;


function setup() {  
  //let seedText = "10000692444435B353015285111111866ADCF3FF0999999AB2F92B499010FFFF";
  let seedText = randomHash(64);
  seed = parseInt(seedText.slice(0, 16), 16);
  chooseElementVariables();
  referenceDimension = rangeFloor(800,1600);
  imageDimension = Math.min(windowWidth, windowHeight);
  referenceRatio = imageDimension/referenceDimension;
  
  colorScheme = random(["monochromatic", "analogous", "complementary", "splitComplementary", "triadic", "square", "tetradic"]);
  console.log("colorSceheme: " + colorScheme);
  colorMode(HSB, 360, 100, 100, 100);
  colors = generatePalette(Palette);
  let colorObj = colors[0];
  //colorMode(HSB);
  
  createCanvas(imageDimension, imageDimension);  
  getArt();

}

function chooseElementVariables() {
  let paletteRand = rnd();
  let complexityRand = rnd();
  let organizationRand = rnd();
  if (paletteRand < (1/3)) {Palette = "Warm"} else 
  if (paletteRand < (2/3)) {Palette = "Cool"} else 
  Palette = "Mixed";
  //if (paletteRand < (1/2)) {Palette = "Warm"} else 
  //Palette = "Cool";
  
  if (complexityRand < (1/3)) {Complexity = "Minimal"} else 
  if (complexityRand < (2/3)) {Complexity = "Balanced"} else 
  //Complexity = "Minimal";
  Complexity = "Complex";
  
  //if (organizationRand < (3/3)) {Organization = "Ordered"} else 
  if (organizationRand < (1/3)) {Organization = "Chaotic"} else 
  if (organizationRand < (2/3)) {Organization = "Ordered"} else 
  Organization = "Emergent";
  
  console.log("Palette: " + Palette);
  console.log("Complexity: " + Complexity);
  console.log("Organization: " + Organization);

  
}

function getArt() {

  //seed = parseInt(hexHash.slice(0, 16), 16);
  
  let lineColor;
  let lineLength;
  let rotateInner;
  let rotateOuter;
  let translateX;
  let translateY;
  let noiseAmount;
  let startAngle;
  let maxNumRibbons;
  let colorObj;
  let numColumns = rangeFloor(3,9);
  let numRows = rangeFloor(3,9);
  
  switch (Complexity)  {
    case "Minimal":
      maxNumRibbons = range(3, 6);
      break;
    case "Balanced":
      maxNumRibbons = range(16, 24);
      break;
    case "Complex": 
      maxNumRibbons = range(40, 52);
      break;
  }

  colorMode(HSB, 360, 100, 100, 100);
  push();  
  console.log("maxNumRibbons: " + maxNumRibbons);
  
  // --- draw background ------------------------------
  
  let tempH;
  
  /*
  switch (Palette)  {
    case "Warm":
      tempH = (range(270, 450) % 360);
      break;
    case "Cool":
      tempH = range(91, 269);
      break;
    case "Mixed": 
      tempH = range(0, 360); 
      break;
  }
  background(tempH, rangeFloor(60,100), rangeFloor(80,100));
  */
  colorObj = colors[0];
  //colorMode(HSB);
  console.log("base hue: " + hue(colorObj.color));
  let tempHue = (hue(colorObj.color) + 390 + (rangeFloor(0,2) * -60)) % 360;
  console.log("background hue: " + tempHue);
  background(tempHue, rangeFloor(90,100), rangeFloor(90,100));

  
  // --- draw foreground ------------------------------
  
  rotateInner = range(-1,1);
  rotateOuter = range(-0.5,0.5);
  translateX = range(-1,1) * referenceRatio;
  translateY = range(-1,1) * referenceRatio;
  lineLength = range(0.05, 0.8) * imageDimension;
  
  noiseAmount = 0;
  
  colorMode(HSB, 360, 100, 100, 100);
  for (let ribbonNum = 0; ribbonNum < maxNumRibbons; ribbonNum++) {

    push();
    
    /*
    switch (Palette)  {
      case "Warm":
        tempH = (range(270, 450) % 360);
        break;
      case "Cool":
        tempH = range(91, 269);
        break;
      case "Mixed": 
        tempH = (tempH + range(140, 220)) % 360;
        break;
    }
    lineColor = color(tempH, 100, 100, 15);
    */
    
    colorObj = weightedRandom(colors);  // select a weighted random color from the palette
    
    stroke(colorObj.color);
    
    //console.log(colorObj.color + " ");
    strokeWeight(0.001 * imageDimension);
    angleMode(DEGREES);
    switch (Organization)  {
      case "Chaotic":
        rotateInner = range(-1,1);
        rotateOuter = range(-0.5,0.5);
        translateX = range(-1,1) * referenceRatio;
        translateY = range(-1,1) * referenceRatio;
        lineLength = range(0.05, 0.8) * imageDimension;
        //noiseAmount = range(0.0000, 0.01);        
        noiseAmount = Math.pow(range(0.1,1), 8) * 50;
        break;
      case "Ordered":
        if (range(0,1) < 0.10) {
          rotateInner = range(-1,1);
        }
        break;
      case "Emergent": 
        rotateInner = range(-1,1);
        rotateOuter = range(-0.5,0.5);
        translateX = range(-1,1) * referenceRatio;
        translateY = range(-1,1) * referenceRatio;
        lineLength = range(0.05, 0.8) * imageDimension;
        break;
    }
      
    //translate(range(0,imageDimension),range(0,imageDimension));
    let newX = range(imageDimension * 0.1, imageDimension * 0.9);
    let newY = range(imageDimension * 0.1, imageDimension * 0.9);    
    if (Organization === "Ordered") {
      newX = roundToNearest(newX, 1/numColumns * imageDimension);      
      newY = roundToNearest(newY, 1/numRows * imageDimension);
      translate(newX, newY);
    } else {
      translate(newX + ((rnd() * 2 - 1) * Math.pow(rnd(),3) * 0.1),newY + ((rnd() * 2 - 1) * Math.pow(rnd(),3) * 0.1));  
    }
    
    
    
      
    //translate(range(0,500),range(0,500));
    //translate(range(0,1)*imageDimension,range(0,1)*imageDimension);    
    
    //console.log("lineLength: " + lineLength);
    
    //for (let i=0; i<imageDimension * 2; i++) {
    let perlin = 0.0;
    let lineAdjustment = 0;
    for (let i=0; i<referenceDimension; i++) {
      push();
      perlin += 0.1;
      lineAdjustment = (noiseAmount > 0) ? ((3 * noise(i * 0.8) - 1) * lineLength) : 0;
      //rotate(i * rotateInner * range(1 - (2*noiseAmount), 1 +(2*noiseAmount)));
      rotate(i * rotateInner);
      //line(0,0,0,lineLength * range(1-noiseAmount, 1+noiseAmount));
      line(0,0,0,lineLength + lineAdjustment);
      pop();    
      //rotate(rotateOuter * range(1 - (1*noiseAmount), 1 +(1*noiseAmount)));
      rotate(rotateOuter);
      translate(translateX * range(1-noiseAmount, 1+noiseAmount), translateY * range(1-noiseAmount, 1+noiseAmount));
    }
  
    pop(); 
  }
  
  let theData = canvas.toDataURL();
  return theData;
}


function generatePalette(category) {
  let palette = [];
  let weights = [];
  let baseHue;

  switch (category) {
    case "Warm":
      baseHue = random(390, 420) % 360;  // hue for red-orange (warm) range
      break;
    case "Cool":
      baseHue = random(120, 240);  // hue for green-blue (cool) range
      break;
    case "Mixed":
      baseHue = random(0, 360);  // hue for any color
      break;
  }
  let hues = [];
  switch (colorScheme) {
    case "monochromatic":
      hues = Array(5).fill(baseHue);
      break;
    case "analogous":
      for (let i = 0; i < 5; i++) {
        hues.push((baseHue + (i * 30)) % 360);
      }
      break;
    case "complementary":
      hues = [baseHue, (baseHue + 180) % 360];
      //while (hues.length < 5) hues.push(random(360));
      break;
    case "splitComplementary":
      hues = [baseHue, (baseHue + 150) % 360, (baseHue + 210) % 360];
      //while (hues.length < 5) hues.push(random(360));
      break;
    case "triadic":
      hues = [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360];
      //while (hues.length < 5) hues.push(random(360));
      break;
    case "square":
      hues = [baseHue, (baseHue + 90) % 360, (baseHue + 180) % 360, (baseHue + 270) % 360];
      //while (hues.length < 5) hues.push(random(360));
      break;
    case "tetradic":
      hues = [baseHue, (baseHue + 60) % 360, (baseHue + 180) % 360, (baseHue + 240) % 360];
      //while (hues.length < 5) hues.push(random(360));
      break;
  }
  
  for (let i = 0; i < hues.length; i++) {
    weights.push(1 / hues.length);
  }
  
  // shuffle the weights array
  weights = shuffle(weights);
  
  for (let i = 0; i < hues.length; i++) {
    let saturation = colorScheme === "monochromatic" ? random(40, 100) : random(80, 100);
    let brightness = colorScheme === "monochromatic" ? random(40, 100) : random(80, 100);
    let alpha = 15;
    palette.push({ color: color(hues[i], saturation, brightness, alpha), weight: weights[i], hue: hues[i] });
  }

  // Adjust the weights based on color temperature
  /*
  if (category != "Mixed") {
    let categoryHues = palette.filter(colorObj => getHueTemperature(colorObj.hue) === category);
    let otherHues = palette.filter(colorObj => getHueTemperature(colorObj.hue) !== category);
    
    let adjustment = (0.75 - categoryHues.reduce((total, colorObj) => total + colorObj.weight, 0)) / (categoryHues.length);
    if (categoryHues.length == 0) {
      adjustment = 0;
    }
    let totalOtherWeight = otherHues.reduce((total, colorObj) => total + colorObj.weight, 0);

    for (let colorObj of categoryHues) {
      colorObj.weight += adjustment;
    }
    for (let colorObj of otherHues) {
      colorObj.weight -= adjustment * colorObj.weight / totalOtherWeight;
    }
  }
  */
  
  if (category != "Mixed") {
    for (let i=0; i<palette.length; i++) {
      colorObj = palette[i];
      if (category === "Warm") {
        weights[i] = Math.abs(180 - colorObj.hue) / 180; // warmest = 1.0
      } else {
        weights[i] = 1 - Math.abs(180 - colorObj.hue)  / 180; // coolest = 1.0
      }
      //console.log("weight before normalize " + i + ": " + weights[i]);
    }
    weights = normalizeWeights(weights);
    for (let i=0; i<palette.length; i++) {
      colorObj = palette[i];
      //console.log("weight " + i + ": " + colorObj.weight);
      console.log("hue " + i + ": " + hue(colorObj.color));
      colorObj.weight = weights[i];
      //palette[i].weight = weights[i];
      //console.log("weight normalized " + i + ": " + colorObj.weight);
    }
  }

  return palette;

}

function normalizeWeights(weights) {
  //let newWeights = weights;
  // build new array with length of weight
  let weighed_list = Array.apply(null, { length: weights.length });
  // get the sum of all weights
  let sum = weights.reduce(function (a, b) { return a + b; }, 0);
  // final take the ratio of every weight
  weights.forEach(function (a, i) { weighed_list[i] = 1 * a / sum; });
  return weighed_list;
  
}

// This function returns a weighted random color from the palette
function weightedRandom(palette) {
  let totalWeight = palette.reduce((total, colorObj) => total + colorObj.weight, 0);
  let randomNum = random(totalWeight);
  let weightSum = 0;

  for (let colorObj of palette) {
    weightSum += colorObj.weight;
    if (randomNum <= weightSum) {
      return colorObj;
    }
  }

  return palette[palette.length - 1];  // in case rounding errors occur
}

function getHueTemperature(hue) {
  return (hue >= 10 && hue <= 50) || (hue >= 310 && hue <= 360) ? "Warm" : "Cool";
}

function roundToNearest(value, interval) {
  return Math.round(value/interval) * interval;
}

// -----------------------------------------------------------------------------------------------------
/*
  Helper functions
*/

function rnd() {
  seed ^= seed << 13;
  seed ^= seed >> 17;
  seed ^= seed << 5;
  
  let result = (((seed < 0) ? ~seed + 1 : seed) % 1000) / 1000;
  return result;
}

function range(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return rnd() * (max - min) + min;
}

function rangeFloor (min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.floor(range(min, max));
}

