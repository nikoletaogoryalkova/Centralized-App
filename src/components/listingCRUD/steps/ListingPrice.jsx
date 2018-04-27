import GuestSettingsAside from '../aside/GuestSettingsAside';
import ListingCrudNav from '../navigation/ListingCrudNav';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import FooterNav from '../navigation/FooterNav';

function ListingPrice(props) {
  const { currency, defaultDailyPrice, cleaningFee, depositRate, currencies } = props.values;

  return (
    <div>
      <ListingCrudNav progress='100%' />
      <div className="container">
        <div className="row">
          <div className="listings create">
            <div className="col-md-3">
              <GuestSettingsAside routes={props.routes} />
            </div>

            {!props.values.loading ? <div className="col-md-9">
              <div className="form-group">
                <h2>Default nightly rate</h2>
                <hr />
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="city">Currency</label>
                      <select
                        onChange={props.onChange}
                        className="form-control"
                        name="currency"
                        value={currency}
                        required="required"
                        id="currency">
                        {currencies.map((item, i) => {
                          return <option key={i} value={item.id}>{item.code}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="defaultDailyPrice">Price per Night</label>
                      <input onChange={props.onChange} type="number" id="defaultDailyPrice" className="form-control" name="defaultDailyPrice" value={defaultDailyPrice} />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="cleaningFee">Cleaning Fee</label>
                      <input onChange={props.onChange} type="number" id="cleaningFee" className="form-control" name="cleaningFee" value={cleaningFee} />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="depositRate">Deposit Required</label>
                      <input onChange={props.onChange} type="number" id="depositRate" className="form-control" name="depositRate" value={depositRate} />
                    </div>
                  </div>
                </div>
              </div>
            </div> : <div className="loader"></div>}
          </div>
        </div>
      </div>
      <FooterNav next={'#'} prev={props.prev} handleClickNext={props.finish} step={10} />
    </div>
  );
}

ListingPrice.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func,
  finish: PropTypes.func,
  prev: PropTypes.string,
  routes: PropTypes.object,

  // Router props
  location: PropTypes.object,
};

export default withRouter(ListingPrice);