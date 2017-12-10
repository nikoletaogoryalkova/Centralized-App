import React from 'react';
import { withRouter } from 'react-router-dom';

class FiltersCheckbox extends React.Component {
    constructor(props) {
        super(props);
    }

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

export default withRouter(FiltersCheckbox);