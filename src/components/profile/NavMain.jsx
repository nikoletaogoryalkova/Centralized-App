import React from 'react';

import { Config } from '../../config';

export default class NavMain extends React.Component {
    render() {
        return (
            <nav id="main-nav" className="navbar">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar">
                            </span><span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">
                            <img src={Config.getValue("basePath") + "images/logo.png"} alt="logo" />
                        </a>
                    </div>
                    <div className="collapse navbar-collapse pull-right" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav session-nav" id="top-nav">
                            <li className="session-nav-hosting session-nav-simple"><span>Hosting</span></li>
                            <li className="session-nav-traveling session-nav-simple"><span>Traveling</span></li>
                            <li className="session-nav-help session-nav-simple"><span>Help</span></li>
                            <li className="session-nav-inbox"><span><img src="/images/mail-notification.png" /></span></li>
                            <li className="session-nav-user"><span><span className="session-nav-user-thumb"></span>Fistname Lastname</span></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}