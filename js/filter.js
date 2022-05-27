// фильтрация жилья по типу
const filterByHousingType = (ads, housingType) => {
  if (housingType === 'any') {
    return ads;
  }
  const filteredByTypeAds = ads.filter(ad => ad.offer.type === housingType);
  return filteredByTypeAds;
}
// фильтрация жилья по фичам
const filterByHousingFeatures = (ads, housingFeatures) => {
  if (housingFeatures.length === 0) {
    return ads;
  }
  const filteredByFeaturesAds = ads.filter(ad => ad.offer.features.filter(f => housingFeatures.includes(f)).length === housingFeatures.length)
  return filteredByFeaturesAds;
}

// фильтрация жилья по цене
const filterByHousingPrice = (ads, housingPrice) => {
  switch (housingPrice) {
    case 'any': {
      return ads;
    }
    case 'low': {
      return ads.filter(ad => ad.offer.price < 10000);
    }
    case 'middle': {
      return ads.filter(ad => ad.offer.price >= 10000 && ad.offer.price < 50000);
    }
    case 'high': {
      return ads.filter(ad => ad.offer.price > 50000);
    }
  }
}

// фильтрация жилья по количеству комнат
const filterByHousingRooms = (ads, housingRooms) => {
  if (housingRooms === 'any') {
    return ads;
  }
  const filteredByTypeAds = ads.filter(ad => String(ad.offer.rooms) === housingRooms);
  return filteredByTypeAds;
}

// фильтрация жилья по количеству гостей
const filterByHousingGuests = (ads, housingGuests) => {
  if (housingGuests === 'any') {
    return ads;
  }
  const filteredByGuestsAds = ads.filter(ad => String(ad.offer.guests) === housingGuests);
  return filteredByGuestsAds;
}

export { filterByHousingType, filterByHousingRooms, filterByHousingGuests, filterByHousingPrice, filterByHousingFeatures };
