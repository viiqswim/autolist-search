import React from 'react';
import {
  FormGroup, FormControl, InputGroup, Button
} from 'react-bootstrap';
// import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="row">
      <div className="col-md-6">
        <h1>Find your dream car</h1>
        <p>Search multiple new & used car websites in one easy search</p>
        <FormGroup>
          <InputGroup>
            <FormControl placeholder="Please enter a make, model, or rear" type="text" />
            <InputGroup.Button>
              <Button>Search</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </div>
    </div>
  );
};

export default HomePage;
