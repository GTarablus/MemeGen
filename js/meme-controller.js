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
    gMeme.lines.forEach(function (line) {
      drawText(line, line.positionX, line.positionY);
    });
  };
}

function drawText(lines, x, y) {
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = lines.stroke;
  gCtx.fillStyle = lines.color;
  gCtx.font = `${lines.size}px ${lines.font}`;
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

function getImgId(elImg) {
  var imageId = elImg.dataset.id;
  setMeme(imageId);
  var modal = document.querySelector('#modal');
  modal.style.display = 'flex';
  var elGallery = document.querySelector('.gallery-container');
  elGallery.style.display = 'none';
  drawImg();
}

/********* Editor actions *********/

function getText(ev) {
  ev.stopPropagation();
  var elTxt = document.querySelector('input[name="edit-text"]');
  setText(elTxt.value);
  drawImg();
}
function cleanText() {
  var elTxt = document.querySelector('input[name="edit-text"]');
  elTxt.value = '';
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
  cleanText();
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
  var elModal = document.querySelector('#modal');
  elModal.style.display = 'none';
  var elGallery = document.querySelector('.gallery-container');
  elGallery.style.display = 'grid';
}

function downloadCanvas(elLink) {
  const data = gCanvas.toDataURL();
  elLink.href = data;
  elLink.download = 'GeneratedMeme';
}

function onDelete() {
  deleteLine();
  cleanText();
  drawImg();
}

function onAddLine() {
  addNewLine();
  cleanText();
  drawImg();
}

function onTextSubmit(ev) {
  ev.preventDefault();
  cleanText();
}

function onFontFamilyChange(el) {
  var font = el.value;
  setFontFamily(font);
  drawImg();
}

function onChangeAlign(align) {
  setTextAlign(align);
  drawImg();
}
