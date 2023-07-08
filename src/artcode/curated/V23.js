/* 

cube coorinates image: 
https://www.pngjoy.com/pngm/116/2382078_3d-cube-opengl-cube-coordinates-transparent-png.png

index of largest array value:
https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array

great color tool:
http://colorizer.org

description:

const void;
let light;
let expanse;

function life () {
  ...
}
*/


function random_hash() {
    let x = "0123456789abcdef", hash = '0x'
    for (let i = 64; i > 0; --i) {
      hash += x[Math.floor(Math.random()*x.length)]
    }
    return hash
  }
  
  tokenData = {
    "hash": random_hash(),
    // "hash": "0x8138060230aa1142b86be056ba49eee4d1cf85bb97e8a9a127a222336da9da1e",
    // "hash": "0xda2df492dc8bb0ad205a530501c79398bbdd093cbfbd15b1ecc36f2d5ba04436",
    // "hash": "0x7e606100663b07c4903b9042a6f16444afd35558993a89e0c02b407444500c17",
    // "hash": "0xc27f89034f0704d719f3bb6f8d1cdc0d7d76b7324765b4e98735604e5fb2d7d0 ",
    // "hash": "0x40646b1418248632c4d216a1288fa2d5e888e7ee3450c0e6c2f1f70364f56400 ", // +
    // "hash": "0x0e7ef554429e88ab20f2011c2f7f9aff756c4878227b762f1b5a33abe42de9c9 ", 
    // "hash": "0x919243b9a73448db7045e5cd7793ab2c095aaa9251656ee47906ef29d4a25f85 ", // K
    // "hash": "0xb95cf9d05cc2cb70ca4a42728440a46a3dffafb3c21b060435c81dcbfc823b29 ", // ++ 
    // "hash": "0x9398a1902521a25cdd3b503bb5503192ada74903a9072c7945bb5cd2be657cf4 ", // ++ K
    // "hash": "0x212982f5b9c2b042886ba7dbbe3de8028164f0a6f5fb893fa4d719ac5f3501ca ", 
    // "hash": "0x0439a7a98859e315d3ce12a44259d174072d3e7e6b1614fd998e5c9b25554b7f ", // +++ K
    // "hash": "0x2a8e340eef1b7fc94a2c95e50ab5888516840cc5af9f9d3d22bd4286540be58a ", 
    // "hash": "0x667bf26190b2928ed282a95ca30a4bd3e12d49700c0a69396c4e49f7f11946db ", // ++ K
    // "hash": "0x71c61cfb1db3b50da2ad73011dbc301e5d6ac104115c582cd21209278fa8e33b ", 
    // "hash": "0xaa70f0695baf24098dcbd88df4f3ebafedca375296dd3657a1588a9392c789b8 ", // ++
    // "hash": "0xa5e81ce88a994b1c7e560d67adc9675a9def545d6c57e53874f1167216c54eca ", 
    // "hash": "0xc550d55c4fd963eeb9c66bfb6dea5922f0a35316166874fde58dc3e643824cb0 ", 
    // "hash": "0x6c4bb2777c43afe2d235c1a11dca479a253c174e25e85a480d435568f96c124c ", // K
    // "hash": "0xd4c91db9c0f671b11b1563b0b031c44c600570e853776fabdc257b10a6105474 ", 
    // "hash": "0x37452138417c697983e7c3f80eb7df62284891cc6b8ccf70af5a2d42077ca3e2 ", //K 
    // "hash": "0x5bc73d78668414b46fa5f6f8793802d99d5ee5ad9e2037b61dbcb389046ab207 ", // K
    // "hash": "0x60897547bf8b79e899f27422f23ecbfe7a13a411e5368902c39b09c569cdb3c6 ",
    // "hash": "0x91862507b82cf9a7d1e7839d00bdf9f0b9a3f83b49e7ead86d2225644b63b187 ",
    // "hash": "0x3802c9454a70de4f3b1a769b72a4fa9c12e8e95fff005ed39f8fc0ad5ce5c9a4 ",
    // "hash": "0x9071bb9abf19f65f5cf0cb8dfecc5332daeec6aefe460aa0df3ffcbc6b33a837 ",
    // "hash": "0x90dff2177ca50b6354a04f489ed5399457f3b8653e72ad8bffc33d5c1e888d4f ",
    // "hash": "0xae568092f13f8640501eaa3b1eaf993526c135308fefd50ac39fc3d40bf94e09 ",
    // "hash": "0xbdaa899eedd31ff32e8b76983298bd9c0a85fa067c3a9d7f57265ae3d5f246b9  ", // massive horizontal
    // "hash": "0x7700705bb18b42fc0834471bd5e119ace95481436a2fa3b03960e918bbda9013  ",
    // "hash": "0xdf8b5341dd5f387bbe76276bb2fdef581461997872a44b2007cd71c5d5d52cee ",
    // "hash": "0xed6f021d0b8bb5214faa4b3b2e81139cc97ea34d49581ea1db624b64bdfb2be1 ",
    // "hash": "0xab6106da2aefb0da9b852cea6992f9d183cb91d933f3e67295e347372c930575 ",
    // "hash": "0xc797834f79ce6f623a735b4939fe186a6793699c41ccb634eca1b707ee307657 ",
    
    // BRZYDALE ------------------------------------------------<<<
    
    // "hash": "0x22500dd1a59692de94863b45ae06d7b942b03e112e38818dd3c514678dc70a59",
    // "hash": "0x2d75dd272928cc3b0c468658ff1053dea34891de0654922d236f65cc81f5c987",
    // "hash": "0x960730b3035b35bccfeddf6573b72ea32d1ce6d764b0fd63b3c99a8d46855dc9 ",
    // "hash": "0xe0f607c60a2681b9cfb41188fa8e65bf8f07cf74b6cab9b2d2a45a04b4a0c885 ",
    // "hash": "0xe8147552329bbd7f5d5356a4b31ec37800258ec067018e4d4207d1439ce15747 ",
    // "hash": "0x0dd63828d426b6fb47ff99211357b0c0d261a68d9f0cbd94a91ebf5d95d95e27 ",
    // "hash": "0xf2ed7a9584d1ddde095b7fd5791e7a82e0cf1e70fc60b37d82ecb4b2428c6469 ",
    // "hash": "0x21d14cbefc138eddc9058403f62e9eb35f53af800cd7690e0b43019aec9fc15c ", // :(
    // "hash": "0x31a1343c8548e38d3c9eb0e5471ca2dc78c31c11333fc0f4967d6639c94b32d2 ", // :(
    // "hash": "0x404da3f225059773f6bcaf6b42244a8ac4cbd6e44a12040cbff08bebe22e8cfa ",
    // "hash": "0x92e23763bc7c37c952aa91007a3dfd9d2b5f9afa74ef7bdbf32ba0b999bf0711 ",
    // "hash": "0xa1c8b706432dbd806fc55fb9dfd84ad632fe07cd809f392073629f0644130b3e ",
    // "hash": "0x27e3950910f915dde5b54e8a799b408b6bbc1022d1494cd3c8f87dfa1eb73ab4 ",
    // "hash": "",
    // "hash": "0x7b4ba51332b4349c6e179385ef52d2813babb78d98d3b165040c2b45ec03ae86",
    // "hash": "0x9711516eeb7561ae00f7fb609b1aa769e5cb6eb2ff65d9f38134adf5520c4b1c ",
    // "hash": "0xbdf900137dcf2ebafa04330092543ba2b44fcdbb819fa33b9b00ed736d38f0fe ",  
    // "hash": "0x5f3c83453dab7041329ca1e35b4f6bddb0082af05d4c4753a731be6096bdc9f7  ", 
    // "hash": "0xe8e1b1731bfbf23c0843e242067b8bdb883c9c2c79fea2aeb7c0c461d5f5e91b ",  // +
    // "hash": "0xdeb4a42f170e055e9821694c4add91ec130e738f45d1487a0779dd16c667f48b  ", // +
    // "hash": "0x05ef7c4b16ddcc9e324f9d70632b931f4face9e25729582be0d47a5b36cc59ff  ",  // +
    // "hash": "0xd0818254dc5704f3810d093094603bc86e8058ba0d0bc8b5328ff7c918cdfe00", //-----------------------
    // "hash": "0x48a895966554155af9be02e08df1675d5d43502887552ecdafea6be115cefa0d  ", // +
    // "hash": "0xa911a53c7de2cbc9de2595cb3453d1a92a646807b5e7c30290ab37787674db95  ", // K
    // "hash": "0x11b238ee7c32988bbaf04702b3832a7d513f395f0f6882356cfd28a6e4786930 ", // vertical
    // "hash": "0xaad4c29999148bdfdfe81b450d4e2aec8a581b50abb41880ae5b0f504f7c10cf", // horizontal
  
    "tokenId": "123000456"
  }
  
  let hash = tokenData.hash;
  
  let seed = parseInt(tokenData.hash.slice(0, 16), 16)
  let p = []
  for (let i = 0; i < 64; i+=2) {
    p.push(tokenData.hash.slice(i+2, i+4))
  }
  let rns = p.map(x => {return parseInt(x, 16) % 10})
  
  
  
  var dim = Math.floor(Math.min(window.innerWidth, window.innerHeight));
  
  var spots;
  var radius = [];
  var m = [];
  var mOff;
  var c = [];          // color shift var
  var x = [];
  var y = [];
  var z = [];
  var bright = [];
  var mapL = 0;
  var mapH = 9;
  var S = 30;           // shader blur strength
  var b = 1;
  var bOffset = 0.05;
  var angle;
  var xOff = [];
  var yOff = [];
  var sRot = [];
  var Shape;
  var cam;
  var animated = false;
  var gyro = false;
  
  function preload() {
    blur = loadShader('base.vert', 'blur.frag');
  }
  
  
  function setup() {
    // console.clear();
    frameRate(30);
    noiseSeed(seed);
    print("hash: " + hash);
    print("seed: " + seed);
    
    // if (pixelDensity() > 1) {
    //   a = pixelDensity();
    //   pixelDensity(1/a);
    // }
    
    canvas = createCanvas(dim, dim, WEBGL);
    canvas.id('p5canvas');
  
    
    iC = createGraphics(dim, dim, WEBGL);
    iC.pixelDensity(0.5);
    sC = createGraphics(dim, dim, WEBGL); // shader Canvas
    
    // rectangles instead of circles
    rectMode(RADIUS);
    Shape = rd() > 0.5 ? true : false;
    print("Circle: " + Shape);
  
    noStroke();
    iC.noStroke();
    sC.noStroke();
    colorMode(HSB);
    iC.colorMode(HSB);
    
    // define main color HUE
    mainColorH = map(rd(), 0, 1, 0, 360);
    
    // define main color SATURATION
    if (rd() > 0.90) {
      mainColorS = map(rns[12], mapL, mapH, 0, 10);
      print("□□□□□□ desaturated □□□□□□□□: " + mainColorS);
    } else mainColorS = map(rns[12], mapL, mapH, 60, 97);
    print("saturation: " + mainColorS);
      
    // define main color BRIGHTNESS
    mainColorB = map(rd(), 0, 1, 70, 90);
    
    
    // define spots number
    spots = round(map(rd(), 0, 1, 10, 20));
    print("Colors (spots): " + spots);
    
    // COLOR SCIENCE - choose palette
    // define number of main colors
    let palette = round(map(rd(), 0, 1, 2, 6));
    // set color deviation
    let paletteDev = map(rd(), 0, 1, 1, 180/(1 + palette));
    // set basic colors
    let paletteColor = [];
    for (i = 0; i < palette; i++) {
      paletteColor[i] = (mainColorS + i * (360 / palette)) % 360;
    }
    
    print("Palette: " + palette + " palleteDev: " + paletteDev);
    
    
    // define spots
    for (i = 0; i < spots; i++ ) {
      radius[i] = map(rd(), 0, 1, dim/100, dim);
      m[i] = map(rd(), 0, 1, 0, 999);
      x[i] = map(rd(), 0, 1, -dim/2, dim/2);
      y[i] = map(rd(), 0, 1, -dim/2, dim/2);
      z[i] = map(rd(), 0, 1, -dim/5, dim/5);
      c[i] = map(rd(), 0, 1, paletteColor[i % palette] - paletteDev, paletteColor[i % palette] + paletteDev);
      
      xOff[i] = map(rd(), 0, 1, 4, 10);
      yOff[i] = map(rd(), 0, 1, 4, 10);
      bright[i] = map(rd(), 0, 1, 9, 100);
      sRot[i] = map(rd(), 0, 1, 0, TWO_PI);
    }
    // print(...radius);
    
    // define biggest radius index in radius[] array
    let maxRadius = radius.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    // change biggest radius spot color to more contrasting
    // c[maxRadius] = map(rd(),0,1,120,240);
    bright[maxRadius] = map(rd(), 0, 1, 85, 100);//110 - mainColorB;
    print("brightnes: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " + mainColorB + ", max spot: " + bright[maxRadius]);
    
    // add more spots => NOISE effect
    if (rd() > 0.79) {
      print("NOISE version: true");
      let spotsNoise = floor(map(rd(), 0, 1, 20, 200));
      for (i = 0; i < spotsNoise; i++ ) {
        radius[spots + i] = map(rd(), 0, 1, dim/300, dim/50);
        m[spots + i] = map(rd(), 0, 1, 0, 10);
        x[spots + i] = map(rd(), 0, 1, -dim/2, dim/2);
        y[spots + i] = map(rd(), 0, 1, -dim/2, dim/2);
        z[spots + i] = map(rd(), 0, 1, -dim/5, dim/5);
        c[spots + i] = map(rd(), 0, 1, -360, 360);
        xOff[spots + i] = map(rd(), 0, 1, 1, 10);
        yOff[spots + i] = map(rd(), 0, 1, 1, 10);
        bright[spots + i] = map(rd(), 0, 1, 9, 100);
        sRot[spots + i] = map(rd(), 0, 1, 0, PI);
      }
      spots += spotsNoise;
    }
    
    // define camera
    cam = createCamera();
    
    // define camera FOV
    fov = map(rd(), 0, 1, 0.4, 0.9);
    print("FOV: " + fov);
    
    // determine number of walls
    let tmp = rd();
    walls = tmp < 0.40 ? 4
      : tmp < 0.6 ? 6  
      : tmp < 0.75 ? 8
      : tmp < 0.85 ? 10
      : tmp < 0.95 ? 12
      : tmp < 0.98 ? 16
      : tmp < 0.99 ? 32
      : 64;
    // walls = 32;
    print("Walls: " + walls);
  
    // determine if rendering is symmetrical
    sym = rd() > 0.05 ? true : false;
    print("Symmetry: " + sym);
    
    // vertical view angle
    rotX = rd() > 0.8 ? PI/2 : 0;
    print("rotX: " + rotX);
    
    
    // choose blur vector rotation angle - horizontal, vertical, any
    tmp = rd();
    // print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TMP: " + tmp);
    
    if (tmp > 0.70) {
      print("mode: vertical ||||");
      angle = -PI/4;
      rotY = PI/walls;
      // additional setting for initial camera corner view – "door" effect
      if (tmp > 0.8 && tmp <= 0.9) {
        rotY = walls % 4 == 0 ? -TWO_PI/walls : 0; 
        print("mode: vertical door regular ||||||||");
      } else if (tmp > 0.9) {
        rotY = walls % 4 == 0 ? 0 : -TWO_PI/walls; 
        print("mode: vertical door upside down ||||||||");
      }
    } else if (tmp < 0.25) {
      print("mode: horizontal I –––");
      angle = PI/4;
      rotY = -TWO_PI/walls;
      // additional settinf for initial camera corner view - "diamond" effect
      if (tmp < 0.1 && sym) {
        print("mode: horizontal II ---------");
        rotY = TWO_PI/walls;
      }
    } else {
      angle = map(rd(),0,1,0,PI);
      rotY = -PI/walls;    
      if (tmp > 0.55) {
        rotY = TWO_PI/walls;
        print("mode: angular diamond");
      } else if (tmp < 0.45) {
        rotY = -TWO_PI/walls;
        print("mode: corner view -|-|-|-|- ");
      } else 
        // fov = rotX == 0 ? constrain(fov, 0.09, 2/walls) : fov; // 0.5
        fov = rotX == 0 ? constrain(fov, 0.09, 3/walls + 0.3) : fov;
        print("mode: regular, FOV: " + fov);
    }
    
  
    // create blur vector
    s = createVector(0.35, 0.35);
    
    // rotate blur accordingly
    s.rotate(angle);
    
    //define bOffset - how smooth noise is
    bOffset = map(rns[8], mapL, mapH, 0.01, 0.12);
    print("blurOffset [01-12]: " + bOffset * 100);
    
    // define noise offset - how fast particle position change
    mOff = map(rd(), 0, 1, 0.003, 0.006);
    print("mOff [03-06(15)]: " + mOff * 1000);
    
    
    // rot X and Y debug
    rotX += 0.00001;
    rotY += 0.00001;
    
    // initial values to be restored
    fov_init = fov;
    rotX_init = rotX;
    rotY_init = rotY;
    
    
    galeria = createModel();
    
    uvtest = loadImage('uvtest.png');
    
    print("mainColor: " + mainColorH, mainColorS, mainColorB);
  
  }
  
  // 3D variables
  var galeria, walls;
  var cD = dim/4;
  var sym;
  
  var fov = 0.6;
  var rotX = 0;
  var rotY = 0;
  var rotZ = 0;
  
  var fov_init, rotX_init, rotY_init;
  
  
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
        walls % 4 == 0 ? this.uvs.push([0, 1]) : this.uvs.push([1, 1]);// 1, 1
  
        
        // top verticies
        for (let j = 0; j < walls; j++) {
          this.vertices.push( new p5.Vector(angX[j], -cD, angY[j]) );
          
          if (walls % 4 == 0) {
            j % 4 == 1 ? this.uvs.push([1, 0])
            : j % 4 == 2 ? this.uvs.push([1, 1])
            : j % 4 == 3 ? this.uvs.push([0, 0])
            : this.uvs.push([1, 1]);
          } else 
            j % 2 == 0 ? this.uvs.push([0, 0]) : this.uvs.push([0, 1]);
            
        }
        
        this.vertices.push( new p5.Vector( angX[0], -cD, angY[0]) );
        walls % 4 == 0 ? this.uvs.push([1, 1]) : this.uvs.push([0, 0]); // 0, 0
        
        
        // bottom verticies
        for (let j = 0; j < walls; j++) {
          this.vertices.push( new p5.Vector(angX[j], cD, angY[j]) );
          if (walls % 4 == 0) {
            j % 4 == 1 ? this.uvs.push([0, 0])
            : j % 4 == 2 ? this.uvs.push([0, 1])
            : j % 4 == 3 ? this.uvs.push([1, 0])
            : this.uvs.push([0, 1]);
          } else 
            j % 2 == 0 ? this.uvs.push([1, 0]) : this.uvs.push([1, 1]);
        }
        
        this.vertices.push( new p5.Vector( angX[0], cD, angY[0]) );
        walls % 4 == 0 ? this.uvs.push([0, 1]) : this.uvs.push([1, 0]);
        
        // calculate TOP faces
        for (let j = 0; j < walls + 1; j++) {
          this.faces.push( [0, j+1, j+2 ] );
        }
        
        
        // calculate side faces
        for (let j = 0; j < this.vertices.length - 2 - walls; j++ ) {
          // if (j == walls - 1 && sym) {
          if (j % 2 == 0 && sym) {
            this.faces.push([j,     j + walls + 2,         j + walls + 1]);
            this.faces.push([j , j + 2 + walls, j + 1]);
          } else {
            this.faces.push([j,     j + 1,         j + walls + 1]);
            this.faces.push([j + 1, j + 2 + walls, j + walls + 1]);
          }
        }
        
        // BOTTOM
        // add center pointy point
        this.vertices.push( new p5.Vector(0, cD, 0) );
        walls % 4 == 0 ? this.uvs.push([1, 0]) : this.uvs.push([0, 0]); // 1,0
  
        for (let j = 0; j < walls + 1; j++) {
          // calculate roof faces
          this.faces.push( [this.vertices.length - 1, this.vertices.length - (j+1), this.vertices.length - (j+2) ] );
        }
        
        this.gid = 'gallery';
        }
      );
  
  }
  
  
  function draw() {
  
    iC.clear();
    iC.background(mainColorH, mainColorS, mainColorB);
    
    // navigation
  //   if (mouseIsPressed && (mouseButton == LEFT)) {
  //     rotX += map((pmouseY - mouseY), 100, -100, -0.25, 0.25);  
  //     rotY += map((pmouseX - mouseX), 100, -100, -0.25, 0.25);
  //   }
    
    if (mouseIsPressed && (mouseButton == CENTER)) {
      fov += map((pmouseY - mouseY), -dim, dim, 1, -1);
      // print("FOV: " + fov);
    }
    if (keyIsDown(LEFT_ARROW)) rotY -= 0.05;
    if (keyIsDown(RIGHT_ARROW)) rotY += 0.05;
    if (keyIsDown(UP_ARROW)) rotX += 0.05;
    if (keyIsDown(DOWN_ARROW)) rotX -= 0.05;
    if (keyIsDown(189)) fov += 0.01;
    if (keyIsDown(187)) fov -= 0.01;
    
    // rotX = constrain(rotX, -Math.PI/1.9, Math.PI/1.9);
    fov = constrain(fov, 0.1, 0.99);
    
    //  inside cam
    perspective(PI * fov, 1, 0.01, dim * 10);
    cam.setPosition(0,0,0);
    // camera(0,0,0, 0,0,1);
  
    
    
    // new
    rotateX(-rotX);
    rotateY(rotY);
    // rotateY(rotZ);
    
    
    
    
    
   
  
    for (i = 0; i < spots; i++) {
      let col = color(c[i],
                      mainColorS,
                      bright[i]
                     );
      iC.fill(col);
      Xnoise = map(noise(m[i], i), 0, 1, -dim / xOff[i], dim / xOff[i]);
      Ynoise = map(noise(m[i], i + 200), 0, 1, -dim / yOff[i], dim / yOff[i]);
      // Znoise = map(noise(m[i], i + 500), 0, 1, -dim / xOff[i], dim / yOff[i]);
      
      if (!Shape) {
        iC.push();
        iC.rotate(sRot[i]);
      }
      shape(x[i] + Xnoise, y[i] + Ynoise, z[i], radius[i]);
      if (!Shape) iC.pop();
      m[i] += mOff;
    }
    
    
    // prepare blur value
    S = map(noise(b), 0, 1, 0.44, 0.65 + rns[17]/20);
    s.setMag(S);
    // print("S: " + S + ", rns[17] " + rns[17])
    
    // apply shader
    sC.shader(blur);
    blur.setUniform('iP', iC);
    blur.setUniform('dl', [s.x,s.y]);
    
    
    sC.rect(-dim/2, -dim/2, dim/2, dim/2); 
    // image(sC, -dim/2, -dim/2, dim, dim);
    
    
    
    clear();
    textureMode(NORMAL);
    
    texture(uvtest);
    texture(sC);
    model(galeria);
    
    //   fill('green'); // X
    // box(dim/2, 1, 1);
    // fill('red'); // Y
    // box(1, dim/2, 1);
    // fill('blue'); // Z
    // box(1, 1, dim/2);
    
    
  
    b += bOffset;
    if (animated) rotY += 0.01;
    
  
    
  }
  
  function mouseWheel(event) {
    fov += map(event.delta, -100, 100, -.05, .05);
  }
  
  var prevDiff;
  
  function touchMoved() {
    // use as mouse when single touch and no gyro
    if (touches.length <= 1 && !gyro) {
      rotX += map((pmouseY - mouseY), dim/4, -dim/4, -0.25, 0.25);
      rotY += map((pmouseX - mouseX), dim/4, -dim/4, -0.25, 0.25);
    } else {
      var curDiff = Math.abs(touches[0].x - touches[1].x);
  
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
  
     // Cache the distance for the next move event
     prevDiff = curDiff;
    }
    
    // prevent default behaviour
    return false;
  }
  
  
  function keyPressed() {
    
    if (key == '1') {
      // 1 - initial view
      rotY = rotY_init;
      rotX = rotX_init;
      fov = fov_init;
      animated = false;
    } else if (key == '2') {
      // 2 - texture view
      animated = true;
      // rotY = 0;
      // rotX = 0;
      // fov = 0.5;
    } else if (key == '3') {
      // 3 - corner angle
      fov = 0.6;
      rotY = PI/4;
      rotX = 0;
    } else if (key == '4') {
      // 3 - diamond angle
      fov = 0.6;
      rotY = -PI * 0.75;
      rotX = 0;
    } else if (key == 's') {
      // save image
      saveCanvas('myCanvas_' + hash + '.jpg');
      
      // reload sketch after 50 miliseconds - pure testing functionality
      setTimeout(function() {
        location.reload();
      }, 50);
    }
  }
  
  
  window.addEventListener('deviceorientation', function(e) 
  {
  
    if (e.alpha) {
      gyro = true;
  
      // let tempGamma = map(e.gamma, -90, 90, 0, 360);
      
      // alfa = e.alpha * TWO_PI / 360;
      // beta = e.beta * TWO_PI / 360;
      // gamma = e.gamma * TWO_PI / 360;
      
      rotY = map(e.alpha + e.gamma, 360, 0, 0, TWO_PI);   // left right
      rotX = map(e.beta, 180, 0, -PI/2, PI/2); // up and down
      // rotX = constrain(rotX, -Math.PI/1.9, Math.PI/1.9);
      // rotZ = map(e.gamma, -90, 90, -PI/2, PI/2); 
      // print(e);
    }
    
  });
  
  
  function shape(x, y, z, r, s) {
    iC.push();
    iC.translate(x, y, z);
    // Shape = true;
    if (Shape) iC.sphere(r/5); 
    else iC.box(r/4);
    iC.pop();
  }
  
  function rd() {
    seed ^= seed << 13
    seed ^= seed >> 17
    seed ^= seed << 5
    return ((seed < 0 ? ~seed + 1 : seed) % 1000) / 1000
  }