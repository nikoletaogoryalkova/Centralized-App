import { NotificationContainer, NotificationManager } from 'react-notifications';

import { Config } from '../../../config';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { deleteListing } from '../../../requester';

export default class MyListingsInProgressItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDeleting: false,
            deletingId: -1,
            deletingName: '',
            sending: false,
            progress: [
                {
                    number: 1,
                    name: 'The Basics',
                    steps: [
                        { text: 'Landing', stepNumber: 1 },
                        { text: 'Place type', stepNumber: 2 },
                        { text: 'Accomodation', stepNumber: 3 },
                        { text: 'Facilities', stepNumber: 4 },
                        { text: 'Safety amenities', stepNumber: 5 },
                        { text: 'Location', stepNumber: 6 }
                    ],
                    completed: this.props.step > 6
                },
                {
                    number: 2,
                    name: 'Place Description',
                    steps: [
                        { text: 'Description', stepNumber: 7 },
                        { text: 'Photos', stepNumber: 8 }
                    ],
                    completed: this.props.step > 8
                },
                {
                    number: 3,
                    name: 'Guest Settings',
                    steps: [
                        { text: 'House rules', stepNumber: 9 },
                        { text: 'Check-in/Check-out', stepNumber: 10 },
                        { text: 'Price', stepNumber: 11 }
                    ]
                }
            ]
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

    calculateProgressPercentage(progressNumber) {
        let resultValue = 0;
        if (progressNumber <= 6) {
            resultValue = progressNumber / 6;
        }
        else if (progressNumber <= 8) {
            resultValue = (progressNumber - 6) / 2;
        }
        else if (progressNumber <= 11) {
            resultValue = (progressNumber - 8) / 3;
        }

        return resultValue * 100;
    }

    calculateProgressImage(progressNumber) {
        let resultValue = '';
        if (progressNumber <= 6) {
            resultValue = 'vector-room.png';
        }
        else if (progressNumber <= 8) {
            resultValue = 'vector-camera.png';
        }
        else if (progressNumber <= 11) {
            resultValue = 'vector-calendar.png';
        }

        return resultValue;
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
                <div className="row my-listing-box">
                    <div className="col-md-2">
                        <div className="my-listing-image-box">
                            <img src={this.props.listing.pictures[0] && this.props.listing.pictures[0].thumbnail} alt="user-profile" />
                        </div>
                    </div>
                    <div className="col-md-8 listing-name">
                        <Link to={`/profile/listings/edit/landing/${this.props.id}?progress=${this.props.step}`}>{this.props.listing.name}</Link>
                    </div>
                    <div className="col-md-2">
                        <Link className="btn btn-primary btn-block bold" to={`/profile/listings/edit/landing/${this.props.id}?progress=${this.props.step}`}>Continue</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-6">
                        {this.state.progress.map((item, i) => {
                            return (
                                <div key={i} className="progress-box">
                                    <div className="col-md-1 progress-number">
                                        <p className={item.completed ? 'completed' : 'bold'}>{item.completed ? <i className="fa fa-check" aria-hidden="true"></i>
                                            : item.number}</p>
                                    </div>
                                    <div className="col-md-11">
                                        <div className="progress-name">
                                            <span>{item.name}</span>
                                        </div>
                                        <div className="progress-steps">
                                            <span>{item.steps.map(function (element) { return element.text; }).join(', ')}</span>
                                        </div>

                                        {item.steps.filter(s => s.stepNumber === this.props.step).length > 0 &&
                                            <div className="progress-bar-outline" style={{ marginBottom: '10px', width: '100%', background: '#E1E1E1', height: '3px' }}>
                                                <div className="progress-bar" style={{ height: '3px', width: `${this.calculateProgressPercentage(this.props.step)}%`, background: '#A0C5BE' }}></div>
                                            </div>}

                                        {item.steps.filter(s => s.stepNumber === this.props.step).length > 0 &&
                                            <div className="progress-continue">
                                                <Link className="btn btn-primary bold" to={`/profile/listings/edit/landing/${this.props.id}?progress=${this.props.step}`}>Continue</Link>
                                            </div>}
                                    </div>
                                </div>);
                        })}
                    </div>
                    <div className="col-md-4 progress-image">
                        <img src={Config.getValue('basePath') + 'images/' + this.calculateProgressImage(this.props.step)} alt="progress-image" />
                    </div>
                </div>
            </div>
        );
    }
}

MyListingsInProgressItem.propTypes = {
    listing: PropTypes.object,
    step: PropTypes.number,
    id: PropTypes.number,
    filterListings: PropTypes.func
};