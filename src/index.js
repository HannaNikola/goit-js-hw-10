import axios from 'axios';
import NewsApiService from './cat-api';

const selectorType = document.querySelector('.breed-select');
const loaderElement = document.querySelector('.loader');
const ErrorElement = document.querySelector('.error');
const infoBoxe = document.querySelector('.cat-info');

console.log(selectorType);
console.log(loaderElement);
console.log(ErrorElement);
console.log(infoBoxe);

function fetchBreeds() {
    const params = new URLSearchParams({
        api_key:
            'live_gXfdXzaFDcewDJeq5HVifu2LVbBRmWM5pCaSZvmHUfx80lvNoLZkqGvP1sdopeeW',
    });

    return fetch(
        `https://api.thecatapi.com/v1/breeds?x-api-key=live_gXfdXzaFDcewDJeq5HVifu2LVbBRmWM5pCaSZvmHUfx80lvNoLZkqGvP1sdopeeW`
    ).then(resp => {
        if (!resp.ok) {
            throw new Error('Error');
        }
        return resp.json();
    });
}

fetchBreeds()
    .then(data => {
        // console.log(data);

        
        selectorType.insertAdjacentHTML('beforeend',createSelectBread(data));
    })
    .catch(err => {});


function createSelectBread(arr) {
    return arr
        .map(({ id,name }) =>  `<option value="${id}">${name}</option>`).join(" ");

}
    



function fetchCatByBreed(breedId) {
    
    const apiKey = 'live_gXfdXzaFDcewDJeq5HVifu2LVbBRmWM5pCaSZvmHUfx80lvNoLZkqGvP1sdopeeW'
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&x-api-key=${apiKey}`


    return fetch(url).then(resp => {
       
        if (!resp.ok) {
            throw new Error('Erorr');
        }
        return resp.json();
        
    });

}

fetchCatByBreed().then(
    data => {
console.log(data)
        
    }
)



selectorType.addEventListener('change', (event) => {
    
}
)