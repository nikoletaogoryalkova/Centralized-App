import { Config } from '../../../config';
import PropTypes from 'prop-types';
import React from 'react';

export default class BedroomCounter extends React.Component {
    constructor(props) {
        super(props);

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    increment(e) {
        e.target.name = this.props.name;
        e.target.value = this.props.value + 1;
        this.props.onChange(this.props.bedroom, e);
    }

    decrement(e) {
        e.target.name = this.props.name;
        e.target.value = this.props.value - 1;
        this.props.onChange(this.props.bedroom, e);
    }

    render() {
        return (
            <div style={{ display: 'inline-block' }}>
                <span className="counter" onClick={(e) => this.decrement(e)}>&#8722;</span>

                <span
                    style={{ margin: '10px', padding: '10px' }}>
                    {this.props.value}
                </span>

                <span className="counter" onClick={(e) => this.increment(e)}>&#43;</span>
            </div>
        );
    }
}

BedroomCounter.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number
};