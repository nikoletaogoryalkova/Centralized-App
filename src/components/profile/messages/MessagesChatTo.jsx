import React from 'react';

export default class MessagesChatTo extends React.Component {
    render() {
        return (
            <div className="message to">
                <ul className="user">
                    <li className="name"><span>Firstname Lastname</span></li>
                    <li className="when"><span>5:01 PM</span></li>
                    <li className="thumb"></li> {/* pls add style backgound-image the user's thumb */}
                </ul>
                <div className="body">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</div>
            </div>
        );
    }
}