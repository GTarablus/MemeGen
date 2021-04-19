'use strict';

var gCanvas;
var gCtx;

function init() {
  gCanvas = document.getElementById('meme-canvas');
  gCtx = gCanvas.getContext('2d');
  getImgs();
  drawImg();
}
/********* Canvas functions *********/

function clearCanvas() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function drawImg() {
  var img = new Image();
  img.src = getImg(gMeme.selectedImgId).url;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawText(gMeme.lines[0], 200, 100);
  };
}

function drawText(lines, x, y) {
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = lines.color;
  gCtx.font = `${lines.size}px Impact`;
  gCtx.textAlign = lines.align;
  gCtx.fillText(lines.txt, x, y);
  gCtx.strokeText(lines.txt, x, y);
}

/********* DOM functions *********/
function getText(ev) {
  ev.stopPropagation();
  var elTxt = document.querySelector('input[name="edit-text"]');
  setText(elTxt.value);
}

function getImgId(elImg) {
  var imageId = elImg.dataset.id;
  setMeme(imageId);
}
