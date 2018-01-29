import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

class PropertyAmenityColumn extends React.Component {
    render() {
        return (
            <div className="col-md-4">
                {this.props.amenities.map((item, i) => {
                    return <div key={i} className="hotel-extras-list">{item.name}</div>;
                })}
            </div>
        );
    }
}

PropertyAmenityColumn.propTypes = {
    amenities: PropTypes.array
};

export default withRouter(PropertyAmenityColumn);