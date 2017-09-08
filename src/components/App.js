/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Switch, NavLink } from 'react-router-dom';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import VehiclePage from './VehiclePage';
import NotFoundPage from './NotFoundPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const activeStyle = { color: 'blue' };
    return (
      <div>
        <div>
          <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink><span> | </span>
          <NavLink exact to="/search/jeep" activeStyle={activeStyle}>Sample search</NavLink><span> | </span>
          <NavLink exact to="/vehicle/72805455" activeStyle={activeStyle}>Sample vehicle</NavLink>
        </div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/search/:query" component={SearchPage} />
          <Route path="/vehicle/:id" component={VehiclePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
