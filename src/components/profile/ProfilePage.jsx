import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileDashboard from './ProfileDashboard';
import Footer from '../Footer';

export default class ProfilePage extends React.Component {
    render() {
        return (
            <div>
                <ProfileHeader />
                <ProfileDashboard />
                <section id="hotel-box">
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </section>
                <Footer />
            </div>
        );
    }    
}