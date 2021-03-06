import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import PriceFilter from './../common/PriceFilter';
import Loading from './../../components/common/Loading';
import SearchPagination from './../../components/search/SearchPagination';
import SearchResults from './../../components/search/SearchResults';
import carSearchApi from './../../requests/carSearchApi';

class SearchContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onPageChange = this.onPageChange.bind(this);
        this.goToDetailsPage = this.goToDetailsPage.bind(this);
        this.handleMinPriceChange = this.handleMinPriceChange.bind(this);
        this.handleMaxPriceChange = this.handleMaxPriceChange.bind(this);

        const params = this.props.match.params;
        const activePage = Number(params.activePage) || 1;

        this.state = {
            activePage,
            searchQuery: params.query,
            carsPerPage: 20,
            totalCars: 4980,
            minPrice: 0,
            maxPrice: 1000000,
            cars: [],
            allCars: {},
            searchedPages: [],
            isLoadingData: true
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

        this.setState({ isLoadingData: true });

        carSearchApi.searchCars(page).then((cars) => {
            this.cacheCars(page, cars);
            this.setState({
                cars,
                isLoadingData: false
            });
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
        const self = this;
        const searchQuery = this.state.searchQuery;
        const cars = [...this.state.cars];
        if (searchQuery === '' || searchQuery === 'all') {
            return this.state.cars;
        }

        const filteredCars = cars.filter(function (car) {
            return (car.make.toLowerCase() === searchQuery.toLowerCase() ||
                car.model.toLowerCase() === searchQuery.toLowerCase() ||
                String(car.year) === searchQuery) &&
                car.price_unformatted > self.state.minPrice &&
                car.price_unformatted < self.state.maxPrice;
        });

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
        this.props.history.push({
            pathname: `/search/${this.state.searchQuery}/page/${activePage}`,
        });
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

    goToDetailsPage(car) {
        this.props.history.push({
            pathname: `/vehicle/${car.vin}`,
        });
    }

    handleMinPriceChange(value) {
        this.setState({ minPrice: Number(value) });
    }

    handleMaxPriceChange(value) {
        this.setState({ maxPrice: Number(value) });
    }

    render() {
        const filteredCars = this.filterBySearchQuery();
        const cars = this.state.cars;
        const isLoadingData = this.state.isLoadingData;

        return (
            <div className="container text-center">
                <PriceFilter
                    minValue={this.state.minPrice}
                    maxValue={this.state.maxPrice}
                    handleMinPriceChange={this.handleMinPriceChange}
                    handleMaxPriceChange={this.handleMaxPriceChange}
                />
                {this.renderPaginationComponent()}
                <hr />
                {isLoadingData &&
                    <Loading />
                }
                {cars && cars.length && !isLoadingData &&
                    <SearchResults
                        cars={filteredCars}
                        goToDetailsPage={this.goToDetailsPage}
                    />
                }
                {cars && !filteredCars.length && !isLoadingData &&
                    <div> Whoops! No cars matched your search in this page. Maybe in the next page?</div>
                }
                <hr />
                {this.renderPaginationComponent()}
            </div>
        );
    }
}

SearchContainer.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(SearchContainer);
