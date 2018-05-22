import React from 'react';
import PropTypes from 'prop-types';
import HotelsSearchBarDatePicker from './HotelsSearchBarDatePicker';
import moment from 'moment';

// import Autocomplete from 'react-google-autocomplete';

import Select from 'react-select';
import { getRegionsBySearchParameter } from '../../../requester';

function SearchBar(props) {


  // const getAddressComponents = (place) => {
  //     let components = place.address_components;
  //     let result = [];
  //     for (let i = 0; i < components.length; i++) {
  //         let addressComponent = {
  //             name: components[i].long_name,
  //             shortName: components[i].short_name,
  //             type: components[i].types[0]
  //         };
  //         result.push(addressComponent);
  //     }
  //     return result;
  // };

  // const setAddressComponents = (addressComponentsMap) => {
  //     let addressCountry = addressComponentsMap.filter(x => x.type === 'country')[0];
  //     let addressCityName = addressComponentsMap.filter(x => x.type === 'locality')[0];
  //     let addressStateName = addressComponentsMap.filter(x => x.type === 'administrative_area_level_1')[0];

  //     props.onChange({ target: { name: 'country', value: addressCountry ? addressCountry.name : '' }});
  //     props.onChange({ target: { name: 'city', value: addressCityName ? addressCityName.name : '' }});
  //     props.onChange({ target: { name: 'state', value: addressStateName ? addressStateName.name : '' }});
  //     props.onChange({ target: { name: 'countryCode', value: addressCountry ? addressCountry.shortName : '' }});
  // };

  // const handlePlaceSelect = (place) => {
  //     console.log(place);
  //     if (place.address_components !== undefined) {
  //         let addressComponentsMap = getAddressComponents(place);
  //         setAddressComponents(addressComponentsMap);
  //     }
  // };

  const getRegions = (param) => {
    if (!param) {
      return Promise.resolve({ options: [] });
    }

    // if (query.length < 3) {
    //     return Promise.resolve({ options: [] });
    // }

    return getRegionsBySearchParameter(param)
      .then((json) => {
        return { options: json };
      });
  };

  // function onInputKeyDown(event) {
  //     switch (event.keyCode) {
  //     case 9:   // TAB
  //         document.getElementsByName('stay')[0].click();
  //         break;
  //     }
  // }

  const { rooms } = props;
  return (
    <form className="source-panel"  onSubmit={props.handleSearch}>
      <div className="source-panel-select source-panel-item">
        <Select.Async
          placeholder="Choose a location"
          required
          style={{ boxShadow: 'none', border: 'none' }}
          value={props.region}
          onChange={props.handleSelectRegion}
          valueKey={'id'}
          labelKey={'query'}
          loadOptions={getRegions}
          backspaceRemoves={true}
          arrowRenderer={null}
          onSelectResetsInput={false}
          onOpen={props.handleOpenSelect}
          onClose={props.handleCloseSelect}
        />
      </div>

      <div className="check-wrap source-panel-item">
        <div className="check">
          <HotelsSearchBarDatePicker
            id='search-bar-date-picker'
            startDate={props.startDate}
            endDate={props.endDate}
            onApply={props.handleDatePick}
            nights={calculateNights(props.startDate, props.endDate)} />
        </div>

        <div className="days-of-stay">
          <span className="icon-moon"></span>
          <span>{calculateNights(props.startDate, props.endDate)} nights</span>
        </div>
      </div>

      <div className="guest-wrap guests source-panel-item">
        <select className="guest-select" name={'rooms'} value={rooms.length} onChange={props.handleRoomsChange}>
          <option value="1">1 room</option>
          <option value="2">2 rooms</option>
          <option value="3">3 rooms</option>
          <option value="4">4 rooms</option>
          <option value="5">5 rooms</option>
          <option value="6">6 room</option>
          <option value="7">7 rooms</option>
          <option value="8">8 rooms</option>
          <option value="9">9 rooms</option>
          <option value="10">10 rooms</option>
        </select>

        <select name={'adults'} value={props.adults} onChange={props.onChange}>
          <option value="1">1 adult</option>
          <option value="2">2 adults</option>
          <option value="3">3 adults</option>
          <option value="4">4 adults</option>
          <option value="5">5 adults</option>
          <option value="6">6 adult</option>
          <option value="7">7 adults</option>
          <option value="8">8 adults</option>
          <option value="9">9 adults</option>
          <option value="10">10 adults</option>
        </select>

        <div className="select-children" onClick={props.handleToggleChildren}>
          <div>
            {!props.hasChildren
              ? 'No children'
              : 'With children'
            }
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-search">Search</button>
    </form>
  );
}

const calculateNights = (startDate, endDate) => {
  const checkIn = moment(startDate, 'DD/MM/YYYY');
  const checkOut = moment(endDate, 'DD/MM/YYYY');
  return (checkOut > checkIn) ? checkOut.diff(checkIn, 'days') : 0;
};

SearchBar.propTypes = {
  adults: PropTypes.number,
  rooms: PropTypes.array,
  region: PropTypes.object,
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  hasChildren: PropTypes.bool,
  onChange: PropTypes.func,
  handleSearch: PropTypes.func,
  handleDatePick: PropTypes.func,
  handleRoomsChange: PropTypes.func,
  handleSelectRegion: PropTypes.func,
  handleToggleChildren: PropTypes.func,
};

export default SearchBar;