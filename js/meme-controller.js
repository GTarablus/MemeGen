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
    drawText(
      gMeme.lines[0],
      gMeme.lines[0].positionX,
      gMeme.lines[0].positionY
    );
    drawText(
      gMeme.lines[1],
      gMeme.lines[1].positionX,
      gMeme.lines[1].positionY
    );
  };
}

function drawText(lines, x, y) {
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = lines.stroke;
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
}
function cleanText() {
  var elTxt = document.querySelector('input[name="edit-text"]');
  elTxt.value = '';
}

function getImgId(elImg) {
  var imageId = elImg.dataset.id;
  setMeme(imageId);
  var modal = document.querySelector('#modal');
  modal.style.display = 'flex';
}

function onUpdateFontSize(value) {
  var elFontSize = document.querySelector('.font-size');
  var newFontSize = +elFontSize.value + value;
  elFontSize.value = newFontSize;
  onFontChange();
}

function onSwitchFocus() {
  var lineNum = setFocus();
  var elTextBoxLabel = document.querySelector('.text-label');
  elTextBoxLabel.innerHTML = `Edit Text Line ${lineNum + 1}`;
  var elFontSize = document.querySelector('.font-size');
  elFontSize.value = gMeme.lines[gTextFocus].size;
}

function onChangeTextPos(value) {
  setTextPos(value);
  drawImg();
}

function onDefaultPos() {
  setDefaultLinePos();
  drawImg();
}

function onTextColorChange(el) {
  var color = el.value;
  setTextColor(color);
  drawImg();
}
function onTextOutlineChange(el) {
  var color = el.value;
  setOutlineColor(color);
  drawImg();
}

function onFontChange() {
  var elFontSize = document.querySelector('.font-size').value;
  setFontSize(elFontSize);
  drawImg();
}

function closeModal() {
  var modal = document.querySelector('#modal');
  modal.style.display = 'none';
}

function downloadCanvas(elLink) {
  const data = gCanvas.toDataURL();
  elLink.href = data;
  elLink.download = 'GeneratedMeme';
}
