import PropTypes from 'prop-types';
import React from 'react';

export default class Message extends React.Component {
    render() {
        return (
            <div className="body">{this.props.message.message}</div>
        );
    }
}

Message.propTypes = {
    message: PropTypes.object
};