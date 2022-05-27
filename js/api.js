import { showAlert } from './util.js'
import {  createMainPin } from './map.js'
import { disableMapForms } from './form.js'


// функция получения данных с сервера
const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => {
      disableMapForms()
      showAlert('При загрузке данных с сервера произошла ошибка запроса')
      createMainPin()
    });
};

export { getData };
