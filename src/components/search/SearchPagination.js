import React from "react";
import Pagination from "react-js-pagination";
import PropTypes from 'prop-types';

const SearchPage = (props) => {
    return (
        <Pagination
            activePage={props.activePage}
            itemsCountPerPage={props.carsPerPage}
            totalItemsCount={props.totalCars}
            onChange={props.onPageChange}
        />
    );
};

SearchPage.propTypes = {
    activePage: PropTypes.number,
    carsPerPage: PropTypes.number,
    totalCars: PropTypes.number,
    onPageChange: PropTypes.func,
};

export default SearchPage;
