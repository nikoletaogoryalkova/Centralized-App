import React from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import '../../../styles/css/components/listing_crud/footer-navigation.css';

export default function FooterNav(props) {
  return (
    <div className="footer-navigation">
      <div className="container">
        <div className="footer-navigation__content">
          <div className="footer-navigation__content__aside"></div>
          <div className="footer-navigation__content__main">
            <NavLink to={props.next} className="btn btn-primary btn-next" onClick={() => props.handleClickNext(props.step)} >Next</NavLink>
            {props.prev && 
              <NavLink to={props.prev} className="btn btn-default btn-back">
                <i className="fa fa-long-arrow-left" aria-hidden="true"></i>&nbsp;Back
              </NavLink>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

FooterNav.propTypes = {
  prev: PropTypes.string,
  next: PropTypes.string,
  step: PropTypes.number,
  handleClickNext: PropTypes.func
};