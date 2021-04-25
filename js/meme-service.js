'use strict';
var gImgCount = 20;
var gKeywords = {};
var gImgs = getImgs();
var gTextFocus = 0;
var gNumOfLines = 1;
var gTextPositions = [];
var gStickers = [];
var gStickerFocus = -1;
var gStickerCount = 38;
var gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  isStickerPlaced: false,
  stickers: [],
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
      textFocus: true,
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
      textFocus: false,
    },
  ],
};

function addNewLine() {
  var newLine = {
    txt: 'new line',
    size: 40,
    align: 'center',
    color: 'white',
    stroke: 'black',
    positionX: 250,
    positionY: 250,
    font: 'impact',
    textFocus: true,
  };
  gMeme.lines.push(newLine);
  gNumOfLines++;
}

function getMeme() {
  return gMeme;
}

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

function getStickers() {
  var stickerArray = [];
  for (var i = 0; i < gStickerCount; i++) {
    stickerArray[i] = {
      id: i,
      url: `img/stickers/${i}.png`,
    };
  }
  return stickerArray;
}

function setStickers(gStickers) {
  gStickers = getStickers();
  return gStickers;
}

function setSticker(id) {
  gMeme.isStickerPlaced = true;
  var sticker = {
    id,
    url: `img/stickers/${id}.png`,
    positionX: 250,
    positionY: 250,
    size: 100,
  };
  gMeme.stickers.push(sticker);
  gStickerFocus++;
}
function getSticker(id) {
  return gStickers[id];
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
  gMeme.lines[gTextFocus].size = +value;
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

function setFontFamily(font) {
  gMeme.lines[gTextFocus].font = font;
}

function setTextAlign(align) {
  gMeme.lines[gTextFocus].align = align;
}

function findText(x, y) {
  var clickedText = gTextPositions.findIndex(function (pos) {
    return (
      x > pos.x - pos.width / 2 &&
      x < pos.x + pos.width / 2 &&
      y > pos.y - 30 &&
      y < pos.y + 15
    );
  });
  gMeme.lines[gTextFocus].textFocus = false;
  gMeme.lines[clickedText].textFocus = true;
  gTextFocus = clickedText;
  drawImg();
}
