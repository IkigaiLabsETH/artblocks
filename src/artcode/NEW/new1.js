let randomgriglia = 4; // Adjust this value as needed
let shuffrandom = 0.8; // Adjust this value as needed
let noise_type = 1; // Adjust this value as needed
let zoff = 0; // Global noise offset
let movimento = 0; // Initial movement variable
let finemovimento = 200; // Adjust this value as needed
let finemovimento2 = 400; // Adjust this value as needed
let palette = [
  [
    color(254, 242, 145, 20),
    color(253, 198, 103, 20),
    color(182, 245, 200, 20),
    color(84, 146, 76, 20),
    color(221, 124, 81, 20),
    color(253, 158, 149, 20),
    color(112, 184, 214, 20)
  ],
  [
    color(255, 0, 0, 20),
    color(0, 255, 0, 20),
    color(0, 0, 255, 20),
    color(255, 255, 0, 20),
    color(255, 0, 255, 20),
    color(0, 255, 255, 20)
  ]
];
let particelle = [];
let particelle2 = [];

function griglia(assex, assey, largh, altez, prof, passo) {
  push();
  this.passo = passo;
  let ste = this.passo;
  if (prof > randomgriglia) {
    if (random() > 0.5) {
      griglia(assex, assey, largh, altez / 2, prof - 1);
      griglia(assex, assey + altez / 2, largh, altez / 2, prof - 1);
    } else {
      griglia(assex, assey, largh / 2, altez, prof - 1);
      griglia(assex + largh / 2, assey, largh / 2, altez, prof - 1);
    }
  } else {
    let radius = min(largh, altez) / 2;
    let centerX = assex + largh / 2;
    let centerY = assey + altez / 2;
    let angleStep = TWO_PI / 7;
    let offsetAngle = random(TWO_PI);
    let paletteIndex = floor(random(palette.length));
    let pal = palette[paletteIndex];
    let pal2 = palette[(paletteIndex + 1) % palette.length];
    let nuovoflusso;
    let nuovoflusso2;
    if (movimento < finemovimento) {
      nuovoflusso = new Flussocanalizzatore(assex, assey, resolution, largh, altez, 1);
    } else if (movimento >= finemovimento && movimento < finemovimento2) {
      nuovoflusso2 = new Flussocanalizzatore(assex, assey, resolution, largh, altez, 2);
    } else if (movimento >= finemovimento2) {
      noLoop();
    }
    for (let i = 0; i < 100; i++) {
      let angle = i * angleStep + offsetAngle;
      let particleX = centerX + cos(angle) * radius;
      let particleY = centerY + sin(angle) * radius;
      particelle.push(new ParticolatoF(assex, assey, largh, altez, pal));
      if (shuffrandom < 0.80) {
        particelle2.push(new ParticolatoF(assex, assey, largh, altez, pal));
      } else {
        particelle2.push(new ParticolatoF(assex, assey, largh, altez, pal2));
      }
    }
  }
  pop();
}

function setup() {
  createCanvas(800, 800);
  griglia(0, 0, width, height, 7, 30);
  generateFractalParticles(); // Generate initial particles
}

function draw() {
  background(0);
  movimento++;

  if (movimento < finemovimento) {
    for (let particolato of particelle) {
      particolato.follow(nuovoflusso);
      particolato.update();
      particolato.writeln();
    }
  } else if (movimento >= finemovimento && movimento < finemovimento2) {
    for (let particolato of particelle2) {
      particolato.follow(nuovoflusso2);
      particolato.update();
      particolato.writeln();
    }
  } else if (movimento >= finemovimento2) {
    noLoop();
  }

  if (particelle.length < 500 && frameCount % 10 === 0) {
    generateFractalParticles();
  }
}

function generateFractalParticles() {
  griglia(0, 0, width, height, 7, 30);
}

class Flussocanalizzatore {
  constructor(rectWidth, rectHeight, resolution, offsetX, offsetY, swi) {
    this.swi = swi;
    this.rectWidth = rectWidth;
    this.rectHeight = rectHeight;
    this.resolution = resolution;
    this.cols = rectWidth / resolution;
    this.rows = rectHeight / resolution;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.field = this.generaFlusso();
  }

  generaFlusso() {
    let field = [];
    let yoff = 0;
    for (let y = 0; y < this.rows; y++) {
      let row = [];
      let xoff = 0;
      for (let x = 0; x < this.cols; x++) {
        let angolo;
        switch (noise_type) {
          case 1:
            angolo = map(noise((x + this.offsetX) * 0.05, (y + this.offsetY) * 0.05), 0, 0.1, 0, TWO_PI);
            break;
          case 2:
            angolo = map(noise(x * 0.005, y * 0.005), 0, 0.001, 0, TAU);
            break;
          case 3:
            angolo = noise(xoff, yoff, zoff) * TWO_PI * 2;
            break;
          case 4:
            angolo = map(noise(xoff, yoff, zoff), 0, 0.1, 0, TWO_PI * 2);
            break;
          case 5:
            angolo = map(noise(xoff * 0.005, yoff * 0.005, zoff * 0.005), 0, 0.1, 0, TWO_PI * 2);
            break;
          case 6:
            angolo = map(noise(x * 0.005, y * 0.005, zoff * 0.005), 0, 0.1, 0, TAU);
            break;
          default:
        }
        xoff += 0.1;
        let vector = p5.Vector.fromAngle(angolo);
        row.push(vector);
      }
      field.push(row);
    }
    yoff += 0.1;
    zoff += 0.03;
    return field;
  }

  lookup(position) {
    let col = floor(constrain((position.x - this.offsetX) / this.resolution, 0, this.cols - 1));
    let row = floor(constrain((position.y - this.offsetY) / this.resolution, 0, this.rows - 1));
    return this.field[row][col].copy();
  }
}

class ParticolatoF {
  constructor(rectX, rectY, rectWidth, rectHeight, pal) {
    this.pal = pal;
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

  follow(nuovoflusso) {
    let desired = nuovoflusso.lookup(this.position);
    desired.setMag(this.maxSpeed);
    let steering = p5.Vector.sub(desired, this.velocity);
    steering.limit(this.maxForce);
    this.applyForce(steering);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.edges();
  }

  edges() {
    if (this.position.x > this.rectX + this.rectWidth) this.position.x = this.rectX;
    if (this.position.x < this.rectX) this.position.x = this.rectX + this.rectWidth;
    if (this.position.y > this.rectY + this.rectHeight) this.position.y = this.rectY;
    if (this.position.y < this.rectY) this.position.y = this.rectY + this.rectHeight;
  }

  writeln() {
    push();
    if (densityValue === 1) {
      strokeWeight(0.1);
    }
    if (densityValue === 2) {
      strokeWeight(0.1);
    }
    if (densityValue === 3) {
      strokeWeight(0.25);
    }
    if (densityValue === 4) {
      strokeWeight(0.25);
    }
    if (densityValue === 5) {
      strokeWeight(0.25);
    }
    if (densityValue === 6) {
      strokeWeight(0.25);
    }
    if (densityValue === 7) {
      strokeWeight(0.25);
    }
    noFill();
    if (this.pal) {
      let levels = this.pal.levels || [255, 255, 255];
      stroke(levels[0], levels[1], levels[2]);
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

function keyPressed() {
  if (keyCode === 80) {
    saveCanvas('sketch_' + THE_SEED, 'jpeg');
  }
}

let resolution = 10; // Adjust this value as needed
let type_stroke = 1; // Adjust this value as needed
let densityValue = 1; // Adjust this value as needed

function setup() {
  createCanvas(800, 800);
  griglia(0, 0, width, height, 7, 30);
  generateFractalParticles(); // Generate initial particles
}

function draw() {
  background(0);
  movimento++;

  if (movimento < finemovimento) {
    for (let particolato of particelle) {
      particolato.follow(nuovoflusso);
      particolato.update();
      particolato.writeln();
    }
  } else if (movimento >= finemovimento && movimento < finemovimento2) {
    for (let particolato of particelle2) {
      particolato.follow(nuovoflusso2);
      particolato.update();
      particolato.writeln();
    }
  } else if (movimento >= finemovimento2) {
    noLoop();
  }

  if (particelle.length < 500 && frameCount % 10 === 0) {
    generateFractalParticles();
  }
}

function generateFractalParticles() {
  griglia(0, 0, width, height, 7, 30);
}

class Flussocanalizzatore {
  constructor(rectWidth, rectHeight, resolution, offsetX, offsetY, swi) {
    this.swi = swi;
    this.rectWidth = rectWidth;
    this.rectHeight = rectHeight;
    this.resolution = resolution;
    this.cols = rectWidth / resolution;
    this.rows = rectHeight / resolution;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.field = this.generaFlusso();
  }

  generaFlusso() {
    let field = [];
    let yoff = 0;
    for (let y = 0; y < this.rows; y++) {
      let row = [];
      let xoff = 0;
      for (let x = 0; x < this.cols; x++) {
        let angolo;
        switch (noise_type) {
          case 1:
            angolo = map(noise((x + this.offsetX) * 0.05, (y + this.offsetY) * 0.05), 0, 0.1, 0, TWO_PI);
            break;
          case 2:
            angolo = map(noise(x * 0.005, y * 0.005), 0, 0.001, 0, TAU);
            break;
          case 3:
            angolo = noise(xoff, yoff, zoff) * TWO_PI * 2;
            break;
          case 4:
            angolo = map(noise(xoff, yoff, zoff), 0, 0.1, 0, TWO_PI * 2);
            break;
          case 5:
            angolo = map(noise(xoff * 0.005, yoff * 0.005, zoff * 0.005), 0, 0.1, 0, TWO_PI * 2);
            break;
          case 6:
            angolo = map(noise(x * 0.005, y * 0.005, zoff * 0.005), 0, 0.1, 0, TAU);
            break;
          default:
        }
        xoff += 0.1;
        let vector = p5.Vector.fromAngle(angolo);
        row.push(vector);
      }
      field.push(row);
    }
    yoff += 0.1;
    zoff += 0.03;
    return field;
  }

  lookup(position) {
    let col = floor(constrain((position.x - this.offsetX) / this.resolution, 0, this.cols - 1));
    let row = floor(constrain((position.y - this.offsetY) / this.resolution, 0, this.rows - 1));
    return this.field[row][col].copy();
  }
}

class ParticolatoF {
  constructor(rectX, rectY, rectWidth, rectHeight, pal) {
    this.pal = pal;
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

  follow(nuovoflusso) {
    let desired = nuovoflusso.lookup(this.position);
    desired.setMag(this.maxSpeed);
    let steering = p5.Vector.sub(desired, this.velocity);
    steering.limit(this.maxForce);
    this.applyForce(steering);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.edges();
  }

  edges() {
    if (this.position.x > this.rectX + this.rectWidth) this.position.x = this.rectX;
    if (this.position.x < this.rectX) this.position.x = this.rectX + this.rectWidth;
    if (this.position.y > this.rectY + this.rectHeight) this.position.y = this.rectY;
    if (this.position.y < this.rectY) this.position.y = this.rectY + this.rectHeight;
  }

  writeln() {
    push();
    if (densityValue === 1) {
      strokeWeight(0.1);
    }
    if (densityValue === 2) {
      strokeWeight(0.1);
    }
    if (densityValue === 3) {
      strokeWeight(0.25);
    }
    if (densityValue === 4) {
      strokeWeight(0.25);
    }
    if (densityValue === 5) {
      strokeWeight(0.25);
    }
    if (densityValue === 6) {
      strokeWeight(0.25);
    }
    if (densityValue === 7) {
      strokeWeight(0.25);
    }
    noFill();
    if (this.pal) {
      let levels = this.pal.levels || [255, 255, 255];
      stroke(levels[0], levels[1], levels[2]);
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

function keyPressed() {
  if (keyCode === 80) {
    saveCanvas('sketch_' + THE_SEED, 'jpeg');
  }
}
