import './css/styles.css';
import { debounce } from 'lodash';
import { Notify } from 'notiflix';
import CountriesArrayMaker from './js/rest-countries';
import countryListMarkup from './templates/country-list.handlebars';
import singleCountryMarkup from './templates/single-country.handlebars';

const DEBOUNCE_DELAY = 300;

const countriesInputRef = document.querySelector('#search-box');
const countriesListRef = document.querySelector('.country-list');
const singleCountryBoxRef = document.querySelector('.country-info');

const restCountries = new CountriesArrayMaker();

countriesInputRef.addEventListener('input', debounce(updateCountryValue, DEBOUNCE_DELAY));

function updateCountryValue(e) {
  clearMarkup([countriesListRef, singleCountryBoxRef]);
  const trimmedInputValue = e.target.value.trim();

  if (trimmedInputValue.length === 0) {
    return;
  }

  restCountries.country = trimmedInputValue;
  restCountries.fetchCountry(updateInterface);
}

function updateInterface(countriesArray) {
  if (countriesArray.length > 10) {
    Notify.info('Please less countries too much matches');
  } else if (countriesArray.length === 1) {
    createMarkup(singleCountryBoxRef, singleCountryMarkup(countriesArray));
  } else {
    createMarkup(countriesListRef, countryListMarkup(countriesArray));
  }
}

function clearMarkup(layout) {
  layout.forEach(e => {
    e.innerHTML = '';
  });
}

function createMarkup(layout, markup) {
  layout.insertAdjacentHTML('beforeend', markup);
}