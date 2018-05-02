import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { React_Bootstrap_Carousel } from 'react-bootstrap-carousel';

function HotelItemCarousel(props) {
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

  return (
    <div>
      {pictures &&
        <React_Bootstrap_Carousel
          animation={false}
          autoplay={false}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          indicators={false}
          className="carousel-fade">
          {pictures.map((item, i) => {
            return (
              <div className="hotel-item" key={i} style={{ backgroundImage: 'url(' + item.thumbnail + ')' }}>
                <Link to={`/${listingsType}/listings/${props.id}${props.location.search}`}></Link>
              </div>
            );
          })}
        </React_Bootstrap_Carousel>
      }
    </div>
  );
}

export default withRouter(HotelItemCarousel);

HotelItemCarousel.propTypes = {
  pictures: PropTypes.string,
  id: PropTypes.number,
  listingsType: PropTypes.string,

  // Router props
  location: PropTypes.object,
};