import React from 'react';

import ProfileHeader from '../ProfileHeader';
import Footer from '../../Footer';

export default class MyListingsPage extends React.Component {
    render() {
        return (
            <div>
                <ProfileHeader />
                <br />
                <Footer />
            </div>
        );
    }
}