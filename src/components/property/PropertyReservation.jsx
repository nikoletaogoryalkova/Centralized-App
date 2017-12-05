import React from 'react';
import { withRouter } from 'react-router-dom';
import DatePicker from '../DatePicker';
const queryString = require('query-string');

class PropertyReservation extends React.Component {
    constructor(props) {
        super(props);

        let guests = '';
        let stay = '';

        if (this.props) {
            let queryParams = queryString.parse(this.props.location.search);
            if (queryParams.guests) {
                guests = queryParams.guests;
            }
            if (queryParams.startDate && queryParams.endDate) {
                stay = queryParams.startDate + ' - ' + queryParams.endDate;
            }
        }

        this.state = {
            stay: stay,
            guests: guests,
            name: '',
            email: '',
            phone: ''
        };

        this.onChange = this.onChange.bind(this);
        // this.onStayChange = this.onStayChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const listingPrice = this.props.listing.prices && parseInt(this.props.listing.prices[this.props.currency], 10).toFixed(2);
        return (
            <div className="hotel-chekin">
                <div className="hotel-chekin-box">
                    <form id="user-form">
                        <p id="hotel-top-price" className="hotel-top-price"><span>{this.props.currencySign}{listingPrice}</span> /per night</p>
                        <div id="reservation_errorMessage" style={{ color: 'red', fontSize: 16 + 'px', paddingBottom: 10 + 'px' }}></div>

                        <DatePicker nights={this.props.nights} onApply={this.props.onApply} startDate={this.props.startDate} endDate={this.props.endDate} />

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

                        <div className="hotel-second-price">total <span id="total-price">{this.props.currencySign}{this.props.nights * listingPrice}</span> / for&nbsp;
                                <div className="hotel-search-nights"><span>{this.props.nights} nights</span></div>
                        </div>

                        <div className="nonev"></div>

                        <button type="submit" className="btn btn-primary" id="reservation-btn">Request Booking in LOC or FIAT</button>
                        <input required type="checkbox" name="agree-terms" id="agree-terms"
                            className="checkbox tick" />
                        <label htmlFor="agree-terms" className="text-ffffff" style={{ marginTop: 10 + 'px' }}>I agree to the <a>Terms &amp; Conditions</a></label>
                        <div className="g-recaptcha" data-sitekey="6LfoyToUAAAAADzX1Us8dT7qmvrbdWqEL1IMz217"></div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(PropertyReservation);