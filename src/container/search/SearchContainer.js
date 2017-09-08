import React from 'react';
import PropTypes from 'prop-types';
import SearchResults from './../../components/search/SearchResults';
import carSearchApi from './../../requests/carSearchApi';

class SearchContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onPageChange = this.onPageChange.bind(this);

        const activePage = 1;
        const params = this.props.match.params;

        this.state = {
            activePage,
            searchQuery: params.query,
            carsPerPage: 20,
            totalCars: 400,
            cars: []
        };
    }

    componentDidMount() {
        carSearchApi.searchCars(this.state.activePage).then((cars) => {
            this.setState({ cars });
        });
    }

    onPageChange(activePage) {
        this.setState({ activePage });
    }

    render() {
        return (
            <div>
                {this.state.cars &&
                    <SearchResults
                        activePage={this.state.activePage}
                        cars={this.state.cars}
                        carsPerPage={this.state.carsPerPage}
                        totalCars={this.state.totalCars}
                        onPageChange={this.onPageChange}
                    />
                }
            </div>
        );
    }
}

SearchContainer.propTypes = {
    match: PropTypes.object.isRequired
};

export default SearchContainer;
