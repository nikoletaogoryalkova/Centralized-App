import React from 'react';
import BedroomCounter from './BedroomCounter';

export default class LabeledBedroomCounter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { label, name, bedroom, value, onChange, ...props } = this.props;

        return (
            <div>
                <label>
                    {label}
                    <BedroomCounter
                        name={name}
                        bedroom={bedroom}
                        value={value}
                        onChange={onChange}
                        {...props} />
                </label>
            </div>  
        );
    }
}