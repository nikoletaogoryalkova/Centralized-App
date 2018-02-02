import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

class FiltersCheckbox extends React.Component {
    render() {
        return (
            <label className={`filter-check-label${this.props.checked ? ' active' : ''}`}>
                <span className="filter-check"></span>
                <span className="filter-check-text">{this.props.text}</span>
                <span className="filter-check-count">{this.props.count}</span>
            </label>
        );
    }
}

FiltersCheckbox.propTypes = {
    checked: PropTypes.bool,
    text: PropTypes.string,
    count: PropTypes.number
};

export default withRouter(FiltersCheckbox);