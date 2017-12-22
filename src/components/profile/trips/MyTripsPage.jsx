import React from 'react';
import {Link} from 'react-router-dom';

import ProfileHeader from '../ProfileHeader';
import MyTripsTable from './MyTripsTable';
import Footer from '../../Footer';

import {getMyTrips} from '../../../requester';

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
}