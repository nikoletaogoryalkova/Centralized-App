import React from 'react';
import PropTypes from 'prop-types';

import { Config } from '../../../config';

export default class BedroomCounter extends React.Component {
    constructor(props){
        super(props);

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    increment = (e) => {
        e.target.name = this.props.name;
        e.target.value = this.props.value + 1;
        this.props.onChange(this.props.bedroom, e);
    }

    decrement = (e) => {
        e.target.name = this.props.name;
        e.target.value = this.props.value - 1;
        this.props.onChange(this.props.bedroom, e);
    }

    render() {
        return (
            <div style={{display: "inline-block"}}>
                <input 
                    type="image" 
                    src={Config.getValue("basePath") + "images/left.png"}
                    alt="plus"
                    onClick={(e) => this.decrement(e)} />
                
                <span 
                    style={{margin: '10px', padding: '10px'}}>
                    {this.props.value}
                </span>
                
                <input 
                    type="image" 
                    src={Config.getValue("basePath") + "images/right.png"}
                    alt="minus"
                    onClick={(e) => this.increment(e)} />
            </div>
        );
    }
}

BedroomCounter.propTypes ={
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}