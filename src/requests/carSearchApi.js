const axios = require("axios");

const searchCars = function (pageNumber) {
  const url = `https://autolist-test.herokuapp.com/search?page=${pageNumber}`;

  return axios.get(url)
    .then(function (response) {
      return JSON.parse(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const carSearchApi = {
  searchCars
};

export default carSearchApi;
