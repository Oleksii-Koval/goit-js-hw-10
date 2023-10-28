import axios from "axios";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from "./cat-api"
axios.defaults.headers.common["x-api-key"] = "live_H7qEnr3v7Jq3avnG9nCckyGMlnZtD8qhaCz4349VqZwpsj6iKnPMykWiWwzU44LN";


const refs = {
    selectEl: document.querySelector('.breed-select'),
    loaderEl: document.querySelector('.loader'),
    errorEl: document.querySelector('.error'),
    infoContainerEl: document.querySelector('.cat-info'),
};

refs.selectEl.classList.add('is-hidden');
refs.errorEl.classList.add('is-hidden');
refs.infoContainerEl.classList.add('is-hidden');

refs.selectEl.addEventListener('change', handlerSelect);

let arrBreedsId = [];

fetchBreeds()
    .then(data => {
        refs.loaderEl.classList.replace('is-hidden', 'loader');

        data.forEach(breed => {
            arrBreedsId.push({ text: breed.name, value: breed.id });
        })
        new SlimSelect({
            select: refs.selectEl,
            data: arrBreedsId,
        })
        refs.loaderEl.classList.replace('loader', 'is-hidden');
        refs.selectEl.classList.replace('is-hidden', 'breed-select')
    })
    .catch(onError);
  
function handlerSelect(event) {
    const breedId = event.currentTarget.value;
    refs.loaderEl.classList.replace('is-hidden', 'loader');
    refs.infoContainerEl.classList.add('is-hidden');

    fetchCatByBreed(breedId)
        .then(data => {
            refs.infoContainerEl.classList.add('is-hidden');
    
            const breedImg = data[0].url;
            const breedDescription = data[0].breeds[0].description;
            const breedTemperament = data[0].breeds[0].temperament;
            const breedName = data[0].breeds[0].name;

            refs.infoContainerEl.innerHTML = `
            <img src="${breedImg}" alt="${breedName}" width="300px" class="cat-img"/>
             <div class="cat-text-info">
              <h2>${breedName}</h2>
              <p>${breedDescription}</p>
              <h3><span class="">Temperament: </span>${breedTemperament}</h3>
             </div >
            `;
            refs.infoContainerEl.classList.remove('is-hidden');
            refs.loaderEl.classList.replace('loader', 'is-hidden')
        })
        .catch(onError);
};

function onError(error) {
    refs.errorEl.classList.replace('is-hidden', 'error');
    refs.loaderEl.classList.replace('loader', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 10000,
        width: '400px',
        fontSize: '24px',
    });
};