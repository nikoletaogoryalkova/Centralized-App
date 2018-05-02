import React from 'react';
import Result from './Result';
import PropTypes from 'prop-types';
import '../../../styles/css/components/search-result-component.css';

export default function ResultsHolder(props) {
  return (
    <div className="results-holder">
      {props.hotels && props.hotels.map((hotel, index) => {
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