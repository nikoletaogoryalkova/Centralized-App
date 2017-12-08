import React from 'react';

export default class ProfileDashboardOverview extends React.Component {
    render() {
        return(
            <section id="profile-dashboard-overview">
                <div className="container">
                    <h2>Overview</h2>
                    <hr className="profile-line" />
                    <ul className="profile-overview">
                        <li>
                            <span class="cnt">
                                <span className="img"><img src="//old.ryanfunduk.com/assets/flex3-centered-overlays/overlay1off.png" /></span>
                                <span className="value">254</span>
                                <span className="name">nights booked</span>
                            </span>
                        </li>
                        <li>
                            <span class="cnt">
                                <span className="img"><img src="//old.ryanfunduk.com/assets/flex3-centered-overlays/overlay1off.png" /></span>
                                <span className="value"><span className="currency">$</span>25.8k</span>
                                <span className="name">total rent</span>
                            </span>
                        </li>
                        <li>
                            <span class="cnt">
                                <span className="img"><img src="//old.ryanfunduk.com/assets/flex3-centered-overlays/overlay1off.png" /></span>
                                <span className="value"><span className="currency">$</span>218654</span>
                                <span className="name">average daily rate</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </section>
        )
    }
}