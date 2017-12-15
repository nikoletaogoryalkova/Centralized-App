import React from 'react';
import { Link } from 'react-router-dom'

import MyListingsActiveItem from './MyListingsActiveItem';
import RatingFeedback from '../RatingFeedback';
import ProfileHeader from '../ProfileHeader';
import Footer from '../../Footer';

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
            </div>
        );
    }
}