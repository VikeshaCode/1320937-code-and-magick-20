'use strict';

(function () {
  var FIREBALL_COLOR = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'];

  var COAT_COLOR = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'];

  var EYES__COLOR = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'];

  var MAX_SIMILAR_WIZARD_COUNT = 4;
  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var wizardCoatColor = document.querySelector('.wizard-coat');
  var wizardEyesColor = document.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var coatColorInput = document.querySelector('input[name="coat-color"]');
  var eyesColorInput = document.querySelector('input[name="eyes-color"]');
  var fireballColorInput = document.querySelector('input[name="fireball-color"]');

  var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardCoatColor.style.fill = wizard.colorCoat;
    wizardEyesColor.style.fill = wizard.colorEyes;
    return wizardElement;
  };

  window.colorize(wizardCoatColor, COAT_COLOR, coatColorInput);
  window.colorize(wizardEyesColor, EYES__COLOR, eyesColorInput);
  window.colorize(wizardFireball, FIREBALL_COLOR, fireballColorInput);

  window.render = function (data) {
    var takeNumber = data.length > MAX_SIMILAR_WIZARD_COUNT ? MAX_SIMILAR_WIZARD_COUNT : data.length;
    similarListElement.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(renderWizard(data[i]));
    }
    similarListElement.classList.remove('hidden');
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };
})();
