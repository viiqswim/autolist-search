import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import VehiclePage from './components/VehiclePage';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="/search/:query" component={SearchPage}/>
    <Route path="/vehicle/:vehicle" component={VehiclePage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
