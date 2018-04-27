import React from 'react';
import PropTypes from 'prop-types';

import BasicsAside from '../aside/BasicsAside';
import ListingCrudNav from '../navigation/ListingCrudNav';
import FooterNav from '../navigation/FooterNav';

import { Config } from '../../../config';

export default function CreateListingPlaceType(props) {
  const { listingType, propertyType, propertyTypes, roomType, dedicatedSpace, propertySize } = props.values;
  return (
    <div>
      <ListingCrudNav progress='33%' />
      <div className="container">
        <div className="row">
          <div className="listings create">

            <div className="col-md-3">
              <BasicsAside routes={props.routes} />
            </div>
            <div className="reservation-hotel-review-room col-md-8">
              <h2>What kind of place do you want to list?</h2>
              <hr />

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="listing-type">What are you listing?</label>
                    <select
                      onChange={(e) => props.onChange(e)}
                      className="form-control"
                      name="listingType"
                      value={listingType}
                      required="required"
                      id="listing-type">
                      <option value="1">Home</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="property-type">What type of property is this?</label>
                    <select
                      onChange={(e) => props.onChange(e)}
                      value={propertyType}
                      className="form-control"
                      name="propertyType"
                      required="required"
                      id="property-type">
                      <option disabled value="">Type</option>
                      {propertyTypes.map((item, i) => {
                        return <option key={i} value={item.id}>{item.name}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-12">
                        <label>What will your guests have?</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label className="entire custom-radio">
                        <input
                          type="radio"
                          onChange={(e) => props.onChange(e)}
                          name="roomType"
                          checked={roomType === 'entire'}
                          value="entire" />
                        <span className="button"><img src={Config.getValue('basePath') + 'images/icon-check-japonica.png'} alt="radio-home" /></span>
                        <span>Entire Place</span>
                      </label>
                    </div>

                    <div className="col-md-4">
                      <label className="private custom-radio">
                        <input
                          type="radio"
                          onChange={(e) => props.onChange(e)}
                          name="roomType"
                          checked={roomType === 'private'}
                          value="private" />
                        <span className="button"><img src={Config.getValue('basePath') + 'images/icon-check-japonica.png'} alt="radio-home" /></span>
                        <span>Private Place</span>
                      </label>
                    </div>

                    <div className="col-md-4">
                      <label className="shared custom-radio">
                        <input
                          type="radio"
                          onChange={(e) => props.onChange(e)}
                          name="roomType"
                          checked={roomType === 'shared'}
                          value="shared" />
                        <span className="button"><img src={Config.getValue('basePath') + 'images/icon-check-japonica.png'} alt="radio-home" /></span>
                        <span>Shared Place</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <br />
                  <div className="form-group">
                    <label>Is this set up as dedicated guest space?</label>
                    <br />

                    <input type="radio" onChange={(e) => props.onChange(e)} name="dedicatedSpace" id="dedicated-space-yes" className="radio-input-group" checked={dedicatedSpace === 'true'} value="true" />
                    <label htmlFor="dedicated-space-yes">Yes, it&rsquo;s primarily set up for guests</label>
                    <br />

                    <input type="radio" onChange={(e) => props.onChange(e)} name="dedicatedSpace" id="dedicated-space-no" className="radio-input-group" checked={dedicatedSpace === 'false'} value="false" />
                    <label htmlFor="dedicated-space-no">No, I keep my personal belongings here</label>
                  </div>
                </div>

                <div className="clearfix"></div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="property-size">Please enter the size of your property</label>
                    <div className="input-group">
                      <input onChange={(e) => props.onChange(e)} type="number" className="form-control" id="property-size" name="propertySize" value={propertySize} />
                      <span className="input-group-addon">m&sup2;</span>
                    </div>
                  </div>
                </div>

                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterNav prev={props.prev} next={props.next} handleClickNext={props.updateProgress} step={2}/>
    </div>
  );
}

CreateListingPlaceType.propTypes = {
  values: PropTypes.any,
  onChange: PropTypes.func,
  updateProgress: PropTypes.func,
  prev: PropTypes.string,
  next: PropTypes.string,
  routes: PropTypes.object,
};