import React from 'react';
import SearchResults from './../../components/search/SearchResults';
import carSearchApi from './../../requests/carSearchApi';

class SearchContainer extends React.Component {
    constructor(props) {
        super(props);

        const pageNumber = 1;

        this.state = {
            pageNumber,
            cars: []
        };
    }

    componentDidMount() {
        carSearchApi.searchCars(this.state.pageNumber).then((cars) => {
            this.setState({ cars });
        });
    }

    render() {
        return (
            <div>
                {this.state.cars && <SearchResults cars={this.state.cars} />}
            </div>
        );
    }
}

export default SearchContainer;
