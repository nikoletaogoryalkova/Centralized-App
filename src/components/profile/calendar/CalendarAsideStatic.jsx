import { Config } from '../../../config';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';

export default class CalendarAsideStatic extends React.Component {
  render() {
    return <div className="col-md-4">

      <div>
        <NavLink to="/profile/listings/" className="btn btn-primary btn-next" style={{ margin: '10px 0', display: 'block' }}>My Listings</NavLink>
      </div>
      <div className="col-md-12 calendar-aside-static">
        <h2>Adjust Your Prices</h2>
        <img src={Config.getValue('basePath') + 'images/price-statistic.png'} alt="price-statistic" />
        <p>
          Click on specific dates on the calendar to set custom rates and increase your revenue.
        </p>
        <div>
          <form>
            <div className="form-group">
              <h3 className="bold">Default Daily Price</h3>
              <div className="input-group">
                <span className="input-group-addon bold">{this.props.currencySign}</span>
                <input type="number" className="form-control" name="defaultDailyPrice" onChange={this.props.onChange} value={this.props.defaultDailyPrice} />
              </div>
            </div>

            <div className="col-md-12 controls">
              <button className="btn btn-primary btn-next bold" type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.updateDailyPrice();
                }}>Save</button>
            </div>

            <ReCAPTCHA
              ref={el => this.captcha = el}
              size="invisible"
              sitekey={Config.getValue('recaptchaKey')}
              onChange={token => this.props.updateDailyPrice(token)}
            />
          </form>
        </div>
      </div>
    </div>;
  }
}

CalendarAsideStatic.propTypes = {
  currencySign: PropTypes.string,
  onChange: PropTypes.func,
  defaultDailyPrice: PropTypes.number,
  updateDailyPrice: PropTypes.func
};