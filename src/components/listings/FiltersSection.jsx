import React from 'react';
import { withRouter } from 'react-router-dom';

class FiltersSection extends React.Component {
    render() {
        return (
            <div>
                <label className="filter-check-label">
                    <span className="filter-check"></span>
                    <span className="filter-check-text">{this.props.text}</span>
                    <span className="filter-check-count">{this.props.count}</span>
                </label>
            </div>
        );
    }
}

export default withRouter(FiltersSection);