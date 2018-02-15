import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function NavLocalization(props) {
    const { currency, locRate } = props.paymentInfo;
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
                    {/* <li className="balance">
                        <span className="border">
                            <span className="name">Balance:</span>
                            <span className="value">0,000,000.00 LOC</span>
                        </span>
                        <span className="plus">
                            <span>+</span>
                        </span>
                    </li> */}
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

NavLocalization.propTypes = {
    // start Redux props
    dispatch: PropTypes.func,
    paymentInfo: PropTypes.object
};

export default connect(mapStateToProps)(NavLocalization);

function mapStateToProps(state) {
    const { paymentInfo } = state;
    return {
        paymentInfo
    };
}