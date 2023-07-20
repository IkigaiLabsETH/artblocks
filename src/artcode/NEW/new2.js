// Adjust these values as needed
let randomgriglia = 4; // Number of iterations for grid subdivision
let shuffrandom = 0.8; // Probability of using the second color palette
let noise_type = 1; // Type of noise used for angle generation
let zoff = 0; // Global noise offset
let movimento = 0; // Initial movement variable
let finemovimento = 200; // Number of frames for the first movement phase
let finemovimento2 = 400; // Number of frames for the second movement phase
let particelle = []; // Array to hold the first set of particles
let particelle2 = []; // Array to hold the second set of particles

// Array of color palettes
let palettes = [
  [
    [254, 242, 145, 20],
    [253, 198, 103, 20],
    [182, 245, 200, 20],
    [84, 146, 76, 20],
    [221, 124, 81, 20],
    [253, 158, 149, 20],
    [112, 184, 214, 20]
  ],
  [
    [255, 0, 0, 20],
    [0, 255, 0, 20],
    [0, 0, 255, 20]
  ]
];

// Class for generating and handling the flow field
class FlowField {
  constructor(rectWidth, rectHeight, resolution, offsetX, offsetY) {
    this.rectWidth = rectWidth;
    this.rectHeight = rectHeight;
    this.resolution = resolution;
    this.cols = rectWidth / resolution;
    this.rows = rectHeight / resolution;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.field = this.generateField();
  }

  // Generate the flow field based on noise
  generateField() {
    let field = [];
    let yoff = 0;
    for (let y = 0; y < this.rows; y++) {
      let row = [];
      let xoff = 0;
      for (let x = 0; x < this.cols; x++) {
        let angle;
        switch (noise_type) {
          case 1:
            angle = map(noise((x + this.offsetX) * 0.05, (y + this.offsetY) * 0.05), 0, 0.1, 0, TWO_PI);
            break;
          case 2:
            angle = map(noise(x * 0.005, y * 0.005), 0, 0.001, 0, TAU);
            break;
          case 3:
            angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
            break;
          case 4:
            angle = map(noise(xoff, yoff, zoff), 0, 0.1, 0, TWO_PI * 2);
            break;
          case 5:
            angle = map(noise(xoff * 0.005, yoff * 0.005, zoff * 0.005), 0, 0.1, 0, TWO_PI * 2);
            break;
          case 6:
            angle = map(noise(x * 0.005, y * 0.005, zoff * 0.005), 0, 0.1, 0, TAU);
            break;
          default:
        }
        xoff += 0.1;
        let vector = p5.Vector.fromAngle(angle);
        row.push(vector);
      }
      field.push(row);
    }
    yoff += 0.1;
    zoff += 0.03;
    return field;
  }

  // Look up the flow vector at a given position
  lookup(position) {
    let col = floor(constrain((position.x - this.offsetX) / this.resolution, 0, this.cols - 1));
    let row = floor(constrain((position.y - this.offsetY) / this.resolution, 0, this.rows - 1));
    return this.field[row][col].copy();
  }
}

// Class for handling individual particles
class Particle {
  constructor(rectX, rectY, rectWidth, rectHeight, colorPalette) {
    this.colorPalette = colorPalette;
    this.rectX = rectX;
    this.rectY = rectY;
    this.rectWidth = rectWidth;
    this.rectHeight = rectHeight;
    this.position = createVector(random(rectX, rectX + rectWidth), random(rectY, rectY + rectHeight));
    this.velocity = createVector();
    this.acceleration = createVector();
    this.maxSpeed = random(1, 4);
    this.maxForce = 0.1;
  }

  // Update the particle's position based on the flow field
  update(flowField) {
    this.follow(flowField);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.edges();
  }

  // Apply a steering force to the particle
  applyForce(force) {
    this.acceleration.add(force);
  }

  // Follow the flow field to steer the particle
  follow(flowField) {
    let desired = flowField.lookup(this.position);
    desired.setMag(this.maxSpeed);
    let steering = p5.Vector.sub(desired, this.velocity);
    steering.limit(this.maxForce);
    this.applyForce(steering);
  }

  // Handle particle's boundaries
  edges() {
    if (this.position.x > this.rectX + this.rectWidth) this.position.x = this.rectX;
    if (this.position.x < this.rectX) this.position.x = this.rectX + this.rectWidth;
    if (this.position.y > this.rectY + this.rectHeight) this.position.y = this.rectY;
    if (this.position.y < this.rectY) this.position.y = this.rectY + this.rectHeight;
  }

  // Render the particle
  render() {
    push();
    if (densityValue === 1) {
      strokeWeight(0.1);
    } else if (densityValue === 2) {
      strokeWeight(0.1);
    } else if (densityValue >= 3 && densityValue <= 7) {
      strokeWeight(0.25);
    }
    noFill();
    if (this.colorPalette) {
      let colorIndex = Math.floor(random(this.colorPalette.length));
      let colorValues = this.colorPalette[colorIndex];
      stroke(colorValues[0], colorValues[1], colorValues[2], colorValues[3]);
    } else {
      noStroke();
    }
    let prevPos = this.position.copy().sub(this.velocity.copy().normalize().mult(3));
    switch (type_stroke) {
      case 1:
        line(prevPos.x, prevPos.y, this.position.x, this.position.y);
        break;
      case 2:
        point(this.position.x, this.position.y);
        break;
      case 3:
        ellipse(prevPos.x, prevPos.y, 1, 2);
        break;
      case 4:
        rect(prevPos.x, prevPos.y, 1, 2);
        break;
      default:
    }
    pop();
  }
}

// Generate the grid and particles
function generateGrid() {
  griglia(0, 0, width, height, 7, 30);
}

// Setup function for p5.js
function setup() {
  createCanvas(800, 800);
  generateGrid();
  generateFractalParticles(); // Generate initial particles
}

// Draw function for p5.js
function draw() {
  background(0);
  movimento++;

  if (movimento < finemovimento) {
    for (let particle of particelle) {
      particle.update(nuovoflusso);
      particle.render();
    }
  } else if (movimento >= finemovimento && movimento < finemovimento2) {
    for (let particle of particelle2) {
      particle.update(nuovoflusso2);
      particle.render();
    }
  } else if (movimento >= finemovimento2) {
    noLoop();
  }

  if (particelle.length < 500 && frameCount % 10 === 0) {
    generateFractalParticles();
  }
}

// Generate new sets of fractal particles
function generateFractalParticles() {
  generateGrid();
}

// Handle key presses (Save canvas when "P" is pressed)
function keyPressed() {
  if (keyCode === 80) {
    saveCanvas('sketch_' + THE_SEED, 'jpeg');
  }
}

// Call the setup function to start the sketch
setup();
