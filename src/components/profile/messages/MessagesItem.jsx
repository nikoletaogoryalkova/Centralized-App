import React from 'react';
import { withRouter } from 'react-router-dom';

import { Config } from '../../../config';
import moment from 'moment';

class MessagesItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (e) => {
        this.props.history.push('/profile/messages/chat/' + this.props.message.id);
    };

    render() {
        return (
            <div className="message-box">
                <div className="col-md-1">
                    <a href="#" onClick={() => this.props.changeMessageFlag(this.props.message.id, this.props.message.unread)}>
                        {this.props.message.unread === "true" ? <img src={Config.getValue("basePath") + "images/icon-star-filter.png"} alt="read-flag" /> : <img src={Config.getValue("basePath") + "images/icon-star-filter-g.png"} alt="unread-flag" />}
                    </a>
                </div>
                <div className="col-md-1 user-image">
                    <span className="session-nav-user-thumb"><img src={this.props.message.userInfo.image} alt="user-profile" /></span>
                </div>
                <div className="col-md-2">
                    <h4 className="bold">{this.props.message.userInfo.fullName}</h4>
                </div>
                <div className="col-md-7 message-content" onClick={this.handleClick}>
                    <p>{this.props.message.lastMessage && this.props.message.lastMessage.message}</p>
                </div>
                <div className="col-md-2">
                    <p className="bold">{this.props.message.lastMessage && moment(this.props.message.lastMessage.createdAt, "DD/MM/YYYY").format('DD MMM, YYYY')}</p>
                </div>
            </div>
        );
    }
}

export default withRouter(MessagesItem);