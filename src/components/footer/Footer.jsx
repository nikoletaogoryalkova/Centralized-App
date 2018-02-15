import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer id="main-footer" className="clearfix">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <h3>LockChain</h3>
                            <ul>
                                <li><a >Help</a></li>
                                <li><a >Terms and Conditions</a></li>
                                <li><a >Legal Information</a></li>
                                <li><a >Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <h3>Hosting</h3>
                            <ul>
                                <li><a >Why Host</a></li>
                                <li><a >Hospitality</a></li>
                                <li><a >Responsible Hosting</a></li>
                                <li><a >Community Center</a></li>
                            </ul>
                        </div>

                        <div className="col-md-2"></div>

                        <div className="col-md-2"></div>

                        <div className="col-md-2"></div>

                        <div className="clearfix"></div>
                    </div>
                    <div className="copyright col-md-6">Copyright 2017-2018 LockChain | All rights reserved.</div>

                </div>
            </footer>
        );
    }
}

export default Footer;