'use strict';
import { fetchCountry } from './js/fetchCountry.js'
import Notiflix from 'notiflix';
import './css/styles.css';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
let letterInput = null;
const ulList = document.querySelector('.country-list')




function textInputSearch(event) {
    letterInput = event.target.value;
    fetchCountry(letterInput)
        .then(response => {
            if (response.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            } else if (response.length <= 10 && response.length >= 2) {
                response.map(country => {
                    ulList.innerHTML = (`<li><img src= ${country.flag.svg} height ='50' width ='50'/>${country.name.common}</li>`);
                console.log(country.flag.svg)
                })

            } else {
                ulList.innerHTML = (`<li>${country.capital}</li><li> ${country.population}</li><li>${country.languages}</li>`);
            }
        })
            
        .catch(err => { console.log('шо-то не то') });
    
}

inputEl.addEventListener('input', debounce(textInputSearch, DEBOUNCE_DELAY));


'use strict';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import { DEBOUNCE_DELAY } from '../index.js';
import { debounce } from 'lodash';
import countryCardTemplate from '../templates/country-card.hbs';
import countryListTemplate from '../templates/country-list-item.hbs';

const inputValue = document.querySelector('#search-box');
const countryCardsWrapperEl = document.querySelector('.country-info');

const renderCountryCard = countryData => {
    countryCardsWrapperEl.innerHTML = countryCardTemplate(countryData[0]);
};
const renderCountryList = countryData => {
    countryCardsWrapperEl.innerHTML = countryListTemplate(countryData);
};

function onInput(event) {
    const country = event.target.value.trim();
    if (country) {
        fetchCountries(country)
            .then(selectRender)
            .catch(() => {
                Notify.failure("Oops, there is no country with that name");
                countryCardsWrapperEl.innerHTML = "";
            });
    }
    else {
        countryCardsWrapperEl.innerHTML = "";
    }
};
function selectRender(countryData) {
    if (countryData.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
    }
    else if (countryData.length >= 2) {
        renderCountryList(countryData);
    } else {
        renderCountryCard(countryData);
    }
}
inputValue.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));