import React from 'react';
import PropTypes from 'prop-types';

class PriceFilter extends React.Component {
    constructor(props) {
        super(props);

        this.handleMinChange = this.handleMinChange.bind(this);
        this.handleMaxChange = this.handleMaxChange.bind(this);
    }

    handleMinChange(event) {
        this.props.handleMinPriceChange(event.target.value);
    }

    handleMaxChange(event) {
        this.props.handleMaxPriceChange(event.target.value);
    }

    render() {
        return (
            <div className="container text-center">
                <label>
                    Min Price:
                <input type="text" value={this.props.minValue} onChange={this.handleMinChange} />
                </label>
                <label>
                    Max Price:
                <input type="text" value={this.props.maxValue} onChange={this.handleMaxChange} />
                </label>
            </div>
        );
    }
}

PriceFilter.propTypes = {
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    handleMinPriceChange: PropTypes.func.isRequired,
    handleMaxPriceChange: PropTypes.func.isRequired
};

export default PriceFilter;

