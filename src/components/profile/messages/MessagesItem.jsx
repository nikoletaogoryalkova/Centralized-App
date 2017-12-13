import React from 'react';

export default class MessagesItem extends React.Component {

    handleClick = (e) => {
        e.preventDefault();
        window.location.href= 'chat';
    };

    render() {
        return (
            <ul className="profile-messages-item" onClick={this.handleClick}>
                <li></li>
                <li><span class="thumb"></span></li> {/* pls add on span.thumb style backgound-image the user's thumb */}
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
        );
    }
}