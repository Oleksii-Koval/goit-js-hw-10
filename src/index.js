import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const refs = {
    selectEl: document.querySelector('.breed-select'),
    loaderEl: document.querySelector('.loader'),
    errorEl: document.querySelector('.error'),
    infoContainerEl: document.querySelector('.cat-info'),
};

refs.selectEl.classList.add('is-hidden');
refs.errorEl.classList.add('is-hidden');
refs.infoContainerEl.classList.replace('cat-info','is-hidden');

refs.selectEl.addEventListener('change', handlerSelect);

select()
function select() {
    fetchBreeds()
        .then(data => {
            refs.loaderEl.classList.replace('is-hidden', 'loader');

            let selectOption = data.map(({ name, id }) => {
                return `<option value='${id}'> ${name} </option>`
            });
            refs.selectEl.insertAdjacentHTML('beforeend', selectOption);
            new SlimSelect({
                select: refs.selectEl,
            })
        })
        .catch(onError)
        .finally(() => {
            refs.loaderEl.classList.replace('loader', 'is-hidden');
            refs.selectEl.classList.replace('is-hidden', 'breed-select');
        });
};

function handlerSelect(event) {
    const breedId = event.currentTarget.value;
    refs.loaderEl.classList.replace('is-hidden', 'loader');
    refs.infoContainerEl.classList.add('is-hidden');

    fetchCatByBreed(breedId)
        .then(data => {
            refs.infoContainerEl.classList.add('is-hidden');
            createMarkup(data)
        })
        .catch(onError)
        .finally(() => {
            refs.infoContainerEl.classList.remove('is-hidden');
            refs.loaderEl.classList.replace('loader', 'is-hidden');
        });
};

function createMarkup(data) {
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
};

function onError() {
    refs.loaderEl.classList.replace('loader', 'is-hidden');
    refs.selectEl.classList.replace('breed-select', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
        position: 'center-center',
        timeout: 10000,
        width: '400px',
        fontSize: '24px',
    })
};