import React from 'react';
import { withRouter } from 'react-router-dom';

import BigCalendar from "react-big-calendar";

class TestCalendar extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

        return (
            <div>
                <BigCalendar   selectable
                               events={[]}
                               defaultView='month'
                               defaultDate={new Date()}/>
            </div>
        )
    }
}

export default withRouter(TestCalendar);