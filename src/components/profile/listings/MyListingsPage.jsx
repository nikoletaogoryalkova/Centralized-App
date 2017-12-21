import React from 'react';

import MyListingsActiveItem from './MyListingsActiveItem';
import ProfileHeader from '../ProfileHeader';
import Footer from '../../Footer';

import { NotificationContainer, NotificationManager } from 'react-notifications';

export default class MyListingsPage extends React.Component {
    render() {
        return (
            <div>
                <ProfileHeader />
                <section id="profile-mylistings">
                    <div className="container">
                        <h2>Active (5)</h2>
                        <hr className="profile-line" />
                        <MyListingsActiveItem />
                        <MyListingsActiveItem />
                        <MyListingsActiveItem />
                        <MyListingsActiveItem />
                        <MyListingsActiveItem />
                        <MyListingsActiveItem />
                        <MyListingsActiveItem />
                        <MyListingsActiveItem />
                        <br />
                    </div>
                </section>
                <Footer />
                <NotificationContainer />
            </div>
        );
    }
}