let model;

let state = "collection";
let targetLabel = "L";
let label = "";

function setup() {
  createCanvas(400, 400);

  let options = {
    inputs: ["x"],
    outputs: ["L", "R"],
    task: "classification",
    debug: "true",
  };
  model = ml5.neuralNetwork(options);
  background(255);
  stroke(0);
  strokeWeight(4);
  line(200, 0, 200, height);

  createButton("left").mousePressed(function () {
    targetLabel = "L";
  });
  createButton("right").mousePressed(function () {
    targetLabel = "R";
  });
  createButton("train model").mousePressed(function () {
    state = "training";
    console.log("starting training");
    model.normalizeData();
    let options = {
      epochs: 200,
    };
    model.train(options, whileTraining, finishedTraining);
  });
}

function whileTraining(epoch, loss) {
  console.log(epoch);
}

function finishedTraining() {
  console.log("finished training.");
  state = "prediction";
  classifyMouse();
}

function classifyMouse() {
  let inputs = {
    x: mouseX,
  };
  model.classify(inputs, gotResults);
}

function draw() {
  if (state == "prediction") {
    if (label == "R") {
      background(255, 0, 255);
    } else if (label == "L") {
      background(0, 255, 255);
    }
    stroke(255);
    strokeWeight(4);
    line(200, 0, 200, height);
    fill(255);
    textAlign(LEFT);
    textSize(64);
    text(label, 20, 32);
  }
}

function mousePressed() {
  let inputs = {
    x: mouseX,
  };

  if (state == "collection") {
    let target = {
      label: targetLabel,
    };
    model.addData(inputs, target);
    stroke(0);
    noFill();
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(targetLabel, mouseX, mouseY);
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyMouse();
}
