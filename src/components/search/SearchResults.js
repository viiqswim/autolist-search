import React from "react";
import PropTypes from 'prop-types';
import VehicleCard from './../vehicle/VehicleCard';

const SearchPage = (props) => {
    return (
        <div>
            {props.cars.map((car, index) => {
                return (
                    <div key={index} onClick={() => { props.goToDetailsPage(car); }}>
                        <VehicleCard car={car} />
                        <hr />
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
