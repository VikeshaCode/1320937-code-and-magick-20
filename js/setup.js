'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES__COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var userDialog = document.querySelector('.setup');
// userDialog.classList.remove('hidden');
var similarListElement = userDialog.querySelector('.setup-similar-list');

var wizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');


var getRandomNumber = function (maxNumber) {
  return Math.round(Math.random() * maxNumber);
};

var generateWizard = function () {
  var wizard = {
    name: WIZARD_NAMES[getRandomNumber(WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[getRandomNumber(WIZARD_SURNAMES.length)],
    coatColor: COAT_COLOR[getRandomNumber(COAT_COLOR.length)],
    eyesColor: EYES__COLOR[getRandomNumber(EYES__COLOR.length)],
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
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var userNameInput = document.querySelector('.setup-user-name');
var setupButton = document.querySelector('.setup-submit');
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

// Открывает и закрывает окно настройки персонажа
var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && userNameInput !== document.activeElement) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

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

// Валидирует ввод имени персонажа
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

// Изменяет цвета мантии, глаз и файерболов персонажа
var wizardCoatColor = document.querySelector('.wizard-coat');
var wizardEyesColor = document.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var coatColorInput = document.querySelector('input[name="coat-color"]');
var eyesColorInput = document.querySelector('input[name="eyes-color"]');
var fireballColorInput = document.querySelector('input[name="fireball-color"]');

var setWizardColor = function (element, colorArray, input) {
  element.addEventListener('click', function () {
    var colorRandom = colorArray[getRandomNumber(colorArray.length)];
    element.style.fill = colorRandom;
    input.value = colorRandom;
  });
};

setWizardColor(wizardCoatColor, COAT_COLOR, coatColorInput);
setWizardColor(wizardEyesColor, EYES__COLOR, eyesColorInput);

wizardFireball.addEventListener('click', function () {
  var colorRandom = FIREBALL_COLOR[getRandomNumber(FIREBALL_COLOR.length)];
  wizardFireball.style.backgroundColor = colorRandom;
  fireballColorInput.value = colorRandom;
});
