import React from 'react';

export default class NavLocalization extends React.Component {
    render() {
        return(
            <nav id="localization-nav">
                <div className="container">
                    <ul class="navbar-localization">
                        <li className="conversion">
                            <span className="name">LOC/EUR</span>
                            <span className="value">0.25EUR</span>
                        </li>
                        <li className="balance">
                            <span className="border">
                                <span className="name">Balance:</span>
                                <span className="value">0,035,974.23 LOC</span>                            
                            </span>
                        </li>
                        <li className="language">
                            <span className="name">Language:</span>
                            <span className="value">EN</span>
                        </li>
                        <li className="currency">
                            <span className="name">Currency:</span>
                            <span className="value">USD</span>                        
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}