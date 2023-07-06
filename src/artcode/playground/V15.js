/* 
  Etheritance p5.js template
  By Phil Smith (@onlygenerated)
*/


/*
  ***************************** Define Variables ***************************** 
*/

// for a few sample tokens:
let useRandomHashes = true; // true = all hashes are random. false = use one of 4 hard-coded hashes
let allTokens = makeSampleTokenData(useRandomHashes);
let tokenData = chooseSampleToken(allTokens);
let variablesFromHash = [];


/* 
  Art Blocks parameter setup
  By Dmitri Cherniak
*/

// Artblocks injects the tokenData variable into your sketch like so
//let tokenData = {"hash":"0x31f2d12d85e8aeea04e79dc9ed6d3fd2377de7d17fe4233e8c34aab4b48f0f63","tokenId":"18000000"};

// another example if you want to uncomment it to try it out
// tokenData = {"hash":"0xf79f00793c585e9272d46d0437f04580a5fe9b8ebd834b6ce101f18e05d7cb16","tokenId":"18000258"};

// Gets you an array of 32 parameters from the hash ranging from 0-255
let rawParams = setupParametersFromTokenData(tokenData);

// your random seed
let seed = generateSeedFromTokenData(tokenData);

// the ID of the token
let tokenId = parseInt(tokenData.tokenId.substring(2));

// params you can use throughout
let params = {
  // map param 0 from 0-255 to 0.1 - 0.4
  radius: mapParam(rawParams[0], 0.1, 0.4),
  // map param 1 from 0-255 to 3-8 as integer
  points: parseInt(mapParam(rawParams[1], 3, 8)),
  // 50% chance to fill
  fill: rawParams[2] < 127,
  // generate a random RGB color
  backgroundColor: "rgb("+rawParams[3]+","+rawParams[4]+","+ rawParams[5]+")"
}


/*  
  Etheritance parameter setup
  By Phil Smith (@onlygenerated)
*/

/* 
  *** General notes on environmental & genetic bounds and variables ***
  
  - Distance environmental bounds are tied to window/canvas size, while genetic bounds are a % of environmental bounds.
    For example, assume:
        current canvas size = 1000px 
        seriesParameters.radiusMax = 0.5 
        childGeneticBounds.radiusMax = 0.1
    The resulting max radius size in pixels for this child would be 50px (1000 * 0.5 * 0.1). 
  - ...
  - ...
  
*/

// Define the environmental parameters, including genetic bounds and mutation rates. 
// These are unchanging throughout all NFTs in the series.
let seriesParameters = {
  
  // Series parameters
  seriesName: "testSeries001",
  seriesMaxChildren: 2, // maximum number of breeding events per image
  seriesBreedingMaxAge: 7, // maximum age (in days) that any image can breed at. (> 0)
  mutationRateMin: 0.0, // 0.0 - 1.0, % likelihood that any one genetic variable will change with each generation
  mutationRateMax: 1.0, // 0.0 - 1.0, % likelihood that any one genetic variable will change with each generation
  mutationAmountMin: 0.0, // 0.0 - 1.0, % of max possible change in genetic variable towards its genetic min/max bounds
  mutationAmountMax: 1.0, // 0.0 - 1.0, % of max possible change in genetic variable towards its genetic min/max bounds
  mutationRateGenerationalMultiplier: -0.1, // -1.0 to 1.0. How much to adjust mutation rate with each new generation. 
    // -1.0 means no mutation after the current generation. 
    // 0.0 means the mutation rate always remains the same as what was inherited. 
    // 1.0 means the next generation will be completely random
  
  // Series genetic bounds. 
  // These variable NAMES must be identical to those of the parent and child NFTs.
  numCirclesMin: 1,
  numCirclesMax: 100,
  radiusMin: 0.001, // as a % of canvas width
  radiusMax: 0.4, // as a % of canvas width  
}


// Example format of parent1 genetic variable bounds. 
// These would be injected from the platform upon breeding.
let parent1GeneticBounds = {
  numCirclesMin: 0.1, // as a % of numCircles environmental bounds
  numCirclesMax: 0.9, // as a % of numCircles environmental bounds
  radiusMin: 0.1, // as a % of radius environmental bounds
  radiusMax: 0.38, // as a % of radius environmental bounds
}


// Example format of parent2 genetic variable bounds. 
// These would be injected from the platform upon breeding.
let parent2GeneticBounds = {
  numCirclesMin: 0.2, // as a % of numCircles environmental bounds
  numCirclesMax: 0.5, // as a % of numCircles environmental bounds
  radiusMin: 0.11, // as a % of radius environmental bounds 
  radiusMax: 0.13, // as a % of radius environmental bounds
}


// Example format of parent 1 genetic variables. 
// These would be injected from the platform upon breeding.
// These will always lie between the parent1 genetic bounds. 
let parent1GeneticVariables = {
  sterile: false,
  numCircles: 0.9, // as a % of numCircles environmental bounds
  radius:0.12, // as a % of radius environmental bounds 
  mutationRate: 0.05, // 0.0 - 1.0, % likelihood that any one genetic variable will change with each generation
  mutationAmount: 0.2 // 0.0 - 1.0, % of max possible change in genetic variable towards its genetic min/max bounds
}


// Example format of parent 2 genetic variables.
// These would be injected from the platform upon breeding.
// These will always lie between the parent2 genetic bounds. 
let parent2GeneticVariables = {
  sterile: false,
  numCircles: 0.3, // as a % of numCircles environmental bounds
  radius:0.36, // as a % of radius environmental bounds 
  mutationRate: 0.2, // 0.0 - 1.0, % likelihood that any one genetic variable will change with each generation
  mutationAmount: 0.8 // 0.0 - 1.0, % of max possible change in genetic variable towards its genetic min/max bounds
}


// Example format of child genetic variable bounds. This is created at time of minting by picking randomly between either the parent1 or parent2 genetic variable bounds. 
let childGeneticBounds = {
  numCirclesMin: chooseOne(parent1GeneticBounds.numCirclesMin, parent2GeneticBounds.numCirclesMin),
  numCirclesMax: chooseOne(parent1GeneticBounds.numCirclesMax, parent2GeneticBounds.numCirclesMax),
  radiusMin: chooseOne(parent1GeneticBounds.radiusMin, parent2GeneticBounds.radiusMin),
  radiusMax: chooseOne(parent1GeneticBounds.radiusMax, parent2GeneticBounds.radiusMax)  
}


// Create child genetic variables. This is created at time of minting based on parents
let childGeneticVariables = {
  mutationRate: chooseOne(parent1GeneticVariables.mutationRate, parent2GeneticVariables.mutationRate),
  mutationAmount: chooseOne(parent1GeneticVariables.mutationAmount, parent2GeneticVariables.mutationAmount),  
  numCircles: chooseOne(parent1GeneticVariables.mutationAmount, parent2GeneticVariables.mutationAmount), 
  radius: chooseOne(parent1GeneticVariables.radius, parent2GeneticVariables.radius),  
  sterile: isChildSterile(),
  dead: isChildDead(),
  
  // to be updated with bounds and mutations
  points: 8,
  fill: true,
  backgroundColor: "rgb(" + 255 +"," + 128 +"," + 64 +")"
}

// for testing purposes, create sample gen0 image tokens for breeding
let genZeroPopulation = 8;
let allGenZeroTokens = createGenZeroTokens(genZeroPopulation);



/*
  ***************************** Child Image Creation ***************************** 
*/



function setup() {
  
  // for testing purposes, create sample gen0 image tokens for breeding
  let genZeroPopulation = 8;
  createGenZeroTokens(genZeroPopulation);
  
  // update child variables based on inherited mutation rate and mutation amount
  mutateChild(childGeneticVariables.mutationRate, childGeneticVariables.mutationAmount);
  
  
  
  // set up canvas  
  let dim = Math.min(window.innerWidth, window.innerHeight)
  createCanvas(dim, dim)
  noLoop();
}

function draw() {
  background(childGeneticVariables.backgroundColor);
  
  if (childGeneticVariables.fill) {
    fill('black');
  } else {
    noFill();
  }
	
  let r = childGeneticVariables.radius * width;
	
  beginShape()
  
  for (let i=0; i < childGeneticVariables.points; i++) {
    let ang = TWO_PI * i/childGeneticVariables.points;
		
    // slightly offset the angle of each point
    let angleOffset = range(0, TWO_PI)/10;
		
    let x = r*cos(ang+angleOffset);
    let y = r*sin(ang+angleOffset);
		
    vertex(x+width/2, y+height/2);	
  }
  endShape(CLOSE);

}


function mouseClicked() {
  tokenData = chooseSampleToken(allTokens);
  seed = generateSeedFromTokenData(tokenData);
  draw();
}


/* 
  Helper functions for Etheritance
  By Phil Smith (@onlygenerated)
*/


function createGenZeroTokens(genZeroPopulation) {
  
  for (let i = 0; i < genZeroPopulation; i++) {
    // Create the random token the determines all features created
    // Hex values will be converted to individual variables
    let currentToken = {
      "hash": "0x" + randomHash(64),
      "tokenId": 18000000 + i,
      
    }
    
    let currentGeneticBounds = {
      numCirclesMin: 0.1, // as a % of numCircles environmental bounds
      numCirclesMax: 0.9, // as a % of numCircles environmental bounds
      radiusMin: 0.1, // as a % of radius environmental bounds
      radiusMax: 0.38, // as a % of radius environmental bounds
    }
    
    let currentGeneticVariables = {
      
    }
  }
}

function makeSampleTokenData(useRandomHashes) {
  let tokenArray = [];
  let numTokens = 4;
  
  if (useRandomHashes) {
    for (let i = 0; i < numTokens; i++) {
      let currentTokenId = 18000000 + i;
      let currentTokenData = {"hash":"0x"+randomHash(64),"tokenId":currentTokenId.toString()};
      tokenArray.push(currentTokenData);
    }
  } else {
    let currentTokenData = {"hash":"0x31f2d12d85e8aeea04e79dc9ed6d3fd2377de7d17fe4233e8c34aab4b48f0f63","tokenId":"18000000"};
    tokenArray.push(currentTokenData);
    currentTokenData = {"hash":"0x172200793c585e9272d46d0437f04580a51143fabd834b6ce101f18e05d7cb16","tokenId":"18000258"}
    tokenArray.push(currentTokenData);
    currentTokenData = {"hash":"0x3899748204baea827e7c6f7333563b4fae2f6102645391256fe777feb7b217f9","tokenId":"18000523"};
    tokenArray.push(currentTokenData);
    currentTokenData = {"hash":"0x1b046ae1f5b2186fbaed8be8dce214609356614cbde008cd1013d6b76476624e","tokenId":"18000822"};
    tokenArray.push(currentTokenData);
  }
  return tokenArray;
}

function chooseSampleToken(tokenArray) {
  let curToken = tokenArray[Math.floor(Math.random() * tokenArray.length)];
  console.log(curToken.hash);
  console.log(curToken.tokenId);
  return curToken;
}

function getHashFromVariables(hashVariables) {

  let hexString = "";
  for (let curVarType = 0; curVarType < hashVariables.length; curVarType++) {
    let numBits = 2 ** curVarType;
    let theValues = [];
    if (numBits <= 4) {
      let numValues = hashVariables[curVarType].length;
      let decNum = 0;
      for (let i = 0; i < numValues; i++) {
        decNum << (i * numBits); 
        decNum += hashVariables[curVarType][i];        
      }
      hexString += decNum.toString(16);
    } else {
      let numValues = hashVariables[curVarType].length;
      for (let i = 0; i < numValues; i++) {
        hexString += hashVariables[curVarType][i].toString(16);
      }
    }
  }
 return hexString;
}


function createChildTokenFromParentHashes(hash1, hash2) {
  // need to add error checking if numBits is not a factor of hexBits
  let parent1Variables = getHashVariables(hash1);
  let parent2Variables = getHashVariables(hash2);
  let childVariables = [];
  
  for (let curVarType = 0; curVarType < parent1Variables.length; curVarType++) {
    for (let curVarNum = 0; curVarNum < parent1Variables[curVarType].length; curVarNum++) {
      if (Math.round(range(0, 1))) {
        childVariables[curVarType][curVarNum] = parent1Variables[curVarType][curVarNum];
      } else {
        childVariables[curVarType][curVarNum] = parent2Variables[curVarType][curVarNum];
      }
    }
  }
  
  let childToken = {
    hash : "0x" + getHashFromVariables[childVariables],
    rawVariables : childVariables  
  }
  return childToken;
}

function getHashVariables(hash) {
  let hashVariables = [];
  hashVariables.push(getValuesFromHex(hash.substring(0,2), 1));
  hashVariables.push(getValuesFromHex(hash.substring(2,4), 2));
  hashVariables.push(getValuesFromHex(hash.substring(4,8), 4));
  hashVariables.push(getValuesFromHex(hash.substring(8,40), 8));
  hashVariables.push(getValuesFromHex(hash.substring(40,64), 16));
  return hashVariables;
}

function getValuesFromHex(hex, numBits) {
  // need to add error checking if numBits is not a factor of hexBits
  
  let theValues = [];
  let hexBits = hex.length * 4;
  let curHex = hex;
  
  if (numBits <= 4) {
    let numValues = hexBits / numBits;
    let decNum = parseInt("0x" + curHex);
    for (let i = 0; i < numValues; i++) {
      theValues.push((decNum >>> (i*numBits)) % (2 ** numBits));    
    }
  } else {
    let numValues = hex.length / (numBits / 4);
    for (let i = 0; i < numValues; i++) {
      curHex = hex.substring(i*numBits/4,(i + 1) * numBits/4);
      let decNum = parseInt("0x" + curHex);
      theValues.push(decNum);
    }
  }
 return theValues;
}

function randomHash(nChar) {
    // convert number of characters to number of bytes
    var nBytes = Math.ceil(nChar = (+nChar || 8) / 2);

    // create a typed array of that many bytes
    var u = new Uint8Array(nBytes);

    // populate it wit crypto-random values
    window.crypto.getRandomValues(u);

    // convert it to an Array of Strings (e.g. "01", "AF", ..)
    var zpad = function (str) {
        return '00'.slice(str.length) + str
    };
    var a = Array.prototype.map.call(u, function (x) {
        return zpad(x.toString(16))
    });

    // Array of String to String
    var str = a.join('').toUpperCase();
    // and snip off the excess digit if we want an odd number
    if (nChar % 2) str = str.slice(1);

    // return what we made
    return str;
}



function chooseOne(option1, option2) {
  let choices = [option1, option2];
  return pick(choices);
}

function mutateChild(variationRate, variationAmount) {
  /* 
    Update values to be within a random range between current value and Min/Max values, modified by variation amount.
    variationRate is the percentage chance that any given variable will change. 
    variationAmount is the max percentage that any variable will change in the direction of min/max values.
  */
  
  // Mutate the genetic bounds, making sure max is always greater than min.
  // Exclude mutationRate and mutationAmount
  // ...TBC
  
  
  // Mutate the genetic variables, making sure each variable is within the genetic bounds
  // ...TBC
  
  
  // Mutate the mutationRate and mutationAmount
  // ...TBC  
  
}
function mutateNumber(num, numMin, numMax, variationRate, variationAmount) {
  /*
    Return a random number close to num, but between a min value and a max value. 
    variationRate 0 = return Num. 
    variationRate 1 = return somewhere between numMin and numMax. 
    variationRate 0.5 = return between halfway to min from num and halfway to max from num
  */
  
  if (range(0.0, 1.0) < variationRate) {
    return range(num + (variationAmount * (numMin - num)), num + (variationAmount * (numMax - num)));
  }
  else {
    return num;
  }
}

function isChildSterile() {
  // This will eventually be used to make a child sterile if its inherited/mutated genes are not within the appropriate bounds.
  // Specific rules and bounds TBD
  return false;
}

function isChildDead() {
  // This will eventually be used to kill a child if its inherited/mutated genes are not within the appropriate bounds.
  // Specific rules and bounds TBD
  return false;
}

/*
  Art Blocks Helper functions (c/o Dmitri Cherniak)
*/

// parse parameters
function setupParametersFromTokenData(token) {
  let hashPairs = []
  //parse hash
  for (let j = 0; j < 32; j++) {
    hashPairs.push(tokenData.hash.slice(2 + (j * 2), 4 + (j * 2)))
  }
  // map to 0-255
  return hashPairs.map(x => {
    return parseInt(x, 16)
  })
}

function generateSeedFromTokenData(token) {
  return parseInt(tokenData.hash.slice(0, 16), 16)
}


/*
  Random setup and helper functions, some of these are taken from
  @mattdesl's canvas-sketch-util Random library and adapted to work
  with this
*/

function rnd () {
  seed ^= seed << 13
  seed ^= seed >> 17
  seed ^= seed << 5
  
  let result = (((seed < 0) ? ~seed + 1 : seed) % 1000) / 1000
  return result
}

function range (min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }

  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('Expected all arguments to be numbers');
  }

  return rnd() * (max - min) + min;
}

function rangeFloor (min, max) {
  if (max === undefined) {
    max = min
    min = 0
  }

  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('Expected all arguments to be numbers')
  }

  return Math.floor(range(min, max))
}

function pick (array) {
  if (array.length === 0) return undefined
  return array[rangeFloor(0, array.length)]
}

function shuffleArray (arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected Array, got ' + typeof arr);
  }

  var rand;
  var tmp;
  var len = arr.length;
  var ret = arr.slice();
  while (len) {
    rand = Math.floor(rnd() * len--);
    tmp = ret[len];
    ret[len] = ret[rand];
    ret[rand] = tmp;
  }
  return ret;
}

function distance (x1, y1, x2, y2) {
  return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1))
}

function sampleSize(arr, num) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected Array, got ' + typeof arr);
  }
  
  if (arr.length < num) {
    throw new TypeError('Array is has less elements than sample size, ' + arr.length + ' vs '+num);
  }
  
  let shuffled = shuffleArray(arr)
  
  return {samples: shuffled.slice(0, num), leftOver: shuffled.slice(num)}
}

function mapd(n, start1, stop1, start2, stop2) {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2
}

function mapParam(n, start, stop) {
  return mapd(n, 0, 255, start, stop)
}