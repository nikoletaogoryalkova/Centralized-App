import React from 'react';
import RatingFeedback from '../RatingFeedback';

export default class MessagesChatUser extends React.Component {
    render() {
        return (
            <div id="card-user">
                <div className="top">
                    <div className="thump"></div> {/* pls add style backgound-image the user's thumb */}
                    <h2>Jaime Davidson</h2>
                    <h3>London, England</h3>
                    <RatingFeedback />
                </div>
                <div className="bottom">
                    <ul>
                        <li className="payment"><span className="ico"></span><span>Payment Verified</span></li>
                        <li className="email"><span className="ico"></span><span>Email Verified</span></li>
                        <li className="phone"><span className="ico"></span><span>Phone Verified</span></li>
                        <li className="gid"><span className="ico"></span><span>Goverment ID Verified</span></li>
                    </ul>
                    <input type="button" className="button" value="View Profile" />
                </div>
            </div>
        );
    }
}