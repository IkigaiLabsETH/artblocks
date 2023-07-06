let colors = [];
let colorCategory, colorScheme;

function setup() {
  createCanvas(4200, 4200);
  noLoop();
  noStroke();
  colorMode(HSB);
  colorCategory = random(["Warm", "Cool", "Mixed"]);
  colorScheme = random(["monochromatic", "analogous", "complementary", "splitComplementary", "triadic", "square", "tetradic"]);
  colors = generatePalette(colorCategory);
  console.log(colors.map(colorObj => `Hue: ${hue(colorObj.color)}, Saturation: ${saturation(colorObj.color)}, Brightness: ${brightness(colorObj.color)}, Weight: ${colorObj.weight}`));

}

function draw() {
  background(255);
  
  let squaresPerRow = 20;
  let squareSize = width / squaresPerRow;
  
  for(let y = 0; y < height; y += squareSize) {
    for(let x = 0; x < width; x += squareSize) {
      let colorObj = weightedRandom(colors);  // select a weighted random color from the palette
      fill(colorObj.color);
      rect(x, y, squareSize, squareSize);
    }
  }
}

function mouseClicked() {
  colorCategory = random(["Warm", "Cool", "Mixed"]);
  colorScheme = random(["monochromatic", "analogous", "complementary", "splitComplementary", "triadic", "square", "tetradic"]);
  colors = generatePalette(colorCategory);
  console.log("Category: " + colorCategory + ", Scheme: " + colorScheme);
  console.log(colors.map(colorObj => `Hue: ${hue(colorObj.color)}, Saturation: ${saturation(colorObj.color)}, Brightness: ${brightness(colorObj.color)}, Weight: ${colorObj.weight}`));

  redraw();
}

function generatePalette(category) {
  let palette = [];
  let weights = [0.3, 0.25, 0.2, 0.15, 0.1];
  let baseHue;

  switch (category) {
    case "Warm":
      baseHue = random(10, 50);  // hue for red-orange (warm) range
      break;
    case "Cool":
      baseHue = random(130, 210);  // hue for green-blue (cool) range
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
        hues.push((baseHue + i * 30) % 360);
      }
      break;
    case "complementary":
      hues = [baseHue, (baseHue + 180) % 360];
      while (hues.length < 5) hues.push(random(360));
      break;
    case "splitComplementary":
      hues = [baseHue, (baseHue + 150) % 360, (baseHue + 210) % 360];
      while (hues.length < 5) hues.push(random(360));
      break;
    case "triadic":
      hues = [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360];
      while (hues.length < 5) hues.push(random(360));
      break;
    case "square":
      hues = [baseHue, (baseHue + 90) % 360, (baseHue + 180) % 360, (baseHue + 270) % 360];
      while (hues.length < 5) hues.push(random(360));
      break;
    case "tetradic":
      hues = [baseHue, (baseHue + 60) % 360, (baseHue + 180) % 360, (baseHue + 240) % 360];
      while (hues.length < 5) hues.push(random(360));
      break;
  }

  // shuffle the weights array
  weights = shuffle(weights);
  
  for (let i = 0; i < 5; i++) {
    let saturation = random(70, 100);
    let brightness = random(70, 100);
    palette.push({ color: color(hues[i], saturation, brightness), weight: weights[i], hue: hues[i] });
  }

  // Adjust the weights based on color temperature
  if (category != "Mixed") {
    let categoryHues = palette.filter(colorObj => getHueTemperature(colorObj.hue) === category);
    let otherHues = palette.filter(colorObj => getHueTemperature(colorObj.hue) !== category);
    
    let adjustment = (0.75 - categoryHues.reduce((total, colorObj) => total + colorObj.weight, 0)) / categoryHues.length;
    let totalOtherWeight = otherHues.reduce((total, colorObj) => total + colorObj.weight, 0);

    for (let colorObj of categoryHues) {
      colorObj.weight += adjustment;
    }
    for (let colorObj of otherHues) {
      colorObj.weight -= adjustment * colorObj.weight / totalOtherWeight;
    }
  }
  
  return palette;
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
