import React from 'react';
import { withRouter } from 'react-router-dom';

class FiltersCheckbox extends React.Component {
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
                <label className={`filter-check-label${this.state.checked ? ' active' : ''}`}>
                    <span className="filter-check"></span>
                    <span className="filter-check-text">{this.props.text}</span>
                    <span className="filter-check-count">{this.props.count}</span>
                </label>
            </div>
        );
    }
}

export default withRouter(FiltersCheckbox);