'use strict';
var gImgCount = 18;
var gKeywords = {};
var gImgs = getImgs();
var gTextFocus = 0;
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
      positionX: 250,
      positionY: 70,
    },
    {
      txt: 'line 2',
      size: 40,
      align: 'center',
      color: 'white',
      stroke: 'black',
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
  drawImg();
}

function setMeme(id) {
  gMeme.selectedImgId = +id;
  drawImg();
}

function setFontSize(value) {
  if (value > 128) return;
  gMeme.lines[gTextFocus].size = value;
}

function setFocus() {
  if (gTextFocus === 1) gTextFocus = 0;
  else gTextFocus = 1;
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
