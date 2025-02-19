let sketch = function(p) {
    let THE_SEED;
  
    let patch_width = 100;
    let patch_height = 100;
  
    let quilt = [];
    let quilt_width = 6;
    let quilt_height = 6;
  
    let colors = [];
  
    p.setup = function() {
      p.createCanvas(800, 800);
      THE_SEED = p.floor(p.random(9999999));
      p.randomSeed(THE_SEED);
      p.noLoop();
  
      p.strokeWeight(27 / patch_height);
      p.background('#d6d9d2');
  
      colors = [
        p.color(29, 132, 82),
        p.color(101, 82, 59),
        p.color(140, 52, 52),
        p.color(181, 101, 55),
        p.color(109, 46, 82),
        p.color(58, 68, 118)
      ];
  
      let patch_sets = [
        new PatchSet(diagonal_stripes, 0, diagonal_stripes, 1, diagonal_stripes, 2, diagonal_stripes, 3),
        new PatchSet(diagonal_stripes, 2, diagonal_stripes, 3, diagonal_stripes, 0, diagonal_stripes, 1),
        new PatchSet(diagonal_stripes, 2, diagonal_stripes, 2, diagonal_stripes, 1, diagonal_stripes, 1),
        new PatchSet(diagonal_stripes, 0, diagonal_stripes, 0, diagonal_stripes, 0, diagonal_stripes, 0),
        new PatchSet(checkered, 0, checkered, 1, checkered, 2, checkered, 3),
        new PatchSet(checkered, 0, half_n_half, 2, checkered, 2, half_n_half, 0),
        new PatchSet(corners, 0, corners, 1, corners, 0, corners, 1),
        new PatchSet(kings, 0, kings, 0, kings_flipped, 2, kings_flipped, 2),
        new PatchSet(kings, 2, kings, 3, kings, 0, kings, 1),
        new PatchSet(yoyo, 1, yoyo, 3, yoyo, 1, yoyo, 3),
        new PatchSet(ell_and_square, 0, ell_and_square, 1, ell_and_square, 2, ell_and_square, 3),
        new PatchSet(ell_and_square, 2, ell_and_square, 3, ell_and_square, 0, ell_and_square, 1),
        new PatchSet(skewed, 0, skewed, 1, skewed, 2, skewed, 3),
        new PatchSet(spruce, 2, spruce, 2, spruce, 2, spruce, 2),
        new PatchSet(trisquare, 2, trisquare, 1, trisquare, 0, trisquare, 3)
      ];
  
      p.translate(100, 100);
      p.scale(patch_width, patch_height);
  
      let cols = getrs(colors, 2);
      let patch = getr(patch_sets);
      for (var i = 0; i < quilt_height; i++) {
        p.push();
        for (var j = 0; j < quilt_width; j++) {
          patch.display(cols, cols, cols, cols);
          p.translate(2, 0);
        }
        p.pop();
        p.translate(0, 2);
      }
    };
  
    p.keyPressed = function() {
      if (p.keyCode === 80) p.saveCanvas('sketch_' + THE_SEED, 'jpeg');
    };
  
    function getr(list) {
      return list[p.floor(p.random(list.length))];
    }
  
    function getrs(list, n) {
      return p.shuffle(list).slice(n);
    }
  
    // ---- CLASSES ----
  
    class PatchSet {
      constructor(p1, r1, p2, r2, p3, r3, p4, r4) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
  
        this.r1 = r1;
        this.r2 = r2;
        this.r3 = r3;
        this.r4 = r4;
      }
  
      display(cols1, cols2, cols3, cols4, rotation) {
        p.push();
        p.translate(1, 1);
        p.rotate(rotation * p.PI / 2);
        p.translate(-1, -1);
        this.p1.display(cols1, this.r1);
        p.translate(1, 0);
        this.p2.display(cols2, this.r2);
        p.translate(0, 1);
        this.p3.display(cols3, this.r3);
        p.translate(-1, 0);
        this.p4.display(cols4, this.r4);
        p.pop();
      }
    }
  
    class Patch {
      constructor(shapes1, shapes2) {
        this.shapes1 = shapes1;
        this.shapes2 = shapes2;
      }
  
      display(cols, rotation) {
        p.push();
        p.fill('#d6d9d2');
        p.translate(0.5, 0.5);
        p.rotate(rotation * p.PI / 2);
        p.translate(-0.5, -0.5);
        p.rect(0, 0, 1, 1);
        this.shapes1.forEach(function(shape) {
          shape.display(cols[0]);
        });
        this.shapes2.forEach(function(shape) {
          shape.display(cols[1]);
        });
        p.pop();
      }
    }
  
    class Shape {
      constructor(path, transx, transy, rotation) {
        this.path = path;
        this.transx = transx;
        this.transy = transy;
        this.rotation = rotation;
      }
  
      display(col) {
        p.push();
        p.translate(0.5, 0.5);
        p.rotate(this.rotation * p.PI / 2);
        p.translate(-0.5, -0.5);
        p.translate(this.transx, this.transy);
        p.fill(col);
        this.path();
        p.pop();
      }
    }
  
    // ---- PATCHES ----
  
    var checkered = new Patch([new Shape(square, 0, 0, 0)], [new Shape(square, 0.5, 0.5, 0)]);
    var half_n_half = new Patch([new Shape(half, 0, 0, 0)], [new Shape(half, 0, 0, 2)]);
    var diagonal_stripes = new Patch(
      [new Shape(corner, 0, 0, 0), new Shape(corner, 0, 0, 2)],
      [new Shape(diagonal, 0, 0, 0)]
    );
    var skewed = new Patch([new Shape(house, 0, 0, 0)], [new Shape(house, 0, 0, 2)]);
    var wedge = new Patch([new Shape(triangle, 0, 0, 0)], [new Shape(arrow, 0, 0, 0)]);
    var spruce = new Patch(
      [new Shape(triangle, 0, 0, 0), new Shape(triangle, 0, 0.5, 0)],
      [new Shape(corner, 0, 0.5, 2), new Shape(corner, 0.5, 0, 3)]
    );
    var corners = new Patch(
      [new Shape(quarter, 0, 0, 0), new Shape(quarter, 0, 0, 2)],
      [new Shape(quarter, 0, 0, 1), new Shape(quarter, 0, 0, 3)]
    );
    var kings = new Patch(
      [new Shape(quarter, 0, 0, 0), new Shape(quarter, 0, 0.5, 3)],
      [new Shape(quarter, 0, 0, 3), new Shape(quarter, 0.5, 0, 0)]
    );
    var kings_flipped = new Patch(
      [new Shape(quarter, 0, 0, 3), new Shape(quarter, 0.5, 0, 0)],
      [new Shape(quarter, 0, 0, 0), new Shape(quarter, 0, 0.5, 3)]
    );
    var yoyo = new Patch([new Shape(semi, 0, 0, 0)], [new Shape(semi, 0, 0, 2)]);
    var ell_and_square = new Patch([new Shape(small_square, 0, 0, 0)], [new Shape(ell, 0, 0, 2)]);
    var trisquare = new Patch([new Shape(square, 0, 0, 0)], [new Shape(corner, 0, 0, 1), new Shape(corner, 0, 0, 3)]);
  
    // ---- SHAPES ----
  
    function square() {
      p.rect(0, 0, 0.5, 0.5);
    }
  
    function half() {
      p.rect(0, 0, 1, 0.5);
    }
  
    function small_square() {
      p.rect(0, 0, 1 / 3, 1 / 3);
    }
  
    function ell() {
      p.beginShape();
      p.vertex(0, 0);
      p.vertex(1, 0);
      p.vertex(1, 1 / 3);
      p.vertex(1 / 3, 1 / 3);
      p.vertex(1 / 3, 1);
      p.vertex(0, 1);
      p.endShape(p.CLOSE);
    }
  
    function corner() {
      p.strokeJoin(p.ROUND);
      p.beginShape();
      p.vertex(0, 0);
      p.vertex(0.5, 0);
      p.vertex(0, 0.5);
      p.endShape(p.CLOSE);
      p.strokeJoin(p.MILTER);
    }
  
    function diagonal() {
      p.strokeJoin(p.ROUND);
      p.beginShape();
      p.vertex(0, 0.5);
      p.vertex(0.5, 0);
      p.vertex(1, 0);
      p.vertex(0, 1);
      p.endShape(p.CLOSE);
      p.strokeJoin(p.MILTER);
    }
  
    function triangle() {
      p.strokeJoin(p.ROUND);
      p.beginShape();
      p.vertex(0, 0);
      p.vertex(1, 0);
      p.vertex(0.5, 0.5);
      p.endShape(p.CLOSE);
      p.strokeJoin(p.MILTER);
    }
  
    function house() {
      p.strokeJoin(p.ROUND);
      p.beginShape();
      p.vertex(0, 0);
      p.vertex(0.5, 0);
      p.vertex(0.5, 1);
      p.vertex(0, 0.5);
      p.endShape(p.CLOSE);
      p.strokeJoin(p.MILTER);
    }
  
    function arrow() {
      p.strokeJoin(p.ROUND);
      p.beginShape();
      p.vertex(0, 0);
      p.vertex(0.5, 0.5);
      p.vertex(1, 0);
      p.vertex(1, 0.5);
      p.vertex(0.5, 1);
      p.vertex(0, 0.5);
      p.endShape(p.CLOSE);
      p.strokeJoin(p.MILTER);
    }
  
    function slash() {
      p.beginShape();
      p.vertex(0, 0);
      p.vertex(0.5, 0.5);
      p.vertex(0.5, 1);
      p.vertex(0, 0.5);
      p.endShape(p.CLOSE);
    }
  
    function semi() {
      p.arc(0.5, 0, 1, 1, 0, p.PI, p.CHORD);
    }
  
    function quarter() {
      p.arc(0, 0, 1, 1, 0, p.PI / 2, p.PIE);
    }
  };
  new p5(sketch);