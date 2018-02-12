import React from 'react';
import ListingSliderBox from './ListingSliderBox';
import OwlCarousel from 'react-owl-carousel';

export default class PopularPropertiesCarousel extends React.Component {

    shouldComponentUpdate () {
        return false;
    }

    render() {
        return (
            <div>
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
                    {this.props.listings.map((item, i) => {
                        return <ListingSliderBox key={i} listing={item} />;
                    })}
                </OwlCarousel>
            </div>
        );
    }
} 