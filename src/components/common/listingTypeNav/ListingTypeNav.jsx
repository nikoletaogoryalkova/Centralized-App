import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { setCurrency } from '../../../actions/paymentInfo';

function ListingTypeNav(props) {
    return (
        <div>
            <nav id="second-nav">
                <div className="container">
                    <ul className="nav navbar-nav">
                        { props.match.path.includes('hotels') ? <li><NavLink to='/hotels' activeClassName="active">HOTELS</NavLink></li> : null }
                        <li><NavLink to='/homes' activeClassName="active">HOMES</NavLink></li>
                    </ul>

                    { props.match.path.includes('hotels') ?
                        <div className="navbar-right dropdowns">
                            <div className="navbar-text">Language:</div>
                            <div className="navbar-text" style={{ color: '#d87a61', marginLeft: 0 }}>EN</div>
                            <div className="navbar-text">Currency:</div>
                            <div className="navbar-text" style={{ color: '#d87a61', marginLeft: 0 }}>{props.paymentInfo.currency}</div>
                        </div> :
                        null }
                </div>
            </nav>
        </div>
    );
}

ListingTypeNav.propTypes = {
    // start Router props
    match: PropTypes.object.isRequired,

    // start Redux props
    dispatch: PropTypes.func,
    paymentInfo: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(ListingTypeNav));

function mapStateToProps(state) {
  const { paymentInfo } = state;
  return {
    paymentInfo
  };
}