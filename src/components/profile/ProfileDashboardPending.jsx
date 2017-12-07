import React from 'react';

export default class ProfileDashboardPending extends React.Component {
    render() {
        return(
            <section id="profile-dashboard-pending">
                <div className="container">
                    <h2>Pending Requests &amp; Discussions (3)</h2>
                    <hr />
                    <ul className="profile-pending-list profile-pending-header">
                        <li><span>&nbsp;</span></li>
                        <li><span>Booker</span></li>
                        <li><span>Trip Dates</span></li>
                        <li><span>Nights</span></li>
                        <li><span>Status</span></li>
                        <li><span>Date</span></li>
                    </ul>
                    <ul className="profile-pending-list profile-pending-item">
                        <li></li>
                        <li>
                            <span className="cnt">
                                <span className="name">Jaine</span>
                                <span className="where">at Heaven - Suite with view</span>
                            </span>
                        </li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                 </div>
            </section>
        )
    }
}