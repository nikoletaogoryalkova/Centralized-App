import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { setCurrency, setLocRate } from '../../actions/paymentInfo';
import { getLocRateInUserSelectedCurrency } from '../../requester';

import '../../styles/css/components/tabs-component.css';

class NavLocalization extends Component {
  componentDidMount() {
    const { currency, locRate } = this.props.paymentInfo;
    if (localStorage['currency']) setCurrency(localStorage['currency']);
    else localStorage['currency'] = currency;

    if (!locRate) this.getAndSetLocRate(currency);
  }

  componentWillReceiveProps(nextProps) {
    const { currency, locRate } = nextProps.paymentInfo;
    if (!locRate || currency !== this.props.paymentInfo.currency) {
      this.getAndSetLocRate(currency);
      localStorage['currency'] = currency;
    }
  }

  getAndSetLocRate(currency) {
    getLocRateInUserSelectedCurrency(currency).then((data) => {
      this.props.dispatch(setLocRate(data[0][`price_${currency.toLowerCase()}`]));
    });
  }

  render() {
    const { currency, locRate } = this.props.paymentInfo;
    const { locBalance, ethBalance, isLogged } = this.props.userInfo;
    if (!locRate) {
      return <div className="loader sm-none"></div>;
    }

    return (
      <div className="container">
        <div className="source-data">
          <div className="info">
            {this.props.location.pathname !== '/hotels'
              && this.props.location.pathname !== '/homes'
              && (this.props.location.pathname.indexOf('/hotels/listings/book') === -1
              && this.props.location.pathname.indexOf('/profile') === -1)
              && this.props.location.pathname.indexOf('/airdrop') === -1
              ? <ul className="tabset">
                <li><NavLink to='/hotels' activeClassName="active">HOTELS</NavLink></li>
                <li><NavLink to='/homes' activeClassName="active">HOMES</NavLink></li>
              </ul>
              : <div>&nbsp;</div>
            }

            <div className="info-details">
              <span className="cross-rate">LOC/{currency}</span>
              <span className="rate">{Number(locRate).toFixed(2)} {currency}</span>

              {isLogged &&
                <div className="balance-info">
                  <div className="balance">
                    <div className="value">
                      <span>LOC Balance:&nbsp;</span>
                      <span>{locBalance}</span>
                    </div>
                  </div>
                  <div className="balance">
                    <div className="value">
                      <span>ETH Balance:&nbsp;</span>
                      <span>{ethBalance}</span>
                    </div>
                  </div>
                  {/* <a href="#" className="icon-plus"></a> */}
                </div>
              }

              <div className="select">
                <select className="language">
                  <option value="EN">EN</option>
                  {/* <option value="RU">RU</option>
                <option value="GE">GE</option> */}
                </select>
              </div>
              <div className="select">
                <select 
                  className="currency"
                  value={this.props.paymentInfo.currency}
                  onChange={(e) => this.props.dispatch(setCurrency(e.target.value))} 
                >
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NavLocalization.propTypes = {
  // Router props
  location: PropTypes.object,

  // Redux props
  dispatch: PropTypes.func,
  paymentInfo: PropTypes.object,
  userInfo: PropTypes.object
};

function mapStateToProps(state) {
  const { paymentInfo, userInfo } = state;
  return {
    paymentInfo,
    userInfo
  };
}

export default withRouter(connect(mapStateToProps)(NavLocalization));

