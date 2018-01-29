import React from 'react';
import Dropdown from './Dropdown';
import Counter from './Counter';

export default class DropdownCounter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {dropdownName, options, dropdownValue, count, updateDropdown, updateCount } = this.props;

        return (
            <div>
                <Dropdown 
                    options={options}
                    value={dropdownValue}
                    onChange={updateDropdown} /> 
                    
                <Counter 
                    name={dropdownValue} 
                    value={count}
                    onChange={updateCount} />
            </div>  
        );
    }
}