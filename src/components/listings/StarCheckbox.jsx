import PropTypes from 'prop-types';
import React from 'react';

function StarCheckbox(props) {
    return (
        <div>
            <span className={`star ${props.checked ? 'active' : ''}`}>
                {props.text}
            </span>
        </div>
    );
}

StarCheckbox.propTypes = {
    checked: PropTypes.bool,
    text: PropTypes.string
};

export default StarCheckbox;