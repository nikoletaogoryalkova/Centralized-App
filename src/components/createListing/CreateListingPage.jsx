import React from 'react';
import { withRouter, NavLink, Switch, Route } from 'react-router-dom';

export default class CreateListingPage extends React.Component {
    render() {
        //create/1/1
        //create/2/1
        this.props.location.pathname

        return (
            <div>
                <h1>Create listing</h1>
                <NavLink className="btn btn-default" activeClassName={'active'} to="/create/a">a</NavLink>
                <NavLink className="btn btn-default" activeClassName={'active'} to="/create/b">b</NavLink>
                <NavLink className="btn btn-default" activeClassName={'active'} to="/create/c">c</NavLink>

                <Switch>
                    <Route path="/create/a" render={() => <h1>A</h1>} />
                    <Route path="/create/b" render={() => <h1>B</h1>} />
                    <Route path="/create/c" render={() => <h1>C</h1>} />
                </Switch>
            </div>
        );
    }
}