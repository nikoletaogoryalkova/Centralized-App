import React from 'react';
import { withRouter } from 'react-router-dom';

class StarCheckbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: this.props.checked,
        };
    }

    toggleCheckboxChange(prevState) {
        this.setState({ checked: !prevState });
    };

    render() {
        return (
            <div onClick={x => this.toggleCheckboxChange(this.state.checked)}>
                <span className={`star${this.state.checked ? ' active' : ''}`}>
                    {this.props.text}
                </span>
            </div>
        );
    }
}

export default withRouter(StarCheckbox);