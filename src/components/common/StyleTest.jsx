import React, { Component } from 'react';
import Select from 'react-select';

export default class StyleTest extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selectedOption: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="container">
        <Select
          style={{ zIndex: '100' }}
          name="form-field-name"
          value={selectedOption}
          onChange={this.handleChange}
          onClose={() => {
            if (this.state.selectedOption && this.state.selectedOption.label === '') {
              this.setState({ selectedOption: null });
            }
          }}
          onOpen={() => {
            if (!this.state.selectedOption) {
              this.setState({ selectedOption: { label: '' } });
            }
          }}
          options={[
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' },
          ]}
        />
      </div>
    );
  }
}