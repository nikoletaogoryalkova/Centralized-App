import React from 'react';

import ProfileHeader from '../ProfileHeader';
import MessagesChatUser from './MessagesChatUser';
import Footer from '../../Footer';
import MessagesChatDay from './MessagesChatDay';

export default class MessagesChatPage extends React.Component {
    render() {
        return (
            <div>
                <ProfileHeader />
                <section id="profile-messages-chat-head">
                    <div className="container">
                        <h2>Conversation with Jaime Davidson</h2>
                        <hr className="profile-line" />
                    </div>
                </section>
                <section id="profile-messages-chat-columns">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <MessagesChatUser />
                            </div>
                            <div className="col-md-7">
                                <div id="chat">
                                    <textarea placeholder="Type your message here..."></textarea>
                                    <input type="button" className="button" value="Send Message" />
                                    <MessagesChatDay />
                                    <MessagesChatDay />
                                    <MessagesChatDay />
                                    <MessagesChatDay />
                                </div>
                            </div>
                            <div className="clear-both before-footer" />
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}