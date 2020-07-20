'use strict';

(function () {
  var setup = document.querySelector('.setup');
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
