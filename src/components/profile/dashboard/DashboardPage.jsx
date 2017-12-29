import React from 'react';

import ProfileHeader from '../ProfileHeader';
import Footer from '../../Footer';
import DashboardPending from './DashboardPending';
import DashboardReviews from './DashboardReviews';
import DashboardOverview from './DashboardOverview';
import {getMyReservations} from "../../../requester";

export default class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: null,
            totalReservations: 0,
            loading: true
        }
    }

    componentDidMount() {
        getMyReservations().then((data) => {
            this.setState({ reservations: data.content.filter(r => !r.accepted), totalReservations: data.totalElements, loading: false });
        })
    }

    render() {
        if (this.state.loading) {
            return <div className="loader"></div>
        }
        return (
            <div>
                <ProfileHeader />
                <DashboardPending reservations={this.state.reservations} totalReservations={this.state.totalReservations} />
                {/*<DashboardReviews />*/}
                {/*<DashboardOverview />*/}
                <Footer />
            </div>
        );
    }
}