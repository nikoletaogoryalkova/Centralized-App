import React from 'react';
import Search from './Search';
import ListingSliderBox from './ListingSliderBox';
import OwlCarousel from 'react-owl-carousel';
import Footer from '../Footer'
import { getListings } from '../../requester';

class HomePage extends React.Component {
    constructor() {
        super();
        this.state = { listings: [] };
    };

    componentDidMount() {
        getListings().then(data => {
            this.setState({ listings: data.content })
        });
    };
    render() {
        return (<div>
            <header id='main-nav' className="navbar home_page">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/"><img src="images/logo-w.png" alt='logo' /></a>
                    </div>

                    <div className="collapse navbar-collapse pull-right" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav" id="top-nav">
                        </ul>
                    </div>
                </div>


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
                {this.state.listings.length > 1 &&
                    <OwlCarousel
                        className="owl-theme"
                        loop
                        margin={30}
                        nav
                        navText={["<span class='left_carusel'></span>", "<span class='right_carusel'></span>"]}
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
                            return <ListingSliderBox currency={this.props.currency} currencySign={this.props.currencySign} key={i} listing={item} />
                        })}
                    </OwlCarousel>
                }
                <div className="clearfix"></div>
            </section>
            <Footer />
        </div>
        );
    }
}

export default HomePage;