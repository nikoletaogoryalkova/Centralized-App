import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
                <ul className="navbar-localization">
                    <li className="conversion">
                        <span className="name">LOC/{currency}</span>
                        <span className="value">{locRate} {currency}</span>
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

export default connect(mapStateToProps)(NavLocalization);

function mapStateToProps(state) {
    const { paymentInfo, userInfo } = state;
    return {
        paymentInfo,
        userInfo
    };
}