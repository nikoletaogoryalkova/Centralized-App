import React from 'react';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import CalendarAside from './CalendarAside';

import CalendarAsideStatic from './CalendarAsideStatic';
import CustomEvent from './CustomEvent';


export default class Calendar extends React.Component {
    render() {
        const CustomToolbar = (toolbar) => {
            const goToBack = () => { toolbar.onNavigate('PREV'); };
            const goToNext = () => { toolbar.onNavigate('NEXT'); };

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
                    {/* 
                    <select value={this.props.selectedListing} onChange={this.props.onListingChange}>
                        {this.props.myListings.map((item, i) => {
                            return <option key={i} value={item.id}>{item.name}</option>
                        })}
                    </select> */}
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

            if (isPastDate) {
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
        };

        const DateCell = ({ range, value, children }) => {
            const now = new Date();
            const afterDaysConst = 89;
            now.setHours(0, 0, 0, 0);

            let dateAfterDays = new Date();
            dateAfterDays.setHours(0, 0, 0, 0);
            dateAfterDays.setDate(dateAfterDays.getDate() + afterDaysConst);

            let isPastDate = (new Date(value).getTime() < now.getTime()) || (new Date(value).getTime() > dateAfterDays);

            return (
                <div className={isPastDate ? "date-in-past" : "rbc-day-bg"} style={{ flexBasis: 14.2857 + '%', maxWidth: 14.2857 + '%', cursor: 'auto' }}>
                    {/* onClick={this.props.onSlotClick} */}
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
            <div className={(this.props.selectedDay !== null && this.props.selectedDay !== '') ? "col-md-12 calendar dynamic-aside" : "col-md-12 calendar"}>
                <div className="col-md-8">
                    <BigCalendar selectable
                        popup
                        events={this.props.allEvents}
                        defaultView='month'
                        step={60}
                        defaultDate={new Date()}
                        onSelectSlot={e => {
                            const now = new Date();
                            now.setHours(0, 0, 0, 0);

                            const afterDaysConst = 89;

                            let dateAfterDays = new Date();
                            dateAfterDays.setHours(0, 0, 0, 0);
                            dateAfterDays.setDate(dateAfterDays.getDate() + afterDaysConst);

                            if ((e.end.getTime() < now.getTime()) || (e.end.getTime() > dateAfterDays)) {
                                return;
                            }
                            this.props.onCancel();
                            this.props.onSelectSlot(e);
                        }}
                        views={['month']}
                        components={{
                            toolbar: CustomToolbar,
                            dateCellWrapper: DateCell,
                            event: CustomEvent
                        }}
                        formats={formats}
                        eventPropGetter={eventStyleGetter}
                    />
                </div>
                {this.props.selectedDay !== null && this.props.selectedDay !== '' ? <CalendarAside onCancel={this.props.onCancel}
                    day={this.props.selectedDay}
                    date={this.props.selectedDate}

                    price={this.props.price}
                    available={this.props.available}
                    onSubmit={this.props.onSubmit}
                    onChange={this.props.onChange}
                    currencySign={this.props.currencySign} /> : <CalendarAsideStatic />}
            </div>
        )
    }
}