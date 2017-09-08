import React from "react";
import PropTypes from 'prop-types';

const SearchPage = (props) => {
    return (
        <div>
            {props.cars.map((car, index) => {
                return (
                    <div key={index} onClick={() => { props.goToDetailsPage(car); }}>
                        <span>Color: {car.display_color}</span><span> | </span>
                        <span>Year: {car.year}</span><span> | </span>
                        <span>Make: {car.make}</span><span> | </span>
                        <span>Model: {car.model}</span><span> | </span>
                        <span>Price: {car.price}</span><span> | </span>
                    </div>
                );
            })}
        </div>
    );
};

SearchPage.propTypes = {
    cars: PropTypes.array.isRequired,
    goToDetailsPage: PropTypes.func.isRequired
};

export default SearchPage;
