import PropTypes from 'prop-types';
import React from 'react';

function HotelDetailsAmenityColumn(props) {
  return (
    <div className="col-md-4">
      {props.amenities.map((item, i) => {
        return <div key={i} className="hotel-extras-list">{item.text}</div>;
      })}
    </div>
  );
}

HotelDetailsAmenityColumn.propTypes = {
  amenities: PropTypes.array
};

export default HotelDetailsAmenityColumn;