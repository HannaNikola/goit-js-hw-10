// import axios from 'axios';
import NewsApiService from './cat-api';
import SlimSelect from 'slim-select';



const selectorType = document.querySelector('.breed-select');
const loaderElement = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const infoBoxe = document.querySelector('.cat-info');

const searchOptions = {
  headers: {
    'x-api-key':
      'live_gXfdXzaFDcewDJeq5HVifu2LVbBRmWM5pCaSZvmHUfx80lvNoLZkqGvP1sdopeeW',
  },
};

function fetchBreeds() {
 return fetch(
    `https://api.thecatapi.com/v1/breeds?x-api-key=${searchOptions.headers}`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error('Error');
    }
    return resp.json();
  });
}

fetchBreeds()
  .then(data => {
   

    selectorType.insertAdjacentHTML('beforeend', createSelectBread(data));
  })
    .catch(ero => {
        loaderElement.style.display = 'block';
        errorElement.style.display = 'none';
  });

function createSelectBread(arr) {
return arr
    .map(
      ({ reference_image_id, name }) =>
        `<option value="${reference_image_id}">${name}</option>`
    )
    .join(' ');
}

// Другий запит

function fetchCatByBreed(breedId) {
 
  const url = `https://api.thecatapi.com/v1/images/${breedId}`;

  return fetch(url).then(resp => {
    if (!resp.ok) {
      throw new Error('Error');
    }
    return resp.json();
  });
}

selectorType.addEventListener('change', event => {
    loaderElement.style.display = 'block';
    errorElement.style.display = 'none';
  const selectedBreedId = event.target.value;
    fetchCatByBreed(selectedBreedId)
      
        .then(data => {
          infoBoxe.innerHTML = createCatInfo(data);
        })
        .catch(ero => {
          console.log('error');
          loaderElement.style.display = 'none';
          errorElement.style.display = 'block';
        });
});

function createCatInfo(data) {
  console.log(data);
  loaderElement.style.display = 'none';
  const markup = `<img src=${data.url} alt=cat width= ${
    data.width / 3
  } height= ${data.height / 3} >
   <h1>${data.breeds[0].name}</h1>
   <p>${data.breeds[0].description}</p>
   <p> <b>Temperament: </b>${data.breeds[0].temperament}</p>
  `;
  return markup;
}

