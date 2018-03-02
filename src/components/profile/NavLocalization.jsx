import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

function NavLocalization(props) {
    console.log(props);
    const { currency, locRate } = props.paymentInfo;
    const { locBalance, ethBalance, isLogged } = props.userInfo;
    if (!locRate) {
        return <div className="loader"></div>;
    }

    return (
        <nav id="localization-nav">
            <div className="container">
                {(props.location.pathname !== '/hotels' 
                    && props.location.pathname !== '/homes'
                    && props.location.pathname.indexOf('/hotels/listings/book') === -1
                    && props.location.pathname.indexOf('/profile') === -1) && 
                    <nav id="second-nav">
                        <ul className="nav navbar-nav">
                            <li><NavLink to='/hotels' activeClassName="active">HOTELS</NavLink></li>
                            <li><NavLink to='/homes' activeClassName="active">HOMES</NavLink></li>
                        </ul>
                    </nav>
                }

                <ul className="navbar-localization">
                    <li className="conversion">
                        <span className="name">LOC/{currency}</span>
                        <span className="value">{Number(locRate).toFixed(2)} {currency}</span>
                    </li>
                    {isLogged && 
                        getBalances(ethBalance, locBalance)
                    }
                    <li className="language">
                        <span className="name">Language:</span>
                        <span className="value">EN</span>
                    </li>
                    {/* <li className="currency">
                        <span className="name">Currency:</span>
                        <span className="value">USD</span>
                    </li> */}
                </ul>
            </div>
        </nav>
    );
}

function getBalances(ethBalance, locBalance) {
    return [
        <li key="0" className="balance">
            <span className="border">
                <span className="name"><b>LOC</b> Balance:</span>
                <span className="value">{locBalance} LOC</span>
            </span>
        </li>,
        <li key="1" className="balance">
            <span className="border">
                <span className="name"><b>ETH</b> Balance:</span>
                <span className="value">{ethBalance} ETH</span>
            </span>
        </li>
    ];
}

NavLocalization.propTypes = {
    // start Redux props
    dispatch: PropTypes.func,
    paymentInfo: PropTypes.object,
    userInfo: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(NavLocalization));

function mapStateToProps(state) {
    const { paymentInfo, userInfo } = state;
    return {
        paymentInfo,
        userInfo
    };
}