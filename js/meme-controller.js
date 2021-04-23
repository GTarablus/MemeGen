'use strict';

var gCanvas;
var gCtx;

function init() {
  gCanvas = document.getElementById('meme-canvas');
  gCtx = gCanvas.getContext('2d');
  renderImgs(gImgs);
  getImgs();
  // resizeCanvas();
}
/********* Canvas functions *********/

function clearCanvas() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function drawImg() {
  var img = new Image();
  var meme = getMeme();
  img.src = getImg(meme.selectedImgId).url;
  clearPositions();
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    meme.lines.forEach(function (line) {
      drawText(line, line.positionX, line.positionY);
      if (line.textFocus) {
        highlighText(gTextFocus);
      }
    });
    if (meme.isStickerPlaced) {
      meme.stickers.forEach(function (sticker) {
        if (sticker) drawSticker(sticker);
      });
    }
  };
}

function drawSticker(sticker) {
  var img = new Image();
  img.src = sticker.url;
  img.onload = () => {
    gCtx.drawImage(
      img,
      sticker.positionX,
      sticker.positionY,
      sticker.size,
      sticker.size
    );
  };
}

function drawText(lines, x, y) {
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = lines.stroke;
  gCtx.fillStyle = lines.color;
  gCtx.font = `${lines.size}px ${lines.font}`;
  gCtx.textAlign = lines.align;
  var textPos = {
    width: gCtx.measureText(lines.txt).width,
    x: lines.positionX,
    y: lines.positionY,
  };
  gTextPositions.push(textPos);
  gCtx.fillText(lines.txt, x, y);
  gCtx.strokeText(lines.txt, x, y);
}

function canvasClicked(ev) {
  const offsetX = ev.offsetX;
  const offsetY = ev.offsetY;
  findText(offsetX, offsetY);
}

function drawTextBox(x, y, textWidth, height) {
  gCtx.beginPath();
  gCtx.rect(x, y, height, textWidth);
  gCtx.fillStyle = 'rgba(255, 255, 255, 0)';
  gCtx.fillRect(x, y, height, textWidth);
  gCtx.strokeStyle = 'red';
  gCtx.stroke();
}
function highlighText(textNum) {
  if (textNum === -1) return;
  var width = gTextPositions[textNum].width + 5;
  var x = gMeme.lines[textNum].positionX - width / 2;
  if (gMeme.lines[textNum].size > 50)
    var y = gMeme.lines[textNum].positionY - 50;
  else var y = gMeme.lines[textNum].positionY - 40;
  if (gMeme.lines[textNum].size > 50)
    var height = gMeme.lines[textNum].size + 10;
  else var height = gMeme.lines[textNum].size + 5;
  drawTextBox(x, y, height, width);
}

function removeHighlight() {
  gMeme.lines[gTextFocus].textFocus = false;
  drawImg();
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
  renderStickers();
  var modal = document.querySelector('#modal');
  modal.style.display = 'flex';
  var elGallery = document.querySelector('.gallery-container');
  elGallery.style.display = 'none';
  drawImg();
}

function getStickerArray() {
  var stickers = setStickers();
  return stickers;
}

function renderStickers() {
  var stickers = getStickerArray();
  var strHTML = stickers
    .map(function (sticker) {
      return `<img
    src="${sticker.url}"
    data-id="${sticker.id}"
    class="gallery-sticker"
    onclick="getStickerId(this)"
    />`;
    })
    .join('');
  var elGallery = document.querySelector('.sticker-gallery');
  elGallery.innerHTML = strHTML;
}

function getStickerId(elSticker) {
  var stickerId = +elSticker.dataset.id;
  var sticker = setSticker(stickerId);
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
  gMeme.lines[gTextFocus].textFocus = false;
  var lineNum = setFocus();
  gMeme.lines[lineNum].textFocus = true;
  var elFontSize = document.querySelector('.font-size');
  elFontSize.value = gMeme.lines[gTextFocus].size;
  cleanText();
  drawImg();
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

function onDownloadCanvas(elLink) {
  gMeme.lines[gTextFocus].textFocus = false;
  drawImg();
  downloadCanvas(elLink);
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
  findText(250, 250);
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

function clearPositions() {
  gTextPositions = [];
}
