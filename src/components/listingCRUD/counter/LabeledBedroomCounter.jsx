import BedroomCounter from './BedroomCounter';
import React from 'react';

export default class LabeledBedroomCounter extends React.Component {
    render() {
        const { label, name, bedroom, value, onChange, ...props } = this.props;

        return (
            <div>
                <label>
                    <span className="counter-label">{label}</span>
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