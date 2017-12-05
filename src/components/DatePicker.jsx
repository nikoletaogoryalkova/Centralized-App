import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

class DatePicker extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {nights: '0'}
        
        this.daterangepickerHandler = this.daterangepickerHandler.bind(this);
    }

    componentWillMount() {
        if(this.props.stay) {
            this.calculateNights(this.props.stay);
        }
    }

    daterangepickerHandler(event) {
        let dates = event.target.value;
        this.calculateNights(dates);
    }

    calculateNights(dates) {
        let dateParts = dates.split(" - ");
        
        if(dateParts.length === 2) {
            let checkInDate = moment(dateParts[0], 'DD/MM/YYYY');
            let checkOutDate = moment(dateParts[1], 'DD/MM/YYYY');

            let timeDiff = checkOutDate.diff(checkInDate);

            if (checkOutDate > checkInDate) {
                let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                this.setState({nights: diffDays})
            }
        }
        else {
            this.setState({nights: 0})
        }
    }
    
    render() {
        let searchNightsWidth = 17.5;
        if(this.props.search) {
            searchNightsWidth = 5;
        }
        return (
            <div>
                <div className="input-daterange">
                    <div className="form-group has-feedback has-feedback-left">
                        <i className="icon icon-calendar form-control-feedback"></i>
                        <span className="icon-check-in">Check in &amp; Check out</span>
                        {/* <DatetimeRangePicker>
                <input onChange={this.onChange} type="text" value={this.state.stay} className="form-control" id="search-daterange" required="required" autoComplete="off" placeholder="Select date" name="stay" />
            </DatetimeRangePicker> */}
                        <input onChange={(event) => { this.props.onChange(event); this.daterangepickerHandler(event); }}
                            className="form-control"
                            value={this.props.stay}
                            required="required"
                            autoComplete="off"
                            placeholder="Select date"
                            name="stay" />
                    </div>
                </div>

                <div id="search-nights" style={{width: searchNightsWidth + '%'}}>
                    <span>{this.state.nights} nights</span>
                </div>
            </div>
        )
    }
}

export default withRouter(DatePicker);