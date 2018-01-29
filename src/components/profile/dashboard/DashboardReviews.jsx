import React from 'react';

export default class DashboardReviews extends React.Component {
    render() {
        return (
            <section id="profile-dashboard-reviews">
                <div className="container">
                    <h2>Reviews (2)</h2>
                    <hr className="profile-line" />
                    <ul className="profile-reviews-item">
                        <li>
                            <span className="cnt block"><strong>James Kirk</strong> has left you a <a>review</a>. Both of your reviews from this trip are now public.</span>
                        </li>
                        <li><span className="x"></span></li>
                    </ul>
                    <ul className="profile-reviews-item">
                        <li>
                            <span className="cnt block"><strong>James Kirk</strong> has left you a <a>review</a>. Both of your reviews from this trip are now public.</span>
                        </li>
                        <li><span className="x"></span></li>
                    </ul>
                </div>
            </section>
        );
    }
}