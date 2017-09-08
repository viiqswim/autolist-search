import React from 'react';
import {
  FormGroup, FormControl, InputGroup, Button
} from 'react-bootstrap';
// import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Autolist Search</h1>
      <FormGroup>
        <InputGroup>
          <FormControl type="text" />
          <InputGroup.Button>
            <Button>Search</Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    </div>
  );
};

export default HomePage;
