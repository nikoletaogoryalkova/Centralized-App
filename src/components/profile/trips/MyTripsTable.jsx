import React from 'react';
import { NotificationContainer } from 'react-notifications';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment';

import CancelTripModal from './modals/CancelTripModal';

export default class MyTripsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedId: '',
            selectedTripId: '',
            showCancelTripModal: false,
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    selectTrip(id) {
        this.setState({selectedTripId: id});
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
        return (
            <div className="container">
                <NotificationContainer />
                <CancelTripModal isActive={this.state.showCancelTripModal} closeModal={this.closeModal} cancelTrip={this.props.cancelTrip} tripId={this.state.selectedTripId}/>
                <div className="table-header bold">
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-2">
                        <span>Host</span>
                    </div>
                    <div className="col-md-2">
                        <span>Property</span>
                    </div>
                    <div className="col-md-3">
                        <span>Dates</span>
                    </div>
                    <div className="col-md-2">
                        <span>Actions</span>
                    </div>
                    <div className="col-md-2">
                        <span>Status</span>
                    </div>
                </div>
                {this.props.trips.map(trip => {
                    return (
                        <div key={trip.id} style={trip.id === this.props.currentTrip ? {backgroundColor: "lightgreen"} : {}} className="row reservation-box">
                            <div className="col-md-1">
                                <div className="reservation-image-box">
                                    <span className="session-nav-user-thumb"></span>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="bold">{trip.hostName}</div>
                                <div>{trip.hostEmail}</div>
                                <div>{trip.hostPhone}</div>
                                {trip.hostEmail ? <div><span className="send-message-icon"></span><a href={`mailto:${trip.hostEmail}`}>Send Message</a></div> : ''}
                            </div>
                            <div className="col-md-2">
                                <div>{trip.listingName}</div>
                            </div>
                            <div className="col-md-3">
                                <div>{moment(new Date(trip.startDate)).format("DD MMM, YYYY")}<i aria-hidden="true" className="fa fa-long-arrow-right"></i>{moment(new Date(trip.endDate)).format("DD MMM, YYYY")}</div>
                            </div>
                            <div className="col-md-2">
                            {trip.accepted ? <div>Reservation is accepted and can't be undone</div> : <div><button type="submit" onClick={e => {e.preventDefault(); this.selectTrip(trip.id); this.openModal("showCancelTripModal"); }}>Cancel</button></div>}
                                {/* <div><Link to="#">Report a problem</Link></div>
                                <div><Link to="#">Print Confirmation</Link></div> */}
                            </div>
                            <div className="col-md-2">
                                <div className="reservation-status bold">{trip.accepted ? "Accepted" : "Pending"}</div>
                            </div>
                            <div className="reservation-box-pending col-md-12">
                                {trip.hostLocAddress && !trip.accepted ? 
                                    <div>
                                        Please pay {trip.price} LOC to <a href={`https://etherscan.io/address/${trip.hostLocAddress}`} target="_blank">{trip.hostLocAddress.substr(7)}</a>
                                        <CopyToClipboard text={trip.hostLocAddress}>
                                            <button><i class="fa fa-link" aria-hidden="true" title="Copy LOC Address"></i></button>
                                        </CopyToClipboard>
                                        Click <a href="https://medium.com/@LockChainCo/how-to-create-a-personal-wallet-with-myetherwallet-com-and-buy-loc-with-eth-for-beginners-c395fd303d1" target="_blank">here</a> for more instructions.
                                    </div> : ''}
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}