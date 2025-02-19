/*
 * Kinetics (2022) by Mitchell
 * Pause a Kinetic by clicking on the canvas.
 * Increase and decrease the p5js framerate by tapping the left and right arrows.
 * Pause the Kinetic's top layer by tapping down arrow.
 * Press H for X-HQ, M for HQ, L for LQ.
 * Save a frame by tapping S.
 * Reset the Kinetic by by tapping backspace.
 */
//#region colors
window.$fxhashFeatures = {
}
let white = "#fbf9ee";
let primaryColors = [
    "#0060aa",
    "#ffed10",
    "#e20025",
    "#1c1c1c",
    "#FFFAF0"];
let colorWays =
    [
        ["#008E98", "#005679","#F78200", "#FFFEF9"],
        ["#008E98","#F78200", "#005679", "#FFFEF9"],
        ["#0abdc6", "#711c91", "#133e7c", "#1c1c1c"],
        ["#a3d9b3", "#d9625a", "#fbe672", "#FFFEF9"],
        ["#711c91", "#ea00d9", "#00AF52", "#1c1c1c"],
        ["#045334", "#f9f17f", "#ef1414", "#FFFEF9"],
        ["#FFFF00", "#F5AD94", "#0060aa", "#1c1c1c"],
        ["#D7A22A", "#9F792C", "#006778", "#FFFEF9"],
        ["#045334", "#6f67e5", "#d65eaa", "#FFFEF9"],
        ["#6f67e5", "#f9f17f", "#d65eaa", "#FFFEF9"],
        ["#4A0000", "#4A0000", "#4A0000", "#1c1c1c"],
        ["#C6C6C6", "#C6C6C6", "#023853", "#1c1c1c"],
        ["#C6C6C6", "#C6C6C6", "#e20025", "#FFFEF9"],
        ["#C6C6C6", "#C6C6C6", "#0060aa", "#FFFEF9"],
        ["#023853", "#023853", "#023853", "#FFFEF9"],
        ["#e20025", "#FE0002", "#4A0000", "#1c1c1c"],
        ["#4A0000", "#131739", "#f9f5cc", "#FFFEF9"],
        ["#4F2683", "#131739", "#FFC62F", "#FFFEF9"],
        ["#0060aa", "#7030A2", "#0170C1", "#FFFEF9"],
        ["#0060aa", "#7030A2", "#0170C1", "#1c1c1c"],
        ["#0060aa", "#FFFAF0", "#0170C1", "#1c1c1c"],
        ["#d65eaa", "#FFFAF0", "#d65eaa", "#FFFEF9"],
        ["#e20025", "#ef1414", "#4A0000", "#1c1c1c"],
        ["#0060aa", "#FFFAF0", "#0170C1", "#FFFEF9"],
        ["#00AF52", "#FFFAF0", "#0170C1", "#FFFEF9"],
        ["#711c91", "#ea00d9", "#00AF52", "#1c1c1c"],
        ["#0060aa", "#0060aa", "#0060aa", "#1c1c1c"],
        ["#0060aa", "#FFFAF0", "#0170C1", "#FFFEF9"],
        ["#e20025", "#FFFAF0", "#FE0002", "#FFFEF9"],
        ["#e20025", "#ffed10", "#FE0002", "#FFFEF9"],
        ["#7030A2", "#0170C1", "#FE0002", "#1c1c1c"],
        ["#0060aa", "#e20025", "#FE0002", "#FFFEF9"],
        ["#0b0b0b", "#363636", "#f5f5f5", "#FFFEF9"],
        ["#E4312b", "#000000", "#149954", "#1c1c1c"],
        ["#E4312b", "#000000", "#149954", "#FFFEF9"],
        ["#008C45", "#F4F9FF", "#CD212A", "#FFFEF9"],
        ["#012169", "#C8102E", "#C8102E", "#FFFEF9"],
        ["#0b0b0b", "#363636", "#f5f5f5", "#1c1c1c"],
        ["#2D2825", "#2D2825", "#f5f5f5", "#FFFEF9"],
        ["#241773", "#9E7C0C", "#C60C30", "#FFFEF9"],
        ["#00AF52", "#FE0002", "#00AF52", "#1c1c1c"],
        ["#f4dfad", "#ffed10", "#FE0002", "#FFFEF9"],
        ['#363636', '#363636', '#f5f5f5', "#FFFEF9"],
        ['#004C54', '#A5ACAF', '#004C54', "#FFFEF9"],
        ['#0b0b0b', '#FFFAF0', '#FFFAF0', "#FFFEF9"],
        ['#FFFF00', '#0b0b0b', '#FFFAF0', "#FFFEF9"],
        ['#0b0b0b', '#FFFAF0', '#FFFAF0', "#FFFEF9"],
        ['#0b0b0b', '#0b0b0b', '#0b0b0b', "#FFFEF9"],
        ['#A71930', '#A5ACAF', '#A71930', "#1c1c1c"],
        ['#0738AC', '#D5270F', '#D5275A', "#FFFEF9"],
        ['#ef1414', '#ef1414', '#d65eaa', "#FFFEF9"],
        ['#131739', '#045334', '#045334', "#FFFEF9"],
        ['#131739', '#3f7eb3', '#ff007c', "#FFFEF9"],
        ['#3f7eb3', '#3f7eb3', '#131739', "#FFFEF9"],
        ['#231f20', '#231f20', '#045334', "#FFFEF9"],
        ['#a76bcf', '#a76bcf', '#ff007c', "#1c1c1c"],
        ['#9c5026', '#9c5026', '#9c5026', "#FFFEF9"],

    ]

//#endregion
//#region randoms
const hashPairs = [];
for (let j = 0; j < 32; j++) {
    hashPairs.push(Math.floor(fxrand()*255));
}
const decPairs = hashPairs.map(x => {
    return x;
});
let decPairs2 = hashPairs.map(x => {
    return (x % 2) + 1;
});
let decPairs3 = hashPairs.map(x => {
    return (x % 3) + 1;
});
let decPairs4 = hashPairs.map(x => {
    return (x % 4) + 1
});
let decPairs5 = hashPairs.map(x => {
    return (x % 5) + 1
});
let decPairs7 = hashPairs.map(x => {
    return (x % 7) + 1
});
let decPairs10 = hashPairs.map(x => {
    return (x % 10) + 1;
});
let decPairs30 = hashPairs.map(x => {
    return (x % 30) + 1;
});
let decPairs15 = hashPairs.map(x => {
    return (x % 15) + 1;
});
let decPairs50 = hashPairs.map(x => {
    return (x % 50) + 1;
});
let decPairs100 = hashPairs.map(x => {
    return (x % 100) + 1;
});

//#endregion
//#region variables

let features = {
    pointsAcross: decPairs[6] + 1,
    pointsDown: decPairs[7] + 1,
    trompe_loiel: decPairs[12] < 120,
    flippedX: decPairs3[23] === 1,
    flippedY: decPairs3[5] === 1,
    flat: decPairs[12] >= 120,
    horizontalGradient: decPairs4[8] === 4 || (decPairs7[9] === 1 && decPairs2[0] === 1),
    verticalGradient: decPairs4[8] <= 3 || (decPairs7[9] === 1 && decPairs2[0] === 2),
    blockHeightXL: decPairs4[18] === 4,
    blockHeightL: decPairs4[18] === 3,
    blockHeightM: decPairs4[18] === 2,
    blockHeightS: decPairs4[18] === 1,
    blockHeight: 0,
    reverseShearX: decPairs4[17] === 3,
    reverseShearY: decPairs4[17] === 3 && decPairs2[19] === 1,
    matter: decPairs4[19] > 3 ? "#1c1c1c" : "#FFFEF9",
    filterAmount: decPairs7[28] + 1,
    gapSize: decPairs50[15] + 1,
    xPacking: decPairs7[5],
    yPacking: decPairs5[6],
    wiggling: (decPairs3[11] === 1 || decPairs3[4] === 1) && decPairs7[13] === 0,
    masked: (decPairs7[7] === 1)
};
const verticalGradient = 1,horizontalGradient = 2;
let delayLeftRightLowerLimit,delayTopBottomLowerLimit,myWidth, myHeight, tempScale = .99,totalShapes = { shape:[] },delayTopBottomUpperLimit,delayLeftRightLowerLimitI,delayTopBottomLowerLimitI,delayTopBottomUpperLimitI,pgMain,pgMain2,pgMain3,pgMain4,pgBackground,ripple2I,ripple3I,ripple4I,ripple5I,ripple6I,color1,color2,color3,smallerDimension,cutRightIncrement,cutLeftIncrement,isCutLeft,isCutRight,cutTempLeft,cutTempRight,curveDegreeLeftIncrement,curveDegreeLeft,curveDegreeRightIncrement,curveDegreeRight,cutBottomIncrement,cutTopIncrement,isCutTop,isCutBottom,cutTempTop,cutTempBottom,curveDegreeTopIncrement,curveDegreeTop,curveDegreeBottomIncrement,curveDegreeBottom,nHeightMin,nHeightMax,nWidthMin,nWidthMax,nW,nH,halfWidth,halfHeight,ellipseWidth,heightOfArea,maxOffsetLeft,maxOffsetRight,widthOfArea,clearC,clearC2,isOutline,strokeWeightOfOutline,shapeStart2,isCurvedRight,isCurvedLeft,isCurvedTop,isCurvedBottom,co,cWhite,xTemp,xTemp2,xStopWidth,xSwitchWidth,yTemp,yStopHeight,ySwitchHeight,n4,strokeColor,centerX,centerY,initDelayLeftRightLowerLimit,initDelayTopBottomLowerLimit,initDelayTopBottomUpperLimit,drawTCU,drawOnCanvas,drawSlide,shapes=[],points=[],colorWay=[],ripple=0,ripple2=0,ripple3=0,ripple4=0,ripple5=0,ripple6=0,boardWidth=0,boardWidthDivided=0,myHeightWidth=0,isLoading=!0,gradientDirection=1,pause=!1,pauseShapes=!1,cutLeft=0,cutRight=0,curveRadiusLeft=0,curveRadiusRight=0,cutTop=0,cutBottom=0,noise47GT75=0,noise49GT6=0,curveRadiusTop=0,curveRadiusBottom=0,heightMinusBw=0,maxOffsetLeftRightAbs2=0,maxOffsetLeftRightAbs=0,tblDone=!1,tbuDone=!1,lrlDone=!1,circleDirectionLeft=1,circleDirectionRight=1,hideCurtain=!1,shiftAmountY=0,shiftAmountX=0,l3Done=!1,offsetAmountBottomLeft=0,offsetAmountBottomRight=0,offsetAmountTopRight=0,offsetAmountTopLeft=0,incrementOffsetLeft=.1,incrementOffsetRight=.1,offsetLeft=0,offsetRight=0,outlineIsCurved=!1,initCurveDegreeLeftIncrement=0,initCurveDegreeRightIncrement=0,initCurveDegreeTopIncrement=0,initCurveDegreeBottomIncrement=0,initCutLeftIncrement=0,initCutRightIncrement=0,initCutTopIncrement=0,initCutBottomIncrement=0,leftCircle=!1,rightCircle=!1,split=!1,scaler=.01,drawShapesWeight=0,myFrameRate=60,circleRadius=0,d=0,n=0,l=0,n2=0,l2=0,l3=0,l3I=0,n3=0,dInit=0,tanWav=1===decPairs10[1],sinWav=decPairs4[1]>2,circleX=0,blockHeightGapSize=0,incrementDegree=0,dividerHeight=0,w3=0,h3=0,
    drawFlipX=function(){},drawFlipY=function(){},drawLeftRight=function(){},drawTopBottom=function(){},drawRemoveTop=function(){},drawRemoveBottom=function(){},drawHorizontalGap=function(){},drawVerticalGap=function(){}, circleFunction, curveFunctionTop, curveFunctionLeft, curveFunctionRight, curveFunctionBottom,drawResetCircle = function() {}, drawWiggle = function() {}, drawResetCurveLeft = function() {}, drawResetCurveRight = function() {}, drawResetCurveTop = function() {}, drawResetCurveBottom = function() {}, drawResetCutRight = function() {}, drawResetCutLeft = function() {}, drawResetCutTop = function() {}, drawResetCutBottom = function() {};
//#endregion
//#region core functions
function setup() {
    isLoading = true;
    noiseSeed(decPairs[31]);
    myFrameRate = 20+(20*fxrand());
    pixelDensity(3);
    smallerDimension = windowWidth < windowHeight ? windowWidth : windowHeight;
    myWidth = smallerDimension/2;
    myHeight = myWidth * (16 / 9);
    canvas = createCanvas(smallerDimension * (9 / 16), smallerDimension);
   
    canvas.mouseClicked(function () {
        pause = !pause;
    });
    dividerHeight = height * decPairs3[20];
    myHeightWidth = (myHeight * width / myWidth);
    boardWidth = width / 20;
    boardWidthDivided = boardWidth / 2;
    features.blockHeight = features.blockHeightXL ? height / 2 :
        features.blockHeightL ? height / 3 :
            features.blockHeightM ? height / 4 :
                features.blockHeightS ? height / 5 :
                    height / 4;
    features.BlockDivider = features.blockHeightXL ? 2 :
        features.blockHeightL ? 3 :
            features.blockHeightM ? 4 :
                features.blockHeightS ? 5 :
                    2;
    blockHeightGapSize = features.blockHeight + features.gapSize;
    gradientDirection = features.horizontalGradient ? horizontalGradient : features.verticalGradient ? verticalGradient : gradientDirection;
    features.colorWay = colorWays[decPairs[0] % colorWays.length];
    primaryColors.sort(function(a, b){
        if(a.charAt(decPairs5[0]) < b.charAt(decPairs5[0])) { return -1; }
        if(a.charAt(decPairs5[0]) > b.charAt(decPairs5[0])) { return 1; }
        return 0;
    })
    features.colorWay2 = colorWay.concat(primaryColors);
    clearC = color("#FFFFFF");
    clearC2 = color("#FFFFFF");
    clearC.setAlpha(0);
    clearC2.setAlpha(1);
    features.backgroundColor = color(features.colorWay[3]);
    features.solidBackground = noise(30) < .7;
    fill(features.backgroundColor);
    noStroke();
    rect(0, 0, smallerDimension, smallerDimension)
    features.strokeCapSquare = noise(11) > .1;
    if (features.strokeCapSquare) {
        strokeCap(SQUARE);
    }
    pgBackground = createGraphics(myWidth, myHeight);
    pgMain = createGraphics(myWidth, myHeight);
    pgMain2 = createGraphics(width, height);
    pgMain4 = createGraphics(width, height);
    pgMain3 = createImage(parseInt(width), parseInt(height));
    pgMain.noFill();
    split = noise(245) > .5;
    color3 = color(features.colorWay[0]);
    color1 = color(features.colorWay[2]);
    color2 = color(features.colorWay[1]);
    features.filterColor = primaryColors[decPairs[21]%primaryColors.length];
    nW = noise(8) <= .5 ? (noise(5) * .6) : (noise(5) * .3);
    nH = noise(7) <= .5 ? (noise(6) * .2) : (noise(6) * .4);
    scaler *= noise(7) * noise(8);
    nHeightMin = nH * height;
    nHeightMax = (1 - nH) * height;
    nWidthMin = nW * width;
    nWidthMax = (1 - nW) * width;
    features.HasVerticalGap = nW > .3 ? noise(33) > .9 : noise(33) > .8;
    features.HasHorizontalGap = noise(34) > .6;
    features.VerticalGapSize = noise(39);
    features.HorizontalGapSize = 3 * noise(38);
    features.filtered = decPairs[3] <= 140;
    features.removeLeftAndRight = features.filtered;
    heightOfArea = nHeightMax - nHeightMin;
    widthOfArea = nWidthMax - nWidthMin;
    rightCircle = decPairs3[4] === 1;
    leftCircle = decPairs3[11] === 1;
    features.centered = noise(87) > .6;
    centerX = myWidth / 2 * noise(91);
    centerY = myHeight / 2 * noise(45);
    circleRadius = widthOfArea > heightOfArea ? heightOfArea / 2 : widthOfArea / 2;
    w3 = width*3
    h3 = height*3;
    features.offset = noise(69) > .45;
    if (features.offset) {
        offsetAmountBottomLeft = (noise(70) > .5 ? -1 : 1) * noise(68) * nWidthMin / 2;
        offsetAmountBottomRight = (noise(71) > .5 ? -1 : 1) * noise(69) * nWidthMin / 2;
        offsetAmountTopRight = (noise(72) > .5 ? -1 : 1) * noise(80) * nWidthMin / 2;
        offsetAmountTopLeft = (noise(73) > .5 ? -1 : 1) * noise(81) * nWidthMin / 2;
        incrementOffsetLeft = (offsetAmountTopLeft - offsetAmountBottomLeft) / heightOfArea;
        incrementOffsetRight = (offsetAmountTopRight - offsetAmountBottomRight) / heightOfArea;
    }
    offsetLeft = 0;
    offsetRight = 0;
    maxOffsetLeft = incrementOffsetLeft * heightOfArea;
    maxOffsetRight = incrementOffsetRight * heightOfArea;
    maxOffsetLeftRightAbs2 = Math.abs(maxOffsetLeft + maxOffsetRight);
    maxOffsetLeftRightAbs = maxOffsetLeftRightAbs/2;
    cutLeft = 0;
    cutRight = 0;
    cutRightIncrement = 0;
    cutLeftIncrement = 0;
    cutTempLeft = 0;
    cutTempRight = 0;
    cutTop = 0;
    cutBottom = 0;
    cutBottomIncrement = 0;
    cutTopIncrement = 0;
    cutTempTop = 0;
    cutTempBottom = 0;
    isCurvedLeft = noise(129) > .5;
    isCurvedRight = noise(130) > .5;
    isCurvedBottom = noise(131) > .75;
    isCurvedTop = noise(132) > .75;
    isCutLeft = isCurvedLeft ? noise(100) > .65 : noise(100) > .6;
    isCutRight = isCurvedRight ? noise(104) > .65 : noise(104) > .6;
    isCutBottom = isCurvedBottom ? noise(105) > .8 : noise(105) > .75;
    isCutTop = isCurvedTop ? noise(106) > .8 : noise(106) > .75;
    features.removeTopAndBottom = features.filtered && (isCurvedTop || isCurvedBottom || isCutTop || isCutBottom);
    if (isCutLeft) {
        cutLeft = (noise(1, 2) > .5 ? -1 : 1) * noise(79) * widthOfArea / 4;
        cutLeftIncrement = noise(102);
        drawResetCutLeft = incrementCutLeft;
    }
    if (isCutRight) {
        cutRight = (noise(2, 2) > .5 ? -1 : 1) * noise(75) * widthOfArea / 4;
        cutRightIncrement = noise(103);
        drawResetCutRight = incrementCutRight;
    }
    if (isCurvedRight) {
        curveRadiusRight = (noise(24) > .5 ? -1 : 1) * (widthOfArea / 5) * noise(22);
        curveDegreeRightIncrement = 2*TWO_PI / (height/decPairs3[21] % 180)
        curveDegreeRight = 0;
        drawResetCurveRight = incrementCurveDegreeRight;
        let curveRightFunctionSeed = noise(17);
        if(curveRightFunctionSeed <= .38) {
            features.curveFunctionRight = "Cos";
            curveFunctionRight = Math.cos;
        } else if (curveRightFunctionSeed < .75) {
            features.curveFunctionRight = "Sin";
            curveFunctionRight = Math.sin;
        } else {
            features.curveFunctionRight = "Tan";
            curveFunctionRight = Math.tan;
        }
    }
    if (isCurvedLeft) {
        curveRadiusLeft = (noise(23) > .5 ? -1 : 1) * (widthOfArea / 5) * noise(21);
        curveDegreeLeftIncrement = 2*TWO_PI / (height/decPairs3[21] % 180)
        curveDegreeLeft = 0;
        drawResetCurveLeft = incrementCurveDegreeLeft;
        let curveLeftFunctionSeed = noise(19);
        if(curveLeftFunctionSeed <= .38) {
            features.curveFunctionLeft = "Cos";
            curveFunctionLeft = Math.cos;
        } else if (curveLeftFunctionSeed < .75) {
            features.curveFunctionLeft = "Sin";
            curveFunctionLeft = Math.sin;
        } else {
            features.curveFunctionLeft = "Tan";
            curveFunctionLeft = Math.tan;
        }
    }
    if (isCurvedBottom) {
        curveRadiusBottom = (noise(24) > .5 ? -1 : 1) * (heightOfArea / 5) * noise(22);
        curveDegreeBottomIncrement = 2*TWO_PI / (width/decPairs3[21] % 180)
        curveDegreeBottom = 0;
        drawResetCurveBottom = incrementCurveDegreeBottom;
        let curveBottomFunctionSeed = noise(29);
        if(curveBottomFunctionSeed <= .38) {
            features.curveFunctionBottom = "Cos";
            curveFunctionBottom = Math.cos;
        } else if (curveBottomFunctionSeed < .75) {
            features.curveFunctionBottom = "Sin";
            curveFunctionBottom = Math.sin;
        } else {
            features.curveFunctionBottom = "Tan";
            curveFunctionBottom = Math.tan;
        }
    }
    if (isCurvedTop) {
        curveRadiusTop = (noise(23) > .5 ? -1 : 1) * (heightOfArea / 5) * noise(21);
        curveDegreeTopIncrement = 2*TWO_PI / (width/decPairs3[21] % 180)
        curveDegreeTop = 0;
        drawResetCurveTop = incrementCurveDegreeTop;
        let curveTopFunctionSeed = noise(28);
        if(curveTopFunctionSeed <= .33) {
            features.curveFunctionTop = "Cos";
            curveFunctionTop = Math.cos;
        } else if (curveTopFunctionSeed < .67) {
            features.curveFunctionTop = "Sin";
            curveFunctionTop = Math.sin;
        } else {
            features.curveFunctionTop = "Tan";
            curveFunctionTop = Math.tan;
        }
    }
    if (isCutTop) {
        cutTop = (noise(1, 2) > .5 ? -1 : 1) * noise(79) * heightOfArea / 5;
        cutTopIncrement = noise(104);
        drawResetCutTop = incrementCutTop;
    }
    if (isCutBottom) {
        cutBottom = (noise(2, 2) > .5 ? -1 : 1) * noise(75) * heightOfArea / 5;
        cutBottomIncrement = noise(105);
        drawResetCutBottom = incrementCutBottom;
    }
    initCurveDegreeBottomIncrement = curveDegreeBottomIncrement;
    initCurveDegreeTopIncrement = curveDegreeTopIncrement;
    initCurveDegreeRightIncrement = curveDegreeRightIncrement;
    initCurveDegreeLeftIncrement = curveDegreeLeftIncrement;
    initCutBottomIncrement = cutBottomIncrement;
    initCutTopIncrement = cutTopIncrement;
    initCutRightIncrement = cutRightIncrement;
    initCutLeftIncrement = cutLeftIncrement;
    delayLeftRightLowerLimit = heightOfArea/2;
    delayTopBottomLowerLimit = nWidthMin;
    delayTopBottomUpperLimit = nWidthMax;
    initDelayLeftRightLowerLimit = delayLeftRightLowerLimit;
    initDelayTopBottomLowerLimit = delayTopBottomLowerLimit;
    initDelayTopBottomUpperLimit = delayTopBottomUpperLimit;
    heightMinusBw = height - boardWidthDivided
    delayLeftRightLowerLimitI = width / (10);
    delayTopBottomLowerLimitI = height / (10);
    delayTopBottomUpperLimitI = height / (10);
    myStrokeWeight = height / decPairs100[15];
    drawShapesWeight = 1 + noise(95) > .8 ? decPairs2[10] : decPairs5[10];
    strokeWeightOfOutline = (strokeWeightOfOutline * 2) > widthOfArea - boardWidth ? strokeWeightOfOutline / 4 : strokeWeightOfOutline;
    isOutline = noise(59) > .8;
    outlineIsCurved = noise(78) > .5;
    strokeWeightOfOutline = myStrokeWeight;
    noise47GT75 = noise(47) > .75;
    noise49GT6 = noise(49) > .6;
    incrementDegree = (180 / (circleRadius*2)) * (PI / 180);
    d = PI / (decPairs7[14]);
    circleDirectionLeft = (noise(134) > .5 ? 1 : -1);
    circleDirectionRight = (noise(133) > .5 ? 1 : -1);
    dInit = d;
    features.shapesType = noise(44) > .8 ? 3 : noise(44) > .6 ? 2 : noise(44) > .4 ? 1 : "";
    ripple2I = width/decPairs[10]/2.5;
    ripple3I = width/decPairs[11]/2.5;
    ripple4I = width/decPairs[12]/2.5;
    ripple5I = width/decPairs[13]/2.5;
    ripple6I = width/decPairs[14]/2.5;

    n =  noise(3)  > .5 ? 0 : noise(70) * .5;
    n = (height) * (n > .5 ? 1 - n : n);
    l = noise (3) > .6 && noise(2) > .3 ? 0 : noise(21) * .5;
    l = width * (l > .5 ? 1 - l : l);
    l2 = width - (2 * (l));
    n2 = height - (2 * (n));
    l3 = 0;
    l3I = height / 30;
    n3 = n2/2;
    n4 = n+n3;
    ellipseWidth = height/decPairs5[21];
    halfWidth = width/2;
    halfHeight = height/2;
    grid();
    createShapes();
    console.log(getAttributes());
    frameRate(myFrameRate);
    if (features.trompe_loiel) {
        drawTCU = drawTrompeLoiel
    } else if (features.flat) {
        drawTCU = drawFlat;
    }
    if (features.filtered) {
        drawOnCanvas = drawFiltered;
    } else {
        drawOnCanvas = drawOriginal;
    }
    if (features.flippedX) {
        drawFlipX = flipX;
    }
    if (features.flippedY) {
        drawFlipY = flipY;
    }
    if(features.filtered) {
        drawSlide = incrementDelay;
    } else {
        drawSlide = incrementDelay2;
    }
    if(features.removeLeftAndRight) {
        drawLeftRight = removeLeftRight;
    }
    if(features.removeTopAndBottom) {
        drawTopBottom = removeTopBottom;
    }
    if(isCutTop || isCurvedTop) {
        drawRemoveTop = removeTop;
    }
    if(isCutBottom || isCurvedBottom) {
        drawRemoveBottom = removeBottom;
    }
    if (features.HasHorizontalGap) {
        drawHorizontalGap = horizontalGap;
    }
    if (features.HasVerticalGap) {
        drawVerticalGap = verticalGap;
    }
    if(features.wiggling) {
        drawWiggle = wiggle;
    }
    if(rightCircle || leftCircle) {
        drawResetCircle = resetCircle;
    }
    if(tanWav) {
        circleFunction = Math.tan;
    } else if(sinWav) {
        circleFunction = Math.sin;
    } else {
        circleFunction = Math.cos;
    }
      
    isLoading = false;
    pause = false;
}
//This function is called by draw when notLoading is false.
function animate() {
    isLoading = true;
    pgMain2.push();
    drawTCU();
    pgMain2.pop();
    drawOnCanvas();
    drawFlipX();
    drawFlipY();
    fill(features.backgroundColor);
    noStroke();
    strokeWeight(2);
    drawTopBottom();
    drawLeftRight();
    stroke(features.backgroundColor)
    drawHorizontalGap();
    drawVerticalGap();
    if (ripple > 10) {
        drawShapesToCanvas();
    }
    noFill();
    strokeWeight(boardWidth);
    stroke(white);
    rect(0, 0, width, height);
    isLoading = false;
}
function keyPressed() {
    if (keyCode === 83) {
        saveCanvas(canvas, fxhash, 'jpg');
    }
    if (keyCode === 39) {
        myFrameRate++;
        frameRate(myFrameRate);
    }
    if (keyCode === 37) {
        if (myFrameRate > 1) {
            myFrameRate--;
            frameRate(myFrameRate);
        }
    }
    if (keyCode === 40) {
        if(ripple > 30){
            pauseShapes = !pauseShapes;
        }
    }
    if(keyCode === 72) {
        pixelDensity(10);
    }
    if(keyCode === 77) {
        pixelDensity(3);
    }    
    if(keyCode === 76) {
        pixelDensity(1);
    }
    if (keyCode === 8 || keyCode === 77 || keyCode === 72 || keyCode === 76) {
        noLoop();
        ripple = 0;
        ripple2 = 0;
        ripple3 = 0;
        ripple4 = 0;
        ripple5 = 0;
        ripple6 = 0;

        curveDegreeBottomIncrement = initCurveDegreeBottomIncrement;
        curveDegreeTopIncrement = initCurveDegreeTopIncrement;
        curveDegreeRightIncrement = initCurveDegreeRightIncrement;
        curveDegreeLeftIncrement = initCurveDegreeLeftIncrement;
        cutBottomIncrement = initCutBottomIncrement;
        cutTopIncrement = initCutTopIncrement;
        cutRightIncrement = initCutRightIncrement;
        cutLeftIncrement = initCutLeftIncrement;
        delayLeftRightLowerLimit = initDelayLeftRightLowerLimit;
        delayTopBottomLowerLimit = initDelayTopBottomLowerLimit;
        delayTopBottomUpperLimit = initDelayTopBottomUpperLimit;
        l3 = 0;
        hideCurtain = false;
        l3Done = false;
        l3Done = false;
        tblDone = false;
        tbuDone = false;
        lrlDone = false;
        pause = false;
        isLoading = false;
        if(features.filtered) {
            drawSlide = incrementDelay;
        } else {
            drawSlide = incrementDelay2;
        }
        clear();
        fill(features.backgroundColor);
        noStroke();
        rect(0, 0, smallerDimension, smallerDimension)
        noFill();
        strokeWeight(boardWidth);
        stroke(white);
        rect(0, 0, width, height);
        loop();
    }
}

function draw() {
    if (!pause) {
        if (!isLoading) {
            ripple++;
            if (ripple > 10 && !pauseShapes) {
                ripple2+=ripple2I;
                ripple3+=ripple3I;
                ripple4+=ripple4I;
                ripple5+=ripple5I;
                ripple6+=ripple6I;
                ripple2I *=.98;
                ripple3I *= .98;
                ripple4I *= .98;
                ripple5I *= .98;
                ripple6I *= .98;
            }
            resetOffset();
            drawResetCurveRight()
            drawResetCurveLeft()
            drawResetCurveTop()
            drawResetCurveBottom()
            drawResetCutRight()
            drawResetCutLeft()
            drawResetCutTop()
            drawResetCutBottom()
            drawWiggle();
            drawResetCircle()
            drawSlide();
            animate();
        }
    }
}

function resetCircle() {
    circleX = 0;
    d = dInit;
}

function resetOffset() {
    offsetLeft = 0;
    offsetRight = 0;
}

function wiggle() {
    dInit *= 1.01;
}

function incrementCurveDegreeRight() {
    curveDegreeRight = 0;
    curveDegreeRightIncrement *= 1.01;
}
function incrementCurveDegreeLeft() {
    curveDegreeLeft = 0;
    curveDegreeLeftIncrement *= 1.01;
}
function incrementCurveDegreeTop() {
    curveDegreeTop = 0;
    curveDegreeTopIncrement *= 1.01;
}
function incrementCurveDegreeBottom() {
    curveDegreeBottom = 0;
    curveDegreeBottomIncrement *= 1.01;
}
function incrementCutRight() {
    cutTempRight = 0;
    cutRightIncrement *= 1.01;
}
function incrementCutLeft() {
    cutTempLeft = 0;
    cutLeftIncrement *= 1.01;
}
function incrementCutTop() {
    cutTempTop = 0;
    cutTopIncrement *= 1.01;
}
function incrementCutBottom() {
    cutTempBottom = 0;
    cutBottomIncrement *= 1.01;
}

//#endregion
//#region helpers

function removeTop(i) {
    line(i, boardWidthDivided, i, nHeightMin + (isCutTop ? cutTempTop % cutTop : 0) + (isCurvedTop ? curveRadiusTop * curveFunctionTop(curveDegreeTop) : 0));
    cutTempTop += cutTopIncrement;
    curveDegreeTop += curveDegreeTopIncrement;
}

function removeBottom(i) {
    line(i, nHeightMax - (isCutBottom ? cutTempBottom % cutBottom : 0) + (isCurvedBottom ? curveRadiusBottom * curveFunctionBottom(curveDegreeBottom) : 0),
        i, height);

    cutTempBottom += cutBottomIncrement;
    curveDegreeBottom += curveDegreeBottomIncrement;
}

function removeTopBottom() {
    stroke(features.backgroundColor);
    for (let i = nWidthMin - maxOffsetLeftRightAbs2 - delayTopBottomLowerLimit; i <= nWidthMax + maxOffsetLeftRightAbs2 + delayTopBottomUpperLimit; i++) {
        drawRemoveTop(i);
        drawRemoveBottom(i);
    }
}
function removeLeftRight() {
    let temp = 0;
    for (let i = boardWidthDivided; i < heightMinusBw; i++) {
        if (features.solidBackground) {
            strokeColor = features.backgroundColor;
        } else {
            if (i % 5 === 0) {
                strokeColor = features.backgroundColor;
            }
            if (i % 4 === 0) {
                strokeColor = (lerpColor(features.backgroundColor, color1, i / height));
            } else {
                if (i > height && split) {
                    strokeColor = (lerpColor(color1, features.backgroundColor, i / dividerHeight));
                } else {
                    strokeColor = (lerpColor(features.backgroundColor, color1, i / dividerHeight));
                }
            }
        }
        stroke(strokeColor);

        push();
        if (i <= nHeightMax - delayLeftRightLowerLimit && i >= nHeightMin + delayLeftRightLowerLimit) {
            circleX = circleRadius * circleFunction(d)

            line(boardWidthDivided,
                i,
                (leftCircle ? (nWidthMin) - circleX * circleDirectionLeft : nWidthMin)
                + offsetLeft
                + (isCutLeft ? cutTempLeft % cutLeft : 0)
                + (isCurvedLeft ? curveRadiusLeft * curveFunctionLeft(curveDegreeLeft) : 0),
                i);
            if (temp > strokeWeightOfOutline && temp < heightOfArea - strokeWeightOfOutline - 1) {
                stroke(isOutline ? strokeColor : clearC);
                line(nWidthMin + offsetRight + strokeWeightOfOutline + (outlineIsCurved ? (isCutRight ? cutTempRight % cutRight : 0) + (isCurvedRight ? curveRadiusRight * curveFunctionRight(curveDegreeRight) : 0) : 0),
                    i,
                    nWidthMax + offsetLeft - strokeWeightOfOutline + (outlineIsCurved ? (isCutLeft ? cutTempLeft % cutLeft : 0) + (isCurvedLeft ? curveRadiusLeft * curveFunctionLeft(curveDegreeLeft) : 0) : 0),
                    i);
            }
            if (noise47GT75) {
                if (noise(i) > .7) {
                    stroke(strokeColor);
                } else {
                    stroke(features.backgroundColor)
                }
            } else {
                if (noise49GT6) {
                    stroke(strokeColor);
                } else {
                    stroke(features.backgroundColor)
                }
            }
            line((rightCircle ? ((nWidthMax) + circleX * circleDirectionRight) : nWidthMax) + offsetRight + (isCutRight ? cutTempRight % cutRight : 0) + (isCurvedRight ? curveRadiusRight * curveFunctionRight(curveDegreeRight) : 0),
                i,
                width - boardWidthDivided + maxOffsetLeftRightAbs,
                i);
            offsetLeft += incrementOffsetLeft;
            offsetRight += incrementOffsetRight;
            temp++;
            cutTempLeft += cutLeftIncrement;
            cutTempRight += cutRightIncrement;
            curveDegreeRight += curveDegreeRightIncrement;
            curveDegreeLeft += curveDegreeLeftIncrement;
            d += incrementDegree;
        } else {
            line(boardWidthDivided, i, width - boardWidthDivided, i);
        }
        pop();
    }
    if (noise(230) > .5) {
        for (let i = boardWidthDivided; i < height - boardWidthDivided; i++) {
            if (features.solidBackground) {
                strokeColor = features.backgroundColor;
            } else {
                if (i % 5 === 0) {
                    strokeColor = features.backgroundColor;
                }
                if (i % 4 === 0) {
                    strokeColor = (lerpColor(features.backgroundColor, color1, i / height));
                } else {
                    if (i > height && split) {
                        strokeColor = (lerpColor(color1, features.backgroundColor, i / dividerHeight));
                    } else {
                        strokeColor = (lerpColor(features.backgroundColor, color1, i / dividerHeight));
                    }
                }
            }
            noFill();
            stroke(strokeColor);
            push();
            if (i < nHeightMax - 1 && i > nHeightMin) {

            } else {
                line(boardWidthDivided, i, width - boardWidthDivided, i);
            }
            pop();
        }
    }
}
function horizontalGap() {
    let upperLimit = nHeightMin + (heightOfArea * (1 - features.HorizontalGapSize)) + offsetRight - delayTopBottomUpperLimit;
    let lowerLimit = nHeightMin + (heightOfArea * features.HorizontalGapSize) + offsetLeft + delayTopBottomUpperLimit;
    for (let i = lowerLimit;
         i < upperLimit; i++) {
        strokeColor = features.backgroundColor;
        stroke(strokeColor);
        line(boardWidthDivided, i, width - boardWidthDivided, i);
    }
}
function verticalGap() {
    let upperLimit = nWidthMin + (widthOfArea * (1 - features.VerticalGapSize));
    let lowerLimit = nWidthMin + (widthOfArea * features.VerticalGapSize);
    for (let i = 0;
         i < height; i++) {
        strokeColor = features.backgroundColor;
        stroke(strokeColor);
        line(lowerLimit, i, upperLimit, i);
    }
}
function drawGradientToGraphic(x, y, w, h) {
    for (let i = 0; i < w; i += (w / features.xPacking)) {
        for (let j = 0; j < h; j += (h / features.yPacking)) {
            pgMain.image(pgBackground, i, j, w / features.xPacking, h / features.yPacking);
        }
    }
}
function drawTrompeLoiel() {
    if (features.centered) {
        pgBackground.translate(centerX, centerY);
    }
    pgBackground.fill(features.matter);
    pgBackground.rect(0, 0, myWidth, myHeight);
    pgMain.fill(features.matter);
    pgMain.rect(0, 0, myWidth, myHeight);
    pgMain2.fill(features.matter);
    pgMain2.rect(0, 0, width, height);
    setGradient(0, 0, myWidth, myHeight, color1,
        color3, color2,
        gradientDirection, pgBackground);
    drawGradientToGraphic(0, 0, myWidth, myHeight);
    if (features.reverseShearX || features.reverseShearY) {
        pgMain2.translate((features.blockHeight / (-2)) + shiftAmountX, (-(features.BlockDivider * features.blockHeight) + features.blockHeight / 2) + shiftAmountY);
    } else {
        pgMain2.translate((features.blockHeight / (-2)) + shiftAmountX - (features.blockHeight * .66), (-(features.BlockDivider * features.blockHeight) + features.blockHeight / 2) + shiftAmountY);
    }
    for (let j = 0; j < features.BlockDivider * 2; j++) {
        pgMain2.push();
        for (let i = 0; i <= features.BlockDivider; i++) {
            pgMain2.push();
            pgMain2.image(pgMain, features.blockHeight, features.blockHeight, features.blockHeight, features.blockHeight);
            pgMain2.push();
            if (features.reverseShearX) {
                pgMain2.shearX(-PI / 4.0);
            } else {
                pgMain2.shearX(PI / 4.0);
            }
            pgMain2.image(pgMain, 0, 0, features.blockHeight, features.blockHeight);
            pgMain2.pop();
            pgMain2.push();
            if (features.reverseShearY) {
                pgMain2.shearY(-PI / 4.0);
            } else {
                pgMain2.shearY(PI / 4.0);
            }
            pgMain2.image(pgMain, 0, 0, features.blockHeight, features.blockHeight);
            pgMain2.pop();
            pgMain2.pop();
            pgMain2.translate(features.blockHeight + width / features.gapSize, features.blockHeight + width / features.gapSize);
        }
        pgMain2.pop();
        pgMain2.translate(0, features.blockHeight + width / features.gapSize);
    }
}
function drawFlat() {
    if (features.centered) {
        pgBackground.translate(centerX, centerY);
    }
    pgBackground.fill(features.matter);
    pgBackground.rect(0, 0, myWidth, myHeight);
    pgMain.fill(features.matter);
    pgMain.rect(0, 0, myWidth, myHeight);
    pgMain2.fill(features.matter);
    pgMain2.rect(0, 0, width, height);
    setGradient(0, 0, myWidth, myHeight, color1,
        color3, color2,
        gradientDirection, pgBackground);
    drawGradientToGraphic(0, 0, myWidth, myHeight);
    pgMain2.image(pgMain, 0, 0, width, myHeightWidth)
}
function drawFiltered() {
    let pcolor = color(features.filterColor);
    for (let i = 0; i < width + blockHeightGapSize; i += blockHeightGapSize) {
        for (let j = 0; j < height + blockHeightGapSize; j += blockHeightGapSize) {
            pcolor.setAlpha(((i+1)*features.filterAmount + (j+1)*features.filterAmount)%32);
            pgMain2.noStroke();
            pgMain2.fill(pcolor);
            pgMain2.rect(i, j, blockHeightGapSize, blockHeightGapSize);
            image(pgMain2, i, j, blockHeightGapSize, blockHeightGapSize);
        }
    }
}
function drawOriginal() {
    pgMain3.copy(pgMain2, 0, 0, width, height, 0, 0, width, height);
    if (features.masked){
        drawShapes(pgMain4);
        pgMain3.mask(pgMain4);
        pgMain4.clear();
    }

    image(pgMain3, l, n, l2, n2);
    if (!hideCurtain) {
        push();
        fill(features.backgroundColor);
        stroke(features.backgroundColor);
        strokeWeight(1);
        if (features.flippedX) {
            translate(width, 0);
            scale(-1, 1);
        }
        if (features.flippedY) {
            translate(0, height);
            scale(1, -1);
        }
        rect(l, n, l2, n3-l3);
        rect(l, n4+l3, l2, n3);
        pop();
    }
}
function flipX() {
    translate(width, 0);
    scale(-1, 1)
}
function flipY() {
    translate(0, height);
    scale(1, -1);
}
function setGradient(x, y, w, h, c1, c2, c3, axis, pg) {
    pg.noFill();
    let cTemp = lerpColor(c2, c3, noise(x));
    cTemp.setAlpha(noise(y) * 128)
    let temp = 0;
    if (axis === verticalGradient) {
        for (let i = y; i <= y + h; i++) {
            let inter = map(i, y, y + h, 0, 1);
            co = lerpColor(c1, c2, inter);
            cWhite = lerpColor(c1, cTemp, inter);
            xStopWidth = w * noise(i + ripple);
            xSwitchWidth = (w - xStopWidth) * noise(i + 1 + ripple);
            xTemp = x + xStopWidth - temp;
            xTemp2 = x + xStopWidth + xSwitchWidth + temp;
            pg.rotate(70 * noise(50) * noise(51));
            pg.translate(i%10, i%10);
            pg.stroke(co);
            pg.line(x, i, xTemp, i);
            pg.stroke(cWhite);
            pg.line(xTemp, i, xTemp2, i);
            pg.stroke(co);
            pg.line(xTemp2, i, x + w, i);
            temp++;
        }
    } else if (axis === horizontalGradient) {
        for (let i = x; i <= x + w; i++) {
            let inter = map(i, x, x + w, 0, 1);
            co = lerpColor(c1, c2, inter);
            cWhite = lerpColor(c1, cTemp, inter);
            pg.rotate(70 * noise(50));

            pg.stroke(co);
            pg.line(i, y, i, y + h);
            yStopHeight = h * noise(i);
            ySwitchHeight = (h - yStopHeight) * noise(i + 1);
            pg.stroke(co);
            pg.line(i, y, i, y + yStopHeight);
            pg.stroke(cWhite);
            pg.line(i, y + yStopHeight, i, y + yStopHeight + ySwitchHeight);
            pg.stroke(co);
            pg.line(i, y + yStopHeight + ySwitchHeight, i, y + h);
        }
    }
}
function grid() {
    let w = features.pointsAcross;
    let h = features.pointsDown;
    let padding = boardWidthDivided;
    let horizontalDistanceBetweenPoints = ((width - padding) / w);
    let innerHorizontalRadius = (horizontalDistanceBetweenPoints / 2);
    let verticalDistanceBetweenPoints = ((height - padding) / h);
    let innerVerticalRadius = (verticalDistanceBetweenPoints / 2);
    let bit = false;
    let yMax = 0;
    let xMax = 0;
    let i = padding;
    let j = padding;
    while (j <= (height - 2 * padding + innerVerticalRadius)) {
        if (j > yMax) {
            yMax = j;
        }
        while (i <= (width - 2 * padding + innerHorizontalRadius)) {
            if (i > xMax) {
                xMax = i;
            }
            let temp = {};
            temp.x = (i);
            temp.y = (j);
            if (!((i === padding || i === (width - 2 * padding)) && !bit)) {
                points.push(temp);
            }
            if ((i === padding || i === ((width - 2 * padding) - (innerHorizontalRadius))) && !bit) {
                i += innerHorizontalRadius;
            } else {
                i += horizontalDistanceBetweenPoints;
            }
        }
        bit = !bit;
        j += innerVerticalRadius;
        i = padding;
    }
}

function drawShapes(pg) {
    pg.push();
    pg.fill("black");
    if (totalShapes.type === 3) {
        pg.ellipseMode(CENTER);
        let x = (halfWidth + (noise(1) > .5 ? -1 : 1) * ripple4)%w3;
        let y = (halfHeight + (noise(2 + 1, i) > .5 ? -1 : 1) * ripple5)%h3;
        pg.ellipse(x - ellipseWidth,
            y - ellipseWidth,
            ellipseWidth);
    } else if (totalShapes.type === 2) {
        pg.beginShape();
        for (let i = 0; i < totalShapes.shape.length; i++) {
            let x = (totalShapes.shape[i].x + (noise(1) > .5 ? -1 : 1) * ripple4)%w3;
            let y = (totalShapes.shape[i].y + (noise(2 + 1, i) > .5 ? -1 : 1) * ripple5)%h3;
            if (totalShapes.shape[i].curved) {
                pg.curveVertex(x, y);
            } else {
                pg.vertex(x, y);
            }
        }
        pg.endShape();
    } else {
        pg.beginShape(QUADS);
        for (let i = 0; i < totalShapes.shape.length; i++) {
            let x = (totalShapes.shape[i].x + (noise(1) > .5 ? -1 : 1) * ripple4)%w3;
            let y = (totalShapes.shape[i].y + (noise(2 + 1, i) > .5 ? -1 : 1) * ripple5)%h3;
            if (totalShapes.shape[i].curved) {
                pg.curveVertex(x, y);
            } else {
                pg.vertex(x, y);
            }
        }
        pg.endShape();
    }
    pg.pop();
}
function drawShapesToCanvas() {
    let fadeIn = ripple;
    let alpha = ripple;
    let tempDrawShapesWeight =  ripple-10;
    if(ripple>30){
        fadeIn = decPairs15[30] + 1;
        alpha = 255;
        tempDrawShapesWeight = drawShapesWeight + 1;
    }
    tempScale = .99;
    for (let j = 0; j < fadeIn; j++) {
        push();
        if (j === 0) {
            noStroke();
            fill(clearC2);
        } else {
            let strokeColor = lerpColor(color(features.colorWay2[j % (features.colorWay2.length)]),color1, j / fadeIn);
            strokeColor.setAlpha(alpha);
            stroke(strokeColor);
            strokeWeight(j % tempDrawShapesWeight);
            noFill();
            scale(tempScale);
            tempScale -= scaler;
        }
        for (let i = 0; i < shapes.length; i++) {
            if(ripple<30) {
                fill(shapes[i].fill);
            }
            if (shapes[i].type === 3) {
                ellipse((shapes[i].shape[0].x + (noise(1, i) > .5 ? -1 : 1) * ripple2) % w3,
                    (shapes[i].shape[1].y + (noise(2, i) > .5 ? -1 : 1) * ripple3) % h3,
                    width/decPairs10[20],
                    width/decPairs10[20]);
            } else {
                if (noise(i + 7) > .2) {
                    beginShape(features.shapesType === 1 ? QUADS : features.shapesType === 2 ? TRIANGLES : features.shapesType === 3 ? LINES : null);
                } else {
                    beginShape(POINTS);
                }
                for (let k = 0; k < shapes[i].shape.length; k++) {
                    let x = (shapes[i].shape[k].x + (noise(k) > .5 ? -1 : 1) * ripple4)%w3;
                    let y = (shapes[i].shape[k].y + (noise(k + 1, i) > .5 ? -1 : 1) * ripple5)%h3;
                    if (shapes[i].shape[k].curved) {
                        curveVertex(x, y);
                    } else {
                        vertex(x, y);
                    }
                }
                endShape();
            }
        }
        pop();
    }
}
function createShapes() {
    let firstVertex = null;
    let shape = {shape: [], type: 1};
    let clearC3 = color(features.colorWay2[(parseInt((decPairs[29]+1)%features.colorWay2.length))]);
    clearC3.setAlpha(1);
    totalShapes.type =  noise(56) > .9 ? 3 : noise(56) > .6 ? 2 : 1;
    shape.type = noise(56) > .7 ? 2 : noise(56) > .5 ? 3 : 1;
    shape.fill = noise(80) <= .6 ? clearC : clearC3;
    let vertexCount = 0;
    let upperLimit = (decPairs.length / decPairs4[9]);
    let maxShapes = (decPairs30[10]);
    if(noise(23) > .9) {
        maxShapes = decPairs100[10];
    }
    for (let i = 0; i < maxShapes; i++) {
        if (i === upperLimit - 1 && vertexCount === 0) {
            break;
        }
        if (firstVertex === null) {
            firstVertex = {
                x: (points[(int)((points.length - 1) * noise(i))].x),
                y: (points[(int)((points.length - 1) * noise(i, i))].y)
            };
            shape.shape.push(firstVertex);
        }
        if (decPairs4[8] === 3) {
            shape.shape.push({
                x: (points[(int)((points.length - 1) * noise(i))].x),
                y: (points[(int)((points.length - 1) * noise(i))].y), curved: false
            });
            totalShapes.shape.push({
                x: (points[(int)((points.length - 1) * noise(i))].x),
                y: (points[(int)((points.length - 1) * noise(i))].y), curved: false
            });
        } else if (decPairs4[8] === 2) {
            shape.shape.push({
                x: (points[(int)((points.length - 1) * noise(i))].x),
                y: (points[(int)((points.length - 1) * noise(i, i))].y), curved: true
            });
            totalShapes.shape.push({
                x: (points[(int)((points.length - 1) * noise(i))].x),
                y: (points[(int)((points.length - 1) * noise(i))].y), curved: true
            });
        } else {
            if (decPairs2[i] === 2) {
                shape.shape.push({
                    x: (points[(int)((points.length - 1) * noise(i))].x),
                    y: (points[(int)((points.length - 1) * noise(i))].y), curved: false
                });
                totalShapes.shape.push({
                    x: (points[(int)((points.length - 1) * noise(i))].x),
                    y: (points[(int)((points.length - 1) * noise(i))].y), curved: false
                });
            } else {
                shape.shape.push({
                    x: (points[(int)((points.length - 1) * noise(i))].x),
                    y: (points[(int)((points.length - 1) * noise(i, i))].y), curved: true
                });
                totalShapes.shape.push({
                    x: (points[(int)((points.length - 1) * noise(i))].x),
                    y: (points[(int)((points.length - 1) * noise(i))].y), curved: true
                });
            }
        }
        vertexCount++;

        if (noise(i + 3) > .5 && vertexCount > 2) {
            if (noise(60 + i) > .5) {
                shape.shape.push({x: firstVertex.x, y: firstVertex.y, curved: false});
            } else {
                shape.shape.push({x: firstVertex.x, y: firstVertex.y, curved: true});
            }
            firstVertex = null;
            shapes.push(shape);
            vertexCount = 0;
            shape = {shape: [], type: 1};
            shape.fill = noise(80 + shapes.length) <= .6 ? clearC : clearC3;
            shape.type = noise(56 + shapes.length) > .7 ? 2 : noise(56 + shapes.length) > .5 ? 3 : 1;
        }
    }
    for(let j = 1; j <= (4+decPairs10[15]); j++) {
        totalShapes.shape.push({
            x: (points[(int)((points.length - 1) * noise(10*j))].x),
            y: (points[(int)((points.length - 1) * noise(10*j))].y), curved: noise(j)>.6
        });
    }

    if (vertexCount > 0) {
        if (noise(60) > .5) {
            shape.shape.push({x: firstVertex.x, y: firstVertex.y, curved: false});
        } else {
            shape.shape.push({x: firstVertex.x, y: firstVertex.y, curved: false});
        }
    }
}
function incrementDelay() {
    if (delayTopBottomLowerLimit > 0) {
        delayTopBottomLowerLimit -= delayTopBottomLowerLimitI;
    } else {
        tblDone = true;
    }
    if (delayTopBottomUpperLimit > 0) {
        delayTopBottomUpperLimit -= delayTopBottomUpperLimitI;
    } else {
        tbuDone = true;
    }
    if (delayLeftRightLowerLimit > 0) {
        delayLeftRightLowerLimit -= delayLeftRightLowerLimitI;
    } else {
        lrlDone = true;
    }

    if(lrlDone&&tbuDone&&tblDone) {
        drawSlide = function() {};
    }
}
function incrementDelay2() {
    if (n3 > l3) {
        l3 += l3I;
    } else {
        hideCurtain = true;
    }
    if(hideCurtain) {
        drawSlide = function() {};
    }
}

function getAttributes() {
    window.$fxhashFeatures.Filter = features.filtered ? features.filterAmount : 0;
    if (features.flat) {
        window.$fxhashFeatures.Style = "Flat";
    }
    if (features.trompe_loiel) {
        window.$fxhashFeatures.Style = "Trompe L'oiel";
    }
    window.$fxhashFeatures.Color1 = features.colorWay[0];
    window.$fxhashFeatures.Color2 = features.colorWay[1];
    window.$fxhashFeatures.Color3 = features.colorWay[2];

    if (features.solidBackground) {
        window.$fxhashFeatures.Background_Color = features.colorWay[3];
    } else {
        window.$fxhashFeatures.Background_Color = "Gradient Background";
    }

    window.$fxhashFeatures.Matter = features.matter;
    window.$fxhashFeatures.Num_Shapes= shapes.length;
    window.$fxhashFeatures.Offset_Left= features.filtered ? Math.ceil(offsetLeft) : 0;
    window.$fxhashFeatures.Has_Offset_Left= features.filtered ? window.$fxhashFeatures.Offset_Left !== 0 : false;
    window.$fxhashFeatures.Offset_Right= features.filtered ? Math.ceil(offsetRight) : 0;
    window.$fxhashFeatures.Has_Offset_Right= features.filtered ? window.$fxhashFeatures.Offset_Right !== 0 : false;
    window.$fxhashFeatures.Curve_Radius_Left = features.filtered ? Math.ceil(curveRadiusLeft) : 0;
    window.$fxhashFeatures.Has_Curve_Radius_Left = features.filtered ? window.$fxhashFeatures.Curve_Radius_Left !== 0 : false;
    window.$fxhashFeatures.Curve_Radius_Right= features.filtered ? Math.ceil(curveRadiusRight) : 0;
    window.$fxhashFeatures.Has_Curve_Radius_Right= features.filtered ? window.$fxhashFeatures.Curve_Radius_Right !== 0 : false;
    window.$fxhashFeatures.Curve_Radius_Top= features.filtered ? Math.ceil(curveRadiusTop) : 0;
    window.$fxhashFeatures.Has_Curve_Radius_Top= features.filtered ? window.$fxhashFeatures.Curve_Radius_Top !== 0 : false;
    window.$fxhashFeatures.Curve_Radius_Bottom = features.filtered ? Math.ceil(curveRadiusBottom) : 0;
    window.$fxhashFeatures.Has_Curve_Radius_Bottom= features.filtered ? window.$fxhashFeatures.Curve_Radius_Bottom !== 0 : false;
    if(features.filtered && curveRadiusLeft > 0) {
        window.$fxhashFeatures.Curve_Function_Left=features.curveFunctionLeft;
    }
    if(features.filtered && curveRadiusRight > 0) {
        window.$fxhashFeatures.Curve_Function_Right=features.curveFunctionRight;
    }
    if(features.filtered && curveRadiusBottom > 0) {
        window.$fxhashFeatures.Curve_Function_Bottom=features.curveFunctionBottom;
    }
    if(features.filtered && curveRadiusTop > 0) {
        window.$fxhashFeatures.Curve_Function_Top=features.curveFunctionTop;
    }
    window.$fxhashFeatures.Curve_Function_Left=features.filtered && curveRadiusBottom ? features.curveFunctionLeft : 0;
    window.$fxhashFeatures.Cut_Left=features.filtered ? Math.ceil(cutLeft) : 0;
    window.$fxhashFeatures.Has_Cut_Left=features.filtered ?  window.$fxhashFeatures.Cut_Left !== 0 : false;
    window.$fxhashFeatures.Cut_Right =features.filtered ? Math.ceil(cutRight) : 0;
    window.$fxhashFeatures.Has_Cut_Right =features.filtered ? window.$fxhashFeatures.Cut_Right !== 0 : false;
    window.$fxhashFeatures.Cut_Top=features.filtered ? Math.ceil(cutTop) : 0;
    window.$fxhashFeatures.Has_Cut_Top=features.filtered ? window.$fxhashFeatures.Cut_Top !== 0 : false;
    window.$fxhashFeatures.Cut_Bottom=features.filtered ? Math.ceil(cutBottom) : 0;
    window.$fxhashFeatures.Has_Cut_Bottom=features.filtered ?  window.$fxhashFeatures.Cut_Bottom !== 0 : false;
    
    if (features.flippedX) {
        window.$fxhashFeatures.X_Axis_Reflection = true;
    }
    if (features.flippedY) {
        window.$fxhashFeatures.Y_Axis_Reflection = true;
    }
    if (shapes.length > 0) {
        window.$fxhashFeatures.Points_Across=getAttributeName(features.pointsAcross, 0, 50, 150, 200);
        window.$fxhashFeatures.Points_Down=getAttributeName(features.pointsDown, 0, 50, 150, 200);
    }
    window.$fxhashFeatures.Gradient_Direction=gradientDirection === horizontalGradient ? "Horizontal" : "Vertical";
    if (features.trompe_loiel) {
        window.$fxhashFeatures.Block_Height=features.blockHeightL ? "Large" : features.blockHeightM ? "Medium" : features.blockHeightS ? "Small" : features.blockHeightXL ? "Xtra Large" : "Medium";
    }
    window.$fxhashFeatures.Repetitions_Horizontal=features.xPacking;
    window.$fxhashFeatures.Repetitions_Vertical=features.yPacking;
    if (leftCircle && features.filtered) {
        window.$fxhashFeatures.Left_Circle = true;
    }
    if (rightCircle && features.filtered) {
        window.$fxhashFeatures.Right_Circle = true;
    }
    if ((leftCircle || rightCircle) && features.wiggling) {
        window.$fxhashFeatures.Wiggling = true;
    }
    if(!features.filtered && features.masked) {
        window.$fxhashFeatures.Masked = true;
    }
    window.$fxhashFeatures.DefaultFrameRate = Math.floor(myFrameRate);
    return window.$fxhashFeatures;
}

function getAttributeName(val,s,m,l, xl) {
    if(val > xl) {
        return "XLarge";
    }
    if(val > l) {
        return "Large";
    }
    if(val > m) {
        return "Medium";
    }
    if(val > s) {
        return "Small";
    }
    return "None";
}
//#endregion