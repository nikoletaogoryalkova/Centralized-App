import React from 'react';

import { withRouter } from 'react-router-dom';

import BigCalendar from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getCalendarByListingIdAndDateRange, getMyReservations, getPropertyById } from "../../../requester";
import moment from 'moment';
import CalendarAside from './CalendarAside';

export default class Calendar extends React.Component {
    render() {
        const CustomToolbar = (toolbar) => {
            const goToBack = () => { toolbar.onNavigate('PREV'); };
            const goToNext = () => { toolbar.onNavigate('NEXT'); };
            const goToCurrent = () => { toolbar.onNavigate('TODAY'); };

            const label = () => {
                const date = moment(toolbar.date);
                return (
                    <span><b>{date.format('MMMM')}</b><span> {date.format('YYYY')}</span></span>
                );
            };

            return (
                <div className="rbc-toolbar">
                    <div className="rbc-btn-group">
                        <button className="btn-back" onClick={goToBack}>&#8249;</button>
                        <button className="btn-next" onClick={goToNext}>&#8250;</button>
                    </div>

                    <span className="rbc-toolbar-label">{label()}</span>
                </div>
            )
        }

        const eventStyleGetter = (event) => {
            const now = new Date();
            now.setHours(0, 0, 0, 0);

            let isPastDate = new Date(event.end).getTime() < now.getTime();

            let styleNotSelected = {};

            let styleSelected = {
                color: '#FFFFFF',
                backgroundColor: '#a2c5bf',
                position: 'relative',
                top: '-20px'
            }

            if(isPastDate) {
                styleNotSelected["opacity"] = '0.5';
                styleSelected["opacity"] = '0.5';
            }

            if (!event.isReservation) {
                return {
                    style: styleNotSelected
                }
            }
            else {
                return {
                    style: styleSelected
                }
            }
        }

        const DateCell = ({ range, value, children }) => {
            const now = new Date();
            now.setHours(0, 0, 0, 0);

            let isPastDate = new Date(value).getTime() < now.getTime();

            return (
                <div className={isPastDate ? "date-in-past" : "rbc-day-bg"} style={{ flexBasis: 14.2857 + '%', maxWidth: 14.2857 + '%', cursor: 'auto' }}>
                    {children}
                </div>
            )
        }

        const formats = {
            weekdayFormat: (date, culture, localizer) =>
                localizer.format(date, 'dddd', culture)
        }

        moment.locale('ko', {
            week: {
                dow: 1,
                doy: 1,
            },
        });
        BigCalendar.momentLocalizer(moment);

        return (
            <div className="col-md-12 calendar">
                <div className="col-md-8">
                    <BigCalendar selectable
                        events={this.props.allEvents}
                        defaultView='month'
                        step={60}
                        defaultDate={new Date()}
                        onSelectSlot={(e) => {
                            const now = new Date();
                            now.setHours(0,0,0,0);

                            if (e.end.getTime() < now.getTime()) {
                                return;
                            }
                            this.props.onCancel();
                            this.props.onSelectSlot(e);
                        }}
                        views={['month']}
                        components={{
                            toolbar: CustomToolbar,
                            dateCellWrapper: DateCell,
                        }}
                        formats={formats}
                        eventPropGetter={eventStyleGetter}
                    />
                </div>
                {this.props.selectedDay !== null && this.props.selectedDay !== '' && <CalendarAside onCancel={this.props.onCancel}
                    day={this.props.selectedDay}
                    date={this.props.selectedDate}
                    
                    price={this.props.price}
                    available={this.props.available}
                    onSubmit={this.props.onSubmit}
                    onChange={this.props.onChange}
                    getSlotInfo={this.props.getSlotInfo} />}
            </div>
        )
    }
}