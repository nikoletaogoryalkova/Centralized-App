import React from 'react';

import ProfileHeader from '../ProfileHeader';
import Footer from '../../Footer';
import DashboardPending from './DashboardPending';
import {getMyReservations, getMyTrips} from "../../../requester";

export default class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: null,
            totalReservations: 0,
            loading: true,
            trips: null
        }
    }

    componentDidMount() {
        getMyReservations('?page=0', 5).then((data) => {
            getMyTrips('?page=0', 5).then((data) => {
                this.setState({trips: data.content, loading: false, reservations: data.content, totalReservations: data.totalElements})
            });
        })

    }

    render() {
        if (this.state.loading) {
            return <div className="loader"></div>
        }
        return (
            <div>
                <ProfileHeader />
                <DashboardPending reservations={this.state.reservations} trips={this.state.trips} totalReservations={this.state.totalReservations} />
                {/*<DashboardReviews />*/}
                {/*<DashboardOverview />*/}
                <br />
                <Footer />
            </div>
        );
    }
}