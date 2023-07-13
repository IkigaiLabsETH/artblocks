// Creating generative art with Perlin noise and color palettes. 
// Customize it by changing the way the particles move, the conditions under which they are displayed, and the color palettes.
// Code now includes the speed property for the particles, the modified display conditions
// Creating multiple sets of particles, each with a different color from the LTL palettes
// Code is now using instance mode, which means that all p5.js functions are called on the p object that is passed into the sketch function. This allows for better encapsulation and makes it easier to have multiple sketches on the same page without them interfering with each other.

let sketch = function(p) {
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
      this.pos = p.createVector(x, y);
      this.altitude = 0;
      this.val = 0;
      this.angle = phi;
      this.col = col;
    }

    update(index) {
      this.pos.x += p.cos(this.angle);
      this.pos.y += p.sin(this.angle);

      let nx = 1.1 * p.map(this.pos.y, 0, H, 4, 0.2) * p.map(this.pos.x, 0, W, -1, 1);
      let ny = 3.1 * p.map(this.pos.y, 0, H, 4, 0.2) * p.map(this.pos.y, 0, H, -1, 1);

      this.altitude = p.noise(nx + 423.2, ny - 231.1);
      this.val = (this.altitude + 0.035 * (index - number_of_particle_sets / 2)) % 1;
      this.angle += 3 * p.map(this.val, 0, 1, -1, 1);
    }

    display(index) {
      if (this.val > 0.485 && this.val < 0.515) {
        p.stroke(this.col);
        p.push();
        p.translate(this.pos.x, this.pos.y + 50 - this.altitude * 100 * p.map(this.pos.y, 0, H, 0.2, 4));
        p.rotate(this.angle);
        p.point(0, 0);
        p.pop();
      }
    }
  }

  function random_hash() {
    let chars = "0123456789abcdef";
    let result = '0x';
    for (let i = 64; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  p.setup = function() {
    tokenData = {
      "hash": random_hash()
    }

    W = p.windowWidth;
    H = p.windowHeight;
    DIM = p.min(W, H);
    M = DIM / 1000; // 1000 is the base dimension, adjust this for how you want things to compute. Everything will scale accordingly
    CH = DIM*0.5
    p.createCanvas(DIM, DIM);
    p.noiseSeed(tokenData.hash);

    p.noLoop();
    p.noStroke();
    p.colorMode(p.RGB);

    // Define the LTL color palettes inspired by Rothko
    let palette1 = {name: "Blue and Grey", colors: [p.color(49, 59, 72), p.color(141, 139, 136), p.color(155, 150, 146)]}; 
    let palette2 = {name: "Number 5", colors: [p.color(221, 43, 24), p.color(248, 102, 2), p.color(251, 169, 1), p.color(249, 192, 7)]}; 
    let palette3 = {name: "Number 10", colors: [p.color(78, 95, 113), p.color(122, 148, 130), p.color(158, 192, 167), p.color(194, 194, 127), p.color(201, 162, 3), p.color(190, 129, 13)]}; 
    let palette4 = {name: "Number 14", colors: [p.color(249, 99, 17), p.color(206, 56, 3), p.color(163, 48, 3), p.color(32, 17, 40), p.color(0, 0, 0)]}; 
    let palette5 = {name: "Number 16", colors: [p.color(18, 21, 61), p.color(16, 57, 162), p.color(107, 132, 196), p.color(247, 243, 232), p.color(228, 129, 7), p.color(215, 117, 8)]}; 
    let palette6 = {name: "Untitled 1953", colors: [p.color(45, 49, 59), p.color(173, 96, 104), p.color(204, 81, 119), p.color(209, 92, 141)]}; 
    let palette7 = {name: "Untitled 1969", colors: [p.color(0, 0, 0), p.color(60, 48, 41), p.color(141, 132, 125), p.color(216, 206, 200), p.color(231, 221, 213)]};

    palettes = [palette1, palette2, palette3, palette4, palette5, palette6, palette7];

    // Select a random palette
    let selectedPalette = p.random(palettes);
    colors = selectedPalette.colors;
    paletteName = selectedPalette.name;

    for (var j = 0; j < number_of_particle_sets; j++) {
      let ps = [];
      let col = colors[p.floor(p.random(colors.length))];
      for (var i = 0; i < number_of_particles; i++) {
        ps.push(
          new Particle(p.randomGaussian(p.width / 2, 150), p.randomGaussian(p.height / 2, 150), p.random(p.TAU), col)
        );
      }
      particle_sets.push(ps);
    }
  }

  p.draw = function() {
    p.background(255);

    particle_sets.forEach(function(particles, index) {
      particles.forEach(function(particle) {
        particle.update(index);
        particle.display(index);
      });
    });

    console.log("Palette Name: " + paletteName);
  }

  p.windowResized = function() {
    DIM = p.min(p.windowWidth, p.windowHeight);
    p.resizeCanvas(DIM, DIM);
    M = DIM / 1000;
  }
}

new p5(sketch);
