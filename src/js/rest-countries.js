import { Notify } from 'notiflix';

const FAILURE_MESSAGE = 'Oops, there is no country with that name';

class CountriesArrayMaker {
  constructor() {
    this.chosenCountry = '';
  }

  fetchCountry(callback) {
    const url = `https://restcountries.com/v3.1/name/${this.chosenCountry}?fields=name,capital,population,flags,languages`;

    return fetch(url)
      .then(this.composeCountriesArray)
      .then(callback)
      .catch(() => {
        Notify.failure(FAILURE_MESSAGE);
      });
  }

  composeCountriesArray(response) {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  }

  set country(newCountry) {
    this.chosenCountry = newCountry;
  }

  get country() {
    return this.chosenCountry;
  }
}

export default CountriesArrayMaker;