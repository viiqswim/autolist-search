const axios = require("axios");

const searchCars = function (pageNumber) {
  const url = `https://autolist-test.herokuapp.com/search?page=${pageNumber}`;

  return axios.get(url)
    .then(function (response) {
      return response.data.records;
    })
    .catch(function (error) {
      console.error(error);
    });
};

const carSearchApi = {
  searchCars
};

export default carSearchApi;
