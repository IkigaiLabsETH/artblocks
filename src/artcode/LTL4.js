// Creating generative art with Perlin noise and color palettes. 
// Customize it by changing the way the particles move, the conditions under which they are displayed, and the color palettes.
// Code now includes the speed property for the particles, the modified display conditions
// Creating multiple sets of particles, each with a different color from the LTL palettes
// Code is now using instance mode, which means that all p5.js functions are called on the p object that is passed into the sketch function. This allows for better encapsulation and makes it easier to have multiple sketches on the same page without them interfering with each other.
// Generating a tectonic plate-like visualization. To achieve a similar effect in our code, modify the draw() function and create additional helper functions.
// To achieve a mountain range-like visualization, we need to modify the display_block function to draw the blocks as filled rectangles instead of using vertices. 

let sketch = function(p) {
    let colors = [];
    let paletteName;
    let palettes = [];
    let tokenData;
    let W, H, DIM, M, CH;
    let particle_sets = [];
    let number_of_particles = 3300;
    let number_of_particle_sets = 17;
    let backgroundColors = [
      p.color(251, 46, 1), // Jasper Red
      p.color(111, 78, 55), // Coffee
      p.color(20, 102, 178) // Ephren Blue
    ];
    let blocks = []; // Initialize the blocks array
    let number_of_blocks = 5; // Define the number of blocks
    let number_of_plates = 10; // Define the number of plates
    let plate_padding = 10; // Replace 10 with the desired value for plate padding
    let noise_zoom = 0.1; // Adjust the noise zoom value as needed
    let magnitude = 0.2; // Adjust the magnitude value as needed


  
    let resolution = 100; // Define the resolution value
  
    class Particle {
      constructor(x, y, phi, col) {
        this.pos = p.createVector(x, y);
        this.altitude = 0;
        this.val = 0;
        this.angle = phi;
        this.col = col;
        this.speed = p.random(0.5, 2); // Add a speed property
      }
  
      update(index) {
        this.pos.x += p.cos(this.angle) * this.speed;
        this.pos.y += p.sin(this.angle) * this.speed;
  
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
  
    function getNoise(x, y, z) {
      return -magnitude * (p.noise(x / noise_zoom, y, z) - 0.3);
    }
  
    function random_hash() {
      let chars = "0123456789abcdef";
      let result = "0x";
      for (let i = 64; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    }
  
    // Helper function to create tectonic plate-like visualization
    function create_block(number_of_plates, block_index) {
      let plates = [];
      for (let plate_index = 0; plate_index < number_of_plates; plate_index++) {
        let points = [];
        let plate_height = p.randomGaussian(0, 10);
  
        for (let i = 0; i <= resolution; i++) {
          let noiseValue = getNoise(i, plate_index, block_index);
          let plate_value = p.min(-plate_padding, noiseValue - plate_height);
          if (plate_index > 0) {
            plate_value += plates[plate_index - 1].points[i];
          }
          points.push(plate_value);
        }
  
        plates.push({
          points: points,
          color: colors[p.floor(p.random(colors.length))],
        });
      }
      return plates;
    }
  
    function display_block(block, block_index) {
        block.forEach(function (plate, index) {
          p.fill(plate.color);
          for (let i = 0; i < resolution; i++) {
            let x = i * (W / resolution);
            let y = block[index].points[i];
            let width = W / resolution;
            let height = H - y;
            p.rect(x, y, width, height);
          }
        });
      }
  
    function create_tectonic_visualization() {
      // Creating the tectonic visualization
      blocks.forEach(function(block, block_index) {
        let current_height = 0;
        p.translate(65, p.height - 65);
  
        block.forEach(function(plate, index) {
          let block_height = p.abs(Math.min(...plate.points) - 60);
  
          if (current_height + block_height < p.height - 200) {
            display_block(block, block_index);
            p.translate(0, -block_height);
            current_height += block_height;
          } else {
            p.translate(570, current_height);
            display_block(block, block_index);
            p.translate(0, -block_height);
            current_height = block_height;
          }
        });
      });
    }
  
    p.setup = function() {
      tokenData = {
        hash: random_hash(),
      };
  
      W = p.windowWidth;
      H = p.windowHeight;
      DIM = p.min(W, H);
      M = DIM / 1000;
      CH = DIM * 0.5;
      p.createCanvas(DIM, DIM);
      p.noiseSeed(tokenData.hash);
  
      p.noLoop();
      p.noStroke();
      p.colorMode(p.RGB);
  
      // Define the LTL color palettes inspired by Rothko
      let palette1 = {
        name: "Blue and Grey",
        colors: [p.color(49, 59, 72), p.color(141, 139, 136), p.color(155, 150, 146)],
      };
      let palette2 = {
        name: "Number 5",
        colors: [
          p.color(221, 43, 24),
          p.color(248, 102, 2),
          p.color(251, 169, 1),
          p.color(249, 192, 7),
        ],
      };
      let palette3 = {
        name: "Number 10",
        colors: [
          p.color(78, 95, 113),
          p.color(122, 148, 130),
          p.color(158, 192, 167),
          p.color(194, 194, 127),
          p.color(201, 162, 3),
          p.color(190, 129, 13),
        ],
      };
      let palette4 = {
        name: "Number 14",
        colors: [p.color(249, 99, 17), p.color(206, 56, 3), p.color(163, 48, 3), p.color(32, 17, 40), p.color(0, 0, 0)],
      };
      let palette5 = {
        name: "Number 16",
        colors: [
          p.color(18, 21, 61),
          p.color(16, 57, 162),
          p.color(107, 132, 196),
          p.color(247, 243, 232),
          p.color(228, 129, 7),
          p.color(215, 117, 8),
        ],
      };
      let palette6 = {
        name: "Untitled 1953",
        colors: [p.color(45, 49, 59), p.color(173, 96, 104), p.color(204, 81, 119), p.color(209, 92, 141)],
      };
      let palette7 = {
        name: "Untitled 1969",
        colors: [
          p.color(0, 0, 0),
          p.color(60, 48, 41),
          p.color(141, 132, 125),
          p.color(216, 206, 200),
          p.color(231, 221, 213),
        ],
      };
  
      palettes = [palette1, palette2, palette3, palette4, palette5, palette6, palette7];
  
      // Select a random palette
      let selectedPalette = p.random(palettes);
      colors = selectedPalette.colors;
      paletteName = selectedPalette.name;
  
      // Create the particle sets
      for (let j = 0; j < number_of_particle_sets; j++) {
        let ps = [];
        let col = colors[p.floor(p.random(colors.length))];
        for (let i = 0; i < number_of_particles; i++) {
          ps.push(new Particle(p.randomGaussian(p.width / 2, 150), p.randomGaussian(p.height / 2, 150), p.random(p.TAU), col));
        }
        particle_sets.push(ps);
      }
  
      // Create the blocks array
      for (let blockIndex = 0; blockIndex < number_of_blocks; blockIndex++) {
        let block = create_block(number_of_plates, blockIndex);
        blocks.push(block);
      }
    };
  
    p.draw = function() {
      p.background(p.color(0)); // Set a black background
  
      // Render the particle sets
      particle_sets.forEach(function(particles, index) {
        particles.forEach(function(particle) {
          particle.update(index);
          particle.display(index);
        });
      });
  
      // Render the tectonic visualization
      create_tectonic_visualization();
  
      console.log("Palette Name: " + paletteName);
    };
  
    p.windowResized = function() {
      DIM = p.min(p.windowWidth, p.windowHeight);
      p.resizeCanvas(DIM, DIM);
      M = DIM / 1000;
    };
  };
  
  new p5(sketch);
  