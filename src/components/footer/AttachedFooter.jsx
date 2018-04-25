// import { DropdownButton, MenuItem } from 'react-bootstrap';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setCurrency, setLocRate } from '../../actions/paymentInfo';
import { getLocRateInUserSelectedCurrency } from '../../requester';

class AttachedFooter extends React.Component {
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
      <footer id="attached-footer" className="navbar navbar-fixed-bottom">
        <div className="container">
          <div className="row">

            <div className="col-md-3"></div>

            <div className="col-md-3"></div>

            <div className="col-md-2"></div>

            <div className="col-md-2">
              <div className="dropdown select-language">
                <a className="dropdown-toggle" data-toggle="dropdown">English newest</a>
                <ul className="navbar-dropdown dropdown-menu">
                  <li><a >English</a></li>
                  <li><a >English</a></li>
                </ul>
              </div>
            </div>

            <div className="col-md-2">
              <select
                onChange={(e) => this.props.dispatch(setCurrency(e.target.value))}
                value={this.props.paymentInfo.currency}
                className="currency-switcher">
                <option value="GBP">£ GBP</option>
                <option value="EUR">€ EUR</option>
                <option value="USD">$ USD</option>
              </select>

              {/* <DropdownButton block={true} title={localStorage['currency'] ? localStorage['currency'] : 'USD'} id="bg-nested-dropdown">
                                <MenuItem onClick={() => this.toggleCurrency('GBP')}>£ GBP</MenuItem>
                                <MenuItem onClick={() => this.toggleCurrency('EUR')}>€ EUR</MenuItem>
                                <MenuItem onClick={() => this.toggleCurrency('USD')}>$ USD</MenuItem>
                            </DropdownButton> */}
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

AttachedFooter.propTypes = {
  // start Redux props
  dispatch: PropTypes.func,
  paymentInfo: PropTypes.object
};

export default connect(mapStateToProps)(AttachedFooter);

function mapStateToProps(state) {
  const { paymentInfo } = state;
  return {
    paymentInfo
  };
}
