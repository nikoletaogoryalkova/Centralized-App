import React from 'react';
import moment from 'moment';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.locale(en)
const timeAgo = new TimeAgo('en-US');

export default class MessagesChat extends React.Component {
    render() {
        let messageCreatedAt = moment(this.props.message.createdAt, "DD/MM/YYYY HH:mm:ss");
        return (
            <div className={(this.props.sender ? 'to' : 'from') + " message"}>
                {!this.props.queueMessage ? <ul className="user">
                    {this.props.sender ? null : <li className="thumb" style={{ backgroundImage: 'url(' + this.props.message.sender.image + ')' }}></li>}
                    <li className="name"><span>{this.props.message.sender.fullName}</span></li>
                    <li className="when"><span>{messageCreatedAt < moment().add('-1', 'days') ? messageCreatedAt.format("HH:mm") : timeAgo.format(new Date(messageCreatedAt))}</span></li>
                    {!this.props.sender ? null : <li className="thumb" style={{ backgroundImage: 'url(' + this.props.message.sender.image + ')' }}></li>}
                </ul> : null}
                {this.props.children}
            </div>
        );
    }
}