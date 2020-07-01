'use strict';

(function () {
  var wizardCoatColor = document.querySelector('.wizard-coat');
  var wizardEyesColor = document.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES__COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var coatColorInput = document.querySelector('input[name="coat-color"]');
  var eyesColorInput = document.querySelector('input[name="eyes-color"]');
  var fireballColorInput = document.querySelector('input[name="fireball-color"]');
  var setup = document.querySelector('.setup');
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var generateWizard = function () {
    var wizard = {
      name: WIZARD_NAMES[window.util.getRandomNumber(WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[window.util.getRandomNumber(WIZARD_SURNAMES.length)],
      coatColor: COAT_COLOR[window.util.getRandomNumber(COAT_COLOR.length)],
      eyesColor: EYES__COLOR[window.util.getRandomNumber(EYES__COLOR.length)],
    };
    return wizard;
  };

  var generateWizards = function () {
    var arr = [];
    for (var i = 0; i < 4; i++) {
      arr[i] = generateWizard();
    }
    return arr;
  };

  var wizards = generateWizards();

  var renderWizard = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardCoatColor.style.fill = wizard.coatColor;
    wizardEyesColor.style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);

  window.colorize(wizardCoatColor, COAT_COLOR, coatColorInput);
  window.colorize(wizardEyesColor, EYES__COLOR, eyesColorInput);
  window.colorize(wizardFireball, FIREBALL_COLOR, fireballColorInput);

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  var userNameInput = document.querySelector('.setup-user-name');
  var setupButton = document.querySelector('.setup-submit');
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  setupButton.addEventListener('click', function (evt) {
    if (setup.classList.contains('hidden')) {
      evt.preventDefault();
    }
  });

  setupButton.addEventListener('keydown', function (evt) {
    if (setup.classList.contains('hidden') || evt.key !== 'Enter') {
      evt.preventDefault();
    }
  });

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  userNameInput.addEventListener('input', function () {
    var valueLength = userNameInput.value.length;
    if (valueLength < MIN_NAME_LENGTH) {
      userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_NAME_LENGTH) {
      userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
    } else {
      userNameInput.setCustomValidity('');
    }
  });
})();

