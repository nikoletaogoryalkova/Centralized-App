import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { React_Bootstrap_Carousel as ReactBootstrapCarousel } from 'react-bootstrap-carousel';

function ListingItemPictureCarousel(props) {
  const listingsType = props.listingsType;
  const leftIcon = <span className="left-carousel"> </span>;
  const rightIcon = <span className="right-carousel"> </span>;
  let { pictures } = props;
  if (!pictures) {
    return <div className="loader"></div>;
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
        <Link to={`/${listingsType}/listings/${props.id}${props.location.search}`} key={i}>
          <div className={listingsType + '-item'} style={{ backgroundImage: 'url(' + item.thumbnail + ')' }}>
          </div>
        </Link>
      );
    }
  };

  return (
    <div>
      {pictures &&
        <ReactBootstrapCarousel
          animation={true}
          autoplay={false}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          indicators={false}
          className="carousel-fade"
          onSelect={() => console.log('click')}>
          {pictures.map((item, i) => {
            return getCarouselItem(item, i);
          })}
        </ReactBootstrapCarousel>
      }
    </div>
  );
}

export default withRouter(ListingItemPictureCarousel);

ListingItemPictureCarousel.propTypes = {
  pictures: PropTypes.any,
  id: PropTypes.number,
  listingsType: PropTypes.string,

  // router props
  location: PropTypes.object
};