import React from 'react';

import ProfileHeader from '../ProfileHeader';
import Footer from '../../Footer';
import DashboardPending from './DashboardPending';
import DashboardReviews from './DashboardReviews';
import DashboardOverview from './DashboardOverview';

export default class DashboardPage extends React.Component {
    render() {
        return (
            <div>
                <ProfileHeader />
                <DashboardPending />
                <DashboardReviews />
                <DashboardOverview />
                <Footer />
            </div>
        );
    }
}