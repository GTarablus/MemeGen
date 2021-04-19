'use strict';
var gImgCount = 18;
var gKeywords = {};
var gImgs = getImgs();
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: '',
      size: 40,
      align: 'center',
      color: 'red',
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
  gMeme.lines[0].txt = txt;
  drawImg();
}

function setMeme(id) {
  gMeme.selectedImgId = +id;
  drawImg();
}
