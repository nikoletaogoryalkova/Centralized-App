import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

class StarCheckbox extends React.Component {
    render() {
        return (
            <div>
                <span className={`star ${this.props.checked ? 'active' : ''}`}>
                    {this.props.text}
                </span>
            </div>
        );
    }
}

StarCheckbox.propTypes = {
    checked: PropTypes.bool,
    text: PropTypes.string
};

export default withRouter(StarCheckbox);