import React from 'react';
import '../../styles/css/components/hero-component.css';
import '../../styles/css/components/tabs-component.css';
import HomesSearchBar from './search/HomesSearchBar';
import ListingTypeNav from '../common/listingTypeNav/ListingTypeNav';

export default function HomesHeroComponent(props) {
  return (
    <div className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Discover your next experience</h1>
          <h2>Browse for homes &amp; hotels worldwide</h2>
          <div className="source-data">
            <ListingTypeNav />
            <HomesSearchBar
              countryId={props.countryId}
              countries={props.countries}
              startDate={props.startDate}
              endDate={props.endDate}
              guests={props.guests}
              onChange={props.onChange}
              handleSearch={props.handleSearch}
              handleDatePick={props.handleDatePick} />
          </div>
        </div>
      </div>
    </div>
  );
}