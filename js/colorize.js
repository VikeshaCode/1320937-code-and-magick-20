'use strict';
(function () {

  var getRandomColor = function (colors) {
    return colors[Math.floor(colors.length * Math.random())];
  };

  window.colorize = function (element, colors, input) {
    element.addEventListener('click', function () {
      var color = getRandomColor(colors);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
        input.value = color;
      } else {
        element.style.fill = color;
        input.value = color;
      }
    });
  };
})();
