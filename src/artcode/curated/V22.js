/* 

cube coorinates image: 
https://www.pngjoy.com/pngm/116/2382078_3d-cube-opengl-cube-coordinates-transparent-png.png

index of largest array value:
https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array

great color tool:
http://colorizer.org

device orientation: 
https://trekhleb.dev/blog/2021/gyro-web/

3D rotations:
- Euler to quaternion: http://www.euclideanspace.com/maths/geometry/rotations/conversions/eulerToQuaternion/index.htm
- quaternion rotation: http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/transforms/derivations/vectors/index.htm


description:

const void;
let light;
let expanse;

function life () {
  ...
}
*/

// /*
function random_hash() {
    let x = "0123456789abcdef", hash = '0x'
    for (let i = 64; i > 0; --i) {
      hash += x[Math.floor(Math.random()*x.length)]
    }
    return hash;
  }
  
  tokenData = {
    "hash": random_hash(),
    // "hash": "0x962fc6a81fb7263ed534c1bfa47ef1a0bfe4dd1ae8cb53ee1514fa71da9db83f",
    // "hash": "0xe18a00671dab234d84642ce86e5f7f07f7cc97c66d647c5443d06e7b9257dc1a ",  //
    // "hash": "0xd542ddb63a414ba87c8d34bd6adcc825a7d42fea1772eeda59bf0f3c79b856ef ",  //
    // "hash": "0xad07029783d317cbca692abf44e3d96e07ae30b2240a57e3d3f1e640f6edbb21 ",  //
    // "hash": "0x2b89cae4896162f3b29f4c9b630d1e92917dcb99b011a1165dc7ebeed1798448 ",  // 
    // "hash": "0x1bccc300f7e3ea931e2f120cb2d9bb7323efab43d7e2731f095f5ed4d6aed36e",   // noise
    // "hash": "0xdcf04f15ccf9c0601b892cc27e78ce4b614e8b8e547c14bc4f9d5d7e7918a5b9 ",  // 
    // "hash": "0x80d19b514c091104e1a68cdf92c20884672e479ee2ddd80306ecedc7c09fe398",  // 
    // "hash": "0x59357832b0033615033cd7f710e8d4e406d49dc71a3abc0748b61d693362d87d",  // very dark from Artblocks
    // "hash": "0xf6157eb919d589c1dce344a91aefe81bc08bd9b7a7c85492cf81d7a525eaa5df  ",  // 
    // "hash": "",  // 
    // "hash": "",  // 
  
    "tokenId": "123000456"
  }
  // */
  
  // <<<<< ============================ offline randomizer ENDS HERE
  
  // let tokenData = {"tokenId":"30000082","hash":"0x3b538c248db6fb82473b6439bcaceafc027adcc302abff58d83fd43c5a2fec1a"};
  
  
  
  
  let hash = tokenData.hash;
  let seed = parseInt(tokenData.hash.slice(0, 16), 16);
  
  class Rnd {
    constructor() {
      this.useA = false;
      let sfc32 = function (uint128Hex) {
        let a = parseInt(uint128Hex.substr(0, 8), 16);
        let b = parseInt(uint128Hex.substr(8, 8), 16);
        let c = parseInt(uint128Hex.substr(16, 8), 16);
        let d = parseInt(uint128Hex.substr(24, 8), 16);
        return function () {
          a |= 0; b |= 0; c |= 0; d |= 0;
          let t = (((a + b) | 0) + d) | 0;
          d = (d + 1) | 0;
          a = b ^ (b >>> 9);
          b = (c + (c << 3)) | 0;
          c = (c << 21) | (c >>> 11);
          c = (c + t) | 0;
          return (t >>> 0) / 4294967296;
        };
      };
      // seed prngA with first half of tokenData.hash
      this.prngA = new sfc32(tokenData.hash.substr(2, 32));
      // seed prngB with second half of tokenData.hash
      this.prngB = new sfc32(tokenData.hash.substr(34, 32));
      for (let i = 0; i < 1e6; i += 2) {
        this.prngA();
        this.prngB();
      }
    }
    // random number between 0 (inclusive) and 1 (exclusive)
    rDec() {
      this.useA = !this.useA;
      return this.useA ? this.prngA() : this.prngB();
    }
    // random number between a (inclusive) and b (exclusive)
    rNum(a, b) {
      return a + (b - a) * this.rDec();
    }
    // random integer between a (inclusive) and b (inclusive)
    // requires a < b for proper probability distribution
    rInt(a, b) {
      return Math.floor(this.rNum(a, b + 1));
    }
    // random boolean with p as percent liklihood of true
    rBool(p) {
      return this.rDec() < p;
    }
  }
  
  let R = new Rnd();
  
  var dimW = window.innerWidth;
  var dimH = window.innerHeight;
  var dim = Math.floor(Math.min(dimW, dimH));
  
  
  var spots,          // spots number
      sArr = [],      // spots array
      mOff,
      S = 30,         // shader blur strength
      b = 1,
      bOffset = 0.05,
      bVal,           // initial blur value
      angle,
      sRot = [],
      cam,
      animated,
      gyro = false,
      sym,            // symmetry
      smallSpots, 
      Pulse;
  
  // 3D variables
  var galeria, walls, cD = dim/4,
      fov, rotX = 0, rotY = 0, //rotZ = 0,
      fov_init, rotX_init, rotY_init,
      rotXoff, rotYoff, rotCont = true;
  
  var vs = 'attribute vec3 aPosition;attribute vec2 aTexCoord;varying vec2 vTexCoord;void main(){vTexCoord=aTexCoord;vec4 positionVec4=vec4(aPosition,1.0);positionVec4.xy=positionVec4.xy*2.0-1.0; gl_Position=positionVec4;}';
  
  var fs = 'precision mediump float;varying vec2 vTexCoord;uniform sampler2D iP;uniform vec2 dl;const float Pi=6.28318530718;float rnd(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}void main(){vec4 col=vec4(0.0);float tt=0.0;float off=rnd(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float pc=(t+off-0.5)/30.0;float w=1.0-abs(pc);vec4 spl=texture2D(iP,vTexCoord+dl*pc);spl.rgb*=spl.a;col+=spl*w;tt+=w;}gl_FragColor=col/tt;gl_FragColor.rgb/=gl_FragColor.a+0.00001;}';
  
  
  class Spot {
    constructor(x, y, z, r, c, m, xOff, yOff, rOff) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.r = r;
      this.c = c;
      this.m = m;
      this.xOff = xOff;
      this.yOff = yOff;
      this.rOff = rOff;
      this.grow = true;
    }
    
    grow() {
      this.r++;
    }
  }
  
  let paletteColor = [], bckCol;
  
  function setup() {
    // define canvas
    frameRate(30);
    noiseSeed(seed);
    canvas = createCanvas(dimW, dimH, WEBGL);
    canvas.id('p5canvas');
  
    iC = createGraphics(dim, dim, WEBGL);
    iC.pixelDensity(1);
    sC = createGraphics(dim, dim, WEBGL); // shader Canvas
    
    blur = sC.createShader(vs, fs);
    sC.shader(blur);
    
    noStroke();
    iC.noStroke();
    sC.noStroke();
    colorMode(HSB);
    iC.colorMode(HSB);
    iC.ortho(-dim/2, dim/2, -dim/2, dim/2, -5 * dim, 5 * dim);
       
    // COLOR SCIENCE - choose palette
    
    // old palette 
    /*
        palette == 1 ? ['#260d2b', '#0F1D29', '#00576B', '#162B3D', '#C33B23', '#077284','#E55130'] //
    : palette == 2 ? ['#010e28', '#1F0B03', '#546E40', '#768736', '#F6B84C', '#E57540'] //
    : palette == 3 ? ['#200e36', '#FDF7C5', '#366290', '#E27D52', '#D3EAC0', '#EDC557', '#A8DAB9'] //  // 
    : palette == 4 ? ['#021d22', '#1d1502', '#d57502', '#16405F', '#326974', '#FF930E', '#FFD893'] // 
    : palette == 5 ? ['#062314', '#230607', '#004822', '#365C02', '#E4BF4A', '#FD3136'] // 
    : palette == 6 ? ['#4E0809', '#021c13', '#003924', '#005841', '#650100', '#850100', '#CCB33B', '#AF9500'] // 
    : ['#1D1702', '#2B0426', '#640527', '#AD2C00', '#DAAB0D', '#BFBD40']; // 
    */
    
    let palette = 12 //R.rInt(1, 8);
    //paletteColor = ['#0B1626', '#2F1517'];
    let pc = 
        palette == 1 ? ['#FEEEBC', '#C6F6F6', '#2D748B', '#BEFDFD', '#FDD5AD', '#FF552A'] 
      : palette == 2 ? ['#C5DED1', '#3C4C70', '#429BB9', '#B2E0E0', '#D2C7B1', '#EDE6C4'] //
      : palette == 3 ? ['#F3EDCF', '#FFFDF0', '#AD261A', '#FF552A', '#FEEEBC', '#AFFFFF'] // średnio
      : palette == 5 ? ['#2F1517', '#0B1626', '#A2FED7', '#D4FFDC', '#FF1500', '#FFFFFF'] // fajna saturacja++
      : palette == 6 ? ['#FFFDF0', '#F3F1E3', '#F9CD3F', '#DED5B6', '#4189A6', '#B5EDEC']
      : palette == 7 ? ['#0D1626', '#152401', '#B4DDDD', '#D8FAAE', '#FFFDF0', '#F3201D'] // zieleń?
      : palette == 8 ? ['#0D1626', '#152401', '#B4DDDD', '#FFDA6C', '#FFF7DD', '#D8FAAE'] // zieleń?
      : palette == 9 ? ['#FFFDF0', '#D1C7B1', '#B4DDDD', '#3A748A', '#FFDA6C', '#FFF7DD']
      : palette == 10 ? ['#FFFDF0', '#D1C7B1', '#3A748A', '#FFDA6C', '#FFF7DD', '#B4DDDD']
      : palette == 11 ? ['#0D1626', '#152401', '#D8FAAE', '#B5EDEC', '#4189A6', '#F9CD3F'] // fajna saturacja, zieleń-
      : palette == 12 ? ['#090F1C', '#00202D', '#D8FAAE', '#B5EDEC', '#3F4C70', '#F9CD3F']
      : palette == 13 ? ['#0D1626', '#162502', '#B5EDEC', '#C90C00', '#4189A6', '#F9CD3F']
      : palette == 14 ? ['#0D1626', '#152401', '#014D6B', '#4189A6', '#B4DDDD', '#FFDA6C']
      : palette == 15 ? ['#000000', '#0D1626', '#FFDA6C', '#022E40', '#013C54', '#196D8E',]
      : palette == 16 ? ['#000000', '#0D1626', '#BEFDFD', '#022E40', '#013C54', '#196D8E',]
      : palette == 17 ? ['#000000', '#0D1626', '#F45834', '#022634', '#9E0A00', '#003B53',]
      : palette == 18 ? ['#000000', '#0D1626', '#FFDA6C', '#022634', '#7E0901', '#4A3800',]
      : palette == 19 ? ['#000000', '#0D1626', '#022634', '#022634', '#720700', '#003B53',]
      : palette == 20 ? ['#000000', '#0D1626', '#022634', '#022634', '#FFDA6C', '#003B53',]
      : palette == 21 ? ['#000000', '#000000', '#000000', '#022634', '#5D4500', '#003B53',]
      : palette == 22 ? ['#000000', '#000000', '#580500', '#003B52', '#2D2100', '#720700',]
      : palette == 23 ? ['#000000', '#000000', '#212A3E', '#022634', '#720700', '#003B53',]
  //?
      :                ['#0D1626', '#162502', '#C7E4A2', '#B5EDEC', '#203900', '#C90C00'];
    paletteColor.push(...pc);
    
    let pcEnd = paletteColor.length - 1;
    for ( ii = 0; ii < 3; ii++) 
      for (i = pcEnd - 1; i <= pcEnd; i++) 
        paletteColor.push(paletteColor[i]);
    
    // define main color SATURATION
    let satShift;
    if (R.rDec() > 0.98) {
      satShift = R.rInt(0, 10);
      for (i = 0; i < paletteColor.length; i++) 
        paletteColor[i] = color( hue(paletteColor[i]), satShift, brightness(paletteColor[i]) );
    }
    
    // determine background color
    let c = R.rInt(0,1);
    bckCol = color(paletteColor[c]);
    paletteColor.splice(c, 1);
    
    // determine "Pulse" movement
    Pulse = R.rDec() > 0.8 ? 1 
      : R.rDec() > 0.8 ? 2
      : 0;
    
    // check if small spots
    smallSpots = R.rDec() > 0.95 ? true : false;
    
    // define spots number
    spots = smallSpots == true ? R.rInt(500, 1000) : R.rInt(10, 20);
  
    // check for NOISE effect
    let NoiseFeat = R.rDec() > 0.79 ? true : false;
    
    // determine number of walls
    let tmp = R.rDec();
    walls = tmp < 0.40 ? 4
      : tmp < 0.6 ? 6  
      : tmp < 0.75 ? 8
      : tmp < 0.85 ? 10
      : tmp < 0.95 ? 12
      : tmp < 0.98 ? 16
      : tmp < 0.99 ? 32
      : 64;
  
    // determine if rendering is symmetrical
    sym = R.rDec() > 0.05 ? true : false;
    
    // vertical view angle
    // rotX = 0;//R.rDec() > 0.8 ? PI/2 : 0;
    
    // define camera FOV
    fov = R.rNum(0.4, 0.9);
    
    // choose blur vector rotation angle - horizontal, vertical, any; determine camera rotation
    tmp = R.rDec();
    let composition = tmp > 0.83 ? 3
      : tmp > 0.67 ? 2
      : tmp > 0.5 ? 1
      : tmp > 0.45 ? 8
      : tmp > 0.4 ? 7
      : tmp > 0.25 ? 6
      : tmp > 0.1 ? 4
      : 5;
    
    // composition = 5;
    // walls = 4;
    
    if (composition == 1) {
      // mode: vertical ||||
      angle = -PI/4;
      rotY = rotX == PI/2 ? 0 : PI/walls;
    }
    if (composition == 2) {
      // rotY = walls % 4 == 0 ? -TWO_PI/walls : -TWO_PI/walls; 
      // mode: vertical door regular ||||||||"
      angle = -PI/4;
      rotY = -TWO_PI/walls; 
      rotX = 0;
    }
    if (composition == 3) {
      // mode: vertical door upside down ||||||||
      angle = -PI/4;
      rotY = walls % 4 == 0 ? 0 : -PI*4/walls; 
      rotX = 0;
    }
    if (composition == 4) {
      // mode: horizontal corner
      angle = PI/4;
      rotY = walls == 4? PI/2 : -TWO_PI/walls;
    }
    if (composition == 5) {
      // mode: horizontal facade
      angle = PI/4;
      rotY = PI/walls;
    }
    if (composition == 6) {
      // mode: facade sketchy
      angle = R.rNum(0,PI);
      rotY = -PI/walls;
      fov = rotX == 0 ? constrain(fov, 0.09, 3/walls + 0.3) : fov;
    }
    if (composition == 7) {
      // mode: angular diamond
      angle = R.rNum(0,PI);
      rotY = TWO_PI/walls;
    }
    if (composition == 8) {
      // mode: floor view
      angle = R.rNum(0,PI);
      rotX = PI/2;
      rotY = -TWO_PI/walls;
    }
        
    
    //define bOffset - how smooth noise is
    bOffset = R.rNum(0.01, 0.12);
    bVal = R.rNum(0,.5);
    
    // define noise offset - how fast particle position change
    mOff = R.rNum(0.003, 0.006);
    
    // define spots with minimum radius
    for (i = 0; i < spots; i++ ) {
      let tSpot = new Spot(
        R.rInt(-dim/2, dim/2),       // x
        R.rInt(-dim/2, dim/2),         // y
        R.rInt(-dim/5, dim/6),                           // z
        1, //smallSpots ? radius[i] = R.rInt(dim/100, dim/50) : R.rInt(dim/500, dim/5),      // radius
        0,                           // color
        R.rInt(0, 999),              // m?
        R.rNum(4, 10),            // xOff
        R.rNum(4, 10),            // yOff
        R.rNum(0, 999)                          // rOff - radius offset
      );
      sArr.push(tSpot);
    }
    
    // grow spots 'dim/5' times
    for (zz = 0; zz < dim/5; zz++) 
      // check for every spot
      for (i = 0; i < sArr.length; i++) {
        // if the spot can grow
        if (sArr[i].grow) {
          // grow the spot
          sArr[i].r += 1;
          // check with other spots if there's no collision
          for (j = 0; j < sArr.length; j++) {
            if (i != j) {
              let d = dist(sArr[i].x, sArr[i].y, sArr[j].x, sArr[j].y);
              let dr = sArr[i].r + sArr[j].r;
              // if there is a collision break further growing
              if (d < dr) sArr[i].grow = false;
            }
          }
        }
      }  
  
    // add more spots => NOISE effect == true
    if (NoiseFeat) {
      let spotsNoise = R.rInt(40, 400);
      for (i = 0; i < spotsNoise; i++ ) {
            
        let tSpot = new Spot(
          R.rInt(-dim/2, dim/2),       // x
          R.rInt(-dim/2, dim/2),         // y
          R.rInt(dim/5, dim/2),                            // z
          R.rInt(dim/275, dim/175),      // radius
          0,                            // color
          R.rInt(0, 999),              // m?
          R.rNum(2, 5),             // xOff
          R.rNum(2, 5),             // yOff
          R.rNum(0, 999)                          // rOff - radius offset
        );
        sArr.push(tSpot);
      }
      spots += spotsNoise;
    }
    
    // set constant rotation offset
    // if (R.rBool(.5)) {
    //   rotXoff = R.rNum(-.005, .005);
    //   rotYoff = 0;
    // } else {
    //   rotXoff = 0;
    //   rotYoff = R.rNum(-.005, .005);
    // }
    rotXoff = R.rNum(-.005, .005);
    rotYoff = R.rNum(-.005, .005);
    
    
    // define camera
    cam = createCamera();
  
    // create blur vector
    s = createVector(0.35, 0.35);
    
    // rotate blur accordingly
    s.rotate(angle);
    
    // rot X and Y debug
    rotX += 0.00001;
    rotY += 0.00001;
    
    // initial values to be restored
    fov_init = fov;
    rotX_init = rotX;
    rotY_init = rotY;
    
    galeria = createModel();
    
  
    
    // check if iOS 13 and ask for permission
    // DeviceOrientationEvent, DeviceMotionEvent
    if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
      // ios 13 device
      DeviceOrientationEvent.requestPermission()
        .catch(() => {
          // show permission dialog only the first time
          let btn = createButton("Tap to allow access to sensors for an immersive interaction experience.");
          btn.style('font-size', dim/25 + 'px');
          btn.size(dim*.618, dim*.382);
          let btnCol = '#00000055';
          btn.style('background-color', btnCol)
          btn.mouseOver(() => btn.style('background-color: #00000085') );
          btn.mouseOut( () => btn.style('background-color', btnCol) );
          btn.style('color:#eeeeee');
          btn.style('border:none');
          btn.style('border-radius', dim/50 + 'px');
          btn.style('line-height: 1.6');
          btn.style('padding: 0 ' + dim/20 + 'px');
          btn.style('font-weight:lighter');
          btn.center();
        
          throw error;
        })
        .then(() => {
          // on any subsequent visits
          permissionGranted = true;
        })
    } else {
      // non ios 13 device
      textSize(48);
      console.log("> not iOS 13 device");
      // text("non ios 13 device", 100, 100);
      permissionGranted = true;
    }
  
    
    
    //  ==================  ==================  ==================  ==================  
    //  ==================        FEATURES CALCULATION              ==================  
    //  ==================  ==================  ==================  ==================  
    
    let paletteFeat = 
        satShift == 0 ? 'Desaturated'
      : satShift < 20 ? 'Pale Luster'
      : palette == 1 && c == 0 ? 'Dystopian Beam'        // blue-purple
      : palette == 1 && c == 1 ? 'Noble Heat'        // blue-purple
      : palette == 2 && c == 0 ? 'Gelid Pulse'        // blue-green
      : palette == 2 && c == 1 ? 'Vague Gleam'        // blue-green
      : palette == 3 && c == 0 ? 'Metal Capillary'       // blue-yellow
      : palette == 3 && c == 1 ? 'Rusty Skies'       // blue-yellow
      : palette == 4 && c == 0 ? 'Neon Glow'     // blue-red
      : palette == 4 && c == 1 ? 'Crimson Glare'     // blue-red
      : palette == 5 && c == 0 ? 'Crude Traces'     // red-green
      : palette == 5 && c == 1 ? 'Scarlet Flood'     // red-green
      : palette == 6 && c == 0 ? 'Inner Flow'     // red-yello
      : palette == 6 && c == 1 ? 'Darkroom Lights'     // red-yellow
      : palette == 7 && c == 0 ? 'Synthetic Dreams'     // yellow-purple
      : palette == 7 && c == 1 ? 'Artificial Luminance'     // yellow-purple
      : palette == 8 && c == 0 ? 'Serene Void'     // yellow-green
      : palette == 8 && c == 1 ? 'Natural Flare'     // yellow-green
      : 'N/A';
    let FOVFeat = fov < 0.5 ? 'narrow'
      : fov < 0.7 ? 'regular'
      : 'wide';
    let blurFeat = bOffset < 0.05 ? 'tranquil'
      : bOffset < 0.08 ? 'calm'
      : 'nervous';
    let spotSpeed = mOff < 0.004 ? 'floating'
      : mOff < 0.005 ? 'mild'
      : 'hectic';
    let compositionFeat = composition == 1 ? 'gate'     // vertical
      : composition == 2 ? 'ingress'                    // vertial door regular
      : composition == 3 ? 'egress'                     // vertical door upside down
      : composition == 4 ? 'hub'                        // horizontal I - corner view
      : composition == 5 ? 'edge-hub'                // horizontal II frontal
      : composition == 6 ? 'firewall'                   // facade random
      : composition == 7 ? 'angular'                        // corner view random
      : 'base';
    let PulseFeat = Pulse == 0 ? 'noisy'
      : Pulse == 1 ? 'Y-axial'
      : 'X-axial';
  
    features = {
      "Composition" : compositionFeat,
      "Palette" : paletteFeat,
      "Dense" : smallSpots, // boolean
      "Noisy" : NoiseFeat,  // boolean
      "Lights" : spots,
      "Walls" : walls,
      "Symmetry" : sym,     // boolean
      "FOV" : FOVFeat, 
      "Pulse" : PulseFeat,
      "Haziness" : blurFeat, // blur speed
      "Particle speed" : spotSpeed,
    };
  
    //  ==================  ==================  ==================  ==================  
    //  ==================        END OF FEATURES CALCULATION       ==================  
    //  ==================  ==================  ==================  ==================  
    
    print(features);
    print("Composition:", composition); 
    print("Palette:", palette);
    print("Saturation:", satShift);
    print("Small spots (Dense):", smallSpots);
    print("NOISE version:", NoiseFeat);
    print("Colors (Lights):", spots);
    print("Walls:", walls);
    print("Symmetry:", sym);
    print("FOV [0.4 – 0.5 < 0.7 < 0.9]:", fov);
    print("View (rotX):", rotX);
    print("Pulse", Pulse);
    print("Blur speed - blurOffset [<5, <8, <12]:", bOffset * 100);
    print("Particle speed - mOff [<4, <5, <6]:", mOff * 1000);
    print("hash:", hash);
    
  }
  
  let shade = true;
  
  
  function draw() {
  
    iC.clear();
    // iC.background(mainColorH, mainColorS, mainColorB);
    iC.background(bckCol);
    
    if (mouseIsPressed && (mouseButton == CENTER)) {
      fov += map((pmouseY - mouseY), -dim, dim, 1, -1);
    }
    if (keyIsDown(LEFT_ARROW)) rotY -= 0.02;
    if (keyIsDown(RIGHT_ARROW)) rotY += 0.02;
    if (keyIsDown(UP_ARROW)) rotX += 0.02;
    if (keyIsDown(DOWN_ARROW)) rotX -= 0.02;
    if (keyIsDown(189)) fov += 0.01;
    if (keyIsDown(187)) fov -= 0.01;
    
    
    
    // constrain camera FOV
    fov = constrain(fov, 0.1, 0.99);
    
    //  inside cam
    perspective(PI * fov, dimW/dimH, 0.01, dim * 10);
    cam.setPosition(0,0,0);
    if (xprim) cam.lookAt(xprim,yprim,zprim);
  
    
    // set camera rotation
    // rotateZ(rotZ);
    rotateX(rotX);
    rotateY(rotY);
    
  
    for (i = 0; i < spots; i++) {
      // choose color for spot
      let col = color(paletteColor[i % paletteColor.length]);
      iC.fill(col);
      
      Xnoise = map(noise(sArr[i].m, i), 0, 1, -dim / sArr[i].xOff, dim / sArr[i].xOff);
      Ynoise = map(noise(sArr[i].m, i + 200), 0, 1, -dim / sArr[i].yOff, dim / sArr[i].yOff);
      Rnoise = map(noise(sArr[i].m, i + sArr[i].rOff), 0, 1, -sArr[i].r, sArr[i].r);
      
      // Znoise = map(noise(m[i], i + 500), 0, 1, -dim / xOff[i], dim / yOff[i]);
      
      if (Pulse == 1) {
        sArr[i].y = sArr[i].y < dim/2 + sArr[i].r ? sArr[i].y + abs(Ynoise/9) : -dim/2 - sArr[i].r;
        shape(sArr[i].x + Xnoise, sArr[i].y, sArr[i].z, sArr[i].r + Rnoise);
      } else if (Pulse == 2) {
        sArr[i].x = sArr[i].x < dim/2 + sArr[i].r ? sArr[i].x + abs(Xnoise/9) : -dim/2 - sArr[i].r;
        shape(sArr[i].x, sArr[i].y + Ynoise, sArr[i].z, sArr[i].r + Rnoise);
      } else 
        shape(sArr[i].x + Xnoise, sArr[i].y + Ynoise, sArr[i].z, sArr[i].r + Rnoise);
      sArr[i].m += mOff;
    }
     
    
    // prepare blur value
    S = map(noise(b), 0, 1, 0.44, 0.65 + bVal);
    s.setMag(S*933/dim); 
    
    // apply shader
    sC.shader(blur);
    blur.setUniform('iP', iC);
    if (shade) blur.setUniform('dl', [s.x,s.y]);
    else blur.setUniform('dl', [0,0]);
    sC.rect(-dim/2, -dim/2, dim/2, dim/2); 
    
  
    // render "galeria" model with shader texture
    clear();
    textureMode(NORMAL);
    texture(sC);
    model(galeria);
    
    // stroke(255);
    // strokeWeight(10);
    // box(dim);
    
    
    
    
    // ------------------------------------------------
    // debug color objects
    // ------------------------------------------------
  //   for (i = 0; i <= paletteColor.length; i++ ) {
  //     if (i == paletteColor.length) 
  //       fill(bckCol);
  //     else
  //       fill(paletteColor[i]);
      
  //     //noStroke();
  //     let r = dim/20;
  //     push();
  //     stroke(paletteColor[1]);
  //     translate(-r*paletteColor.length/2 + r* i, dim/10, -dim/10);
      
  //     box(r);
  //     noStroke();
  //     pop();
  //   }
    
    b += bOffset;
    
    // set view animation
    if (animated == 2) rotY += .005;
    if (animated == 3) rotY -= .005;
    if (animated == 4) rotX += .005;
    if (animated == 5) rotX -= .005;
    
    if (rotCont) {
      rotX += rotXoff;
      rotY += rotYoff;
    }
  
  }
  
  // iOS 13 grant permission
  function requestAccess() {
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response == 'granted') {
          permissionGranted = true;
        } else {
          permissionGranted = false;
        }
      })
    .catch(console.error);
    
    this.remove();
  }
  
  
  
  var prevDiff;
  
  function touchMoved() {
    // use as mouse when single touch and no gyro
    if (touches.length <= 1 && !gyro) {
      rotX += map((pmouseY - mouseY), dim/4, -dim/4, -0.25, 0.25);
      rotY += map((pmouseX - mouseX), dim/4, -dim/4, -0.25, 0.25);
    } else {
      let curDiff = Math.abs(touches[0].x - touches[1].x);
  
      if (prevDiff > 0) {
        if (curDiff > prevDiff) {
          // The distance between the two touches has increased - zoom in
          fov -= 0.01;
       }
       if (curDiff < prevDiff) {
         // The distance between the two pointers has decreased - zoom out
         fov += 0.01;
       }
     }
     prevDiff = curDiff;
    }
    
    // prevent default behaviour
    return false;
  }
  
  
  function keyPressed() {
    rotCont = false;
    if (key == '1') {
      // 1 - initial view
      rotY = rotY_init;
      rotX = rotX_init;
      fov = fov_init;
      animated = false;
    }
    if (key == '2') rotCont = true;
    if (key == '3') animated = 2;
    if (key == '4') animated = 3;
    if (key == '5') animated = 4;
    if (key == '6') animated = 5;
    if (key == 'b') shade = !shade;
    if (key == 'r') location.reload();
    
  
    
    // to be removed after testing
    // save image and reload sketch
    if (key == 's') {
      saveCanvas('myCanvas_' + hash + '.jpg');
      // reload sketch after 50 miliseconds - pure testing functionality
      setTimeout(function() {
        location.reload();
      }, 50);
    }
  }
  
  var xprim, yprim, zprim;
  
  window.addEventListener('deviceorientation', function(e) 
  {
    if (e.alpha) {
      gyro = true;
      rotCont = false;
      
      let A = radians(e.alpha);     //    0 to 360 ||     0 to 2*PI     --> rotZ
      let B = radians(e.beta);      // -180 to 180 ||   -PI to PI       --> rotX
      let G = radians(e.gamma);     //  -90 to 90  || -PI/2 to PI/2     --> rotY
      
      // QUATERNION
      let c1 = Math.cos(A/2);
      let s1 = Math.sin(A/2);
      let c2 = Math.cos(B/2);
      let s2 = Math.sin(B/2);
      let c3 = Math.cos(G/2);
      let s3 = Math.sin(G/2);
      let qw = c1*c2*c3 - s1*s2*s3;        // w - quaternion scalar
        let qx = c1*c2*s3 + s1*s2*c3;        // x - quaternion X value
      let qy = s1*c2*c3 + c1*s2*s3;        // y - quaternion Y value
      let qz = c1*s2*c3 - s1*c2*s3;        // z - quaternion Z value
      
      // original calculation
      // vector to transform
      // let x = 0, y = 1, z = 0;
      // vector after transformation
      // xprim = x*(qx*qx+qw*qw-qy*qy- qz*qz) + y*(2*qx*qy- 2*qw*qz) + z*(2*qx*qz+ 2*qw*qy)
      // yprim = x*(2*qw*qz + 2*qx*qy) + y*(qw*qw - qx*qx+ qy*qy - qz*qz) + z*(-2*qw*qx+ 2*qy*qz)
      // zprim = x*(-2*qw*qy+ 2*qx*qz) + y*(2*qw*qx+ 2*qy*qz) + z*(qw*qw - qx*qx- qy*qy+ qz*qz)
      
      // simplified calculation
      xprim = 2*qx*qy- 2*qw*qz;
      yprim = qw*qw - qx*qx+ qy*qy - qz*qz;
      zprim = 2*qw*qx+ 2*qy*qz;
      
    }
  });
  
  
  // scroll zoom
  // prevent scrolling site when targeting canvas
  document.addEventListener("mousewheel", (e)=>{
    if(e.target === p5canvas) {
      e.preventDefault();
      fov += map(e.deltaY, -100, 100, -.05, .05);
      // console.log('not scrolling');
    } 
    // else 
          // console.log('scrolling');
  }, { passive: false });
  
  
  function shape(x, y, z, r, s) {
    iC.push();
    iC.translate(x, y, z);
    iC.sphere(r); 
    iC.pop();
  }
  
  
  
  function createModel() {
    return new p5.Geometry(
      1, 
      1,
      function createGeometry() {
  
        let angX = [];
        let angY = [];
          
        // draw in polar coordinates
        for (let j = 0; j < walls; j++) {
          let an = (j / walls) * TWO_PI;
          angY[j] = cD * cos(an) * sqrt(2);
          angX[j] = cD * sin(an) * sqrt(2);
        }
        
        // TOP
        // add center pointy point
        this.vertices.push( new p5.Vector(0, -cD, 0) );
        if (walls % 4 == 0) this.uvs.push([0, 1]); else this.uvs.push([1, 1]);
  
        // top verticies
        for (let j = 0; j < walls; j++) {
          this.vertices.push( new p5.Vector(angX[j], -cD, angY[j]) );
          
          if (walls % 4 == 0) {
            if (j % 4 == 1) this.uvs.push([1, 0]);
            else if (j % 4 == 2) this.uvs.push([1, 1]);
            else if (j % 4 == 3) this.uvs.push([0, 0]);
            else this.uvs.push([1, 1]);
          } else 
            if (j % 2 == 0) this.uvs.push([0, 0]); else this.uvs.push([0, 1]);
        }
        
        this.vertices.push( new p5.Vector( angX[0], -cD, angY[0]) );
        if (walls % 4 == 0) this.uvs.push([1, 1]); else this.uvs.push([0, 0]); 
        
        
        // bottom verticies
        for (let j = 0; j < walls; j++) {
          this.vertices.push( new p5.Vector(angX[j], cD, angY[j]) );
          if (walls % 4 == 0) {
            if (j % 4 == 1) this.uvs.push([0, 0]);
            else if (j % 4 == 2) this.uvs.push([0, 1]);
            else if (j % 4 == 3) this.uvs.push([1, 0]);
            else this.uvs.push([0, 1]);
          } else 
            if (j % 2 == 0) this.uvs.push([1, 0]); else this.uvs.push([1, 1]);
        }
        
        this.vertices.push( new p5.Vector( angX[0], cD, angY[0]) );
        if (walls % 4 == 0) this.uvs.push([0, 1]); else this.uvs.push([1, 0]);
        
        // calculate TOP faces
        for (let j = 0; j < walls + 1; j++) {
          this.faces.push( [0, j+1, j+2 ] );
        }
        
        // calculate side faces
        for (let j = 0; j < this.vertices.length - 2 - walls; j++ ) {
          // if (j == walls - 1 && sym) {
          if (j % 2 == 0 && sym) {
            this.faces.push([j,  j + 2 + walls, j + walls + 1]);
            this.faces.push([j , j + 2 + walls, j + 1]);
          } else {
            this.faces.push([j,     j + 1,         j + walls + 1]);
            this.faces.push([j + 1, j + 2 + walls, j + walls + 1]);
          }
        }
        
        // BOTTOM
        // add center pointy point
        this.vertices.push( new p5.Vector(0, cD, 0) );
        if (walls % 4 == 0) this.uvs.push([1, 0]); else this.uvs.push([0, 0]);
  
        for (let j = 0; j < walls + 1; j++) {
          // calculate floor faces
          this.faces.push( [this.vertices.length - 1, this.vertices.length - (j+1), this.vertices.length - (j+2) ] );
        }
        
        this.gid = 'gallery';
        }
      );
  }
  