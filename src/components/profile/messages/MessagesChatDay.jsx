import React from 'react';

import MessagesChatFrom from './MessagesChatFrom';
import MessagesChatTo from './MessagesChatTo';

export default class MessagesChatPage extends React.Component {
    render() {
        return (
            <div className="day">
                <div className="stamp">
                    <hr />
                    <span>today at 10:39 AM</span>
                </div>
                <MessagesChatFrom />
                <MessagesChatTo />
            </div>
        );
    }
}