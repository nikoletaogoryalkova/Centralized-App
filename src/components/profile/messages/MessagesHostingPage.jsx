import React from 'react';

import ProfileHeader from '../ProfileHeader';
import Footer from '../../Footer';
import MessagesItem from './MessagesItem';

export default class MessagesHostingPage extends React.Component {
    render() {
        return (
            <div>
                <ProfileHeader />
                <section id="profile-messages-hosting">
                    <div className="container">
                        <ul className="profile-messages-nav">
                            <li className="active"><a href="hosting"><h2>Hosting</h2></a></li>
                            <li><a href="traveling"><h2>Traveling</h2></a></li>
                        </ul>
                        <MessagesItem />
                        <MessagesItem />
                        <MessagesItem />
                        <MessagesItem />
                        <MessagesItem />
                        <MessagesItem />
                        <MessagesItem />
                        <MessagesItem />
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}