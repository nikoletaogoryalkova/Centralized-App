import React from 'react';
import ProfileDashboardPending from './ProfileDashboardPending';
import ProfileDashboardReviews from './ProfileDashboardReviews';
import ProfileDashboardOverview from './ProfileDashboardOverview';

export default class ProfileDashboard extends React.Component {
    render() {
        return(
            <div>
                <ProfileDashboardPending />
                <ProfileDashboardReviews />
                <ProfileDashboardOverview />
                </div>        
        )
    }
}