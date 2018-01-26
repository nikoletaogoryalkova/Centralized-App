import { NotificationContainer, NotificationManager } from 'react-notifications';

import { Link } from 'react-router-dom';
import ListingRating from '../../listings/ListingRating';
import { Modal } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { deleteListing } from '../../../requester';

export default class MyListingsActiveItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDeleting: false,
            deletingId: -1,
            deletingName: '',
            sending: false
        };

        this.onHide = this.onHide.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.deleteSelected = this.deleteSelected.bind(this);
    }

    onHide() {
        this.setState(
            {
                isDeleting: false,
                deletingId: -1,
                deletingName: ''
            }
        );

        console.log(this.state);
    }

    onOpen(id, name) {
        this.setState(
            {
                isDeleting: true,
                deletingId: id,
                deletingName: name
            }
        );
    }

    deleteSelected(token) {
        if (!this.state.isDeleting) {
            return;
        }

        this.setState({ sending: true });

        deleteListing(this.state.deletingId, token)
            .then(res => {
                if (res.success) {
                    this.props.filterListings(this.state.deletingId);
                } else {
                    NotificationManager.error('Cannot delete this property. It might have reservations or other irrevocable actions.', 'Deleting Listing');
                }
                this.setState({ sending: false });
                this.onHide();
            });
    }

    render() {
        return (
            <div style={{ background: 'rgba(255,255,255, 0.8)' }}>
                <NotificationContainer />
                <Modal show={this.state.isDeleting} onHide={this.onHide} className="modal fade myModal">
                    <Modal.Header>
                        <button type="button" className="close" onClick={this.onHide}>&times;</button>
                        <h2>Delete <b>{this.state.deletingName.substring(0, 20)}</b>?</h2>
                        {this.state.sending &&
                            <div className="loader"></div>
                        }
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            this.captcha.execute();
                        }}>

                            <ReCAPTCHA
                                ref={el => this.captcha = el}
                                size="invisible"
                                sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                                onChange={token => this.deleteSelected(token)}
                            />

                            <button type="submit" className="btn btn-danger">Yes, delete it!</button>
                        </form>
                        <button onClick={this.onHide} className="btn btn-info">No, go back!</button>
                    </Modal.Body>
                </Modal>
                <ul className="profile-mylistings-active">
                    <li className="toggle off"></li>
                    <li className="thumb"><span
                        style={{ backgroundImage: `url("${this.props.listing.pictures[0] && this.props.listing.pictures[0].thumbnail}")` }}></span></li>
                    <li className="details">
                        <Link to={`/profile/listings/edit/landing/${this.props.id}?progress=${this.props.step}`}>{this.props.listing.name}</Link>
                    </li>
                    <li className="price">
                    </li>
                    <li className="edit-new">
                    </li>
                    <li className="calendar">
                        <Link to={`/profile/listings/edit/landing/${this.props.id}?progress=${this.props.step}`}>Continue</Link>
                    </li>
                    {/* <li className="remove" onClick={() => this.onOpen(this.props.listing.id, this.props.listing.name)}>
                        <span></span>
                    </li> */}
                </ul>
            </div>
        );
    }
}