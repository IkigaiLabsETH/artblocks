// Define the palettes with specific names, colors, and backgrounds
const palettes = [
    {
      name: 'frozen-rose',
      colors: ['#29368f', '#e9697b', '#1b164d', '#f7d996'],
      background: '#f2e8e4',
    },
    {
      name: 'winter-night',
      colors: ['#122438', '#dd672e', '#87c7ca', '#ebebeb'],
      background: '#ebebeb',
    },
        {
        name: 'saami',
        colors: ['#eab700', '#e64818', '#2c6393', '#eecfca'],
        background: '#e7e6e4',
      },
      {
        name: 'knotberry1',
        colors: ['#20342a', '#f74713', '#686d2c', '#e9b4a6'],
        background: '#e5ded8',
      },
      {
        name: 'knotberry2',
        colors: ['#1d3b1a', '#eb4b11', '#e5bc00', '#f29881'],
        background: '#eae2d0',
      },
      {
        name: 'tricolor',
        colors: ['#ec643b', '#56b7ab', '#f8cb57', '#1f1e43'],
        background: '#f7f2df',
      },
      {
        name: 'foxshelter',
        colors: ['#ff3931', '#007861', '#311f27', '#bab9a4'],
        background: '#dddddd',
      },
      {
        name: 'hermes',
        colors: ['#253852', '#51222f', '#b53435', '#ecbb51'],
        background: '#eeccc2',
      },
      {
        name: 'olympia',
        colors: ['#ff3250', '#ffb33a', '#008c36', '#0085c6', '#4c4c4c'],
        stroke: '#0b0b0b',
        background: '#faf2e5',
      },
      {
        name: 'byrnes',
        colors: ['#c54514', '#dca215', '#23507f'],
        stroke: '#0b0b0b',
        background: '#e8e7d4',
      },
      {
        name: 'butterfly',
        colors: ['#f40104', '#f6c0b3', '#99673a', '#f0f1f4'],
        stroke: '#191e36',
        background: '#191e36',
      },
      {
        name: 'floratopia',
        colors: ['#bf4a2b', '#cd902a', '#4e4973', '#f5d4bc'],
        stroke: '#1e1a43',
        background: '#1e1a43',
      },
      {
        name: 'verena',
        colors: ['#f1594a', '#f5b50e', '#14a160', '#2969de', '#885fa4'],
        stroke: '#1a1a1a',
        background: '#e2e6e8',
      },
      {
        name: 'florida_citrus',
        colors: ['#ea7251', '#ebf7f0', '#02aca5'],
        stroke: '#050100',
        background: '#9ae2d3',
      },
      {
        name: 'lemon_citrus',
        colors: ['#e2d574', '#f1f4f7', '#69c5ab'],
        stroke: '#463231',
        background: '#f79eac',
      },
      {
        name: 'yuma_punk',
        colors: ['#f05e3b', '#ebdec4', '#ffdb00'],
        stroke: '#ebdec4',
        background: '#161616',
      },
      {
        name: 'yuma_punk2',
        colors: ['#f2d002', '#f7f5e1', '#ec643b'],
        stroke: '#19080e',
        background: '#f7f5e1',
      },
      {
        name: 'moir',
        colors: ['#a49f4f', '#d4501e', '#f7c558', '#ebbaa6'],
        stroke: '#161716',
        background: '#f7f4ef',
      },
      {
        name: 'sprague',
        colors: ['#ec2f28', '#f8cd28', '#1e95bb', '#fbaab3', '#fcefdf'],
        stroke: '#221e1f',
        background: '#fcefdf',
      },
      {
        name: 'bloomberg',
        colors: ['#ff5500', '#f4c145', '#144714', '#2f04fc', '#e276af'],
        stroke: '#000',
        background: '#fff3dd',
      },
      {
        name: 'revolucion',
        colors: ['#ed555d', '#fffcc9', '#41b797', '#eda126', '#7b5770'],
        stroke: '#fffcc9',
        background: '#2d1922',
      },
      {
        name: 'sneaker',
        colors: ['#e8165b', '#401e38', '#66c3b4', '#ee7724', '#584098'],
        stroke: '#401e38',
        background: '#ffffff',
      },
      {
        name: 'miradors',
        colors: ['#ff6936', '#fddc3f', '#0075ca', '#00bb70'],
        stroke: '#ffffff',
        background: '#020202',
      },
      {
        name: 'kaffeprat',
        colors: ['#BCAA8C', '#D8CDBE', '#484A42', '#746B58', '#9A8C73'],
        stroke: '#000',
        background: '#fff',
      },
      {
        name: 'jrmy',
        colors: ['#df456c', '#ea6a82', '#270b32', '#471e43'],
        stroke: '#270b32',
        background: '#ef9198',
      },
      {
        name: 'animo',
        colors: ['#f6c103', '#f6f6f6', '#d1cdc7', '#e7e6e5'],
        stroke: '#010001',
        background: '#f5f5f5',
      },
      {
        name: 'book',
        colors: ['#be1c24', '#d1a082', '#037b68', '#d8b1a5', '#1c2738', '#c95a3f'],
        stroke: '#0e0f27',
        background: '#f5b28a',
      },
      {
        name: 'juxtapoz',
        colors: ['#20357e', '#f44242', '#ffffff'],
        stroke: '#000000',
        background: '#cfc398',
      },
      {
        name: 'hurdles',
        colors: ['#e16503', '#dc9a0f', '#dfe2b4', '#66a7a6'],
        stroke: '#3c1c03',
        background: '#3c1c03',
      },
      {
        name: 'ludo',
        colors: ['#df302f', '#e5a320', '#0466b3', '#0f7963'],
        stroke: '#272621',
        background: '#dedccd',
      },
      {
        name: 'riff',
        colors: ['#e24724', '#c7c7c7', '#1f3e7c', '#d29294', '#010203'],
        stroke: '#010203',
        background: '#f2f2f2',
      },
      {
        name: 'san ramon',
        colors: ['#4f423a', '#f6a74b', '#589286', '#f8e9e2', '#2c2825'],
        stroke: '#2c2825',
        background: '#fff',
      },
      {
        name: 'one-dress',
        colors: ['#1767D2', '#FFFFFF', '#F9AB00', '#212121'],
        stroke: '#212121',
        background: '#fff',
      },
    ];
  
    var colourscafe = [
      {
        name: 'cc239',
        colors: ['#e3dd34', '#78496b', '#f0527f', '#a7e0e2'],
        background: '#e0eff0'
      },
      {
        name: 'cc234',
        colors: ['#ffce49', '#ede8dc', '#ff5736', '#ff99b4'],
        background: '#f7f4ed'
      },
      {
        name: 'cc232',
        colors: ['#5c5f46', '#ff7044', '#ffce39', '#66aeaa'],
        background: '#e9ecde'
      },
      {
        name: 'cc238',
        colors: ['#553c60', '#ffb0a0', '#ff6749', '#fbe090'],
        background: '#f5e9de'
      },
      {
        name: 'cc242',
        colors: ['#bbd444', '#fcd744', '#fa7b53', '#423c6f'],
        background: '#faf4e4'
      },
      {
        name: 'cc245',
        colors: ['#0d4a4e', '#ff947b', '#ead3a2', '#5284ab'],
        background: '#f6f4ed'
      },
      {
        name: 'cc273',
        colors: ['#363d4a', '#7b8a56', '#ff9369', '#f4c172'],
        background: '#f0efe2'
      }
  ];
  
  let margin = 48;
  let grainScale = 0.01;
  let flowFieldScale = 0.1;
  let flowFieldStrength = 0.5;
  let renderingSpeed = 10;
  
  let n;
  let wSize;
  let hSize;
  let palette;
  
  function setup() {
    createCanvas(1000, 1000, WEBGL);
    noLoop();
  
    // Initialize variables
    n = floor(random(12, 17));
    wSize = (width - 2 * margin) / n;
    hSize = (height - 2 * margin) / n;
  
    // Choose a random palette from the palettes array
    palette = random(palettes);
  
    // Set rendering speed
    frameRate(renderingSpeed);
  }
  
  function draw() {
    background(palette.background);
    orbitControl();
  
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let x = i * wSize + margin - width / 2;
        let y = j * hSize + margin - height / 2;
        let w = floor(random(1, n - i + 1)) * wSize;
        let h = floor(random(1, n - j + 1)) * hSize;
  
        let noiseX = noise(x * flowFieldScale, y * flowFieldScale);
        let noiseY = noise(x * flowFieldScale + 1000, y * flowFieldScale + 1000);
        let flowX = map(noiseX, 0, 1, -flowFieldStrength, flowFieldStrength);
        let flowY = map(noiseY, 0, 1, -flowFieldStrength, flowFieldStrength);
  
        let noiseXRect = noise(x * grainScale + flowX, y * grainScale + flowY) * 2 - 1;
        let noiseYRect = noise(x * grainScale + 1000 + flowX, y * grainScale + 1000 + flowY) * 2 - 1;
        let noiseW = noise(w * grainScale + flowX, h * grainScale + flowY) * 2 - 1;
        let noiseH = noise(w * grainScale + 1000 + flowX, h * grainScale + 1000 + flowY) * 2 - 1;
  
        let noiseX2 = noise(x * grainScale * 0.5, y * grainScale * 0.5);
        let noiseY2 = noise(x * grainScale * 0.5 + 1000, y * grainScale * 0.5 + 1000);
        noiseXRect += (noiseX2 * 2 - 1) * 5;
        noiseYRect += (noiseY2 * 2 - 1) * 5;
  
        let lightX = map(x + noiseXRect, -width / 2, width / 2, 0, 255);
        let lightY = map(y + noiseYRect, -height / 2, height / 2, 0, 255);
  
        fill(palette.colors[floor(random(palette.colors.length))], lightX, lightY);
  
        push();
        translate(x + noiseXRect, y + noiseYRect);
        box(w + noiseW, h + noiseH, 10);
        pop();
      }
    }
  }
  
  function keyPressed() {
    if (key === "D") {
      setup();
      loop();
    }
  }
  