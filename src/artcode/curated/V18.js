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

// tokenData will be injected
let tokenData = {"hash":"0x"+randomHash(64),"tokenId":"61012305230532"};  
//let tokenData = {"hash":"0x"+"A0611121111135B353015285144C3D866ADCF3FF07FF3E7AB2192B41F010FFFF","tokenId":"61012305230532"};
// -----------------------------------------------------------------------------------------------------





// -----------------------------------------------------------------------------------------------------
/*
Project-specific variables
*/
let seed = parseInt(tokenData.hash.slice(0, 16), 16);
let dim;
let maleFaceData = [];
let femaleFaceData = [];


// Generative Properties

// labeled integers
let leftSilhouetteStyle;
let rightSilhouetteStyle;
let colorBlendStyle;
let numKnots;
let backgroundStyle;
let backgroundLightnessStyle;
let leftHairStyle;
let rightHairStyle;
let leftHairChaos;
let rightHairChaos;


// labeled booleans
let leftFlipped;
let rightFlipped;
let rotate90;
let faceLines;
let attached;
let drawHair;
let leftGenderFemale;
let rightGenderFemale; 
let sparse;
let sixtyNine;
let monochromatic;


// unlabeled ranges
let rootHue;
let bgSaturation;
let bgBrightness;
let bgLightness;
let hueDifference;
let lineSaturation;
let lineBrightness;
let rowEntropy;
let attachmentMultiplier;
let edgeBoldness;
let colorAdjustFactor;
let spacingMultiplier;
let weaveDensity;
let weaveVariation;   
let weaveWidth;
let connectLineColorVariation;



// -----------------------------------------------------------------------------------------------------





// -----------------------------------------------------------------------------------------------------
/*
Global Variable creation from random seed
*/

function generateUnlabeledVariable(numMin, numMax, power) {
  if (numMin == numMax) {return numMin}
  if (numMax == 0) {numMax = -0.00000001}
  let initialRandom = range(numMin, numMax);
  return ((initialRandom/numMax) ** power) * numMax;
}

function generateLabeledVariable(numMin, numMax, weights) {
    let i;

    for (i = 0; i < weights.length; i++) {
      weights[i] += weights[i - 1] || 0;
    }
    
    let randomTry = rnd() * weights[weights.length - 1];
    
    for (i = 0; i < weights.length; i++) {
      if (weights[i] > randomTry) {
        break;
      }
    }
  
    return numMin + i;
}

function initializeVariables() {
  // 05/24/21: updating variable selection parameters to save code. e.g. generateLabeledVariable(0, 3, [250, 250, 250, 250]); becomes rangeFloor(0,4);
  
  
  // ----- Labeled Variables (INTEGER) ----- 
  // Each possible discrete value will have a corresponding label, e.g. "Style 1", "Style 2", etc.  
  
  leftSilhouetteStyle = rangeFloor(0,4);
  rightSilhouetteStyle = rangeFloor(0,4);
  colorBlendStyle = generateLabeledVariable(0, 8, [20, 8, 8, 5, 5, 20, 30, 2, 2]);
  backgroundStyle = generateLabeledVariable(0, 6, [10, 10, 0, 35, 0, 35, 10]); // note modifiers below
  backgroundLightnessStyle = generateLabeledVariable(0, 4, [1, 3, 4, 1, 1]);
  leftHairChaos = generateLabeledVariable(0, 1, [6, 4]);
  rightHairChaos = generateLabeledVariable(0, 1, [6, 4]);
  numKnots = generateLabeledVariable(0, 3, [75, 12, 8, 5]);
  
  
  // ----- Labeled Variables (BOOLEAN) -----
  // Each variable will be labeled either "True" or "False"
  monochromatic = generateLabeledVariable(0, 1, [95, 5]);
  faceLines = generateLabeledVariable(0, 1, [15, 85]);
  attached = generateLabeledVariable(0, 1, [4, 6]); // % marriages still together after 15 years
  sparse = generateLabeledVariable(0, 1, [92, 8]);
  leftFlipped = sparse ? 0 : generateLabeledVariable(0, 1, [9, 1]);
  rightFlipped = sparse ? 0 : generateLabeledVariable(0, 1, [9, 1]);
  sixtyNine = leftFlipped != rightFlipped;  
  rotate90 = sixtyNine;  
  drawHair = (sparse || colorBlendStyle == 7 || colorBlendStyle == 8 ) ? 0 : generateLabeledVariable(0, 1, [1, 9]);
  leftGenderFemale = generateLabeledVariable(0, 1, [51, 49]); // more women than men
  rightGenderFemale = rnd() < 0.1 ? leftGenderFemale : !leftGenderFemale; // 10% of couples are same-sex
  
  if (leftGenderFemale) {
    leftHairStyle = (leftSilhouetteStyle == 2) ? generateLabeledVariable(0, 4, [3, 0, 3, 2, 2]) : generateLabeledVariable(0, 4, [0, 0, 2, 3, 5]);
  } else {
    leftHairStyle = (leftSilhouetteStyle == 2) ? 0 : generateLabeledVariable(0, 4, [8, 0, 2, 0, 0]);
  }
  
  if (rightGenderFemale) {
    rightHairStyle = (rightSilhouetteStyle == 2) ? generateLabeledVariable(0, 4, [3, 0, 3, 2, 2]) : generateLabeledVariable(0, 4, [0, 0, 2, 3, 5]);
  } else {
    rightHairStyle = (rightSilhouetteStyle == 2) ? 0 : generateLabeledVariable(0, 4, [8, 0, 2, 0, 0]);
  }

  if (!drawHair) {
    leftHairStyle = 0;
    rightHairStyle = 0;
  }
  
  
  // ----- Unlabeled Variables -----
  // Each property will simply be represented by a number. 
  // Properties may have an exponential distribution.
  
  rootHue = generateUnlabeledVariable(0, 360, 1); // hue is up to 360
  hueDifference = generateUnlabeledVariable(0, 30, 2); // this can be up to 360, but should be <= 90
  lineSaturation = generateUnlabeledVariable(90, 100, 1); // saturation is up to 100
  lineBrightness = generateUnlabeledVariable(90, 100, 1); // brightness is up to 100
  rowEntropy = generateUnlabeledVariable(0.0, 1.0, 1); // 0.0 = all row colors the same, 1.0 = all row colors randomly shuffled
  attachmentMultiplier = generateUnlabeledVariable(0.0, 1.0, 1); // 0 = normal distance, 1 = extreme 
  edgeBoldness = attached ? generateUnlabeledVariable(0.4, 1.0, 1) : 1.0;
  colorAdjustFactor = generateUnlabeledVariable(1, 20, 2) * 6; 
  spacingMultiplier = sparse ? generateUnlabeledVariable(0.05, 0.08, 1.5) : generateUnlabeledVariable(0.01, 0.025, 1);
  weaveDensity = generateUnlabeledVariable(1.0, 1.0, 1); // 0 = no weaveLines, 1.0 = highest density
  weaveVariation = generateUnlabeledVariable(0.5, 0.9, 1);   
  weaveWidth = generateUnlabeledVariable(0.016, 0.018, 1);
  connectLineColorVariation = generateUnlabeledVariable(0, 1, 3);
  if (numKnots == 3) {
    numKnots = attached ? generateUnlabeledVariable(3, 6, 2) : generateUnlabeledVariable(3, 20, 1);
  }
  
  if (!faceLines) {
    backgroundLightnessStyle = generateLabeledVariable(0, 4, [1, 3, 4, 1, 1]);
    backgroundStyle = generateLabeledVariable(0, 6, [5, 5, 10, 5, 30, 20, 15]);
  }
  
  if (sparse) {
    backgroundLightnessStyle = generateLabeledVariable(0, 4, [1, 3, 4, 1, 1]);
    backgroundStyle = generateLabeledVariable(0, 6, [1, 1, 1, 1, 1, 1, 4]);
  }
  
  if (!faceLines && sparse) {
    backgroundLightnessStyle = generateLabeledVariable(0, 4, [0, 3, 4, 1, 1]);
    backgroundStyle = generateLabeledVariable(0, 6, [5, 5, 25, 5, 30, 5, 25]);
  }

  if (backgroundStyle == 2 || backgroundStyle == 4 || backgroundStyle == 6) {
    backgroundLightnessStyle = generateLabeledVariable(0, 4, [0, 0, 6, 2, 2]);
  }
  
  if (backgroundStyle == 3) {
    backgroundLightnessStyle = generateLabeledVariable(0, 4, [50, 40, 10, 0, 0]);
  }
  
  if (colorBlendStyle == 6) {
    if (rnd() < 0.8) {
      backgroundLightnessStyle = 3;
      backgroundStyle = generateLabeledVariable(0, 6, [0, 4, 0, 0, 0, 3, 3]);
    } else {
      backgroundLightnessStyle = 4;
      backgroundStyle = generateLabeledVariable(0, 6, [0, 0, 0, 5, 0, 5, 0]);
    }
    if (!faceLines) {
      backgroundLightnessStyle = generateLabeledVariable(0, 4, [15, 35, 20, 30, 0]);
      backgroundStyle = generateLabeledVariable(0, 6, [0, 0, 0, 3, 0, 4, 3]);
    }
  }
  
  if (colorBlendStyle == 7 && faceLines) {
    if (rnd() < 0.5) {
      backgroundLightnessStyle = generateLabeledVariable(0, 4, [0, 0, 0, 6, 4]);
      backgroundStyle = generateLabeledVariable(0, 6, [0, 0, 15, 0, 40, 0, 45]);
    } else {
      backgroundLightnessStyle = generateLabeledVariable(0, 4, [0, 5, 5, 3, 1]);
      backgroundStyle = generateLabeledVariable(0, 6, [0, 0, 0, 3, 0, 2, 5]);
    }
  }

  if (colorBlendStyle == 8) {
    switch (rangeFloor(0,3)) {
      case 0: 
        backgroundLightnessStyle = 0;
        backgroundStyle = generateLabeledVariable(0, 6, [5, 5, 20, 0, 0, 0, 70]);
        break;
      case 1: 
        backgroundLightnessStyle = 1;
        backgroundStyle = generateLabeledVariable(0, 6, [5, 5, 0, 0, 0, 90, 0]);
        break;
      case 2:
        backgroundLightnessStyle = 2;
        backgroundStyle = generateLabeledVariable(0, 6, [5, 5, 90, 0, 0, 0, 0]);
        break;
    }
  }
  
  
  switch (backgroundLightnessStyle) {
    case 0: // very dark
      bgBrightness = generateUnlabeledVariable(3, 6, 1); // brightness is up to 100
      bgSaturation = generateUnlabeledVariable(50, 100, 1); // saturation is up to 100
      bgLightness = generateUnlabeledVariable(3, 6, 1); // lightness is up to 100
      break;
    case 1: // dark
      bgBrightness = generateUnlabeledVariable(10, 30, 1); // brightness is up to 100
      bgSaturation = generateUnlabeledVariable(50, 90, 1); // saturation is up to 100
      bgLightness = generateUnlabeledVariable(15, 25, 1); // lightness is up to 100
      break;
    case 2: // light saturated
      bgBrightness = generateUnlabeledVariable(70, 90, 1); // brightness is up to 100
      bgSaturation = generateUnlabeledVariable(100, 100, 1); // saturation is up to 100
      bgLightness = generateUnlabeledVariable(75, 85, 1); // lightness is up to 100
      break;
    case 3: // very light
      bgBrightness = generateUnlabeledVariable(95, 99, 1); // brightness is up to 100
      bgSaturation = generateUnlabeledVariable(80, 100, 1); // saturation is up to 100
      bgLightness = generateUnlabeledVariable(90, 90, 1); // lightness is up to 100
      break;
    case 4: // light desaturated
      bgBrightness = generateUnlabeledVariable(80, 90, 1); // brightness is up to 100
      bgSaturation = generateUnlabeledVariable(70, 90, 1); // saturation is up to 100
      bgLightness = generateUnlabeledVariable(80, 90, 1); // lightness is up to 100
      break;
    default:
      bgBrightness = generateUnlabeledVariable(0, 4, 1); // brightness is up to 100
      bgSaturation = generateUnlabeledVariable(50, 100, 1); // saturation is up to 100
      bgLightness = generateUnlabeledVariable(0, 4, 1); // lightness is up to 100
      break;
  }
  
  
}
// -----------------------------------------------------------------------------------------------------


  function gradientLine(ctx, x1, y1, x2, y2, c1, c2, lineWidth) {
    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, c1);
    gradient.addColorStop(1, c2);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }


// -----------------------------------------------------------------------------------------------------
/*
P5.js required functions
*/
function setup() {
  initializeVariables();
  strokeCap(SQUARE);
  dim = Math.min(windowWidth, windowHeight);
  createCanvas(dim, dim);
  createFaceData();  
  drawFace(0, 0, dim);

}

function draw() {

}
// -----------------------------------------------------------------------------------------------------





// -----------------------------------------------------------------------------------------------------
/*
  Project-specific drawing functions
*/
function createFaceData() {
  
  // Original, unisex, smooth features
  let faceArray0 = [24, 48, 63, 79, 95, 119, 143, 167, 190, 214, 230, 246, 262, 278, 294, 310, 333, 357, 373, 389, 397, 413, 429, 444, 460, 468, 484, 492, 508, 516, 532, 540, 548, 548, 556, 563, 571, 571, 579, 587, 595, 595, 595, 603, 611, 619, 619, 619, 619, 619, 619, 619, 619, 611, 603, 595, 595, 595, 587, 579, 571, 563, 556, 548, 540, 524, 508, 492, 484, 468, 460, 444, 437, 429, 429, 429, 429, 429, 429, 429, 437, 444, 452, 460, 468, 484, 492, 508, 516, 532, 548, 563, 579, 595, 611, 627, 643, 667, 683, 698, 714, 738, 754, 770, 786, 810, 833, 849, 865, 881, 905, 929, 944, 960, 976, 992, 1000, 1000, 992, 984, 968, 960, 944, 921, 889, 833, 786, 738, 722, 714, 714, 722, 730, 738, 746, 754, 770, 786, 810, 825, 833, 833, 833, 825, 817, 802, 794, 778, 762, 738, 706, 675, 651, 643, 651, 667, 683, 698, 714, 730, 738, 738, 738, 730, 722, 706, 690, 659, 619, 587, 563, 556, 548, 548, 548, 548, 556, 563, 563, 556, 548, 548, 540, 532, 516, 508, 492, 476, 444, 405, 325, 238, 135, 63, 24, 0];


  // Female Ruth
  let faceArray1 = [167, 151, 143, 143, 143, 143, 143, 143, 143, 151, 159, 167, 167, 167, 175, 183, 190, 198, 214, 230, 246, 254, 270, 278, 294, 302, 317, 333, 357, 373, 389, 397, 413, 421, 437, 444, 452, 460, 468, 476, 484, 492, 500, 500, 508, 516, 524, 524, 532, 540, 548, 548, 548, 548, 540, 532, 516, 500, 484, 468, 460, 444, 429, 405, 381, 357, 341, 325, 333, 357, 357, 405, 333, 310, 310, 333, 381, 349, 365, 373, 389, 397, 413, 421, 437, 452, 476, 500, 524, 548, 571, 595, 619, 651, 683, 714, 738, 762, 786, 817, 849, 881, 905, 929, 944, 960, 968, 984, 992, 1000, 1000, 992, 984, 976, 976, 960, 937, 905, 881, 841, 794, 738, 690, 651, 619, 603, 595, 595, 595, 595, 595, 603, 611, 619, 627, 635, 651, 659, 675, 690, 698, 690, 675, 659, 635, 595, 548, 524, 524, 556, 587, 619, 627, 619, 603, 587, 571, 556, 540, 532, 516, 508, 492, 484, 476, 468, 460, 460, 468, 476, 484, 492, 500, 500, 500, 500, 500, 500, 500, 492, 484, 476, 468, 460, 452, 444, 429, 413, 397, 365, 310, 246, 183, 103, 60, 0];

  // Female Black 
  let faceArray2 = [42, 83, 111, 139, 153, 181, 194, 208, 222, 236, 250, 264, 278, 292, 306, 333, 361, 375, 375, 375, 389, 403, 431, 444, 458, 458, 458, 472, 486, 500, 500, 500, 500, 514, 528, 542, 542, 542, 542, 542, 542, 542, 542, 542, 542, 542, 542, 542, 542, 542, 542, 542, 542, 528, 514, 500, 500, 500, 486, 472, 458, 458, 444, 431, 403, 389, 375, 361, 347, 333, 333, 319, 306, 292, 292, 292, 292, 333, 417, 375, 333, 250, 278, 292, 292, 306, 319, 347, 361, 389, 403, 431, 458, 500, 542, 583, 611, 639, 667, 708, 750, 792, 833, 875, 917, 944, 972, 986, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 986, 972, 944, 931, 917, 903, 806, 694, 597, 583, 597, 611, 625, 639, 653, 681, 694, 722, 750, 792, 833, 861, 875, 875, 875, 875, 861, 847, 833, 819, 792, 750, 694, 639, 625, 667, 722, 764, 778, 806, 819, 833, 833, 833, 833, 819, 806, 792, 764, 708, 639, 583, 556, 542, 542, 542, 542, 542, 556, 569, 583, 583, 583, 583, 583, 583, 569, 556, 542, 542, 542, 528, 514, 486, 472, 444, 417, 361, 292, 250, 208];
  
  // Female White 
  let faceArray3 = [78, 67, 67, 67, 56, 44, 22, 11, 11, 33, 56, 78, 100, 133, 156, 178, 189, 211, 222, 244, 256, 267, 278, 289, 300, 300, 311, 322, 333, 344, 356, 367, 378, 389, 400, 400, 411, 422, 433, 433, 433, 433, 444, 456, 467, 467, 467, 467, 467, 467, 467, 467, 467, 467, 467, 467, 456, 444, 433, 422, 411, 389, 378, 367, 356, 344, 333, 333, 344, 356, 356, 333, 311, 300, 300, 311, 322, 333, 344, 356, 378, 389, 411, 422, 433, 433, 444, 467, 489, 511, 533, 556, 578, 600, 622, 656, 678, 711, 722, 744, 767, 789, 811, 833, 878, 911, 944, 967, 989, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 989, 978, 956, 922, 878, 833, 789, 733, 689, 656, 644, 633, 633, 633, 644, 656, 667, 678, 700, 733, 767, 789, 800, 800, 789, 778, 767, 756, 733, 689, 633, 611, 622, 678, 711, 733, 733, 733, 722, 711, 700, 667, 622, 567, 544, 533, 522, 500, 478, 467, 478, 489, 500, 500, 500, 500, 511, 522, 533, 533, 533, 533, 533, 522, 511, 500, 489, 478, 467, 456, 444, 422, 411, 389, 356, 300, 233, 156, 117, 67];

  // Male Mediterranean 
  let faceArray4 = [322, 310, 310, 322, 333, 345, 345, 345, 356, 368, 379, 391, 402, 414, 425, 437, 448, 460, 471, 483, 494, 506, 517, 517, 529, 540, 552, 552, 552, 552, 563, 575, 586, 586, 598, 609, 621, 621, 621, 632, 644, 655, 655, 655, 655, 655, 655, 655, 655, 655, 655, 655, 655, 644, 632, 621, 609, 586, 552, 517, 494, 483, 471, 460, 437, 414, 391, 368, 379, 391, 402, 379, 356, 356, 379, 391, 402, 402, 425, 437, 460, 471, 494, 517, 552, 586, 621, 655, 690, 713, 736, 747, 770, 782, 793, 805, 816, 839, 851, 874, 885, 908, 920, 943, 954, 966, 977, 989, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 989, 977, 966, 954, 931, 897, 828, 759, 701, 678, 667, 655, 655, 655, 655, 655, 667, 678, 690, 701, 713, 736, 747, 770, 782, 793, 793, 793, 793, 770, 724, 667, 632, 632, 667, 713, 736, 736, 724, 724, 713, 690, 667, 644, 632, 609, 598, 575, 563, 540, 529, 529, 540, 552, 552, 563, 575, 598, 609, 621, 621, 621, 609, 598, 586, 586, 575, 563, 552, 540, 529, 506, 494, 471, 448, 391, 310, 218, 115, 69, 0];

  // Male Black
  let faceArray5 = [148, 148, 185, 204, 222, 241, 259, 296, 315, 333, 333, 352, 370, 389, 389, 407, 426, 444, 444, 444, 463, 463, 481, 481, 500, 500, 500, 500, 500, 519, 519, 537, 537, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 537, 537, 519, 519, 500, 500, 500, 481, 463, 444, 444, 426, 389, 333, 278, 222, 185, 167, 148, 130, 111, 111, 111, 111, 111, 130, 148, 185, 204, 222, 241, 259, 278, 296, 315, 333, 352, 370, 389, 407, 426, 463, 481, 500, 519, 537, 574, 593, 630, 667, 704, 741, 759, 796, 815, 852, 870, 907, 926, 944, 963, 981, 1000, 1000, 1000, 1000, 1000, 1000, 981, 963, 926, 907, 870, 759, 630, 519, 500, 519, 537, 556, 574, 593, 630, 648, 685, 722, 778, 815, 833, 833, 833, 833, 833, 833, 815, 796, 759, 722, 667, 611, 556, 556, 593, 667, 704, 741, 759, 778, 778, 778, 778, 778, 778, 759, 741, 704, 630, 537, 444, 407, 389, 407, 426, 463, 481, 500, 519, 537, 556, 556, 556, 556, 556, 556, 537, 519, 500, 481, 463, 444, 426, 407, 370, 352, 296, 185, 111, 0];
  
  // Male White
  let faceArray6 = [127, 159, 175, 206, 222, 238, 254, 270, 302, 317, 333, 333, 333, 349, 365, 381, 397, 413, 429, 429, 444, 460, 476, 476, 476, 492, 508, 524, 524, 524, 524, 524, 540, 556, 571, 571, 571, 571, 571, 571, 571, 571, 571, 571, 571, 571, 571, 556, 540, 524, 524, 524, 524, 508, 492, 476, 460, 444, 413, 397, 365, 349, 333, 317, 286, 238, 206, 175, 159, 143, 143, 143, 159, 175, 190, 206, 222, 238, 254, 270, 302, 317, 349, 365, 397, 413, 429, 444, 460, 492, 508, 540, 556, 587, 603, 635, 651, 683, 698, 730, 746, 778, 794, 825, 857, 905, 937, 968, 984, 1000, 1000, 1000, 1000, 1000, 1000, 984, 968, 937, 905, 825, 746, 667, 619, 571, 540, 524, 524, 524, 540, 556, 587, 603, 635, 651, 683, 714, 746, 762, 762, 762, 762, 762, 746, 730, 698, 667, 619, 587, 603, 651, 698, 714, 714, 714, 698, 683, 667, 651, 603, 556, 508, 492, 476, 460, 444, 429, 429, 444, 460, 476, 476, 476, 492, 508, 524, 524, 524, 524, 524, 524, 508, 492, 476, 476, 460, 444, 413, 381, 333, 286, 254, 222, 175, 95, 48, 0];

  
  femaleFaceData.push(faceArray0);
  femaleFaceData.push(faceArray1);
  femaleFaceData.push(faceArray2); 
  femaleFaceData.push(faceArray3); 
  
  maleFaceData.push(faceArray0);
  maleFaceData.push(faceArray4);
  maleFaceData.push(faceArray5);
  maleFaceData.push(faceArray6);
  
}

function drawFace(regX, regY, imageDim) {
  
  push();
  translate(regX, regY);
  
  let leftArray = [];
  let rightArray = [];
  let drawLeftHair = true;
  let drawRightHair = true;
  let leftHairLength; // 0 = no hair, 1 = from top of screen to bottom
  let leftHairStretchAdjust;
  let leftHairSweep;
  let rightHairLength; // 0 = no hair, 1 = from top of screen to bottom
  let rightHairStretchAdjust;
  let rightHairSweep;
  
  switch (leftHairStyle) {
    case 0: // bald
      drawLeftHair = false;
      leftHairLength = 0;
      leftHairStretchAdjust = 0;
      leftHairSweep = 0;
      break;
    case 1: // short spiky (not currently used)
      leftHairLength = generateUnlabeledVariable(0.15, 0.25, 3);
      leftHairStretchAdjust = generateUnlabeledVariable(1, 5, 3);
      leftHairSweep = range(0.02,0.06);
      leftHairChaos = generateLabeledVariable(-1, 1, [600, 200, 200]);      
      break;
    case 2: // medium swept
      leftHairLength = range(0.6, 0.8);
      leftHairStretchAdjust = 10;
      leftHairSweep = 0.10;
      break;
    case 3: // long swept
      leftHairLength = 1;
      leftHairStretchAdjust = 10;
      leftHairSweep = 0.16;
      break;
    case 4: // long straight
      leftHairLength = 1;
      leftHairStretchAdjust = 5;
      leftHairSweep = 0.06;
      break;
  }
  switch (rightHairStyle) {
    case 0: // bald
      drawRightHair = false;
      rightHairLength = 0;
      rightHairStretchAdjust = 0;
      rightHairSweep = 0;
      break;
    case 1: // short spiky (not currently used)
      rightHairLength = generateUnlabeledVariable(0.15, 0.25, 3);
      rightHairStretchAdjust = generateUnlabeledVariable(1, 5, 3);
      rightHairSweep = range(0.02,0.06);
      rightHairChaos = generateLabeledVariable(-1, 1, [6, 2, 2]);
      break;
    case 2: // medium swept
      rightHairLength = range(0.6, 0.8);
      rightHairStretchAdjust = 10;
      rightHairSweep = 0.10;
      break;
    case 3: // long swept
      rightHairLength = 1;
      rightHairStretchAdjust = 10;
      rightHairSweep = 0.16;
      break;
    case 4: // long straight
      rightHairLength = 1;
      rightHairStretchAdjust = 5;
      rightHairSweep = 0.06;
      break;
  }

  
  leftArray = leftGenderFemale ? [...femaleFaceData[leftSilhouetteStyle]] : [...maleFaceData[leftSilhouetteStyle]];
  rightArray = rightGenderFemale ? [...femaleFaceData[rightSilhouetteStyle]] : [...maleFaceData[rightSilhouetteStyle]];
    
  if (leftFlipped) {
    leftArray.reverse();
  }

  if (rightFlipped) {
    rightArray.reverse();
  }
  
  let spacing = spacingMultiplier * imageDim;
  let numLines = Math.round((imageDim) / spacing);
  let endYArray = Array.from(Array(numLines).keys()); // fill an array with 0 to numLines

  let unattachedDistanceMin = 0.11;
  let unattachedDistanceMax = 0.08;
  let attachedDistanceMin = 0.19;
  let attachedDistanceMax = 0.16;
  let faceDistance;
 
  faceDistance = attached ? map(attachmentMultiplier, 0, 1, attachedDistanceMax, attachedDistanceMin) : map(attachmentMultiplier, 0, 1, unattachedDistanceMax, unattachedDistanceMin);
  
  let startX = imageDim * faceDistance;
  let endX = imageDim - (imageDim * faceDistance);
  
  let stretchFactor = 0.65 + range(0, rowEntropy * 1.25); 
  let faceDepthMultiplier = imageDim * range(0.2, 0.22) * 0.001;
  let leftShear = imageDim * ((faceDistance * 0.016) - 0.001); // closer together, they lean apart to kiss
  let rightShear = -leftShear;
  if (leftFlipped != rightFlipped) {
    leftShear *= -1;
  }
  
  colorMode(HSB);

  hueDifference *= (rnd() < 0.5 ? -1 : 1) * !monochromatic;
    
  let bgPlusMinus = rangeFloor(-1,2) * !monochromatic;
  let bgRootHue = rootHue + (bgPlusMinus * rangeFloor(4, 6) * 10); 
  let leftHue = rootHue + hueDifference;
  let rightHue = rootHue - hueDifference;
  let leftBaseColor = color(leftHue, lineSaturation, lineBrightness);
  let rightBaseColor = color(rightHue, lineSaturation, lineBrightness);
  let bgBaseColor1 = color(bgRootHue + (3 * hueDifference), lineSaturation, lineBrightness);
  let bgBaseColor2 = color(bgRootHue - (3 * hueDifference), lineSaturation, lineBrightness);  
  let backgroundColor1 = color(bgRootHue + (bgPlusMinus * rangeFloor(1, 2) * 10), bgSaturation + range(-30,30), bgBrightness);
  let backgroundColor2 = color(bgRootHue + (bgPlusMinus * rangeFloor(1, 2) * 10), bgSaturation + range(-30,30), bgBrightness);
  
  colorMode(HSL);
  backgroundColor1 = color(hue(backgroundColor1), saturation(backgroundColor1), bgLightness);
  backgroundColor2 = color(hue(backgroundColor2), saturation(backgroundColor2), bgLightness);
  
  colorMode(RGB);
  let bgStrokeColor = rnd() < 0.5 ? bgBaseColor1 : lerpColor(leftBaseColor, rightBaseColor, 0.5);;
  
  colorMode(HSB);
  let shadowColor = color(0,0,0,0.2);
  let shadowColorLighter = color(0,0,0,0.08);

  shuffleArrayEntropy(endYArray, rowEntropy);
  

  
  // ------ Draw Background Content ------
  
  let bgWeaveWidth = spacing * 2;
  
  let currentBeginTargetX;
  let currentBeginTargetY;
  let currentBeginStretchX;
  let currentBeginStretchY;
  let currentEndTargetX;
  let currentEndTargetY;
  let currentEndStretchX;
  let currentEndStretchY;
  let curBGWeaveWidth;
  let bgStrokeDensity;
  let bgAlphaMax = 0;
  let bgPlusMinus2 = 0;

  
  noFill();
  switch (backgroundStyle) {
    case 0: // top-down gradient
      setGradient(0, 0, imageDim, imageDim, backgroundColor1, backgroundColor2, "Y", range(1,3));
      break;
    
    case 1: // bottom-top gradient
      setGradient(0, 0, imageDim, imageDim, backgroundColor2, backgroundColor1, "Y", range(1,3));
      break;
    
    case 2: // Dense curvy ribbons behind faces, LOUD ---NO BREAK IS INTENTIONAL---
      bgAlphaMax = range(0.2, 0.6);
      bgStrokeDensity = rangeFloor(10, 80);
    
    case 3: // Dense curvy ribbons behind faces, SUBTLE     
      if (bgAlphaMax < 0.1) {
        bgAlphaMax = 0.03;
        bgStrokeDensity = rangeFloor(100, 200);
      }  

      setGradient(0, 0, imageDim, imageDim, backgroundColor1, backgroundColor2, "Y", range(1,3));
      for (let j = 0; j < bgStrokeDensity; j++) {
        let bgWeaveWidthVariation = range(0.1,5);
        let curAlpha = generateUnlabeledVariable(0.0, bgAlphaMax, 2);
        //colorMode(HSL);
        let curBGWeaveColor = color(hue(bgStrokeColor) + (rangeFloor(-10, 10) * 10 * !monochromatic), saturation(bgStrokeColor) * 0.5, brightness(bgStrokeColor), curAlpha);
        colorMode(HSB);
        let curStretchAdjust = range(-spacing*40, spacing*40);
        let curStretch = imageDim * range(0.01,0.3);
        strokeWeight(bgWeaveWidth * bgWeaveWidthVariation);
        curBGWeaveWidth = bgWeaveWidth * range(-0.25, 4);
        currentBeginTargetX = rnd() < 0.5 ? range(0,imageDim) : rangeFloor(0,2) * imageDim;
        currentBeginTargetY = currentBeginTargetX % imageDim == 0 ? range(0,imageDim/2) : 0;
        currentBeginStretchX = currentBeginTargetX + curStretchAdjust;
        currentBeginStretchY = currentBeginTargetY + curStretch;
        currentEndTargetX = rnd() < 0.5 ? range(0,imageDim) : rangeFloor(0,2) * imageDim;
        currentEndTargetY = currentEndTargetX % imageDim == 0 ? range(imageDim/2, imageDim) : imageDim;
        currentEndStretchX = currentEndTargetX - curStretchAdjust;
        currentEndStretchY = currentEndTargetY - curStretch;
        strokeWeight(curBGWeaveWidth);
        stroke(curBGWeaveColor);
        bezier(
          currentBeginTargetX,
          currentBeginTargetY,
          currentBeginStretchX,
          currentBeginStretchY,
          currentEndStretchX,
          currentEndStretchY,
          currentEndTargetX,
          currentEndTargetY
        ); 
      }
      break;

    case 4: // Mostly straight ribbons behind faces, LOUD ---NO BREAK IS INTENTIONAL---
      bgAlphaMax = range(0.4, 0.8);

    case 5: // Mostly straight ribbons behind faces, SUBTLE
      if (bgAlphaMax < 0.1) {
        bgAlphaMax = 0.08
      }      
      bgStrokeDensity = rangeFloor(10, 80);
      colorMode(HSL);
      bgPlusMinus2 = rangeFloor(-1,2);
      backgroundColor1 = color(hue(backgroundColor1) + (bgPlusMinus2 * generateUnlabeledVariable(0,180,5) * !monochromatic), saturation(backgroundColor1), bgLightness);
      backgroundColor2 = color(hue(backgroundColor2) + (bgPlusMinus2 * generateUnlabeledVariable(0,180,5) * !monochromatic), saturation(backgroundColor2), bgLightness);
      colorMode(HSB);
      setGradient(0, 0, imageDim, imageDim, backgroundColor2, backgroundColor1, "Y", range(1,3));
      for (let j = 0; j < bgStrokeDensity; j++) {
        let bgWeaveWidthVariation = range(0.1,20);
        let curAlpha = generateUnlabeledVariable(0.0, bgAlphaMax, 2);
        colorMode(HSL);
        let curBGWeaveColor = color(hue(bgStrokeColor) + (rangeFloor(-20, 20) * 5 * !monochromatic), saturation(bgStrokeColor) * 1, range(50,95), curAlpha);
        colorMode(HSB);
        let curStretchAdjust = 0;
        let curStretch = imageDim * range(0.01,0.3);
        strokeWeight(bgWeaveWidth * bgWeaveWidthVariation);
        curBGWeaveWidth = bgWeaveWidth * range(-0.25, 4);
        currentBeginTargetX = rnd() < 0.5 ? range(0,imageDim) : rangeFloor(0,2) * imageDim;
        currentBeginTargetY = currentBeginTargetX % imageDim == 0 ? range(0,imageDim/2) : 0;
        currentBeginStretchX = currentBeginTargetX + curStretchAdjust;
        currentBeginStretchY = currentBeginTargetY + curStretch;
        currentEndTargetX = rnd() < 0.5 ? range(0,imageDim) : rangeFloor(0,2) * imageDim;
        currentEndTargetY = currentEndTargetX % imageDim == 0 ? range(imageDim/2, imageDim) : imageDim;
        currentEndStretchX = currentEndTargetX - curStretchAdjust;
        currentEndStretchY = currentEndTargetY - curStretch;
        strokeWeight(curBGWeaveWidth);
        stroke(curBGWeaveColor);
        bezier(
          currentBeginTargetX,
          currentBeginTargetY,
          currentBeginStretchX,
          currentBeginStretchY,
          currentEndStretchX,
          currentEndStretchY,
          currentEndTargetX,
          currentEndTargetY
        );
      }
      break;
    
    case 6: // circles behind faces, LOUDISH
      bgAlphaMax = range(0.15, 0.3);
      bgStrokeDensity = rangeFloor(50, 100);
      colorMode(HSL);
      bgPlusMinus2 = rangeFloor(-1,2);
      backgroundColor1 = color(hue(backgroundColor1) + (bgPlusMinus2 * generateUnlabeledVariable(0,180,5) * !monochromatic), saturation(backgroundColor1), bgBrightness);
      backgroundColor2 = color(hue(backgroundColor2) + (bgPlusMinus2 * generateUnlabeledVariable(0,180,5) * !monochromatic), saturation(backgroundColor2), bgBrightness);
      colorMode(HSB);
      setGradient(0, 0, imageDim, imageDim, backgroundColor2, backgroundColor1, "Y", range(1,3));
      for (let j = 0; j < bgStrokeDensity; j++) {
        bgPlusMinus2 = (rangeFloor(0,2) * 2) - 1;
        let curAlpha = generateUnlabeledVariable(0.0, bgAlphaMax, 2);
        colorMode(HSL);
        let curBGWeaveColor = color(hue(bgStrokeColor) + (bgPlusMinus2 * generateUnlabeledVariable(0, 20, 2.5) * 8 * !monochromatic), saturation(bgStrokeColor) * 1, range(50,95), curAlpha);
        colorMode(HSB);
        noStroke();
        let circleWidth = imageDim * 0.05 * generateUnlabeledVariable(3, 16, 2);
        fill(curBGWeaveColor);
        ellipseMode(CENTER);
        circle((imageDim * 0.5) + (bgPlusMinus2 * generateUnlabeledVariable(0, imageDim * 0.5, 1)), (imageDim * 0.55) + (bgPlusMinus2 * generateUnlabeledVariable(0, imageDim * 0.45, 3)), circleWidth);
      }        
      break;
    
    default: // ????
      break;
  }

      
  // ------ Draw Foreground Content ------
  
    angleMode(DEGREES);
  
  if (rotate90) {
    translate(imageDim, 0);
    rotate(90);
  }
  
  // if weaving lines, draw the foreground in 2 passes so that the accent lines can weave randomly in between the lines

  let weaveColor;
  let desaturatedBrightness = generateUnlabeledVariable(0, 8, 1);  
  let desaturatedBrightnessVariation = rangeFloor(0, 12);
  let passes = drawHair + 1; // 2 passes if drawHair is true, 1 if not
  let swapped = rnd() < 0.5; // determines whether connecting lines start from left or right
  let knotOffsets = [];
  for (let curKnot = 0; curKnot < numKnots; curKnot++) {
    knotOffsets.push(range(-(attachedDistanceMin - faceDistance), attachedDistanceMin - faceDistance) * imageDim * 1.5); // each knot will be located somewhere random between the two faces
  }

  noFill();
  

  for (let currentPass = 0; currentPass < passes; currentPass++) {

    // draw each face's set of components (faceLines, connectLines, weaveLines, and their shadows)
    // if drawing weaveLines, do it in 2 passes: first evens then odds. 
    for (let i = currentPass; i < numLines; i+= passes) {
      let curIndex;
      let leftFaceX;
      let leftFaceY;
      let rightFaceY;
      let rightFaceX;
      let stretch1;
      let leftColor;
      let rightColor;
      let curColor;
      let leftEdgeColor;
      let rightEdgeColor;
      let connectColor;
      let greenAdjust;
      let blueAdjust;
      let redAdjust;
      
      curIndexLeft = Math.round(i / numLines * leftArray.length);
      curIndexRight = Math.round(endYArray[i] / numLines * leftArray.length);
     
      //leftFaceY = (spacing / 2) + (i * spacing);            
      //rightFaceY = (endYArray[i] * spacing);
      if (!swapped) {
        leftFaceY = (i * spacing) + (spacing * 0.125);            
        rightFaceY = (endYArray[i] * spacing) + (spacing * 0.625);
        leftFaceX = startX + (leftArray[curIndexLeft] * faceDepthMultiplier) + (leftShear * i); 
        rightFaceX = Math.round(imageDim - startX - (rightArray[curIndexRight] * faceDepthMultiplier) + (rightShear * endYArray[i]));
      } else {
        leftFaceY = (endYArray[i] * spacing) + (spacing * 0.125);            
        rightFaceY = (i * spacing) + (spacing * 0.625);
        leftFaceX = startX + (leftArray[curIndexRight] * faceDepthMultiplier) + (leftShear * endYArray[i]); 
        rightFaceX = Math.round(imageDim - startX - (rightArray[curIndexLeft] * faceDepthMultiplier) + (rightShear * i));
     }     
      
      stretch1 = (rightFaceX - leftFaceX) * stretchFactor;

      leftColor = color(leftHue, lineSaturation, lineBrightness);
      rightColor = color(rightHue, lineSaturation, lineBrightness);

      greenAdjust = range(-colorAdjustFactor * 0.5, colorAdjustFactor) * !monochromatic;
      blueAdjust = range(-colorAdjustFactor, colorAdjustFactor * 1.8) * !monochromatic;
      redAdjust = range(-colorAdjustFactor * 0.5, colorAdjustFactor) * !monochromatic;
  
      colorMode(HSB);
      
      leftColor.setGreen(green(leftColor) + greenAdjust);
      leftColor.setBlue(blue(leftColor) + blueAdjust);
      leftColor.setRed(red(leftColor) + redAdjust);
      rightColor.setGreen(green(rightColor) + greenAdjust);
      rightColor.setBlue(blue(rightColor) + blueAdjust);
      rightColor.setRed(red(rightColor) + redAdjust);      

      switch(colorBlendStyle) {
        case 0: // 2 edge colors and connector is midpoint color
          connectColor = lerpColor(leftBaseColor, rightBaseColor, 0.5);
          leftEdgeColor = leftColor;
          rightEdgeColor = rightColor;
          break;
        case 1: // left edge color overpowers connect color
          connectColor = leftColor;
          leftEdgeColor = leftColor;
          rightEdgeColor = rightColor;
          break;
        case 2: // right edge color overpowers connect color
          connectColor = rightColor;
          leftEdgeColor = leftColor;
          rightEdgeColor = rightColor;
          break;
        case 3: // both edges are the same color (left)
          connectColor = leftColor;
          leftEdgeColor = leftColor;
          rightEdgeColor = leftColor;
          break;
        case 4: // both edges are the same color (right)
          connectColor = rightColor;
          leftEdgeColor = rightColor;
          rightEdgeColor = rightColor;
          break;
        case 5: // each row is one solid color (mix of left and right)
          leftColor = color(hue(leftColor) + ((rnd() < 0.5 ? -1 : 1)) * (generateUnlabeledVariable(3, 18, 1) * !monochromatic), saturation(leftColor), brightness(leftColor));
          rightColor = color(hue(rightColor) + ((rnd() < 0.5 ? -1 : 1)) * (generateUnlabeledVariable(3, 18, 1) * !monochromatic), saturation(rightColor), brightness(rightColor));
          connectColor = (rnd() < 0.5 ? leftColor : rightColor);
          leftEdgeColor = leftColor;
          rightEdgeColor = rightColor;
          break;   
          
        case 6: // Varied row colors
          leftColor = color(hue(leftColor) + ((rnd() < 0.5 ? -1 : 1)) * (generateUnlabeledVariable(3, 6, 1) * !monochromatic), saturation(leftColor) + rangeFloor(-30,-40), brightness(leftColor));
          rightColor = color(hue(rightColor) + ((rnd() < 0.5 ? -1 : 1)) * (generateUnlabeledVariable(3, 6, 1) * !monochromatic), range(20, 50), brightness(rightColor));          
          connectColor = (rnd() < 0.5 ? leftColor : rightColor);
          leftEdgeColor = leftColor;
          rightEdgeColor = rightColor;
          break; 
          
        case 7: // Very Dark
          leftColor = color(hue(leftColor), rangeFloor(0, 100), desaturatedBrightness + rangeFloor(-desaturatedBrightnessVariation, desaturatedBrightnessVariation));
          rightColor = color(hue(rightColor), rangeFloor(0, 100), desaturatedBrightness + rangeFloor(-desaturatedBrightnessVariation, desaturatedBrightnessVariation));
         
          connectColor = leftColor;
          leftEdgeColor = leftColor;
          rightEdgeColor = rightColor;
          break;
          
        case 8: // Very Light
          leftColor = color(hue(leftColor), rangeFloor(50, 100), 100 + rangeFloor(-desaturatedBrightnessVariation, desaturatedBrightnessVariation));
          rightColor = color(hue(rightColor), rangeFloor(50, 100), 100 + rangeFloor(-desaturatedBrightnessVariation, desaturatedBrightnessVariation));   
          
          colorMode(HSL);
          leftColor = color(hue(leftColor), saturation(leftColor), 100 - (rangeFloor(0, desaturatedBrightness)));
          rightColor = color(hue(rightColor), saturation(rightColor), 100 - (rangeFloor(0, desaturatedBrightness)));         
          connectColor = leftColor;
          leftEdgeColor = leftColor;
          rightEdgeColor = rightColor;
          colorMode(HSB);
          break; 
          
        default:
          connectColor = lerpColor(leftColor, rightColor, 0.5);
          leftEdgeColor = leftColor;
          rightEdgeColor = rightColor;
          break;        
      }

      if (!faceLines) {
        leftColor = color(hue(leftColor) + ((rnd() < 0.5 ? -1 : 1)) * (generateUnlabeledVariable(3, 6, 1) * !monochromatic), saturation(leftColor) + rangeFloor(-30,-40), brightness(leftColor));
        rightColor = color(hue(rightColor) + ((rnd() < 0.5 ? -1 : 1)) * (generateUnlabeledVariable(3, 6, 1) * !monochromatic), range(20, 50), brightness(rightColor));          
        connectColor = rnd() < 0.5 ? color(hue(connectColor) + (range(-180 * connectLineColorVariation,180 * connectLineColorVariation) * !monochromatic), saturation(connectColor), brightness(connectColor)) : (rnd() < 0.5 ? leftColor : rightColor);
      }
      
      colorMode(RGB);      
      leftEdgeColor = lerpColor(backgroundColor1, leftEdgeColor, edgeBoldness);
      rightEdgeColor = lerpColor(backgroundColor1, rightEdgeColor, edgeBoldness);
      
      weaveColor = connectColor;
      let connectWeight = imageDim * 0.0015;

      colorMode(HSB);

      stroke(connectColor);
      strokeWeight(connectWeight);
      noFill();

      let percentFromMiddle = Math.abs(numLines / 2 - i) / (numLines / 2);      
      if (attached || percentFromMiddle < attachmentMultiplier || !faceLines) { 
        if (numKnots == 0) { // connect lines directly to other face 
          
          let currentRightTargetX = rightFaceX + (connectWeight * 1.5);
          let currentLeftTargetX = leftFaceX - (connectWeight * 1.5);
          let currentRightTargetY = rightFaceY;
          let currentLeftTargetY = leftFaceY;
          
          // draw shadow
          stroke(shadowColorLighter);
          strokeWeight(connectWeight * 1.5);
          bezier(
            currentLeftTargetX,
            currentLeftTargetY + connectWeight,
            currentLeftTargetX + stretch1,
            currentLeftTargetY + connectWeight,
            currentRightTargetX - stretch1,
            currentRightTargetY + connectWeight,
            currentRightTargetX,
            currentRightTargetY + connectWeight
          );
          
          // draw connecting line
          stroke(connectColor);
          strokeWeight(connectWeight);
          bezier(
            currentLeftTargetX,
            currentLeftTargetY,
            currentLeftTargetX + stretch1,
            currentLeftTargetY,
            currentRightTargetX - stretch1,
            currentRightTargetY,
            currentRightTargetX,
            currentRightTargetY
          );          
          
        } else { // draw connecting lines in the form of a knot
          let targetAssetNum = rangeFloor(1, numKnots + 1);
          let targetLineNum = Math.round(targetAssetNum * (numLines / (numKnots + 1)));
          let targetLeftX = startX + (leftArray[targetLineNum] * faceDepthMultiplier) + (leftShear * targetLineNum);
          let targetRightX = Math.round(imageDim - startX - (rightArray[targetLineNum] * faceDepthMultiplier) + (rightShear * targetLineNum));
          let stretch2 = ((targetRightX - targetLeftX) * 0.1 * stretchFactor) * range(1 - (rowEntropy * 0.2), 1 + (rowEntropy * 0.2));
          let targetX = ((targetLeftX + targetRightX) / 2) + (range(-stretch2, stretch2) * rowEntropy * 0.3) + knotOffsets[targetAssetNum - 1];      
          let targetY = (imageDim / (numKnots + 1)) * targetAssetNum;

          // draw connecting line shadow
          stroke(shadowColorLighter);
          strokeWeight(connectWeight * 1.5);
          
          beginShape();
          vertex(leftFaceX - (connectWeight * 1.5), leftFaceY + connectWeight); 
          bezierVertex(targetX + stretch2, leftFaceY + connectWeight, targetX + stretch2, targetY - (stretch2 * (leftFaceY / imageDim / 2)) + connectWeight, targetX, targetY + connectWeight);
          bezierVertex(targetX - stretch2, targetY + (stretch2 * (leftFaceY / imageDim / 2)) + connectWeight,  targetX - stretch2, rightFaceY + connectWeight, rightFaceX, rightFaceY + connectWeight); 
          vertex(rightFaceX + (connectWeight * 1.5), rightFaceY + connectWeight);
          endShape();
                    
          // draw connecting line
          stroke(connectColor);
          strokeWeight(connectWeight);
          beginShape();
          vertex(leftFaceX - (connectWeight * 1.5), leftFaceY); 
          bezierVertex(targetX + stretch2, leftFaceY, targetX + stretch2, targetY - (stretch2 * (leftFaceY / imageDim / 2)), targetX, targetY);
          bezierVertex(targetX - stretch2, targetY + (stretch2 * (leftFaceY / imageDim / 2)),  targetX - stretch2, rightFaceY, rightFaceX, rightFaceY); 
          vertex(rightFaceX + (connectWeight * 1.5), rightFaceY);
          endShape();
        }
      }    

      stroke(connectColor);

      // draw triangles or circles on ends of lines       
      if (faceLines) {   
       
        // triangle shadow
        let shadowTriangleLeftY = leftFaceY + (spacing/4);
        let shadowTrianglerightY = rightFaceY + (spacing/4);        
        noStroke();
        fill(shadowColor);
        triangle(leftFaceX, leftFaceY, leftFaceX - (spacing * 0.75), leftFaceY, leftFaceX - (spacing * 0.75), leftFaceY + (spacing * 0.5));
        triangle(rightFaceX, rightFaceY, rightFaceX + (spacing * 0.75), rightFaceY, rightFaceX + (spacing * 0.75), rightFaceY + (spacing * 0.5));
        
        // triangle
        fill(connectColor);
        triangle(leftFaceX, leftFaceY, leftFaceX - (spacing * 0.75), leftFaceY - (spacing * 0.25), leftFaceX - (spacing * 0.75), leftFaceY + (spacing * 0.25));
        triangle(rightFaceX, rightFaceY, rightFaceX + (spacing * 0.75), rightFaceY - (spacing * 0.25), rightFaceX + (spacing * 0.75), rightFaceY + (spacing * 0.25));
        
      } else {
        // circle shadow
        noStroke();
        fill(shadowColor);
        circle(leftFaceX, leftFaceY + (spacing * 0.125), spacing * 0.375);
        circle(rightFaceX, rightFaceY + (spacing * 0.125), spacing * 0.375);

        // circle
        fill(connectColor);
        circle(leftFaceX, leftFaceY, spacing * 0.375);
        circle(rightFaceX, rightFaceY, spacing * 0.375);
      }


      // draw all faceLines (and weaveLines where needed)
      if (faceLines) {
        
        let stretch3 = (rightFaceX - leftFaceX) * stretchFactor;

        
        // draw left face shadow
        fill(shadowColor);
        noStroke();
        rect(0, leftFaceY - (spacing * 0.25), leftFaceX - (spacing * 0.75), spacing * 0.75);
        noFill();
        stroke(connectColor);

        
        // draw left face lines
        gradientLine(drawingContext, Math.round(leftFaceX - (spacing * 13/16)), leftFaceY, 0, leftFaceY, connectColor, leftEdgeColor, spacing/2);

        
        // Draw weave line if it would overlap with a face and meets density probability        
        let targetLeftHairX = startX + (leftArray[0 + (leftFlipped * (leftArray.length - 1))] * faceDepthMultiplier) + (imageDim * 0.15);
        let targetRightHairX = imageDim - startX - (rightArray[0 + (rightFlipped * (leftArray.length - 1))] * faceDepthMultiplier) - (imageDim * 0.15);
        
        
        let drawingLeftHair = leftFaceY < imageDim / 2;
        if (drawHair && (rnd() < weaveDensity) && ((leftFaceY < targetLeftHairX && drawLeftHair)  || (leftFaceY > targetRightHairX && drawRightHair))) {
          
          // variables needed to define location of current weaveLine bezier curve
          let currentBeginTargetX;
          let currentBeginTargetY;
          let currentBeginStretchX;
          let currentBeginStretchY;
          let currentEndTargetX;
          let currentEndTargetY;
          let currentEndStretchX;
          let currentEndStretchY;
          let curTopStretchAdjust;
          let curBottomStretchAdjust;
          
          // variables needed to define color / width of current weaveLine

          let curAlpha = (colorBlendStyle == 7) ? 1 : generateUnlabeledVariable(0.4,1.0,1); //if dark lines, make hair opaque      
          let curWeaveColor = color(hue(weaveColor) + (range(-25,25) * !monochromatic), saturation(weaveColor) * 1, brightness(weaveColor) * 1, curAlpha);
          let curShadowColor = color(hue(shadowColor), saturation(shadowColor), brightness(shadowColor), alpha(shadowColor) * curAlpha);
          let curWeaveWidth = imageDim * (weaveWidth + ((weaveWidth) * range(-0.40 * weaveVariation, 3 * weaveVariation)));

          // variables needed to calculate points for the current weaveLine bezier curve
          let curSideX = Math.round(leftFaceY + (spacing/4));
          let leftFlipYStart = leftFlipped ? imageDim : 0;
          let rightFlipYStart = rightFlipped ? imageDim : 0;
          let leftFlipModifier = (leftFlipped * -2) + 1; // negative 
          
          if (drawingLeftHair) {
              curTopStretchAdjust = range(leftHairChaos * spacing * leftHairStretchAdjust, spacing * leftHairStretchAdjust);
              curBottomStretchAdjust = range(-spacing * leftHairStretchAdjust, leftHairChaos * spacing * leftHairStretchAdjust);
              currentBeginTargetX = curSideX - (imageDim * 0.10);
              currentBeginTargetY = -imageDim * 0.005;
              currentBeginStretchX = curSideX + curTopStretchAdjust - (imageDim * 0.10);
              currentBeginStretchY = leftHairLength * imageDim * 0.25 - (imageDim * 0.001);
              currentEndStretchX = curSideX + curBottomStretchAdjust - (leftHairSweep * imageDim) - (imageDim * 0.10);
              currentEndStretchY = leftHairLength * imageDim * 0.75;
              currentEndTargetX = curSideX - (leftHairSweep * imageDim) - (imageDim * 0.10);
              currentEndTargetY = leftHairLength * imageDim + range(leftHairLength * leftHairChaos * 0.15 * imageDim, leftHairLength * 0.15 * imageDim);
           } else {
              curTopStretchAdjust = range(-spacing * rightHairStretchAdjust, rightHairChaos * spacing * rightHairStretchAdjust);
              curBottomStretchAdjust = range(rightHairChaos * spacing * rightHairStretchAdjust, spacing * rightHairStretchAdjust);
              currentBeginTargetX = curSideX + (imageDim * 0.10);
              currentBeginTargetY = -imageDim * 0.005;
              currentBeginStretchX = curSideX + curTopStretchAdjust + (imageDim * 0.10);
              currentBeginStretchY = rightHairLength * imageDim * 0.25 - (imageDim * 0.001);
              currentEndStretchX = curSideX + curBottomStretchAdjust + (rightHairSweep * imageDim) + (imageDim * 0.10);
              currentEndStretchY = rightHairLength * imageDim * 0.75;
              currentEndTargetX = curSideX + (rightHairSweep * imageDim) + (imageDim * 0.10);
              currentEndTargetY = rightHairLength * imageDim + range(rightHairLength * rightHairChaos * 0.15 * imageDim, rightHairLength * 0.15 * imageDim);
          }
          
          strokeWeight(curWeaveWidth);
          stroke(curShadowColor);
          strokeCap(SQUARE);
          noFill();
          
          if ((drawingLeftHair && leftFlipped) || (!drawingLeftHair && rightFlipped)) {
            applyMatrix(1, 0, 0, -1, 0, imageDim);
            //translate(0, imageDim);            
          } 
           
          // Draw weave shadow
          bezier(
            currentBeginTargetX + (spacing / 16),
            currentBeginTargetY,
            currentBeginStretchX + (spacing / 16),
            currentBeginStretchY,
            currentEndStretchX + (spacing / 16),
            currentEndStretchY,
            currentEndTargetX + (spacing / 16),
            currentEndTargetY
          );

          // Draw weaveLine
          stroke(curWeaveColor);
          bezier(
            currentBeginTargetX,
            currentBeginTargetY,
            currentBeginStretchX,
            currentBeginStretchY,
            currentEndStretchX,
            currentEndStretchY,
            currentEndTargetX,
            currentEndTargetY
          );
          
          if ((drawingLeftHair && leftFlipped) || (!drawingLeftHair && rightFlipped)) {
            resetMatrix();
            if (rotate90) {
              translate(imageDim, 0);
              rotate(90);
            }
          } 
                 
        }         

        // Draw right face shadow
        fill(shadowColor);
        noStroke();
        rect(rightFaceX + (spacing * 0.75), rightFaceY - (spacing * 0.25), imageDim, spacing * 0.75);
        noFill();
        stroke(connectColor);

        // Draw right face line
        gradientLine(drawingContext, Math.round(rightFaceX + (spacing * 13/16)), rightFaceY, imageDim, rightFaceY, connectColor, leftEdgeColor, spacing/2);

           
      }
    }    
  }
  
  pop();
}
// -----------------------------------------------------------------------------------------------------





// -----------------------------------------------------------------------------------------------------
/*
  Project-specific helper functions
*/

function setGradient(x, y, w, h, c1, c2, axis, power) {
  noFill();
  strokeWeight(1.5);
  colorMode(RGB);
  if (axis == "Y") { // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      var inter = map(i, y, y + h, 0, 1);
      var c = lerpColor(c1, c2, Math.pow(inter, power));
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis == "Xlr") { // Left to right gradient
    for (let j = x; j <= x + w; j++) {
      var inter2 = map(j, x, x + w, 0, 1);
      var d = lerpColor(c1, c2, Math.pow(inter2, power));
      //var d = lerpColor(c1, c2, inter2);
      stroke(d);
      line(j, y, j, y + h);
    }
  } else if (axis == "Xrl") { // Right to left gradient
    for (let k = x; k >= x - w; k--) {
      var inter3 = map(k, x, x - w, 0, 1);
      var d = lerpColor(c1, c2, Math.pow(inter3, power));
      //var d = lerpColor(c1, c2, inter3);
      stroke(d);
      line(k, y, k, y + h);
    }
  }
  colorMode(HSB);
}


// shuffle the items in an array based on the amount of entropy. 0 = no shuffle, 1 = completely shuffled
function shuffleArrayEntropy(array, entropy) {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i - Math.round(i * entropy);
    let maxIndex = i + Math.round((array.length - 1 - i) * entropy);
    const j = Math.round(range(minIndex, maxIndex));
    [array[i], array[j]] = [array[j], array[i]];

  }
}

// -----------------------------------------------------------------------------------------------------





// -----------------------------------------------------------------------------------------------------
/*
  General helper functions
*/

function rnd () {
  seed ^= seed << 13
  seed ^= seed >> 17
  seed ^= seed << 5
  
  let result = (((seed < 0) ? ~seed + 1 : seed) % 1000) / 1000
  return result
}

function range (min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }

  return rnd() * (max - min) + min;
}

function rangeFloor (min, max) {
  if (max === undefined) {
    max = min
    min = 0
  }


  return Math.floor(range(min, max))
}
// -----------------------------------------------------------------------------------------------------



