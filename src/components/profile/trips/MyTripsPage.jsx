import { cancelTrip, getMyTrips } from '../../../requester';

import Footer from '../../Footer';
import { Link } from 'react-router-dom';
import MyTripsTable from './MyTripsTable';
import { NotificationManager } from 'react-notifications';
import Pagination from 'rc-pagination';
import ProfileHeader from '../ProfileHeader';
import PropTypes from 'prop-types';
import React from 'react';

export default class MyTripsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trips: [],
            loading: true,
            totalTrips: 0,
            currentPage: 1,
            currentTrip: null,
        };
    }

    componentDidMount() {
        let search = this.props.location.search.split('?');
        let id = null;
        if (search.length > 1) {
            let pairs = search[1].split('&');
            for (let pair of pairs) {
                let tokens = pair.split('=');
                if (tokens[0] === 'id') {
                    id = Number(tokens[1]);
                    break;
                }
            }
        }
        getMyTrips('?page=0').then((data) => {
            this.setState({ trips: data.content, totalTrips: data.totalElements, loading: false, currentTrip: id });
            if (id) {
                NotificationManager.success('Booking Request Sent Successfully, your host will get back to you with additional questions.', 'Reservation Operations');
            }
        });
    }

    cancelTrip(id, cancellationText, captchaToken) {
        this.setState({ loading: true });
        let cancelTripObj = {
            message: cancellationText
        };

        cancelTrip(id, cancelTripObj, captchaToken)
            .then(res => {
                this.componentDidMount();
                this._operate(res, id, false);
            });
    }

    onPageChange(page) {
        this.setState({
            currentPage: page,
            loadingListing: true
        });

        getMyTrips(`?page=${page - 1}`).then(data => {
            this.setState({
                trips: data.content,
                totalTrips: data.totalElements,
                loadingListing: false
            });
        });
    }

    render() {
        const textItemRender = (current, type, element) => {
            if (type === 'prev') {
                return <div className="rc-prev">&lsaquo;</div>;
            }
            if (type === 'next') {
                return <div className="rc-next">&rsaquo;</div>;
            }
            return element;
        };

        if (this.state.loading) {
            return <div className="loader"></div>;
        }

        return (
            <div className="my-reservations">
                <ProfileHeader />
                <section id="profile-my-reservations">
                    <div className="container">
                        <h2>Upcoming Trips ({this.state.totalTrips})</h2>
                        <hr />
                        <MyTripsTable
                            currentTrip={this.state.currentTrip}
                            cancelTrip={this.cancelTrip.bind(this)}
                            trips={this.state.trips} />

                        <div className="pagination-box">
                            {this.state.totalListings !== 0 && <Pagination itemRender={textItemRender} className="pagination" defaultPageSize={20} showTitle={false} onChange={this.onPageChange} current={this.state.currentPage} total={this.state.totalTrips} />}
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
            NotificationManager.success(res.message, 'Reservation Operations');

            let newReservations = this.state.trips.map(r => {
                if (r.id === id) {
                    r.accepted = isAccepted;
                }

                return r;
            });

            this.setState({ trips: newReservations });
        } else {
            NotificationManager.error(res.message, 'Reservation Operations');
        }
    }
}

MyTripsPage.propTypes = {
    location: PropTypes.object
};