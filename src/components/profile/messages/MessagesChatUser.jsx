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
                        <li className="payment"><span class="ico"></span><span>Payment Verified</span></li>
                        <li className="email"><span class="ico"></span><span>Email Verified</span></li>
                        <li className="phone"><span class="ico"></span><span>Phone Verified</span></li>
                        <li className="gid"><span class="ico"></span><span>Goverment ID Verified</span></li>
                    </ul>
                    <input type="button" class="button" value="View Profile" />
                </div>
            </div>
        );
    }
}