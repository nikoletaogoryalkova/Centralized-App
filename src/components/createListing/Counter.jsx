import React from 'react';
import PropTypes from 'prop-types';

import { Config } from '../../config';

export default class Counter extends React.Component {
    constructor(props){
        super(props);
    }

    increment = (e) => {
        e.target.name = this.props.name;
        e.target.value = this.props.value + 1;
        this.props.onChange(e);
    }

    decrement = (e) => {
        e.target.name = this.props.name;
        e.target.value = this.props.value - 1;
        this.props.onChange(e);
    }

    render() {
        const {value } = this.props;
        return (
            <div style={{display: "inline-block"}}>
                <input 
                    type="image" 
                    src={Config.getValue("basePath") + "images/left.png"}
                    onClick={(e) => this.decrement(e)} />
                
                <span 
                    style={{margin: '10px', padding: '10px'}}>
                    {this.props.value}
                </span>
                
                <input 
                    type="image" 
                    src={Config.getValue("basePath") + "images/right.png"}
                    onClick={(e) => this.increment(e)} />
            </div>
        );
    }
}

Counter.propTypes ={
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
}