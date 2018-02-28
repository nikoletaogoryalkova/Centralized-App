// import '../../../public/css/calendar.css';

import DatePicker from '../../DatePicker';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { parse } from 'query-string';
import { requestBooking } from '../../../requester';
import { withRouter } from 'react-router-dom';

class HotelReservationPanel extends React.Component {
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
            name: !props.isLogged ? '' : props.userInfo.firstName + ' ' + props.userInfo.lastName,
            email: !props.isLogged ? '' : props.userInfo.email,
            phone: !props.isLogged ? '' : props.userInfo.phoneNumber || '',
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

    componentWillReceiveProps(newProps) {
        this.setState({
            name: !newProps.isLogged ? '' : newProps.userInfo.firstName + ' ' + newProps.userInfo.lastName,
            email: !newProps.isLogged ? '' : newProps.userInfo.email,
            phone: !newProps.isLogged ? '' : newProps.userInfo.phoneNumber || '',
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    captchaChange(value) {
        this.setState({ captcha: value });
    }

    onSubmit(captchaToken) {
        this.setState({ sending: true });

        if (this.state.name === '') {
            this.setState({ error: 'Name is required!' });
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
            };

            requestBooking(requestInfo, captchaToken).then((res) => {
                this.setState({ sending: false });
                if (res.status === 403) {
                    this.setState({ error: 'Please sign-in/register to able to make bookings' });
                } else {
                    res.body.then(data => {
                        if (data.success) {
                            this.props.history.push('/profile/trips?id=' + data.id);
                        } else {
                            this.setState({ error: data.message });
                        }
                    });
                }
            });
        }
    }

    render() {
        const calendar = this.props.calendar;
        const invalidDates = calendar.filter(c => !c.available)
            .map(c => moment(c.date, 'DD/MM/YYYY'));
        const isInvalidDate = date => {
            let dateCandidate = moment(date, 'DD/MM/YYYY');
            for (let invalidDate of invalidDates) {
                if (invalidDate.diff(dateCandidate) === 0) {
                    return true;
                }
            }

            const now = moment().add('89', 'days');
            now.hours(0, 0, 0, 0);
            if (dateCandidate.diff(now) > 0) {
                return true;
            }

            return false;
        };

        let listingPriceForPeriod = 0;
        let numberOfNights = 1;
        let startDate = this.props.startDate;
        let endDate = this.props.endDate;
        if (this.props.calendar === null || this.props.calendar === undefined) {
            return <div className="loader"></div>;
        }
        if (startDate !== undefined && endDate !== undefined) {
            // for (let i = 0; i < this.props.calendar.length; i++) {
            //     let dayObj = this.props.calendar[i];
            //     if (startDate.startOf('day') <= moment(dayObj.date, 'DD/MM/YYYY').startOf('day') && endDate.startOf('day') > moment(dayObj.date, 'DD/MM/YYYY').startOf('day') && dayObj.available) {
            //         listingPriceForPeriod += dayObj.price;
            //     }
            // }
            numberOfNights = (endDate - startDate) / 86400000;
            listingPriceForPeriod = this.props.listing.userCurrencyPrice;
        }

        let isInvalidRange = this.props.calendar.filter(x => moment(x.date, 'DD/MM/YYYY') >= startDate && moment(x.date, 'DD/MM/YYYY') <= endDate && !x.available).length > 0;

        const listingPrice = /*listingPriceForPeriod*/this.props.listing.userCurrencyPrice;
        const listingPriceLoc = Number((listingPrice / this.props.paymentInfo.locRate).toFixed(2));

        const totalLoc = listingPriceLoc.toFixed(4);
        return (
            <div className="hotel-chekin">
                <div className="hotel-chekin-box">
                    {(this.state.sending || this.props.loading) &&
                        <div className="loader"></div>
                    }
                    {(!this.state.sending && !this.props.loading) &&
                        <form id="user-form" onSubmit={(e) => { e.preventDefault(); this.captcha.execute(); }}>
                            <p id="hotel-top-price" className="hotel-top-price"><span>{this.props.paymentInfo.currencySign}{listingPrice.toFixed(2)} ({listingPriceLoc.toFixed(2)} LOC)</span> /per night</p>
                            {this.state.error !== '' &&
                                <div id="reservation_errorMessage" style={{ color: 'red', fontSize: 16 + 'px', paddingBottom: 10 + 'px' }}>{this.state.error}</div>
                            }
                            <DatePicker isInvalidDate={isInvalidDate}
                                nights={this.props.nights}
                                onApply={this.props.onApply}
                                startDate={this.props.startDate}
                                endDate={this.props.endDate} />

                            <div className="clearfix"></div>

                            <div className="dropdown select-person">
                                <input type="number" name="guests" onChange={this.onChange} value={this.state.guests} className="form-control" id="reservation-guests" min="1" placeholder="Select Guest Number" required />
                            </div>

                            <div className="dropdown select-person">
                                <input onChange={this.onChange} value={this.state.name} id="reservation-name" type="text" className="form-control" name="name" required placeholder="Name" />
                            </div>

                            {/*<div className="dropdown select-person">*/}
                            {/*<input onChange={this.onChange} value={this.state.email} id="reservation-email" type="email" className="form-control" name="email" required placeholder="E-mail" />*/}
                            {/*</div>*/}

                            <div className="dropdown select-person">
                                <input onChange={this.onChange} value={this.state.phone} id="reservation-phone" type="tel" className="form-control" name="phone" required placeholder="Phone" />
                            </div>

                            <ReCAPTCHA
                                ref={el => this.captcha = el}
                                size="invisible"
                                sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                                onChange={token => this.onSubmit(token)}
                            />
                            <br />

                            <div className="hotel-second-price">total <span className="total-price">{this.props.paymentInfo.currencySign}{(listingPrice * numberOfNights).toFixed(2)}</span> / for&nbsp;
                            <div className="hotel-search-nights"><span>{this.props.nights} nights</span></div>
                            </div>
                            <div>
                                <p style={{ color: 'white' }}><b>or</b></p>
                            </div>
                            <div className="hotel-second-price">total <span className="total-price">{(Number(totalLoc) * numberOfNights).toFixed(2)} LOC</span> / for&nbsp;
                            <div className="hotel-search-nights"><span>{this.props.nights} nights</span></div>
                            </div>
                            <div className="nonev"></div>

                            {this.props.isLogged &&
                                <button disabled={this.props.nights <= 0 || isInvalidRange || listingPrice === 0} type="submit" className="btn btn-primary"
                                    id="reservation-btn">Request Booking in LOC or FIAT</button>
                            }
                            {this.props.isLogged &&
                                <input required type="checkbox" name="agree-terms" id="agree-terms"
                                    className="checkbox tick" />
                            }
                            {this.props.isLogged &&
                                <label htmlFor="agree-terms" style={{ marginTop: 10 + 'px', color: '#FFFFFF' }}>I agree to the&nbsp;
                                <a>Terms &amp; Conditions</a></label>
                            }
                            {this.props.isLogged === false &&
                                <div className="hotel-second-price" style={{ textAlign: 'center' }}>
                                    <span className="total-price">Sign-in to reserve this awesome property.</span>
                                </div>
                            }

                        </form>
                    }
                </div>
            </div>
        );
    }
}

HotelReservationPanel.propTypes = {
    startDate: PropTypes.any,
    endDate: PropTypes.any,
    isLogged: PropTypes.bool,
    calendar: PropTypes.any,
    nights: PropTypes.number,
    listing: PropTypes.any,
    loading: PropTypes.bool,
    onApply: PropTypes.func,

    // start Redux props
    dispatch: PropTypes.func,
    userInfo: PropTypes.object,
    paymentInfo: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(HotelReservationPanel));

function mapStateToProps(state) {
    const { userInfo, paymentInfo } = state;
    return {
        userInfo,
        paymentInfo
    };
}