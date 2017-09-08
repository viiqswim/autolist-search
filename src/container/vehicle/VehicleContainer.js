import React from 'react';
import PropTypes from 'prop-types';
import VehicleDetails from './../../components/vehicle/VehicleDetails';
import carSearchApi from './../../requests/carSearchApi';

class VehicleContainer extends React.Component {
    constructor(props) {
        super(props);

        const params = this.props.match.params;

        this.state = {
            vehicleId: params.vehicleId,
            car: {}
        };
    }

    componentDidMount() {
        this.searchCarId();
    }

    searchCarId() {
        carSearchApi.searchCarId(this.state.vehicleId, 1)
            .then((car) => {
                this.setState({ car });
            });
    }

    render() {
        return (
            <VehicleDetails
                car={this.state.car}
            />
        );
    }
}

VehicleContainer.propTypes = {
    match: PropTypes.object.isRequired
};

export default VehicleContainer;
