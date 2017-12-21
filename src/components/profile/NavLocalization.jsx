import React from 'react';
import { getLocRate } from '../../requester';

export default class NavLocalization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locRate: null,
            loading: true
        }
    }

    componentDidMount() {
        getLocRate().then((data) => {
            this.setState({locRate: data.loc, loading: false})
        })
    }

    render() {
        if(this.state.loading) {
            return <div className="loader"></div>
        }

        return (
            <nav id="localization-nav">
                <div className="container">
                    <ul className="navbar-localization">
                        <li className="conversion">
                            <span className="name">LOC/EUR</span>
                            <span className="value">{this.state.locRate}EUR</span>
                        </li>
                        <li className="balance">
                            <span className="border">
                                <span className="name">Balance:</span>
                                <span className="value">0,000,000.00 LOC</span>
                            </span>
                            <span className="plus">
                                <span>+</span>
                            </span>
                        </li>
                        <li className="language">
                            <span className="name">Language:</span>
                            <span className="value">EN</span>
                        </li>
                        <li className="currency">
                            <span className="name">Currency:</span>
                            <span className="value">USD</span>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}