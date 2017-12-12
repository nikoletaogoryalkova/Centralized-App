import React from 'react';
import { withRouter } from 'react-router-dom';

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <label>
                    <input 
                        onChange={(page, event) => this.props.toggleCheckbox(page, event)} 
                        id="checkBox" name={this.props.name} 
                        type="checkbox" checked={this.props.checked} 
                        />
                    {this.props.text}
                </label>
            </div>
        );
    }
}