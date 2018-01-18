import React from 'react';

import ProfileHeader from '../ProfileHeader';
import Footer from '../../Footer';
import MessagesItem from './MessagesItem';
import { getMyConversations, changeMessageStatus } from '../../../requester';

export default class MessagesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            messages: []
        }

        this.changeMessageFlag = this.changeMessageFlag.bind(this);
    }

    componentDidMount() {
        getMyConversations().then(data => {
            this.setState({ messages: data.content, loading: false });
        })
    }

    changeMessageFlag(id, unread) {
        let conversationObj = {
            conversationId: id,
            unread: unread === "true" ? "false" : "true"
        }

        changeMessageStatus(conversationObj).then(res => {
            let messages = this.state.messages;
            
            let message = messages.find(x => x.id === id);
            let messageIndex = messages.findIndex(x => x.id === id);

            message.unread = unread === "true" ? "false" : "true";

            messages = messages.filter(x => x.id !== id);
            messages.splice(messageIndex, 0, message);

            this.setState({ messages: messages });
        })
    }

    render() {
        if (this.state.loading) {
            return <div className="loader"></div>
        }

        return (
            <div>
                <ProfileHeader />
                <section id="profile-messages-hosting">
                    <div className="container">
                        {this.state.messages.map((message, i) => {
                            return <MessagesItem message={message} changeMessageFlag={this.changeMessageFlag} key={i} />
                        })}
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}