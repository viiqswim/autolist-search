import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import ReactLoading from 'react-loading';
import SearchPagination from './../../components/search/SearchPagination';
import SearchResults from './../../components/search/SearchResults';
import carSearchApi from './../../requests/carSearchApi';

class SearchContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onPageChange = this.onPageChange.bind(this);
        this.goToDetailsPage = this.goToDetailsPage.bind(this);

        const params = this.props.match.params;
        const activePage = Number(params.activePage) || 1;

        this.state = {
            activePage,
            searchQuery: params.query,
            carsPerPage: 20,
            totalCars: 400,
            cars: [],
            allCars: {},
            searchedPages: [],
            isLoadingData: true,
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

    goToDetailsPage(car) {
        this.props.history.push({
            pathname: `/vehicle/${car.vin}`,
        });
    }

    render() {
        const filteredCars = this.filterBySearchQuery();
        const cars = this.state.cars;
        const isLoadingData = this.state.isLoadingData;

        return (
            <div className="container text-center">
                {this.renderPaginationComponent()}
                <hr />
                {isLoadingData &&
                    <div>
                        <div style={{ margin: 'auto', width: '64px' }}>
                            <ReactLoading type="cylon" color="#444" />
                        </div>
                        <h4> Loading. Please wait... </h4>
                    </div>
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
