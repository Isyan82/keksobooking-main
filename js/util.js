// // функция склонения окончаний
const declinationOfNum = (n, text_forms) => {
  n = Math.abs(n) % 100; const n1 = n % 10;
  if (n > 10 && n < 20) { return text_forms[2]; }
  if (n1 > 1 && n1 < 5) { return text_forms[1]; }
  if (n1 == 1) { return text_forms[0]; }
  return text_forms[2];
}

// окно с алертом об ошибке запроса с сервера
const showAlert = (message) => {
  const mainWindow = document.querySelector('main');
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.position = 'fixed';
  alertContainer.style.width = '400px';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.margin = 'auto';
  alertContainer.style.marginTop = '180px';
  alertContainer.style.border = '4px solid black';
  alertContainer.style.borderRadius = '10px';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '28px';
  alertContainer.style.color = 'white';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  mainWindow.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);

  mainWindow.addEventListener('click', () => {
    alertContainer.remove();
  })
};

// функция нажатия кнопки esc
const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};




export { declinationOfNum, showAlert, isEscEvent };
