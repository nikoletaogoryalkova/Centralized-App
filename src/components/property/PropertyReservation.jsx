import React from 'react';
import { withRouter } from 'react-router-dom';

import DatePicker from '../DatePicker';
import ReCAPTCHA from 'react-google-recaptcha';

import { parse } from 'query-string';
import { requestBooking } from '../../requester';
import {Config} from "../../config";

class PropertyReservation extends React.Component {
    constructor(props) {
        super(props);

        let guests = '';

        if (this.props) {
            let queryParams = parse(this.props.location.search);
            if (queryParams.guests) {
                guests = queryParams.guests;
            }
        }

        this.state = {
            guests: guests,
            name: '',
            email: '',
            phone: '',
            captcha: '',
            error: '',
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            sending: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.captchaChange = this.captchaChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    captchaChange(value) {
        this.setState({ captcha: value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ sending: true });

        if (this.state.name === '') {
            this.setState({ error: 'Name is required!' })
        }
        else {
            var requestInfo = {
                listingId: parseInt(this.props.match.params.id, 10),
                checkin: this.props.startDate.format('DD/MM/YYYY'),
                checkout: this.props.endDate.format('DD/MM/YYYY'),
                guests: parseInt(this.state.guests, 10),
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                captchaToken: this.state.captcha
            }

            requestBooking(requestInfo).then((data) => {
                this.setState({ sending: false });
                if (data.success) {
                    this.props.history.push("/profile/trips");
                } else {
                    this.setState({ error: data.message });
                }
            });
        }
    }

    render() {
        const calendar = this.props.calendar;
        const invalidDates = calendar.filter(c => !c.available)
            .map(c => new Date(c.date));
        const isInvalidDate = date => {
            let dateCandidate = new Date(date.format("MM/DD/YYYY"));
            for (let invalidDate of invalidDates) {
                if (invalidDate - dateCandidate === 0) {
                    return true;
                }
            }

            return false;
        };

        const cleaningFee = this.props.nights > 0 ? parseInt(this.props.listing.cleaningFees[this.props.currency], 10) : 0;
        const listingPrice = this.props.listing.prices && parseInt(this.props.listing.prices[this.props.currency], 10).toFixed(2);
        return (
            <div className="hotel-chekin">
                <div className="hotel-chekin-box">
                    {this.state.sending &&
                        <div className="loader"></div>
                    }
                    {!this.state.sending &&
                        <form id="user-form" onSubmit={this.onSubmit}>
                            <p id="hotel-top-price" className="hotel-top-price"><span>{this.props.currencySign}{listingPrice}</span> /per night</p>
                            {this.state.error !== '' &&
                                <div id="reservation_errorMessage" style={{ color: 'red', fontSize: 16 + 'px', paddingBottom: 10 + 'px' }}>{this.state.error}</div>
                            }
                            <DatePicker isInvalidDate={isInvalidDate} nights={this.props.nights} onApply={this.props.onApply} startDate={this.props.startDate} endDate={this.props.endDate} />

                            <div className="clearfix"></div>

                            <div className="dropdown select-person">
                                <input type="number" name="guests" onChange={this.onChange} value={this.state.guests} className="form-control" id="reservation-guests" min="1" placeholder="Select Guest Number" required />
                            </div>

                            <div className="dropdown select-person">
                                <input onChange={this.onChange} value={this.state.name} id="reservation-name" type="text" className="form-control" name="name" required placeholder="Name" />
                            </div>

                            <div className="dropdown select-person">
                                <input onChange={this.onChange} value={this.state.email} id="reservation-email" type="email" className="form-control" name="email" required placeholder="E-mail" />
                            </div>

                            <div className="dropdown select-person">
                                <input onChange={this.onChange} value={this.state.phone} id="reservation-phone" type="tel" className="form-control" name="phone" required placeholder="Phone" />
                            </div>
                            <br />

                            <div>
                                <p style={{ color: 'white' }}>Cleaning Fee: {this.props.currencySign}{cleaningFee.toFixed(2)}</p>
                            </div>

                            <div className="hotel-second-price">total <span id="total-price">{this.props.currencySign}{((this.props.nights * listingPrice) + cleaningFee).toFixed(2)}</span> / for&nbsp;
                                <div className="hotel-search-nights"><span>{this.props.nights} nights</span></div>
                            </div>

                            <div className="nonev"></div>

                            <button disabled={this.props.nights <= 0} type="submit" className="btn btn-primary" id="reservation-btn">Request Booking in LOC or FIAT</button>
                            <input required type="checkbox" name="agree-terms" id="agree-terms"
                                className="checkbox tick" />
                            <label htmlFor="agree-terms" style={{ marginTop: 10 + 'px', color: '#FFFFFF' }}>I agree to the <a>Terms &amp; Conditions</a></label>

                            <ReCAPTCHA
                                ref="recaptcha"
                                sitekey="6LfoyToUAAAAADzX1Us8dT7qmvrbdWqEL1IMz217"
                                onChange={this.captchaChange}
                            />
                        </form>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(PropertyReservation);