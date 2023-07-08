
function random_hash() {
    let x = "0123456789abcdef", hash = '0x'
    for (let i = 64; i > 0; --i) {
      hash += x[Math.floor(Math.random()*x.length)]
    }
    return hash
  }
  
  tokenData = {
    "hash": random_hash(),
    // "hash": "0x2a4b84533f3c293b41bd1258996239d113a32849ea86f84a95c09c11ea21481b",
    // "hash": "0x8138060230aa1142b86be056ba49eee4d1cf85bb97e8a9a127a222336da9da1e",
    // "hash": "0xda2df492dc8bb0ad205a530501c79398bbdd093cbfbd15b1ecc36f2d5ba04436",
    // "hash": "0xd7de8b20b01b68e866b3b4d5a2d1eb808d71b0cf8e9170a5007899dbe1500577",
    // "hash": "0x7e606100663b07c4903b9042a6f16444afd35558993a89e0c02b407444500c17",
    // "hash": "0xc27f89034f0704d719f3bb6f8d1cdc0d7d76b7324765b4e98735604e5fb2d7d0 ",
    // "hash": "0xc785d6c25eda514cf5859eefb759c57a26a424cb3ad42acd83645f2e816e89cf ",
    // "hash": "0x6e399f1f03c1dfea2f3e9ed59af91afe6db592c1ebdc797d174d5d478afef50f ",
    // "hash": "",
    // "hash": "",
    // "hash": "",
    
    // potencjalne do Popup: ================================>
    
    // "hash": "0x79b8e26574e66219b2bb0aaf80fe097ea5bd2f587838b4336c550d2608bc9f9d ",  
    // "hash": "0x5a0bdb5a43d4d28970ab89adda5fae0c7d00f50a115c00ddac76dda54dc8c7ab ", 
    // "hash": "0xeaa49106a31050bbbab72146d0ff227084c19dfd86bd63b381b53c6634367b41",  // +
    // "hash": "0xb2aa38a2d54ed416926b82055fd5685259b00e3f772a465e9ffbff295b1425a5 ", // +
    // "hash": "0xf05ea787feecba21e57dd512df93737be5e974d003c457c836f1c6f0b726cbd0",  // +
    // "hash": "0xd31c681b0cba20ed91799598d8f5c6bb6e0cef9dd940b6cd757c93129ecf9d44 ", 
    // "hash": "0xedd326a66d17e5daffbc555d9ac3caac81b7960c09a16efdf0f236fe1fd1844d ", // +
    // "hash": "0xe7a463c850defeccd39cfd4a3785894a335a038becc57935fd79d121064a7e1a ", // K
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
  
    "tokenId": "123000456"
  }
  
  let hash = tokenData.hash;
  
  let seed = parseInt(tokenData.hash.slice(0, 16), 16)
  let p = []
  for (let i = 0; i < 64; i+=2) {
    p.push(tokenData.hash.slice(i+2, i+4))
  }
  let rns = p.map(x => {return parseInt(x, 16) % 10})
  
  
  
  var dim = Math.min(window.innerWidth, window.innerHeight);
  // var dim = Math.min(displayWidth, displayHeight);
  
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
  var Stroke;
  
  
  function preload() {
    blur = loadShader('base.vert', 'blur.frag');
  }
  
  
  function setup() {
    frameRate(30);
    noiseSeed(seed);
    print("hash: " + hash);
    print("seed: " + seed);
    
    if (pixelDensity() > 1) {
      a = pixelDensity();
      pixelDensity(1/a);
    }
    
    
    
    canvas = createCanvas(dim, dim, WEBGL);
    canvas.id('p5canvas');
    // print("dim: " + dim + " pixelDensity: " + pixelDensity());
    // print("displayW: " + displayWidth + " displayH: " + displayHeight);
    
    iC = createGraphics(dim, dim, WEBGL);
    iC.pixelDensity(0.5);
    sC = createGraphics(dim, dim, WEBGL); // shader Canvas
    
    // fill or stroke
    rns[16] > 5 ? Stroke = false : Stroke = map(rnd_dec(), 0, 1, 120, 300);
    print("Stroke: " + Stroke);
    
    // rectangles instead of circles
    rectMode(RADIUS);
    rns[15] > 2 ? Shape = true : Shape = false;
    print("Circle: " + Shape);
  
    noStroke();
    iC.noStroke();
    sC.noStroke();
    colorMode(HSB);
    iC.colorMode(HSB);
    mainColorH = map(rns[11], mapL, mapH, 0, 360);
    if (rnd_dec() > 0.90) {
      mainColorS = mainColorS = map(rns[12], mapL, mapH, 0, 10);;
      print("□□□□□□ desaturated □□□□□□□□: " + mainColorS);
    } else mainColorS = map(rns[12], mapL, mapH, 25, 95);
    mainColorB = map(rns[13], mapL, mapH, 80, 100);
    
    // define spots
    spots = floor(map(rnd_dec(), 0, 1, 3, 20));
    print("spots: " + spots);
    for (i = 0; i < spots; i++ ) {
      radius[i] = map(rnd_dec(), 0, 1, dim/100, dim);
      m[i] = map(rnd_dec(), 0, 1, 0, 100);
      x[i] = map(rnd_dec(), 0, 1, -dim/2, dim/2);
      y[i] = map(rnd_dec(), 0, 1, -dim/2, dim/2);
      z[i] = map(rnd_dec(), 0, 1, -dim/2, dim/2);
      c[i] = map(rnd_dec(), 0, 1, -360, 360);
      xOff[i] = map(rnd_dec(), 0, 1, 1, 10);
      yOff[i] = map(rnd_dec(), 0, 1, 1, 10);
      bright[i] = map(rnd_dec(), 0, 1, 20, 100);
      sRot[i] = map(rnd_dec(), 0, 1, 0, TWO_PI);
    }
    
    // define noise offset - how fast particle position change
    mOff = map(rnd_dec(), 0, 1, 0.0001, 0.015);
    print("mOff: " + mOff);
    
    // add more spots => massive version
    if (rnd_dec() > 0.79) {
      print("+++++ NOISE version +++++");
      let spotsNoise = floor(map(rnd_dec(), 0, 1, 20, 200));
      for (i = 0; i < spotsNoise; i++ ) {
        radius[spots + i] = map(rnd_dec(), 0, 1, dim/300, dim/50);
        m[spots + i] = map(rnd_dec(), 0, 1, 0, 10);
        x[spots + i] = map(rnd_dec(), 0, 1, -dim/2, dim/2);
        y[spots + i] = map(rnd_dec(), 0, 1, -dim/2, dim/2);
        z[spots + i] = map(rnd_dec(), 0, 1, -dim/2, dim/2);
        c[spots + i] = map(rnd_dec(), 0, 1, -360, 360);
        xOff[spots + i] = map(rnd_dec(), 0, 1, 1, 10);
        yOff[spots + i] = map(rnd_dec(), 0, 1, 1, 10);
        bright[spots + i] = map(rnd_dec(), 0, 1, 20, 100);
        sRot[spots + i] = map(rnd_dec(), 0, 1, 0, PI);
      }
      spots += spotsNoise;
      print("updated spots: " + spots);
    }
    
    // create blur vector
    s = createVector(0.35, 0.35);
    
    // choose blur vector rotation angle - horizontal, vertical, any
    if (rnd_dec() > 0.87) {
      print("––– Horizontal mode");
      angle = -PI/4;
    } else if (rnd_dec() < 0.1) {
      print("|||| vertical mode");
      angle = PI/4;
    } else angle = map(rnd_dec(),0,1,0,PI);
    
    // rotate blur accordingly
    s.rotate(angle);
    
    //define bOffset - how smooth noise is
    bOffset = map(rns[8], mapL, mapH, 0.01, 0.15);
    print("blurOffset: " + bOffset);
    
    iC.background(mainColorH, mainColorS, mainColorB);
  }
  
  // 3D variables
  
  var  camX = 0
  var  camY = dim
  var  camZ = 0;
  
  var  camFOV = 1.2;
  var  wideAngle = Math.PI * 0.75;
  
  var  offsetX = 0 // początkowe położenie obrazu na osi X (poziomo) 
  var  offsetY = 0
  var  offsetZ = 0
  
  var  rotX = Math.PI/2
  var  rotZ = 0
  var  rotY = 0
  
  function draw() {
    iC.clear();
    iC.background(mainColorH, mainColorS, mainColorB);
    
    if (mouseIsPressed && (mouseButton == LEFT)) {
      rotX -= map((pmouseY - mouseY), 100, -100, -0.25, 0.25);
      rotY += map((pmouseX - mouseX), 100, -100, -0.25, 0.25);
    }
    if (mouseIsPressed && (mouseButton == CENTER)) {
      // offsetX += map((pmouseX - mouseX), 100, -100, -250, 250);
      // offsetX = constrain(offsetX, -dim, dim);
      offsetY += map((pmouseY - mouseY), -100, 100, 250, -250);
      offsetY = constrain(offsetY, 0, dim );
    }
    
    iC.camera(camX, camY, camZ, 0, 0, 0, 0, 0, -1)
    iC.translate(offsetX, offsetY, offsetZ);
    iC.rotateX(-rotX);
    iC.rotateY(rotY);
    iC.rotateZ(rotZ);
   
  
    for (i = 0; i < spots; i++) {
      let col = color((mainColorH + c[i]) % 360,
        mainColorS,
        bright[i]);
      if (Stroke) {
        iC.stroke(col); 
        iC.strokeWeight(dim/Stroke);
        iC.specularMaterial(0, 0);
      }
      else iC.fill(col);
      Xnoise = map(noise(m[i], i), 0, 1, -dim / xOff[i], dim / xOff[i]);
      Ynoise = map(noise(m[i], i + 200), 0, 1, -dim / yOff[i], dim / yOff[i]);
      Znoise = map(noise(m[i], i + 500), 0, 1, -dim / xOff[i], dim / yOff[i]);
      
      if (!Shape) {
        iC.push();
        iC.rotate(sRot[i]);
      }
      shape(x[i] + Xnoise, y[i] + Ynoise, z[i], radius[i]);
      if (!Shape) iC.pop();
      m[i] += mOff;
    }
    
    // iC.fill((c[1] + c[2] + c[3]) % 360, 15, 99);
    // iC.ellipse(0, 0, centerRadius, centerRadius, 60);
    
    S = map(noise(b), 0, 1, 0.3, 0.5 + rns[17]/10);
    s.setMag(S);
    
    sC.shader(blur);
    blur.setUniform('iP', iC);
    blur.setUniform('dl', [s.x,s.y]);
    
    sC.rect(-dim/2, -dim/2, dim/2, dim/2); 
    image(sC, -dim/2, -dim/2, dim, dim);
    
    b += bOffset;
    
    
  }
  
  function shape(x, y, z, r, s) {
    iC.push();
    iC.translate(x, y, z); //(x-y)/2 );//abs((x+y)/2
    if (Shape) iC.sphere(r/5); 
    else iC.box(r/5);
    iC.pop();
  }
  
  function rnd_dec() {
    seed ^= seed << 13
    seed ^= seed >> 17
    seed ^= seed << 5
    return ((seed < 0 ? ~seed + 1 : seed) % 1000) / 1000
  }