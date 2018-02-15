import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { React_Bootstrap_Carousel } from 'react-bootstrap-carousel';

function HomeItemPictureCarousel(props) {
    const listingType = props.listingType;
    const leftIcon = <span className="left-carousel"> </span>;
    const rightIcon = <span className="right-carousel"> </span>;
    let { pictures } = props;
    if (!pictures) {
        return <div className="loader"></div>;
    }
    
    if (typeof props.pictures === 'string') {
        console.log(props.pictures)
        pictures = JSON.parse(props.pictures);
    }

    return (
        <div>
            {pictures && 
                <React_Bootstrap_Carousel
                    animation={true}
                    autoplay={false}
                    leftIcon={leftIcon}
                    rightIcon={rightIcon}
                    indicators={false}
                    className="carousel-fade">
                    {pictures.map((item, i) => {
                        return (
                            <div className="item" key={i}>
                                <Link to={`${listingType}/listings/${props.id}${props.location.search}`}><img src={item.thumbnail} alt="" /></Link>
                            </div>
                        );
                    })}
                </React_Bootstrap_Carousel>
            }
        </div>
    );
}

export default withRouter(HomeItemPictureCarousel);

HomeItemPictureCarousel.propTypes = {
    pictures: PropTypes.string,
    id: PropTypes.number,
    listingType: PropTypes.string,
};