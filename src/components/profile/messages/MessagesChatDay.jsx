import React from 'react';

import moment from 'moment';

export default class MessagesChatPage extends React.Component {
    render() {
        return (
            <div className="stamp">
                <hr />
                <span>{moment(this.props.date, "DD/MM/YYYY").format("dddd, D MMM, YYYY")}</span>
            </div>
        );
    }
}