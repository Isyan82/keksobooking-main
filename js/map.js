/* global _:readonly */
/* global L:readonly */
import { createCustomPopup } from './popup.js';
import { enableForms, disableForms } from './form.js'

disableForms();
const RERENDER_DELAY = 500;
const precisionFloat = 5;

// дефолтные координаты красной метки
const initLatLng = {
  lat: 35.68361,
  lng: 139.75363,
};


// создание карты
const map = L.map('map-canvas')
  .on('load', () => {
    enableForms();
  })
  .setView(initLatLng, 9);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const inputAdress = document.querySelector('#address')
// создание красной иконки
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
// создание красной метки
const mainPinMarker = L.marker(
  initLatLng,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

// функция создания красной метки
const createMainPin = () => {
  mainPinMarker.addTo(map);
  // вставка дефолтных координат в поле адреса
  inputAdress.value = `${(mainPinMarker._latlng.lat).toFixed(precisionFloat)}, ${(mainPinMarker._latlng.lng).toFixed(precisionFloat)}`;
  //вставка координат после перемещения метки в поле адреса
  mainPinMarker.on('moveend', (evt) => {
    const latlng = evt.target.getLatLng();
    inputAdress.value = `${(latlng.lat).toFixed(precisionFloat)}, ${(latlng.lng).toFixed(precisionFloat)}`;
  });
};


// создание синих меток
const markers = [];
const createMarkers = (points) => {
  points.forEach((point) => {
    const { location } = point;
    const lat = location.lat;
    const lng = location.lng;

    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );
    markers.push(marker);
    marker
      .addTo(map)
      .bindPopup(
        () => createCustomPopup(point),
        {
          keepInView: true,
        },
      );
  });
};


const createMap = (ads) => {
  createMainPin()
  createMarkers(ads)
};


// дебаунс
const reInit = _.debounce((ads) => {
  markers.forEach((marker) => marker.remove())
  createMarkers(ads)
}, RERENDER_DELAY);



export { createMap, createMainPin, reInit, inputAdress, initLatLng, mainPinMarker, map }
