import React from "react";
import PropTypes from 'prop-types';

const VehicleDetails = (props) => {
    const car = props.car;

    if (!car || !car.id) {
        return (
            <div className="container text-center">No car was found :(</div>
        );
    }

    return (
        <div className="container text-center">
            <span>Color: {car.display_color}</span><span> | </span>
            <span>Year: {car.year}</span><span> | </span>
            <span>Make: {car.make}</span><span> | </span>
            <span>Model: {car.model}</span><span> | </span>
            <span>Price: {car.price}</span><span> | </span>
        </div>
    );
};

VehicleDetails.propTypes = {
    car: PropTypes.object.isRequired,
};

export default VehicleDetails;
