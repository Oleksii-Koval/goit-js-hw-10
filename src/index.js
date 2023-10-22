import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api"
axios.defaults.headers.common["x-api-key"] = "live_H7qEnr3v7Jq3avnG9nCckyGMlnZtD8qhaCz4349VqZwpsj6iKnPMykWiWwzU44LN";


const refs = {
    selectEl: document.querySelector('.breed-select'),
    loaderEl: document.querySelector('.loader'),
    errorEl: document.querySelector('.error'),
    infoContainerEl: document.querySelector('.cat-info')
}

refs.selectEl.addEventListener('change', handlerSelect);

function handlerSelect(event) {
    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
        .then(data => {
            const breedImg = data[0].url;
            const breedDescription = data[0].breeds[0].description;
            const breedTemperament = data[0].breeds[0].temperament;
            const breedName = data[0].breeds[0].name;

            createMarkup(breedImg, breedDescription,breedTemperament, breedName)
        })
      
}

fetchBreeds()
    .then(data => {
        return data.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            refs.selectEl.append(option);
            // <option value=""></option>
        })
    })
    .catch((err) => console.log(err));

function createMarkup(breedImg, breedDescription,breedTemperament, breedName) {
    const catInformation = `<img src="${breedImg}" alt="${breedName}" width="200px" height="auto"/>
      <h2>${breedName}</h2>
      <p>${breedDescription}</p>
      <h3><span class="">Temperament: </span>${breedTemperament}</h3>`;
    refs.infoContainerEl.innerHTML = catInformation;
}