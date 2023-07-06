// Define your color palette
let palette = ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#FFFFFF"];

function fn1d(){
  var grid = [];
  for (var i = 0; i < 10; i++){
    grid.push(((random()-0.5)*2))
  }
  for (var k = 0; k < 5; k++){
    for (var i = grid.length-1; i>=0; i--){
      var j = (i+1)%grid.length;
      grid.splice(i+1,0,(grid[i]+grid[j])/2+((random()-0.5)*2)*pow(0.5,k+1));
    }
  }
  return grid;
}

function fn2d(){
  var grid = [];
  for (var i = 0; i < 100; i++){
    grid.push(((random()-0.5)*2))
  }
  for (var k = 0; k < 4; k++){
    var r = ~~Math.sqrt(grid.length);
    
    for (var i = grid.length-1; i>=0; i--){
      var j = (i+1)%grid.length;
      grid.splice(i+1,0,(grid[i]+grid[j])/2+((random()-0.5)*2)*pow(0.5,k+1));
    }
    r*=2;
    for (var i = r-1; i>= 0; i--){
      var j = (i+1)%r;
      var a = grid.slice(i*r,i*r+r);
      var b = grid.slice(j*r,j*r+r)
      grid = grid.slice(0,i*r+r).concat(a.map((x,n)=>(x+b[n])/2+((random()-0.5)*2)*pow(0.5,k+1))).concat(grid.slice(i*r+r));
    }
  }
  return grid;
}

function setup() {
  createCanvas(2000, 2000);
  noFill();
  
  var grid = fn2d();

  var r = ~~Math.sqrt(grid.length);
  for (var i = 0; i < r; i++){
    beginShape();
    for (var j = 0; j < r; j++){
      // Choose a color based on y-value
      var y = i*5+grid[i*r+j]*42;
      let colorIndex = ~~map(y, 0, height, 0, palette.length);
      colorIndex = constrain(colorIndex, 0, palette.length-1); // Constrain colorIndex to be within valid range
      stroke(palette[colorIndex]);
      vertex(j*4, y);
    }
    endShape();
  } 
}
