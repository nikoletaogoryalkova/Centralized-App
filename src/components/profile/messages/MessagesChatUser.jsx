import React from 'react';

export default class MessagesChatUser extends React.Component {
    render() {
        return (
            <div id="card-user">
                <div className="top">
                    <div className="thump"></div> {/* pls add style backgound-image the user's thumb */}
                    <h2>Jaime Davidson</h2>
                    <h3>London, England</h3>
                    <span>
                        Excellent 4.1/5
                        <span className="stars-outer stars-cnt stars-bg">
                            <span className="star"></span>
                            <span className="star"></span>
                            <span className="star"></span>
                            <span className="star"></span>
                            <span className="star"></span>
                            <span className="stars-cnt stars-fg" style={{width:'60%'}}> {/* 20% per rated star */}
                                <span className="stars-cnt stars-over">
                                    <span className="star"></span>
                                    <span className="star"></span>
                                    <span className="star"></span>
                                    <span className="star"></span>
                                    <span className="star"></span>
                                </span>
                            </span>
                        </span>
                        78 Reviews
                    </span>
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