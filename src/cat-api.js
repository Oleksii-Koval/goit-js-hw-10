import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_H7qEnr3v7Jq3avnG9nCckyGMlnZtD8qhaCz4349VqZwpsj6iKnPMykWiWwzU44LN";
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios
  .get('/breeds')
  .then(response => {
    return response.data
  })
  
};

export function fetchCatByBreed(breedId) {
  return axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data
    }) 
  
}

