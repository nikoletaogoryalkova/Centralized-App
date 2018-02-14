import { getListings } from '../../requester';

import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import HotelsSearchBar from './search/HotelsSearchBar';
import PopularListingsCarousel from '../common/listing/PopularListingsCarousel';
import ListingTypeNav from '../common/listingTypeNav/ListingTypeNav';

import { getCountries, getCitiesByRegionId } from './dbAccessMock';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        let startDate = moment();
        let endDate = moment().add(1, 'day');

        this.state = {
            country: '',
            countries: undefined,
            city: '',
            cities: undefined,
            startDate: startDate,
            endDate: endDate,
            guests: '2',
            listings: undefined
        };

        this.onChange = this.onChange.bind(this);
        this.handleSelectCountry = this.handleSelectCountry.bind(this);
        this.handleSelectCity = this.handleSelectCity.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDatePick = this.handleDatePick.bind(this);
    }

    componentDidMount() {
        getListings().then(data => {
            this.setState({ listings: data.content });
        });

        getCountries().then(data => {
            this.setState({ countries: data.content });
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }  
    
    handleSelectCountry(country) {
        this.setState({ country: country });
        getCitiesByRegionId(country.value).then(data => {
            this.setState({ cities: data.content });
        });
    }

    handleSelectCity(city) {
        this.setState({ city: city });
    }
    
    handleSearch(e) {
        e.preventDefault();
        
        let queryString = '?';

        queryString += 'countryId=' + this.state.countryId;
        queryString += '&startDate=' + this.state.startDate.format('DD/MM/YYYY');
        queryString += '&endDate=' + this.state.endDate.format('DD/MM/YYYY');
        queryString += '&guests=' + this.state.guests;

        this.props.history.push('/listings' + queryString);
    }    
    
    handleDatePick(event, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate,
        });
    }
    
    render() {
        return (
            <div>
                <header id='main-nav' className="navbar home_page">
                    <div className="container">
                        <h1 className="home_title">Discover your next experience</h1>
                        <h2 className="home_title">Browse for homes &amp; hotels worldwide</h2>
                        <div className="container absolute_box">
                            <ListingTypeNav />
                            <HotelsSearchBar
                                country={this.state.country}
                                countries={this.state.countries}
                                city={this.state.city}
                                cities={this.state.cities}
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                guests={this.state.guests}
                                onChange={this.onChange}
                                handleSelectCountry={this.handleSelectCountry}
                                handleSelectCity={this.handleSelectCity}
                                handleSearch={this.handleSearch}
                                handleDatePick={this.handleDatePick} 
                            />
                        </div>
                    </div>
                </header>

                <section id="popular-hotels-box">
                    <h2>Popular Properties</h2>
                    {!this.state.listings ? <div className="loader"></div> : 
                        this.state.listings && this.state.listings.length > 1 &&
                        <PopularListingsCarousel 
                            listings={this.state.listings} 
                            listingType="hotels" 
                        />
                    }
                    <div className="clearfix"></div>
                </section>
            </div>
        );
    }
}

export default withRouter(HomePage);