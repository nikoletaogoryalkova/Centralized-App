import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import MarkerInfoWindow from './MarkerInfoWindow';
import { withRouter } from 'react-router-dom';
import { ROOMS_XML_CURRENCY } from '../../../../constants/currencies.js';

class MultiMarkerGoogleMap extends Component {
  componentDidMount() {
    this.lat = this.props.lat ? this.props.lat : 0;
    this.lon = this.props.lon ? this.props.lon : 0;
    this.mapInstance = new window.google.maps.Map(this.map, {
      zoom: 12,
      center: { lat: this.lat, lng: this.lon }
    });

    this.markers = [];
    this.infoWindows = [];
    if (this.props.hotels) {
      this.placeMarkers(this.props.hotels, this.infoWindows, 0, this.props.hotels.length);
    }

    this.placeMarkers = this.placeMarkers.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(props) {
    const hasNewCoordinates = props.lat && props.lon && (props.lat !== this.lat || props.lon !== this.lon);
    if (hasNewCoordinates) {
      this.lat = props.lat;
      this.lon = props.lon;
      const latLng = new window.google.maps.LatLng(props.lat, props.lon);
      this.mapInstance.panTo(latLng);
    }

    const { hotels } = props;
    if (hotels) {
      if (props.isFiltered) {
        this.infoWindows = [];
        this.markers.forEach((marker) => {
          marker.setMap(null);
        });

        this.placeMarkers(hotels, this.infoWindows);
      } else {
        this.placeMarkers(hotels, this.infoWindows, hotels.length - 1);
      }
    }
  }

  componentWillUnmount() {
    this.infoWindows = [];
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });
  }

  placeMarkers(hotels, infoWindows, from, to) {
    if (hotels && hotels.length > 0) {
      from = from ? from : 0;
      to = to ? to : hotels.length;

      // TODO: create a single info window to be displayed
      // (function iife(info) {

      // })(this.info);

      for (let i = from; i < to; i++) {
        const hotel = hotels[i];
        const marker = this.createMarker(hotel);
        const infoWindow = this.createInfoWindow(hotel);
        window.google.maps.event.addListener(marker, 'mouseover', function () {
          infoWindows.forEach(i => {
            i.close();
          });

          infoWindow.open(this.mapInstance, marker);
        });

        this.markers.push(marker);
        this.infoWindows.push(infoWindow);
      }

      window.google.maps.event.addListener(this.mapInstance, 'click', function () {
        infoWindows.forEach(i => {
          i.close();
        });
      });
    }
  }

  closeAll() {
    this.markers.forEach((marker) => {
      marker.infoWindow.close(this.mapInstance, marker);
    });
  }

  createMarker(hotel) {
    return new window.google.maps.Marker({
      position: new window.google.maps.LatLng(hotel.lat, hotel.lon),
      title: hotel.name,
      map: this.mapInstance,
    });
  }

  createInfoWindow(hotel) {
    // console.log(hotel);
    const { locRate, rates, isLogged, nights } = this.props;
    const { currency, currencySign } = this.props.paymentInfo;
    const locPrice = ((hotel.price / locRate) / this.props.nights).toFixed(2);
    const fiatPrice = rates && ((hotel.price * (rates[ROOMS_XML_CURRENCY][currency])) / nights).toFixed(2);

    const content = ReactDOMServer.renderToString(
      <MarkerInfoWindow
        hotel={hotel}
        currencySign={currencySign}
        locPrice={locPrice}
        fiatPrice={fiatPrice}
        isLogged={isLogged}
        search={this.props.location.search}
      />
    );

    return new window.google.maps.InfoWindow({
      content: content,
    });
  }

  render() {
    return (
      <div ref={(map) => this.map = map} id='hotels-search-map' style={{ height: '470px', marginBottom: '80px' }}></div>
    );
  }
}

export default withRouter(MultiMarkerGoogleMap);