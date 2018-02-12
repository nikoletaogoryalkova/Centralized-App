import { getListings, getCountries } from '../../requester';

import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import SearchBar from '../common/searchbar/SearchBar';
import PopularPropertiesCarousel from './PopularPropertiesCarousel';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        let startDate = moment();
        let endDate = moment().add(1, 'day');

        this.state = {
            countryId: '',
            countries: undefined,
            startDate: startDate,
            endDate: endDate,
            guests: '2',
            listings: undefined
        };

        this.onChange = this.onChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDatePick = this.handleDatePick.bind(this);
    }

    componentDidMount() {
        getListings().then(data => {
            this.setState({ listings: data.content });
        });

        getCountries(true).then(data => {
            this.setState({ countries: data.content });
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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
                            <nav id="second-nav">
                                <div className="container">
                                    <ul className="nav navbar-nav">
                                        <li className="active">
                                            <a>HOMES</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                            
                            <SearchBar
                                countryId={this.state.countryId} 
                                countries={this.state.countries}
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                guests={this.state.guests}
                                onChange={this.onChange}
                                handleSearch={this.handleSearch}
                                handleDatePick={this.handleDatePick} />
                        </div>
                    </div>
                </header>

                <section id="popular-hotels-box">
                    <h2>Popular Properties</h2>
                    {!this.state.listings ? <div className="loader"></div> : 
                        this.state.listings && this.state.listings.length > 1 &&
                        <PopularPropertiesCarousel listings={this.state.listings} />
                    }
                    <div className="clearfix"></div>
                </section>
            </div>
        );
    }
}

export default withRouter(HomePage);