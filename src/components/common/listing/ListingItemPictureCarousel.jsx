import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { React_Bootstrap_Carousel } from 'react-bootstrap-carousel';

function HomeItemPictureCarousel(props) {
    const listingsType = props.listingsType;
    const leftIcon = <span className="left-carousel"> </span>;
    const rightIcon = <span className="right-carousel"> </span>;
    let { pictures } = props;
    if (!pictures) {
        return <div className="loader"></div>;
    }
    
    if (typeof props.pictures === 'string') {
        pictures = JSON.parse(props.pictures);
    }

    const getCarouselItem = (item, i) => {
        if (listingsType === 'homes') {
            return (
                <div className={listingsType + '-item'} key={i}>
                    <Link to={`/${listingsType}/listings/${props.id}${props.location.search}`}><img src={item.thumbnail} alt="" /></Link>
                </div>
            );
        } else {
            return (
                <Link to={`/${listingsType}/listings/${props.id}${props.location.search}`}>
                    <div className={listingsType + '-item'} key={i} style={{ backgroundImage: 'url(' + item.thumbnail + ')'}}>
                    </div>
                </Link>
            );
        }
    };

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
                        return getCarouselItem(item, i);
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
    listingsType: PropTypes.string,
};