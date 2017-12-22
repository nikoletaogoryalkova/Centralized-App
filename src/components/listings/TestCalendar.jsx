import React from 'react';
import {withRouter} from 'react-router-dom';

import BigCalendar from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CreateListingGuestSettingsAside from "../createListing/guestSettings/CreateListingGuestSettingsAside";
import {getCalendarByListingIdAndDateRange, getMyReservations, getPropertyById} from "../../requester";


class TestCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listing: null,
            events: null,
            reservations: null
        };
    }


    componentDidMount() {
        let now = new Date();
        let end = new Date();
        const DAY_INTERVAL = 60;
        end.setUTCHours(now.getUTCHours() + 24 * DAY_INTERVAL);
        getCalendarByListingIdAndDateRange(
            this.props.match.params.id,
            now,
            end,
            0,
            DAY_INTERVAL
        ).then(res => {
            let events = [];
            for (let dateInfo of res.content) {
                let color = dateInfo.available ? "white" : "lightcoral";
                events.push(
                    {
                        "title": <span style={{color: color}}><b>{dateInfo.price}</b></span>,
                        "start": new Date(dateInfo.date),
                        "end": new Date(dateInfo.date),
                        "allDay": true
                    }
                )
            }

            this.setState({events: events});
        });

        getMyReservations()
            .then(res => {
                let reservations = res.content.filter(r => r.listingId == this.props.match.params.id);
                let events = [];
                for (let reservation of reservations) {
                    let event = {
                        "title": <span style={{color: "lightgreen"}}>{reservation.guestName}</span>,
                        "start": new Date(reservation.startDate),
                        "end": new Date(reservation.endDate)
                    };
                    events.push(event);
                }


                this.setState({
                    reservations: events
                });
            });

        getPropertyById(this.props.match.params.id)
            .then(res => {
                this.setState({listing: res.content});
            });
    }

    render() {
        if (this.state.listing === null || this.state.events === null || this.state.reservations === null) {
            return <div>Loading...</div>
        }

        let allEvents = this.state.events.concat(this.state.reservations);
        console.log(allEvents);
        return (
            <div>
                <CreateListingGuestSettingsAside />
                <div className="col-md-6">
                    <h2>Manage calendar</h2>
                    <hr/>
                    <div>
                        <BigCalendar selectable
                                     events={allEvents}
                                     defaultView='month'
                                     step={60}
                                     defaultDate={new Date()}
                                     onSelectSlot={(range) => {
                                         console.log(range);
                                         return true;
                                     }}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <p>lqlqlqlq</p>
                </div>
            </div>
        )
    }
}


export default withRouter(TestCalendar);




