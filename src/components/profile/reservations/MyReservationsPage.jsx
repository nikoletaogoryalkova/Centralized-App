import React from 'react';
import { Link } from 'react-router-dom';

import ProfileHeader from '../ProfileHeader';
import Footer from '../../Footer';
import MyReservationsTable from './MyReservationsTable';
import MyReservationsTableRow from './MyReservationsTableRow';
import { Table } from 'react-bootstrap';
import Pagination from 'rc-pagination';
import { cancelReservation, acceptReservation } from "../../../requester";
import { NotificationManager } from 'react-notifications';

import { getMyReservations } from '../../../requester'

export default class MyReservationsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reservations: [],
            loading: true,
            totalReservations: 0,
            currentPage: 1
        }

        this.onPageChange = this.onPageChange.bind(this);
    }


    cancelReservation(id) {
        cancelReservation(id)
            .then(res => this._operate(res, id, false));
    }

    acceptReservation(id) {
        acceptReservation(id)
            .then(res => this._operate(res, id, true));
    }

    componentDidMount() {
        getMyReservations().then((data) => {
            this.setState({ reservations: data.content, totalReservations: data.totalElements, loading: false });
        })
    }

    onPageChange = (page) => {
        this.setState({
            currentPage: page,
        })

        getMyReservations(`?page=${page - 1}`).then(data => {
            this.setState({ 
                reservations: data.content, totalReservations: data.totalElements, loading: false
            })
        });
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
                        <h2>Upcoming Reservations ({this.state.totalReservations})</h2>
                        <hr />
                        <MyReservationsTable
                            reservations={this.state.reservations}
                            onReservationCancel={this.cancelReservation.bind(this)}
                            onReservationAccept={this.acceptReservation.bind(this)} />

                        <div className="pagination-box">
                            {this.state.totalReservations !== 0 && <Pagination className="pagination" defaultPageSize={20} onChange={this.onPageChange} current={this.state.currentPage} total={this.state.totalReservations} />}
                        </div>

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

            let newReservations = this.state.reservations.map(r => {
                if (r.id === id) {
                    r.accepted = isAccepted;
                }

                return r;
            });

            this.setState({ reservations: newReservations });
        } else {
            NotificationManager.error(res.message, 'Reservation Operations')
        }
    }
}