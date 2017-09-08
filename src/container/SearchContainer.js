import React from 'react';
import SearchResults from './../components/SearchResults';
import carSearchApi from './../requests/carSearchApi';

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);

    const pageNumber = 1;

    this.state = {
      cars: carSearchApi.searchCars(pageNumber)
    };
  }

  render() {
    return (
      <SearchResults />
    );
  }
}

export default SearchContainer;
