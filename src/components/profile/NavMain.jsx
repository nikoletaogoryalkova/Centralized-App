import React from 'react';

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
                            <img src="../images/logo.png" alt="logo" />
                        </a>
                    </div>
                    <div className="collapse navbar-collapse pull-right" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav" id="top-nav"></ul>
                    </div>
                </div>
            </nav>
        )
    }
}