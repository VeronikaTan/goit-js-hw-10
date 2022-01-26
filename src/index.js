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
