import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrency, setLocRate } from '../../actions/paymentInfo';
import { getLocRateInUserSelectedCurrency } from '../../requester';

import '../../styles/css/components/footer/footer-component.css';

class Footer extends React.Component {
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
    return (
      <footer id="footer">
        <div className="container">
          <div className="top-footer">
            <nav className="footer-nav">
              <ul>
                <li>
                  <ul>
                    <li>
                      <h5>LockTrip</h5>
                    </li>
                    <li><a href="#">Help</a></li>
                    <li><a href="#">Terms and Conditions</a></li>
                    <li><a href="#">Legal Information</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li>
                      <h5>Hosting</h5>
                    </li>
                    <li><a href="#">Why Host</a></li>
                    <li><a href="#">Hospitality</a></li>
                    <li><a href="#">Responsible Hosting</a></li>
                    <li><a href="#">Community Center</a></li>
                  </ul>
                </li>
              </ul>
            </nav>
            <div className="language-and-currency">
              <div className="select">
                <select className="language">
                  <option value="English" selected>English</option>
                  {/* <option value="Deutch">Deutch</option>
                  <option value="Espanol">Espanol</option> */}
                </select>
              </div>
              <div className="select">
                <select className="currency"
                  value={this.props.paymentInfo.currency}
                  onChange={(e) => this.props.dispatch(setCurrency(e.target.value))} 
                >
                  <option value="EUR" selected>Euro</option>
                  <option value="USD">US Dollar</option>
                  <option value="GBP">GB Pound</option>
                </select>
              </div>
            </div>
          </div>
          <div className="bottom-footer">
            <span>Copyright 2017 LockChain</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
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

export default withRouter(connect(mapStateToProps)(Footer));
