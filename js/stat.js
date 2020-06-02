'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_Y = CLOUD_HEIGHT - 2 * GAP;
var COLUMN_Y = TEXT_Y - GAP;
var MARGIN_TOP = 80;
var COLUMN_GAP = 50;
var COLUMN_WIDTH = 40;
var FONT_GAP = 16;
var COLUMN_HEIGHT = -(CLOUD_HEIGHT - MARGIN_TOP - GAP - FONT_GAP - GAP);

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderBar = function (ctx, player, time, maxTime, i) {
  var color = player === 'Вы'
    ? 'rgba(255, 0, 0, 1)'
    : 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
  var x = CLOUD_X + COLUMN_WIDTH * i + COLUMN_GAP * (i + 1);
  var height = (COLUMN_HEIGHT * time) / maxTime;
  ctx.fillStyle = '#000';
  ctx.fillText(player, x, TEXT_Y);
  ctx.fillText(Math.round(time).toString(), x, COLUMN_Y + height - FONT_GAP);
  ctx.fillStyle = color;
  ctx.fillRect(x, COLUMN_Y, COLUMN_WIDTH, height);
};


window.renderStatistics = function (ctx, players, times) {
  var maxTime = getMaxElement(times);
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2 + FONT_GAP);

  for (var i = 0; i < players.length; i++) {
    renderBar(ctx, players[i], times[i], maxTime, i);
  }
};
