const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

const setValidation = () => {
  // добавление нужных атрибутов
  const adForm = document.querySelector('.ad-form');
  const features = adForm.querySelector('.features');

  adForm.action = 'https://22.javascript.pages.academy/keksobooking';
  adForm.querySelectorAll('input').forEach((it) => it.required = true)
  features.querySelectorAll('input').forEach((it) => it.required = false)

  // валидация title
  const title = adForm.querySelector('#title');
  title.setAttribute('minlength', '30');
  title.setAttribute('maxlength', '100');

  // поля адреса
  const inputAdress = adForm.querySelector('#address')
  inputAdress.setAttribute('maxlength', '20');

  // валидация цены
  const priceInput = adForm.querySelector('#price');
  priceInput.setAttribute('max', '1000000');

  // валидация rooms - capacity

  capacity.querySelectorAll('option').forEach((it) => it.disabled = true);
  capacity.options[2].disabled = false;
  capacity.options[2].selected = true;

  function roomsSincGuest(param1, param2) {
    const optionsMapping = {
      1: [1],
      2: [1, 2],
      3: [1, 2, 3],
      100: [0],
    };
    return function () {
      const value = +param1.value;
      const options = param2.options;
      const optionsLength = options.length;
      const availableOptions = optionsMapping[value];

      for (let i = 0; i < optionsLength; i++) {
        if (availableOptions.indexOf(+options[i].value) !== -1) {
          options[i].disabled = false;
          if (+options[i].value === value || availableOptions.length === 1) {
            options[i].selected = true;
          }
        } else {
          options[i].disabled = true;
        }
      }
    };
  }
  roomNumber.addEventListener('change', roomsSincGuest(roomNumber, capacity));
}

export { setValidation, capacity };
