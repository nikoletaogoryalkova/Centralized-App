import React from 'react';
import moment from 'moment';

export default class Message extends React.Component {
    render() {
        return (
            <div className="body">{this.props.message.message}</div>
        );
    }
}