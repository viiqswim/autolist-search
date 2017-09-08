import React from "react";
import PropTypes from 'prop-types';
import SearchPagination from './SearchPagination';

const SearchPage = (props) => {
    return (
        <div className="container text-center">
            <SearchPagination {...props} />
            {props.cars.map((car, index) => {
                return (
                    <div key={index}>
                        <span>Color: {car.display_color}</span><span> | </span>
                        <span>Year: {car.year}</span><span> | </span>
                        <span>Make: {car.make}</span><span> | </span>
                        <span>Model: {car.model}</span><span> | </span>
                        <span>Price: {car.price}</span><span> | </span>
                    </div>
                );
            })}
            <SearchPagination {...props} />
        </div>
    );
};

SearchPage.propTypes = {
    cars: PropTypes.array.isRequired,
};

export default SearchPage;
