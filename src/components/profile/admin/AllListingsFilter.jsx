import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

export default class AllListingsFilter extends React.Component {
  render() {
    if (this.props.loading) {
      return <div className="loader"></div>;
    }

    const renderCountries = this.props.countries.map((item) => {
      return { value: item.id, label: item.name };
    });

    const renderCities = this.props.cities.map((item) => {
      return { value: item.id, label: item.name };
    });

    return (
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={this.props.onSearch}>
            <div className="col-md-3">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="form-control"
                  value={this.props.name}
                  onChange={this.props.onChange} />
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group">
                <input
                  type="text"
                  name="hostEmail"
                  placeholder="Host email"
                  className="form-control"
                  value={this.props.hostEmail}
                  onChange={this.props.onChange} />
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group">
                <Select
                  name="country"
                  placeholder="Country"
                  className="form-control form-control-select"
                  style={{ border: 'none', boxShadow: 'none' }}
                  value={this.props.country}
                  onChange={this.props.updateCountry}
                  options={renderCountries}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <Select
                  name="city"
                  placeholder="City"
                  className="form-control form-control-select"
                  style={{ border: 'none', boxShadow: 'none' }}
                  value={this.props.city}
                  onChange={option => this.props.onSelect('city', option)}
                  options={renderCities}
                />
              </div>
            </div>
            <div className="col-md-2">
              <div>
                <button type="submit" className="btn btn-primary">Search</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AllListingsFilter.propTypes = {
  onSelect: PropTypes.func,
  city: PropTypes.string,
  country: PropTypes.string,
  name: PropTypes.string,
  updateCountry: PropTypes.func,
  countries: PropTypes.array,
  cities: PropTypes.array,
  hostEmail: PropTypes.string,
  loading: PropTypes.bool,
  onSearch: PropTypes.func,
  onChange: PropTypes.func
};