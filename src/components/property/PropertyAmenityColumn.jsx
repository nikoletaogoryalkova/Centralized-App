import PropTypes from 'prop-types';
import React from 'react';

function PropertyAmenityColumn(props) {
    return (
        <div className="col-md-4">
            {props.amenities.map((item, i) => {
                return <div key={i} className="hotel-extras-list">{item.name}</div>;
            })}
        </div>
    );
}

PropertyAmenityColumn.propTypes = {
    amenities: PropTypes.array
};

export default PropertyAmenityColumn;