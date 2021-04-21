'use strict';
var gImgCount = 18;
var gKeywords = {};
var gImgs = getImgs();
var gTextFocus = 0;
var gNumOfLines = 1;
var gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'line 1',
      size: 40,
      align: 'center',
      color: 'white',
      stroke: 'black',
      font: 'impact',
      positionX: 250,
      positionY: 70,
    },
    {
      txt: 'line 2',
      size: 40,
      align: 'center',
      color: 'white',
      stroke: 'black',
      font: 'impact',
      positionX: 250,
      positionY: 430,
    },
  ],
};
function getImgs() {
  var imageArray = [];
  for (var i = 0; i < gImgCount; i++) {
    imageArray[i] = {
      id: i,
      url: `img/${i}.jpg`,
    };
  }
  return imageArray;
}

function getImg(id) {
  return gImgs.find(function (img) {
    if (img === 'undefined') return false;
    return img.id === id;
  });
}

function setText(txt) {
  gMeme.lines[gTextFocus].txt = txt;
}

function setMeme(id) {
  gMeme.selectedImgId = +id;
}

function setFontSize(value) {
  if (value > 128) return;
  gMeme.lines[gTextFocus].size = value;
}

function setFocus() {
  if (gTextFocus >= gNumOfLines) gTextFocus = 0;
  else gTextFocus++;
  return gTextFocus;
}

function setTextPos(value) {
  gMeme.lines[gTextFocus].positionY += value;
}

function setDefaultLinePos() {
  if (!gTextFocus) gMeme.lines[0].positionY = 70;
  else gMeme.lines[1].positionY = 430;
}

function setTextColor(color) {
  gMeme.lines[gTextFocus].color = color;
}

function setOutlineColor(outline) {
  gMeme.lines[gTextFocus].stroke = outline;
}

function deleteLine() {
  gMeme.lines.splice(gTextFocus, 1);
  gNumOfLines--;
  setFocus();
}

function addNewLine() {
  var newLine = {
    txt: 'new line',
    size: 40,
    align: 'center',
    color: 'white',
    stroke: 'black',
    positionX: 250,
    positionY: 250,
  };
  gMeme.lines.push(newLine);
  gNumOfLines++;
}

function setFontFamily(font) {
  gMeme.lines[gTextFocus].font = font;
}

function setTextAlign(align) {
  gMeme.lines[gTextFocus].align = align;
}
