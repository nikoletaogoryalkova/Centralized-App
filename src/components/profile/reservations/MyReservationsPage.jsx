import { acceptReservation, cancelReservation, cancelTrip, getMyReservations } from '../../../requester';

import { Link } from 'react-router-dom';
import MyReservationsTable from './MyReservationsTable';
import { NotificationManager } from 'react-notifications';
import Pagination from 'rc-pagination';
import React from 'react';
import CancelTripModal from '../../common/modals/CancelTripModal';
import ReCAPTCHA from 'react-google-recaptcha';

export default class MyReservationsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reservations: [],
            loading: true,
            totalReservations: 0,
            currentPage: 1,
            selectedReservationId: 0
        };

        this.onPageChange = this.onPageChange.bind(this);
        this.onReservationSelect = this.onReservationSelect.bind(this);
        this.onReservationAccept = this.onReservationAccept.bind(this);
        this.onReservationCancel = this.onReservationCancel.bind(this);
        this.acceptReservation = this.acceptReservation.bind(this);
        this.acceptReservation = this.acceptReservation.bind(this);
        this.acceptReservation = this.acceptReservation.bind(this);
    }

    componentDidMount() {
        getMyReservations('?page=0').then((data) => {
            this.setState({ reservations: data.content, totalReservations: data.totalElements, loading: false });
        });
    }

    onReservationAccept() {
        this.acceptCaptcha.execute();
    }

    onReservationCancel() {
        this.cancelCaptcha.execute();
    }

    onReservationReject() {
        this.rejectCaptcha.execute();
    }

    cancelReservation(reservationId, captchaToken) {
        const id = this.state.selectedReservationId;
        cancelReservation(id, captchaToken)
            .then(response => {
                if(response.success) {
                    this.setReservationIsAccepted(id, false);
                    NotificationManager.success(response.message, 'Reservation Operations');
                } else {
                    NotificationManager.error(response.message, 'Reservation Operations');
                }
            });
    }

    acceptReservation(captchaToken) {
        const id = this.state.selectedReservationId;
        acceptReservation(id, captchaToken)
            .then(response => {
                if(response.success) {
                    this.setReservationIsAccepted(id, true);
                    NotificationManager.success(response.message, 'Reservation Operations');
                } else {
                    NotificationManager.error(response.message, 'Reservation Operations');
                }
            });
    }

    rejectReservation(reservationId, message, captchaToken) {
        let messageObj = { message: message };
        cancelTrip(reservationId, messageObj, captchaToken)
            .then(response => {
                if(response.success) {
                    this.deleteReservationFromState(reservationId);
                    NotificationManager.success(response.message, 'Reservation Operations');
                } else {
                    NotificationManager.error(response.message, 'Reservation Operations');
                }
            });
    }

    deleteReservationFromState(reservationId) {
        const reservations = this.state.reservations.filter(reservation => reservation.id !== reservationId);
        this.setState({ reservations: reservations });
    }

    setReservationIsAccepted(reservationId, isAccepted) {
        const reservations = this.state.reservations.map(reservation => {
            if(reservation.id === reservationId) {
                reservation.accepted = isAccepted;
            }
            return reservation;
        });
        this.setState({ reservations: reservations });
    }

    onPageChange(page) {
        this.setState({
            currentPage: page,
            loading: true
        });

        getMyReservations(`?page=${page - 1}`).then(data => {
            this.setState({
                reservations: data.content,
                totalReservations: data.totalElements,
                loading: false
            });
        });
    }

    openModal(modal, e) {
        if (e) {
            e.preventDefault();
        }

        this.setState({
            [modal]: true
        });
    }

    closeModal(modal, e) {
        if (e) {
            e.preventDefault();
        }

        this.setState({
            [modal]: false
        });
    }

    onReservationSelect(id) {
        this.setState({ selectedReservationId: id });
    }

    render() {
        if (this.state.loading) {
            return <div className="loader"></div>;
        }

        const renderPaginationArrow = (current, type, element) => {
            if (type === 'prev') {
                return <div className="rc-prev">&lsaquo;</div>;
            }
            if (type === 'next') {
                return <div className="rc-next">&rsaquo;</div>;
            }
            return element;
        };

        return (
            <div className="my-reservations">
                <ReCAPTCHA
                    ref={el => this.acceptCaptcha = el}
                    size="invisible"
                    sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                    onChange={token => { this.acceptReservation(token); this.acceptCaptcha.reset(); }} />

                <ReCAPTCHA
                    ref={el => this.cancelCaptcha = el}
                    size="invisible"
                    sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                    onChange={token => { this.cancelReservation(token); this.cancelCaptcha.reset(); }} />

                <ReCAPTCHA
                    ref={el => this.rejectCaptcha = el}
                    size="invisible"
                    sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                    onChange={token => {  }} />

                <CancelTripModal
                    title={'Delete Reservation'}
                    text={'Tell your guest why do you want to reject his reservation.'}
                    isActiveId={'showRejectReservationModal'}
                    isActive={this.state.showRejectReservationModal} 
                    closeModal={this.closeModal} 
                    onSubmit={this.rejectReservation} 
                    tripId={this.state.selectedId} />

                <section id="profile-my-reservations">
                    <div className="container">
                        <h2>Upcoming Reservations ({this.state.totalReservations})</h2>
                        <hr />
                        <MyReservationsTable
                            loading={this.state.loading}
                            reservations={this.state.reservations}
                            onReservationAccept={this.onReservationAccept}
                            onReservationCancel={this.onReservationCancel}
                            onReservationSelect={this.onReservationSelect} />

                        <div className="pagination-box">
                            {this.state.totalReservations !== 0 && 
                                <Pagination 
                                    itemRender={renderPaginationArrow} 
                                    className="pagination" 
                                    defaultPageSize={20} 
                                    showTitle={false} 
                                    onChange={this.onPageChange} 
                                    current={this.state.currentPage} 
                                    total={this.state.totalReservations} />}
                        </div>

                        <div className="my-listings">
                            <Link className="btn btn-primary create-listing" to="#">Print this page</Link>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}