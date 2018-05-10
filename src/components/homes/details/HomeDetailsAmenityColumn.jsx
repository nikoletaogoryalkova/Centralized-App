import PropTypes from 'prop-types';
import React from 'react';

function HomeDetailsAmenityColumn(props) {
  return (
    <div className="col-md-4">
      {props.amenities.map((item, i) => {
        return <div key={i} className="hotel-extras-list">{item.name}</div>;
      })}
    </div>
  );
}

HomeDetailsAmenityColumn.propTypes = {
  amenities: PropTypes.array
};

export default HomeDetailsAmenityColumn;