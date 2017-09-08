import React from 'react';
import PropTypes from 'prop-types';
import SearchPagination from './../../components/search/SearchPagination';
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
            cars: [],
            allCars: {},
            searchedPages: []
        };
    }

    componentDidMount() {
        this.startSearch(this.state.activePage);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.activePage !== this.state.activePage) {
            this.startSearch(nextState.activePage);
        }
    }

    startSearch(page) {
        const cachedCars = this.searchCarCache(page);

        if (cachedCars) {
            this.setState({ cars: cachedCars });
            return;
        }

        carSearchApi.searchCars(page).then((cars) => {
            this.cacheCars(page, cars);
            this.setState({ cars });
        });
    }

    cacheCars(page, cars) {
        const allCars = Object.assign({}, this.state.allCars);
        allCars[page] = cars;

        this.setState({
            allCars,
            searchedPages: [...this.state.searchedPages, page]
        });
    }

    filterBySearchQuery() {
        const searchQuery = this.state.searchQuery;
        const cars = [...this.state.cars];
        if (searchQuery === '' || searchQuery === 'all') {
            return this.state.cars;
        }

        let filteredCars = [];

        for (let i = 0; i < cars.length; i++) {
            const car = cars[i];

            if (car.make.toLowerCase() === searchQuery.toLowerCase() ||
                car.model.toLowerCase() === searchQuery.toLowerCase() ||
                String(car.year) === searchQuery) {
                filteredCars.push(car);
            }
        }

        return filteredCars;
    }

    searchCarCache(page) {
        let found = false;
        for (let i = 0; i < this.state.searchedPages.length; i++) {
            if (this.state.searchedPages[i] === page) {
                found = true;
                break;
            }
        }

        // caching cars
        if (found) {
            return this.state.allCars[page];
        }
    }

    onPageChange(activePage) {
        this.setState({ activePage });
    }

    renderPaginationComponent() {
        return (
            <SearchPagination
                activePage={this.state.activePage}
                carsPerPage={this.state.carsPerPage}
                totalCars={this.state.totalCars}
                onPageChange={this.onPageChange}
            />
        );
    }

    render() {
        const filteredCars = this.filterBySearchQuery();
        const cars = this.state.cars;

        return (
            <div className="container text-center">
                {this.renderPaginationComponent()}
                <hr />
                {cars && filteredCars.length &&
                    <SearchResults
                        cars={filteredCars}
                    />
                }
                {cars && !filteredCars.length &&
                    <div> Whoops! No cars matched your search in this page. Maybe in the next page?</div>
                }
                <hr />
                {this.renderPaginationComponent()}
            </div>
        );
    }
}

SearchContainer.propTypes = {
    match: PropTypes.object.isRequired
};

export default SearchContainer;
