import { inputAdress, initLatLng, mainPinMarker, map } from './map.js'
import { capacity, setValidation } from './validation.js'
import { isEscEvent } from './util.js'



/////////////////////////////////////////////
const typeOfAccommodation = document.querySelector('#type');
const priceInput = document.querySelector('#price');

const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');

const TIMES = ['12:00', '13:00', '14:00'];

const minPrice = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
};



// функция синхронизации полей /////
const changeFormElements = () => {
  // функция синхронизации поля ввода и красной метки
  inputAdress.addEventListener('input', () => {
    const inputLat = inputAdress.value.split('').slice(0, 8).join('');
    const inputLng = inputAdress.value.split('').reverse().slice(0, 9).reverse().join('');
    mainPinMarker.setLatLng({ lat: inputLat, lng: inputLng })
  });

  // синхронизация type и price
  typeOfAccommodation.onchange = function () {
    const price = minPrice[this.value];
    priceInput.setAttribute('min', price);

    // устанавливает плейсхолдер, а не значение
    priceInput.setAttribute('placeholder', price);
    if (priceInput.value) {
      priceInput.value = Math.max(price, parseFloat(priceInput.value));
    }
  };
  typeOfAccommodation.dispatchEvent(new Event('change'));

  // синхронизация полей въезда и выезда ////
  // функция синхронизации
  const synchronizeFields = (firstElement, secondElement, firstValue, secondValue, callback) => {
    const firstElementChangeHandler = () => {
      const newFirstValue = secondValue[firstValue.indexOf(firstElement.value)];
      callback(secondElement, newFirstValue)
    };
    firstElement.addEventListener('change', firstElementChangeHandler);

    const secondElementChangeHandler = () => {
      const newSecondValue = firstValue[secondValue.indexOf(secondElement.value)];
      callback(firstElement, newSecondValue)
    };
    secondElement.addEventListener('change', secondElementChangeHandler);
  };
  // колбэк синхронизации
  const syncValue = (element, value) => {
    element.value = value;
  };
  synchronizeFields(timeInElement, timeOutElement, TIMES, TIMES, syncValue);
};


// работа с картой
// скрываем элементы по дз
const mapFilters = document.querySelector('.map__filters');
const formElements = document.querySelector('.ad-form');
const disableForms = () => {
  mapFilters.classList.add('ad-form--disabled');
  mapFilters.querySelectorAll('select, input').forEach((it) => it.disabled = true);

  formElements.classList.add('ad-form--disabled');
  formElements.querySelectorAll('fieldset').forEach((it) => it.disabled = true);
};
const disableMapForms = () => {
  mapFilters.classList.add('ad-form--disabled');
  mapFilters.querySelectorAll('select, input').forEach((it) => it.disabled = true);
};

const enableForms = () => {
  mapFilters.classList.remove('ad-form--disabled');
  mapFilters.querySelectorAll('select, input').forEach((it) => it.disabled = false);

  formElements.classList.remove('ad-form--disabled');
  formElements.querySelectorAll('fieldset').forEach((it) => it.disabled = false);
};



//  отправка формы
const mainWindow = document.querySelector('main');
const resetButton = formElements.querySelector('.ad-form__reset');



// функция отправки формы
const formSubmit = () => {
  // окно успешной отправки формы
  const successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  successTemplate.classList.add('visually-hidden');
  successTemplate.style.zIndex = 1000;
  mainWindow.append(successTemplate);


  // окно неуспешной отправки формы
  const errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  errorTemplate.classList.add('visually-hidden');
  errorTemplate.style.zIndex = 1000;
  mainWindow.append(errorTemplate);


  // функция отправки формы
  formElements.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    fetch('https://22.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      })
      .then((response) => {
        if (response.ok === true) {
          // Объявление об успешной оправке формы
          successTemplate.classList.remove('visually-hidden');
          formElements.reset();
          capacity.options[2].selected = true;
          inputAdress.value = `${initLatLng.lat}, ${initLatLng.lng}`;
          priceInput.placeholder = '1000';
          avatarPreview.src = 'img/muffin-grey.svg';
          adFotoElement.src = ' ';
          mapFilters.reset();
          map.setView(initLatLng, 9);
          mainPinMarker.setLatLng(initLatLng);
        } else {
          // Объявление о неуспешной оправке формы
          errorTemplate.classList.remove('visually-hidden');
        }
      })
      .catch(() => {
        errorTemplate.classList.remove('visually-hidden');
      })
  });

  // функция нажатия по окну Window
  const onBodyClick = () => {
    successTemplate.classList.add('visually-hidden');
    errorTemplate.classList.add('visually-hidden');
  };


  // событие нажатия по окну Window
  mainWindow.addEventListener('click', onBodyClick)
  document.addEventListener('keydown', (evt) => {
    if (successTemplate.classList.contains('visually-hidden') === false
      || errorTemplate.classList.contains('visually-hidden') === false) {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        successTemplate.classList.add('visually-hidden');
        errorTemplate.classList.add('visually-hidden');
      }
    }
  });

  // обработка события кнопки "Очистить"
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    formElements.reset();
    setValidation();
    inputAdress.value = `${initLatLng.lat}, ${initLatLng.lng}`;
    priceInput.placeholder = '1000';
    avatarPreview.src = 'img/muffin-grey.svg';
    adFotoElement.src = ' ';
    mapFilters.reset();
    map.setView(initLatLng, 9);
    mainPinMarker.setLatLng(initLatLng);
  })

  // загрузка аватарки и фото объявления
  const avatarElement = document.querySelector('.ad-form-header__upload');
  const avatarLoadingField = avatarElement.querySelector('input');
  const avatarPreview = avatarElement.querySelector('img');

  const adFormPhotoElement = document.querySelector('.ad-form__photo-container');
  const adImgLoadingField = adFormPhotoElement.querySelector('input');
  const adFotoPreview = adFormPhotoElement.querySelector('.ad-form__photo');

  avatarLoadingField.addEventListener('change', function () {
    changeAvatar(this);
  });
  function changeAvatar(input) {
    let reader;
    if (input.files && input.files[0]) {
      reader = new FileReader();
      reader.onload = (evt) => {
        avatarPreview.setAttribute('src', evt.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  const adFotoElement = document.createElement('img');
  adFotoElement.setAttribute('width', 70);
  adFotoElement.setAttribute('height', 70);
  adFotoPreview.appendChild(adFotoElement);
  adFotoElement.src = ' ';

  adImgLoadingField.addEventListener('change', function () {
    changeAdImage(this);
  });

  function changeAdImage(input) {
    let reader;
    if (input.files && input.files[0]) {
      reader = new FileReader();
      reader.onload = function (evt) {
        adFotoElement.setAttribute('src', evt.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
};

export { changeFormElements, disableForms, disableMapForms, enableForms, formSubmit };
