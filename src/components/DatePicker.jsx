import DateRangePicker from 'react-bootstrap-daterangepicker';
import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class DatePicker extends React.Component {
    render() {
        let searchNightsWidth = 17.5;
        if (this.props.search) {
            searchNightsWidth = 5;
        }

        return (
            <div>
                <div className="input-daterange">
                    <div className="form-group has-feedback has-feedback-left">
                        <i className="icon icon-calendar form-control-feedback"></i>
                        <span className="icon-check-in">Check in &amp; Check out</span>
                        <DateRangePicker
                            autoUpdateInput={true}
                            onApply={this.props.onApply}
                            isInvalidDate={this.props.isInvalidDate}
                            autoApply={true}
                            startDate={this.props.startDate}
                            endDate={this.props.endDate}
                            minDate={moment().format('DD/MM/YYYY')}
                            maxDate={moment().add(90, 'days').format('DD/MM/YYYY')}
                            locale={{ format: 'DD/MM/YYYY' }}>
                            <input className="form-control"
                                required="required"
                                autoComplete="off"
                                placeholder="Select date"
                                name="stay" />
                        </DateRangePicker>
                    </div>
                </div>

                <div id="search-nights" style={{ minWidth: searchNightsWidth + '%' }}>
                    <span>{this.props.nights} nights</span>
                </div>
            </div>
        );
    }
}

export default withRouter(DatePicker);