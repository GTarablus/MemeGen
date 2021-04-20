'use strict';

var gCanvas;
var gCtx;

function init() {
  gCanvas = document.getElementById('meme-canvas');
  gCtx = gCanvas.getContext('2d');
  renderImgs(gImgs);
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
    drawText(gMeme.lines[0], 250, 70);
    drawText(gMeme.lines[1], 250, 430);
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

function draw(ev) {
  const offsetX = ev.offsetX;
  const offsetY = ev.offsetY;
  console.log(`X = ${offsetX} Y= ${offsetY}`);
}

/********* DOM functions *********/

function renderImgs(imgs) {
  var strHTML = imgs
    .map(function (img) {
      return `<img
    src="img/${img.id}.jpg"
    data-id="${img.id}"
    class="gallery-img"
    onclick="getImgId(this)"
  />`;
    })
    .join('');
  var elGallery = document.querySelector('.gallery-container');
  elGallery.innerHTML = strHTML;
}

function getText(ev) {
  ev.stopPropagation();
  var elTxt = document.querySelector('input[name="edit-text"]');
  setText(elTxt.value);
  elTxt.value = '';
}

function getImgId(elImg) {
  var imageId = elImg.dataset.id;
  setMeme(imageId);
}

function onUpdateFontSize(value) {
  setFontSize(value);
  var elFontSize = document.querySelector('.font-size');
  elFontSize.innerHTML = gMeme.lines[gTextFocus].size;
  drawImg();
}

function switchFocus() {
  var lineNum = setFocus();
  var elTextBoxLabel = document.querySelector('.text-label');
  elTextBoxLabel.innerHTML = `Edit Text Line ${lineNum + 1}`;
  var elFontSize = document.querySelector('.font-size');
  elFontSize.innerHTML = gMeme.lines[gTextFocus].size;
}
