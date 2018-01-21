import { Config } from '../../../config';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class MessagesItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.history.push('/profile/messages/chat/' + this.props.message.id);
    }

    render() {
        return (
            <div className="message-box" onClick={this.handleClick}>
                <div className="col-md-1">
                    <a onClick={() => this.props.changeMessageFlag(this.props.message.id, this.props.message.unread)}>
                        {this.props.message.unread === 'true' ? <img src={Config.getValue('basePath') + 'images/icon-star-message.png'} alt="read-flag" /> : <img src={Config.getValue('basePath') + 'images/icon-star-filter-g.png'} alt="unread-flag" />}
                    </a>
                </div>
                <div className="col-md-1 user-image">
                    <span className="session-nav-user-thumb"><img src={this.props.message.userInfo.image} alt="user-profile" /></span>
                </div>
                <div className="col-md-2">
                    <h4 className="bold">{this.props.message.userInfo.fullName}</h4>
                </div>
                <div className="col-md-7 message-content">
                    <p>{this.props.message.lastMessage && this.props.message.lastMessage.message}</p>
                </div>
                <div className="col-md-2">
                    <p className="bold">{this.props.message.lastMessage && moment(this.props.message.lastMessage.createdAt, 'DD/MM/YYYY').format('DD MMM, YYYY')}</p>
                </div>
            </div>
        );
    }
}

export default withRouter(MessagesItem);

MessagesItem.propTypes = {
    history: PropTypes.object,
    message: PropTypes.object,
    changeMessageFlag: PropTypes.func
};