import React from 'react';
import { NavLink } from 'react-router-dom';

export default class CreateListingNavigation extends React.Component {
    render() {
        return (
            <div>
                <div><NavLink className="btn btn-block btn-default" onClick={this.props.stepPrev} to={`/listings/create/${this.props.prev}`}>Prev</NavLink></div>
                <div><NavLink className="btn btn-block btn-default" onClick={this.props.stepNext} to={`/listings/create/${this.props.next}`}>Next</NavLink></div>
            </div>
        )
    }
}