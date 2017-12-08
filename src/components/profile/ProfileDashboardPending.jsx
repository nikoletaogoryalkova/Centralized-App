import React from 'react';

export default class ProfileDashboardPending extends React.Component {
    render() {
        return(
            <section id="profile-dashboard-pending">
                <div className="container">
                    <h2>Pending Requests &amp; Discussions (3)</h2>
                    <hr />
                    <ul className="profile-pending-list profile-pending-header bold">
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
                            <span className="cnt block">
                                <span className="block bold">Jaine</span>
                                <span className="where block">at Heaven - Suite with view</span>
                            </span>
                        </li>
                        <li>
                            <span className="cnt block"><span className="text-green">21</span> oct, 2017 &rarr; <span className="text-d87a61">27</span> oct, 2017</span>
                        </li>
                        <li>
                            <span className="cnt block">99 nights &bull; 99 guests</span>
                        </li>
                        <li>
                            <span className="cnt block">
                                <span className="bold">Reservation Request</span>
                                <span> - </span>
                                <span>$1.050</span>
                            </span>
                        </li>
                        <li>
                            <span className="cnt block">17 oct</span>
                        </li>
                    </ul>
                 </div>
            </section>
        )
    }
}