import React from 'react';

import ProfileHeader from '../ProfileHeader';
import Footer from '../../Footer';
import ProfileNav from './ProfileNav';
import ProfileEditForm from './ProfileEditForm';

export default class ProfileEditPage extends React.Component {
    render() {
        return (
            <div>
                <ProfileHeader />
                <section id="profile-edit">
                    <div className="container">
                        <div className="row">
                            <div className="after-header" />
                            <div className="col-md-3">
                                <ProfileNav />
                            </div>
                            <div className="col-md-8">
                                <ProfileEditForm />                              
                            </div>
                            <div className="before-footer clear-both" />
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}