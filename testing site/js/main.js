'use strict';

var stage = new Konva.Stage({
  container: 'canvas-container', // id of container <div>
  width: 500,
  height: 500,
});

var layer = new Konva.Layer();

var circle = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
  draggable: true,
});

// var imageObj = new Image();
// imageObj.src = '19.jpg';
// imageObj.onload = function () {
//   var yoda = new Konva.Image({
//     x: 50,
//     y: 50,
//     image: imageObj,
//     width: 500,
//     height: 500,
//     draggable: true,
//   });
//   layer.add(yoda);
// };
// layer.batchDraw();

var imageObj = new Image();

imageObj.onload = function () {
  rect1.fillPatternImage(imageObj);
};

imageObj.src = '19.jpg';

var rect1 = new Konva.Rect({
  x: 0,
  y: 0,
  width: 500,
  height: 500,
  //   stroke: 'black',
  //   strokeWidth: 4,
});
layer.add(rect1);
stage.add(layer);

// var fillPatternImage = rect1.fillPatternImage();
