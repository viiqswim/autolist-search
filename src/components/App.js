/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Switch, NavLink } from 'react-router-dom';
import HomePage from './home/HomePage';
import SearchPage from './search/SearchPage';
import VehiclePage from './vehicle/VehiclePage';
import NotFoundPage from './NotFoundPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const activeStyle = { color: 'blue' };
    return (
      <div className="container">
        <div>
          <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink><span> | </span>
          <NavLink exact to="/search/jeep" activeStyle={activeStyle}>Sample search ID</NavLink><span> | </span>
          <NavLink exact to="/vehicle/72805455" activeStyle={activeStyle}>Sample vehicle Jeep ID</NavLink><span> | </span>
          <NavLink exact to="/vehicle/WBA8E3G5XGNU05591" activeStyle={activeStyle}>Sample vehicle BMW VIN</NavLink>
        </div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/search/:query/page/:activePage" component={SearchPage} />
          <Route path="/vehicle/:vehicleId" component={VehiclePage} />
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
