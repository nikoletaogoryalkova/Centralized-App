import PropTypes from 'prop-types';
import React from 'react';
import { Config } from '../../../config';

export default function MessagesChatUser(props) {
  return (
    <div id="card-user">
      <div className="top">
        <div className="thump" style={{ backgroundImage: 'url(' + Config.getValue('imgHost') + props.userInfo.image + ')' }}></div> {/* pls add style backgound-image the user's thumb */}
        <h2>{props.userInfo.fullName}</h2>
        {/* <h3>London, England</h3> */}
      </div>
      {/* <div className="bottom">
                <ul>
                    <li className="payment"><span className="ico"></span><span>Payment Verified</span></li>
                    <li className="email"><span className="ico"></span><span>Email Verified</span></li>
                    <li className="phone"><span className="ico"></span><span>Phone Verified</span></li>
                    <li className="gid"><span className="ico"></span><span>Goverment ID Verified</span></li>
                </ul>
                <input type="button" className="button" value="View Profile" />
            </div> */}
    </div>
  );
}

MessagesChatUser.propTypes = {
  userInfo: PropTypes.object
};