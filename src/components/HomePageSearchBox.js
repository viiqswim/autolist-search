import React from 'react';
import PropTypes from 'prop-types';
import {
    FormGroup, FormControl, InputGroup, Button
} from 'react-bootstrap';

const HomePageSearchBox = (props) => {
    return (
        <div>
            <FormGroup>
                <InputGroup>
                    <FormControl
                        placeholder="Please enter a make, model, or year"
                        type="text"
                        onChange={props.onSearchQueryChange}
                    />
                    <InputGroup.Button>
                        <Button>Search</Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        </div>
    );
};

HomePageSearchBox.propTypes = {
    onSearchQueryChange: PropTypes.func.isRequired
};

export default HomePageSearchBox;
