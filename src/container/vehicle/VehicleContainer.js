import React from 'react';
import PropTypes from 'prop-types';
import Loading from './../../components/common/Loading';
import VehicleDetails from './../../components/vehicle/VehicleDetails';
import carSearchApi from './../../requests/carSearchApi';

class VehicleContainer extends React.Component {
    constructor(props) {
        super(props);

        const params = this.props.match.params;

        this.state = {
            vehicleId: params.vehicleId,
            car: {},
            isLoadingData: true
        };
    }

    componentDidMount() {
        this.searchCarId();
    }

    searchCarId() {
        this.setState({ isLoadingData: true });

        carSearchApi.searchCarId(this.state.vehicleId, 1)
            .then((car) => {
                this.setState({
                    car,
                    isLoadingData: false
                });
            });
    }

    render() {
        const isLoadingData = this.state.isLoadingData;

        return (
            <div>
                {isLoadingData &&
                    <Loading />
                }
                {!isLoadingData &&
                    <VehicleDetails
                        car={this.state.car}
                    />
                }
            </div>
        );
    }
}

VehicleContainer.propTypes = {
    match: PropTypes.object.isRequired
};

export default VehicleContainer;
