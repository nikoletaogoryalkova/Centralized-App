import { NotificationContainer } from 'react-notifications';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import CancelTripModal from '../../common/modals/CancelTripModal';
import React from 'react';
import moment from 'moment';

export default class MyReservationsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedId: '',
            action: '',
            showRejectReservationModal: false,
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

    render() {
        if (this.props.loadingListing) {
            return <div className="loader"></div>;
        }

        return (
            <div className="container">                
                <CancelTripModal 
                    title={'Delete Reservation'}
                    text={'Tell your guest why do you want to reject his reservation.'}
                    isActiveId={'showRejectReservationModal'}
                    isActive={this.state.showRejectReservationModal} 
                    closeModal={this.closeModal} 
                    onSubmit={this.props.onReservationReject} 
                    tripId={this.state.selectedId} />

                <NotificationContainer />
                <ReCAPTCHA
                    ref={el => this.captcha = el}
                    size="invisible"
                    sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                    onChange={token => { this.state.action === 'cancel' ? this.props.onReservationCancel(this.state.selectedId, token) : this.props.onReservationAccept(this.state.selectedId, token); this.captcha.reset(); }}
                />
                <div className="table-header bold">
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-2">
                        <span>Guests</span>
                    </div>
                    <div className="col-md-3">
                        <span>Dates &amp; Location</span>
                    </div>
                    <div className="col-md-2">
                        <span>Price</span>
                    </div>
                    <div className="col-md-2">
                        <span>Actions</span>
                    </div>
                    <div className="col-md-2">
                        <span>Status</span>
                    </div>
                </div>
                {this.props.reservations.map(reservation => {
                    return (
                        <div key={reservation.id} className="row reservation-box">
                            <div className="col-md-12">
                                <div className="col-md-1">
                                    <div className="reservation-image-box">
                                        <span className="session-nav-user-thumb"><img src={reservation.userImage} alt="user-profile" /></span>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="bold">{reservation.guestName}</div>
                                    <div>{reservation.guestEmail}</div>
                                    <div>{reservation.guestPhone}</div>
                                    {reservation.guestLocAddress ? <div><a href={`https://etherscan.io/address/${reservation.guestLocAddress}`} target="_blank">Loc Address</a></div> : ''}
                                    {reservation.guestEmail ? <div><span className="send-message-icon"></span><a href={`mailto:${reservation.guestEmail}`}>Send Message</a></div> : ''}
                                </div>
                                <div className="col-md-3">
                                    <div>{moment(new Date(reservation.startDate)).format('DD MMM, YYYY')}<i aria-hidden="true" className="fa fa-long-arrow-right"></i>{moment(new Date(reservation.endDate)).format('DD MMM, YYYY')}</div>
                                    <div>{reservation.listingName}</div>
                                </div>
                                <div className="col-md-2">
                                    <div>{reservation.currencyCode} {reservation.price} total</div>
                                </div>
                                <div className="col-md-2">
                                    <form onSubmit={(e) => { e.preventDefault(); this.setState({ selectedId: reservation.id, action: reservation.accepted ? 'cancel' : 'accept' }); this.captcha.execute(); }}>
                                        {reservation.accepted ? <div><button type="submit" >Cancel</button></div> : <div><button type="submit">Accept</button></div>}
                                    </form>

                                    {!reservation.accepted && 
                                        <form>
                                            <div><button type="submit" onClick={(e) => { e.preventDefault(); this.setState({ selectedId: reservation.id, showRejectReservationModal: true }); }}>Reject</button></div>
                                        </form>
                                    }

                                    {/* <div><Link to="#">Report a problem</Link></div>
                                <div><Link to="#">Print Confirmation</Link></div> */}
                                </div>
                                <div className="col-md-2">
                                    <div className="reservation-status bold">{reservation.accepted ? 'Accepted' : 'Pending'}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

MyReservationsTable.propTypes = {
    loadingListing: PropTypes.bool,
    reservations: PropTypes.array,
    onReservationAccept: PropTypes.func,
    onReservationCancel: PropTypes.func,
    onReservationReject: PropTypes.func
};