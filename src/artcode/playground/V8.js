var [WIDTH, HEIGHT] = [window.innerWidth, window.innerHeight];
var COLOR_BG = [230,222,210];
var COLOR_STROKE = [150,135,130];
var COLOR_FILL = [255,250,235];
var STROKE_WEIGHT = 3;
var [STATE_MOVE, STATE_WHIRL] = [0,1];
var N_PEN = 2;
var pens = [];

function new_pen(x,y){
  return {
    state:STATE_MOVE, x:x,y:y,px:x,py:y,
    radius: 100, speed: 1, ratio: 1, step: 0, center:[0,0]
  };
}

function update_pen(pen) {
  var multiplier = 1;
  
  if (pen.state == STATE_MOVE){
    pen.x -= 20*pen.speed;
    pen.y += (noise(frameCount,2)-0.5)*50;
    pen.step += pen.speed;
    if (pen.step > pen.radius/8){
      pen.state = STATE_WHIRL;
      pen.step = 0;
      pen.center = [pen.x, pen.y-pen.radius/3];
      pen.ratio = Math.random()*0.5+0.3;
    }
    multiplier = pen.step/5;
    
  } else if (pen.state == STATE_WHIRL){
    var rr = (pen.radius-(pen.step)*2)*(noise(frameCount*0.5)*0.6+0.4);
    var a = (pen.step)*0.5+Math.PI/2;
    pen.x = Math.cos(a)*rr+pen.center[0];
    pen.y = Math.sin(a)*rr*pen.ratio+pen.center[1];
    pen.step += 1;
    if (rr <= 1){
      pen.state = STATE_MOVE;
      pen.speed = Math.random()*0.8+0.2;
      pen.radius = Math.random()*80+20;
      pen.step = 0;
    }
    multiplier = 2;
  }
    
  var v = [pen.x-pen.px,pen.y-pen.py];
  var n = Okb.vector.normalize(v)
  var m = Math.ceil(Okb.vector.magnitude(v));
  
  var r = m*multiplier;
  n = [n.y, -n.x]
  
  var mod_x = (x)=> ((x + width * 100) % width);
  var mod_y = (y)=> ((y + height * 100) % height);
  
  fill(COLOR_STROKE);
  ellipse(mod_x(pen.px)+n.x*STROKE_WEIGHT,mod_y(pen.py)+n.y*STROKE_WEIGHT,r,r);
  fill(COLOR_FILL);
  ellipse(mod_x(pen.px),mod_y(pen.py),r,r);  
  
  pen.px = pen.x;
  pen.py = pen.y;
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(COLOR_BG);
  noStroke();
  
  for (var i = 0; i < N_PEN; i++){
    pens.push(new_pen.apply(null,(i==0)?
      [WIDTH/2,HEIGHT/2]:[Math.random()*WIDTH,Math.random()*HEIGHT]
    ))
  }
}
function draw(){
  pens.map(update_pen);
}