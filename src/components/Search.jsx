import React from 'react';
import { withRouter } from 'react-router-dom';
import { getCountries } from '../requester';
const queryString = require('query-string');

class Search extends React.Component {
    constructor(props) {
        super(props);

        let guests = '';
        let countryId = '';
        let stay = '';

        if (this.props) {
            let queryParams = queryString.parse(this.props.location.search);
            if (queryParams.guests) {
                guests = queryParams.guests;
            }
            if (queryParams.countryId) {
                countryId = queryParams.countryId;
            }
            if (queryParams.startDate && queryParams.endDate) {
                stay = queryParams.startDate + ' - ' + queryParams.endDate;
            }
        }

        this.state = {
            guests: guests,
            stay: stay,
            countryid: countryId,
            countries: []
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        getCountries().then(data => {
            this.setState({ countries: data.content })
        });
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit(e) {
        e.preventDefault();
        let stayDates = this.state.stay.split("-");
        let startDate = stayDates[0].trim();
        let endDate = stayDates[1].trim();

        let queryString = '?';

        queryString += 'countryId=' + this.state.countryid;
        queryString += '&startDate=' + startDate;
        queryString += '&endDate=' + endDate;
        queryString += '&guests=' + this.state.guests;

        this.setState(this.state);
        this.props.history.push('/listings' + queryString);
    }

    render() {
        return (
            <form id="search" onSubmit={this.onSubmit}>
                <div className="form-group has-feedback has-feedback-left" id="location">
                    <i className="icon icon-map form-control-feedback"></i>
                    <select onChange={this.onChange}
                        value={this.state.countryid}
                        className="form-control"
                        id="location-select"
                        name="countryid"
                        required="required">
                        <option disabled value="">Location</option>
                        {this.state.countries.map((item, i) => {
                            return <option key={i} value={item.id}>{item.name}</option>
                        })}
                    </select>
                </div>


                <div className="input-daterange">
                    <div className="form-group has-feedback has-feedback-left">
                        <i className="icon icon-calendar form-control-feedback"></i>
                        <span className="icon-check-in">Check in &amp; Check out</span>
                        {/* <DatetimeRangePicker>
                        <input onChange={this.onChange} type="text" value={this.state.stay} className="form-control" id="search-daterange" required="required" autoComplete="off" placeholder="Select date" name="stay" />
                    </DatetimeRangePicker> */}
                        <input onChange={this.onChange}
                            id="search-daterange"
                            className="form-control"
                            value={this.state.stay}
                            required="required"
                            autoComplete="off"
                            placeholder="Select date"
                            name="stay" />
                    </div>
                </div>

                <div id="search-nights">
                    <span>0 nights</span>
                </div>

                <div className="form-group has-feedback has-feedback-left" id="guests">
                    <i className="icon icon-guest form-control-feedback"></i>
                    <input type="text"
                        id="guests-input"
                        name="guests"
                        className="form-control"
                        onChange={this.onChange}
                        required
                        placeholder="Guests"
                        value={this.state.guests} />
                </div>

                <button className="btn btn-primary" id="btn-home">Search</button>

            </form>
        )
    }
}

export default withRouter(Search);