import { getListings, getLocRate } from '../../requester';

import Footer from '../footer/Footer';
import ListingSliderBox from './ListingSliderBox';
import OwlCarousel from 'react-owl-carousel';
import PropTypes from 'prop-types';
import React from 'react';
import Search from './Search';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listings: null,
            locRate: null,
            loading: true
        };
    }

    componentDidMount() {
        getListings().then(data => {
            this.setState({ listings: data.content });
        });
        getLocRate().then((data) => {
            this.setState({ locRate: data[0].price_eur, loading: false });
        });
    }
    render() {
        return (<div>
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
                        <div id="search-bar">
                            <Search />
                        </div>
                    </div>
                </div>
            </header>

            <section id="popular-hotels-box">
                <h2>Popular Properties</h2>
                {this.state.loading && this.state.listings === null ? <div className="loader"></div> : this.state.listings && this.state.listings.length > 1 &&
                    <OwlCarousel
                        className="owl-theme"
                        loop
                        mouseDrag={false}
                        autoplay={false}
                        margin={30}
                        nav
                        navText={['<span class=\'left_carusel\'></span>', '<span class=\'right_carusel\'></span>']}
                        items={4}
                        responsiveClass
                        dots={false}
                        responsive={{
                            0: {
                                items: 1
                            },
                            768: {
                                items: 3
                            },
                            960: {
                                items: 4
                            },
                            1200: {
                                items: 4
                            }
                        }}>
                        {this.state.listings.map((item, i) => {
                            return <ListingSliderBox locRate={this.state.locRate} currency={this.props.currency} currencySign={this.props.currencySign} key={i} listing={item} />;
                        })}
                    </OwlCarousel>
                }
                <div className="clearfix"></div>
            </section>
        </div>
        );
    }
}

HomePage.propTypes = {
    currency: PropTypes.string,
    currencySign: PropTypes.string
};

export default HomePage;