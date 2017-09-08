import React from 'react';
import PropTypes from 'prop-types';
import SearchResults from './../../components/search/SearchResults';
import carSearchApi from './../../requests/carSearchApi';

class SearchContainer extends React.Component {
    constructor(props) {
        super(props);

        const pageNumber = 1;
        const params = this.props.match.params;

        this.state = {
            pageNumber,
            searchQuery: params.query,
            cars: []
        };
    }

    componentDidMount() {
        carSearchApi.searchCars(this.state.pageNumber).then((cars) => {
            this.setState({ cars });
        });
    }

    render() {
        console.log(this.state.searchQuery);
        return (
            <div>
                {this.state.cars && <SearchResults cars={this.state.cars} />}
            </div>
        );
    }
}

SearchContainer.propTypes = {
    match: PropTypes.object.isRequired
};

export default SearchContainer;
