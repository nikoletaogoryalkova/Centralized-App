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

        let { startDate, endDate } = this.props;

        let label = '';
        let start = startDate && startDate.format('DD/MM/YYYY') || '';
        let end = endDate && endDate.format('DD/MM/YYYY') || '';
        label = start + ' - ' + end;
        if (start === end) {
            label = start;
        }

        let pickerProps = {
            startDate,
            endDate,
        };

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
                            minDate={moment().format('DD/MM/YYYY')}
                            maxDate={moment().add(90, 'days').format('DD/MM/YYYY')}
                            locale={{ format: 'DD/MM/YYYY' }}
                            {...pickerProps}>
                            <input className="form-control"
                                required="required"
                                autoComplete="off"
                                placeholder="Select date"
                                name="stay"
                                value={label} />
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