import React from 'react';
import '../../styles/css/components/hero-component.css';
import '../../styles/css/components/tabs-component.css';
import SearchBar from './search/HotelsSearchBar';
import ListingTypeNav from '../common/listingTypeNav/ListingTypeNav';

export default function HeroComponent(props) {
  return (
    <div className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Discover your next experience</h1>
          <h2>Browse for homes &amp; hotels worldwide</h2>
          <div className="source-data">
            <ListingTypeNav />
            <SearchBar
              startDate={props.startDate}
              endDate={props.endDate}
              region={props.region}
              adults={props.adults}
              hasChildren={props.hasChildren}
              rooms={props.rooms}
              guests={props.guests}
              onChange={props.onChange}
              handleRoomsChange={props.handleRoomsChange}
              handleSearch={props.handleSearch}
              handleDatePick={props.handleDatePick}
              handleSelectRegion={props.handleSelectRegion}
              handleToggleChildren={props.handleToggleChildren}
              handleOpenSelect={props.handleOpenSelect}
              handleCloseSelect={props.handleCloseSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}