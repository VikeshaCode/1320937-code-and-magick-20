'use strict';

(function () {
  window.backend = {
    // Загрузка данных на сервер
    save: function (data, onLoad) {
      var URL = 'https://javascript.pages.academy/code-and-magick';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });
      xhr.open('POST', URL);
      xhr.send(data);
    },
    // Получение данных с сервера
    load: function (onLoad, onError) {
      var URL = 'https://javascript.pages.academy/code-and-magick/data';
      var StatusCode = {
        OK: 200,
      };
      var TIMEOUT_IN_MS = 10000;

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', URL);

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('GET', URL);
      xhr.send();
    },
  };
})();
