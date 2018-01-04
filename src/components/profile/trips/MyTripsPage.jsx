import React from 'react';
import { Link } from 'react-router-dom';

import ProfileHeader from '../ProfileHeader';
import MyTripsTable from './MyTripsTable';
import Footer from '../../Footer';
import { cancelTrip } from "../../../requester";
import { NotificationManager } from 'react-notifications';

import { getMyTrips } from '../../../requester';

export default class MyTripsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trips: [],
            loading: true,
            totalTrips: 0
        }
    }

    componentDidMount() {
        getMyTrips().then((data) => {
            this.setState({ trips: data.content, totalTrips: data.totalElements, loading: false });
        })
    }

    cancelTrip(id, captchaToken) {
        this.setState({loading: true});
        cancelTrip(id, captchaToken)
            .then(res => {this.componentDidMount(); this._operate(res, id, false)});
    }

    render() {
        if (this.state.loading) {
            return <div className="loader"></div>
        }

        return (
            <div className="my-reservations">
                <ProfileHeader />
                <section id="profile-my-reservations">
                    <div className="container">
                        <h2>Upcoming Trips ({this.state.totalTrips})</h2>
                        <hr />
                        <MyTripsTable
                            onTripCancel={this.cancelTrip.bind(this)}
                            trips={this.state.trips} />

                        <div className="my-listings">
                            <Link className="btn btn-primary create-listing" to="#">Print this page</Link>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }

    _operate(res, id, isAccepted) {
        if (res.success) {
            NotificationManager.success(res.message, 'Reservation Operations')

            let newReservations = this.state.trips.map(r => {
                if (r.id === id) {
                    r.accepted = isAccepted;
                }

                return r;
            });

            this.setState({ trips: newReservations });
        } else {
            NotificationManager.error(res.message, 'Reservation Operations')
        }
    }
}