// Creating generative art with Perlin noise and color palettes. 
// Customize it by changing the way the particles move, the conditions under which they are displayed, and the color palettes.
// Code now includes the speed property for the particles, the modified display conditions
// Creating multiple sets of particles, each with a different color from the LTL palettes

let colors = [];
let paletteName;
let palettes = [];
let tokenData;
let W, H, DIM, M, CH;
let particle_sets = [];
let number_of_particles = 3300;
let number_of_particle_sets = 17;

class Particle {
    constructor(x, y, phi, col) {
      this.pos = createVector(x, y);
      this.altitude = 0;
      this.val = 0;
      this.angle = phi;
      this.col = col;
      this.speed = random(0.5, 2); // Add a speed property
    }
  
    update(index) {
      this.pos.x += this.speed * cos(this.angle); // Scale the increment by the speed
      this.pos.y += this.speed * sin(this.angle); // Scale the increment by the speed
  
      let nx = 1.1 * map(this.pos.y, 0, height, 4, 0.2) * map(this.pos.x, 0, width, -1, 1);
      let ny = 3.1 * map(this.pos.y, 0, height, 4, 0.2) * map(this.pos.y, 0, height, -1, 1);
  
      this.altitude = noise(nx + 423.2, ny - 231.1);
      this.val = (this.altitude + 0.035 * (index - number_of_particle_sets / 2)) % 1;
      this.angle += 3 * map(this.val, 0, 1, -1, 1);
    }
  
    display(index) {
      let lowerBound = map(index, 0, number_of_particle_sets, 0.45, 0.5);
      let upperBound = map(index, 0, number_of_particle_sets, 0.5, 0.55);
      if (this.val > lowerBound && this.val < upperBound) {
        stroke(this.col);
        push();
        translate(this.pos.x, this.pos.y + 50 - this.altitude * 100 * map(this.pos.y, 0, height, 0.2, 4));
        rotate(this.angle);
        point(0, 0);
        pop();
      }
    }
  }

function random_hash() {
  let chars = "0123456789abcdef";
  let result = '0x';
  for (let i = 64; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function setup() {
  tokenData = {
    "hash": random_hash()
  }

  W = window.innerWidth;
  H = window.innerHeight;
  DIM = min(W, H);
  M = DIM / 1000; // 1000 is the base dimension, adjust this for how you want things to compute. Everything will scale accordingly
  CH = DIM*0.5
  createCanvas(DIM, DIM);
  noiseSeed(tokenData.hash);

  noLoop();
  noStroke();
  colorMode(RGB);

// Define the LTL color palettes inspired by Rothko
let palette1 = {name: "Blue and Grey", colors: [color(49, 59, 72), color(141, 139, 136), color(155, 150, 146)]}; 
let palette2 = {name: "Number 5", colors: [color(221, 43, 24), color(248, 102, 2), color(251, 169, 1), color(249, 192, 7)]}; 
let palette3 = {name: "Number 10", colors: [color(78, 95, 113), color(122, 148, 130), color(158, 192, 167), color(194, 194, 127), color(201, 162, 3), color(190, 129, 13)]}; 
let palette4 = {name: "Number 14", colors: [color(249, 99, 17), color(206, 56, 3), color(163, 48, 3), color(32, 17, 40), color(0, 0, 0)]}; 
let palette5 = {name: "Number 16", colors: [color(18, 21, 61), color(16, 57, 162), color(107, 132, 196), color(247, 243, 232), color(228, 129, 7), color(215, 117, 8)]}; 
let palette6 = {name: "Untitled 1953", colors: [color(45, 49, 59), color(173, 96, 104), color(204, 81, 119), color(209, 92, 141)]}; 
let palette7 = {name: "Untitled 1969", colors: [color(0, 0, 0), color(60, 48, 41), color(141, 132, 125), color(216, 206, 200), color(231, 221, 213)]};

  palettes = [palette1, palette2, palette3, palette4, palette5, palette6, palette7];

  // Select a random palette
  let selectedPalette = random(palettes);
  colors = selectedPalette.colors;
  paletteName = selectedPalette.name;

  for (var j = 0; j < number_of_particle_sets; j++) {
    let ps = [];
    let col = colors[floor(random(colors.length))];
    for (var i = 0; i < number_of_particles; i++) {
      ps.push(
        new Particle(randomGaussian(width / 2, 150), randomGaussian(height / 2, 150), random(TAU), col)
      );
    }
    particle_sets.push(ps);
  }
}

function draw() {
  background(255, 254, 179);
  
  particle_sets.forEach(function(particles, index) {
    particles.forEach(function(particle) {
      particle.update(index);
      particle.display(index);
    });
  });

  p.keyPressed = function() {
    if (p.keyCode === 80) p.saveCanvas('livethelife_' + THE_SEED, 'png');
  };
  
  console.log("Palette Name: " + paletteName);
}

function windowResized() {
  DIM = min(window.innerWidth, window.innerHeight);
  resizeCanvas(DIM, DIM);
  M = DIM / 1000;
}
