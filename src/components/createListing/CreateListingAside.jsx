import React from 'react';
import { withRouter, NavLink, Switch, Route } from 'react-router-dom';

class CreateListingAside extends React.Component {
    render() {
        return (
            <div className="col-md-3">
                {this.props.process === 1 ?
                    <div>
                        <div className="host-step"><NavLink onClick={this.props.stepOn} data-val={2} exact activeClassName="active" to="/listings/create/2">Place Type</NavLink></div>
                        <div className="host-step"><NavLink onClick={this.props.stepOn} data-val={3} exact activeClassName="active" to="/listings/create/3">Accommodation</NavLink></div>
                        <div className="host-step"><NavLink onClick={this.props.stepOn} data-val={4} exact activeClassName="active" to="/listings/create/4">Facilities</NavLink></div>
                        <div className="host-step"><NavLink onClick={this.props.stepOn} data-val={5} exact activeClassName="active" to="/listings/create/5">Safety amenities</NavLink></div>
                        <div className="host-step"><NavLink onClick={this.props.stepOn} data-val={6} exact activeClassName="active" to="/listings/create/6">Location</NavLink></div>
                    </div>
                    : ''}

                {this.props.process === 2 ?
                    <div>
                        <div className="host-step"><NavLink onClick={this.props.stepOn} data-val={7} exact activeClassName="active" to="/listings/create/7">Title</NavLink></div>
                        <div className="host-step"><NavLink onClick={this.props.stepOn} data-val={8} exact activeClassName="active" to="/listings/create/8">Description</NavLink></div>
                        <div className="host-step"><NavLink onClick={this.props.stepOn} data-val={9} exact activeClassName="active" to="/listings/create/9">Photos</NavLink></div>
                    </div> : ''}

                {this.props.process === 3 ?
                    <div>
                        <div className="host-step"><NavLink exact activeClassName="active" to="/listings/create/houserules">House Rules</NavLink></div>
                        <div className="host-step"><NavLink exact activeClassName="active" to="/listings/create/description">Check-in / Check-out</NavLink></div>
                        <div className="host-step"><NavLink exact activeClassName="active" to="/listings/create/cancellation">Cancellation</NavLink></div>
                        <div className="host-step"><NavLink exact activeClassName="active" to="/listings/create/price">Price</NavLink></div>
                    </div> : ''}
            </div>
        )
    }
}

export default withRouter(CreateListingAside);