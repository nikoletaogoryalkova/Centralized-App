import React from 'react';

import ProfileHeader from '../ProfileHeader';
import Footer from '../../Footer';

export default class MessagesTravelingPage extends React.Component {
    render() {
        return (
            <div>
                <ProfileHeader />
                <section id="profile-messages-hosting">
                    <div className="container">
                        <ul className="profile-messages-nav">
                            <li><a href="hosting"><h2>Hosting</h2></a></li>
                            <li className="active"><a href="traveling"><h2>Traveling</h2></a></li>
                        </ul>
                        <ul className="profile-messages-hosting-item">
                            <li></li>
                            <li></li>
                            <li>
                                <span className="cnt block">
                                    <span className="block bold">Jaine Davidson</span>
                                    <span className="where block">Heaven - Junior Suite with view</span>
                                </span>
                            </li>
                            <li>
                                <span className="cnt block">Hello! It is a long established fact that a reader will be distrtacted by the readable contnet of a page when looking at its layout</span>
                            </li>
                            <li>
                                <span className="cnt block bold">22 Nov, 2017<br />&nbsp;</span>
                            </li>
                        </ul>
                        <ul className="profile-messages-hosting-item">
                            <li></li>
                            <li></li>
                            <li>
                                <span className="cnt block">
                                    <span className="block bold">Jaine Davidson</span>
                                    <span className="where block">Heaven - Junior Suite with view</span>
                                </span>
                            </li>
                            <li>
                                <span className="cnt block">Hello! It is a long established fact that a reader will be distrtacted by the readable contnet of a page when looking at its layout</span>
                            </li>
                            <li>
                                <span className="cnt block bold">22 Nov, 2017<br />&nbsp;</span>
                            </li>
                        </ul>
                        <ul className="profile-messages-hosting-item">
                            <li></li>
                            <li></li>
                            <li>
                                <span className="cnt block">
                                    <span className="block bold">Jaine Davidson</span>
                                    <span className="where block">Heaven - Junior Suite with view</span>
                                </span>
                            </li>
                            <li>
                                <span className="cnt block">Hello! It is a long established fact that a reader will be distrtacted by the readable contnet of a page when looking at its layout</span>
                            </li>
                            <li>
                                <span className="cnt block bold">22 Nov, 2017<br />&nbsp;</span>
                            </li>
                        </ul>
                        <ul className="profile-messages-hosting-item">
                            <li></li>
                            <li></li>
                            <li>
                                <span className="cnt block">
                                    <span className="block bold">Jaine Davidson</span>
                                    <span className="where block">Heaven - Junior Suite with view</span>
                                </span>
                            </li>
                            <li>
                                <span className="cnt block">Hello! It is a long established fact that a reader will be distrtacted by the readable contnet of a page when looking at its layout</span>
                            </li>
                            <li>
                                <span className="cnt block bold">22 Nov, 2017<br />&nbsp;</span>
                            </li>
                        </ul>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}