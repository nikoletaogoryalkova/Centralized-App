import React from 'react';
import Result from './Result';
import PropTypes from 'prop-types';
import '../../../styles/css/components/search-result-component.css';

export default function ResultsHolder(props) {

  if (!props.hotels) {
    return;
  } 
  
  if (props.hotels && props.hotels.length === 0 && props.loading) {
    return <div className="text-center"><h2 style={{ margin: '80px 0' }}>Looking for the best rates for your trip...</h2></div>;
  } 
  
  if (props.hotels && props.hotels.length === 0 && !props.loading) {
    return <div className="text-center"><h2 style={{ margin: '80px 0' }}>No Results</h2></div>;
  } 

  return (
    <div className="results-holder">
      {props.hotels.map((hotel, index) => {
        return (<Result key={index} hotel={hotel} locRate={props.locRate} rates={props.rates} nights={props.nights} />);
      })}
    </div>
  );
}

ResultsHolder.propTypes = {
  hotels: PropTypes.array,
  locRate: PropTypes.number,
  rates: PropTypes.object,
  nights: PropTypes.number
};