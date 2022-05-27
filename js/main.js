
import { getData } from './api.js'
import { changeFormElements, formSubmit } from './form.js'
import { setValidation } from './validation.js'
import { createMap, reInit } from './map.js'
import { filterByHousingType, filterByHousingRooms, filterByHousingGuests, filterByHousingPrice, filterByHousingFeatures } from './filter.js'

const SIMILAR_ADS_COUNT = 10;




// фильтрации объявлений
const filtersFormElement = document.querySelector('.map__filters');
const housingPriceElement = filtersFormElement.querySelector('#housing-price');
const housingTypeElement = filtersFormElement.querySelector('#housing-type');
const housingRoomsElement = filtersFormElement.querySelector('#housing-rooms');
const housingGuestsElement = filtersFormElement.querySelector('#housing-guests');
const housingFeaturesElement = filtersFormElement.querySelector('#housing-features');
const housingFeaturesInputs = housingFeaturesElement.querySelectorAll('.map__checkbox');


getData((ads) => {
  createMap(ads);
  const applyAllFilters = () => {
    let filtered = filterByHousingFeatures(ads, Array.from(housingFeaturesInputs).filter(el => el.checked).map(el => el.value));
    filtered = filterByHousingType(filtered, housingTypeElement.value);
    filtered = filterByHousingPrice(filtered, housingPriceElement.value);
    filtered = filterByHousingRooms(filtered, housingRoomsElement.value);
    filtered = filterByHousingGuests(filtered, housingGuestsElement.value);
    reInit(filtered.slice(0, SIMILAR_ADS_COUNT))
  };
  housingFeaturesInputs.forEach(el => {
    el.addEventListener('change', () => {
      applyAllFilters();
    })
  });
  housingTypeElement.addEventListener('change', applyAllFilters);
  housingPriceElement.addEventListener('change', applyAllFilters);
  housingRoomsElement.addEventListener('change', applyAllFilters);
  housingGuestsElement.addEventListener('change', applyAllFilters);
});



changeFormElements();
formSubmit();
setValidation();





