/* eslint-disable no-console */
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

const searchCarId = function (id, pageNumber) {
  const url = `https://autolist-test.herokuapp.com/search?page=${pageNumber}`;

  return axios.get(url)
    .then(function (response) {
      const cars = response.data.records;
      const car = searchCarPage(id, cars);

      if (car) {
        return car;
      }

      return searchCarId(id, pageNumber + 1);
    })
    .catch(function (error) {
      console.error(error);
    });
};

const searchCarPage = function (id, cars) {
  for (let i = 0; i < cars.length; i++) {
    const car = cars[i];
    if (car.id === Number(id) || car.vin === id) {
      return cars[i];
    }
  }
};

const carSearchApi = {
  searchCars,
  searchCarId
};

export default carSearchApi;
