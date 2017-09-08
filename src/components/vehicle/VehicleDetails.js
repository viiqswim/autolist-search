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
        <div className="container vehicle details">
            <div className="row">
                <div className="col-md-4">
                    <img className="image" src={car.primary_photo_url} alt={car.make} />
                </div>
                <div className="col-md-8">
                    <div>
                        <h2>{car.year} {car.make} {car.model} </h2>
                    </div>
                    <div>
                        <h3>Condition: {car.condition}</h3>
                    </div>
                    <div>
                        <h3>Price: {car.price_mobile}</h3>
                    </div>
                    <div>
                        <h3>Location: {car.city}, {car.state}</h3>
                    </div>
                    <div>
                        <h3>Sold by: {car.dealer_name}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

VehicleDetails.propTypes = {
    car: PropTypes.object.isRequired,
};

export default VehicleDetails;
