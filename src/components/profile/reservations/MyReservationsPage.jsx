import React from 'react';

import ProfileHeader from '../ProfileHeader';
import Footer from '../../Footer';
import MyReservationsTable from './MyReservationsTable';
import { Table } from 'react-bootstrap';

import { getMyReservations } from '../../../requester'

export default class MyReservationsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reservations: [],
            loading: true,
            totalReservations: 0
        }
    }

    componentDidMount() {
        getMyReservations().then((data) => {
            this.setState({ reservations: data.content, totalReservations: data.totalElements, loading: false });
        })
    }

    render() {
        
        if (this.state.loading) {
            return <div className="loader"></div>
        }

        return (
            <div>
                <ProfileHeader />
                <section id="profile-my-reservations">
                    <div className="container">
                        <h2>Upcoming Reservations ({this.state.totalReservations})</h2>
                        <hr/>
                        <MyReservationsTable 
                            reservations={this.state.reservations} />
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}