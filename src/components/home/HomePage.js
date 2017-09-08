import React from 'react';
import HomeContainer from './../../container/home/HomeContainer';

const HomePage = () => {
  return (
    <div className="row">
      <div className="col-md-6">
        <h1>Find your dream car</h1>
        <p>Search multiple new & used car websites in one easy search</p>
        <HomeContainer />
      </div>
    </div>
  );
};

export default HomePage;
