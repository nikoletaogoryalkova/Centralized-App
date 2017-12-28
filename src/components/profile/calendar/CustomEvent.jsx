import React from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import moment from 'moment';

export default class CustomEvent extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        let popoverClickRootClose = (
            <Popover id="popover-trigger-click-root-close" style={{ zIndex: 10000, color: '#000000' }}>
                <div className="event-popup">
                    <div className="col-md-12 event-popup-header">
                        <div className="col-md-3">
                            <img src="/images/user_img_small.png" alt="guest-profile" />
                        </div>
                        <div className="col-md-9">
                            <span>Guest: <span className="bold">{this.props.event.title}</span></span>
                        </div>
                    </div>
                    <div className="col-md-12 event-popup-body">
                        <p><span class="cnt block"><span class="text-green">{moment(this.props.event.start).format('DD')}</span> {moment(this.props.event.start).format('MMM')}, {moment(this.props.event.start).format('YYYY')} → <span class="text-d87a61">{moment(this.props.event.end).format('DD')}</span> {moment(this.props.event.end).format('MMM')}, {moment(this.props.event.start).format('YYYY')}</span></p>
                        <br />
                        <p className="text-align-left">{moment(this.props.event.end).diff(moment(this.props.event.start), 'days')} nights, {this.props.event.guests} guests</p>
                        <p className="text-align-left price">{this.props.event.price} <span>payout</span></p>
                    </div>
                </div>
            </Popover>
        );
        if (!this.props.event.isReservation) {
            return <div>{this.props.event.title}</div>
        }
        return (
            <div>
                <OverlayTrigger id="help" trigger="click" rootClose container={this} placement="top" overlay={popoverClickRootClose}>
                    <div>{this.props.event.title}</div>
                </OverlayTrigger>

            </div>
        );
    }
}