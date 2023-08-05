const TOKEN_SUPPLY = 1000;
let flowField;
const colors = [
  '#FF6B35', '#F7C59F', '#EF9645', '#1C1D21', '#A6E3E9',
  '#DD6031', '#FFE156', '#168AAD', '#025955', '#F45B69'
];

class Token {
  constructor(tokenId) {
    this.tokenId = tokenId;
    this.color = colors[tokenId % colors.length];
    this.noiseFactor = tokenId / TOKEN_SUPPLY;
  }
}

function setupToken(tokenId) {
  return new Token(tokenId);
}

function setup() {
  createCanvas(1000, 1000);
  noLoop();
  noFill();
  strokeWeight(4);
  flowField = new FlowField(0.05);
}

function drawGrid(token, gridSize, cellSize, flowField) {
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const xPos = x * cellSize;
        const yPos = y * cellSize;
        const flow = flowField.lookup([xPos, yPos]);
        const xShift = map(flow[0], -1, 1, -cellSize / 4, cellSize / 4);
        const yShift = map(flow[1], -1, 1, -cellSize / 4, cellSize / 4);
        const rotateVal = map(noise(token.noiseFactor * x, token.noiseFactor * y), 0, 1, -PI / 12, PI / 12);
        drawElement(xPos + cellSize / 2 + xShift, yPos + cellSize / 2 + yShift, cellSize / 2, rotateVal, token.color);
      }
    }
  }
  
  function draw() {
    background(0);
    const token = setupToken(0);  // Change this for different outputs
    flowField.update();
  
    const gridSize = 10;
    const cellSize = width / gridSize;
    drawGrid(token, gridSize, cellSize, flowField);
  }

function drawElement(x, y, size, rotateVal, color) {
  push();
  translate(x, y);
  rotate(rotateVal);
  stroke(color);

  // Drawing "生" character
  line(-size / 4, -size / 2, size / 4, -size / 2);
  line(-size / 4, 0, size / 4, 0);
  line(0, -size / 2, 0, size / 2);
  line(-size / 4, size / 2, size / 4, size / 2);

  pop();
}

class FlowField {
  constructor(resolution) {
    this.resolution = resolution;
    this.cols = width / this.resolution;
    this.rows = height / this.resolution;
    this.field = new Array(this.cols * this.rows);
    this.init();
  }

  init() {
    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {
      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {
        const theta = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
        this.field[i + j * this.cols] = createVector(cos(theta), sin(theta));
        yoff += 0.1;
      }
      xoff += 0.1;
    }
  }

  lookup(lookup) {
    const column = int(constrain(lookup[0] / this.resolution, 0, this.cols - 1));
    const row = int(constrain(lookup[1] / this.resolution, 0, this.rows - 1));
    return this.field[column + this.cols * row];
  }

  update() {
    this.init();
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
