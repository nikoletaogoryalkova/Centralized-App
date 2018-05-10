import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import PropTypes from 'prop-types';
import { Config } from '../../../config.js';
import moment from 'moment';
import { connect } from 'react-redux';

function PopularDestinationsCarousel(props) {
  const pictures = [
    {
      id: 52612,
      query: 'London',
      image: `${Config.getValue('basePath')}images/destinations/London.png`,
      searchUrl: `hotels/listings?region=52612&currency=${props.paymentInfo.currency}&startDate=${moment().add(1, 'days').format('DD/MM/YYYY')}&endDate=${moment().add(2, 'days').format('DD/MM/YYYY')}&rooms=%5B%7B"adults":2,"children":%5B%5D%7D%5D`,
    },
    {
      id: 18417,
      query: 'Madrid',
      image: `${Config.getValue('basePath')}images/destinations/Madrid.png`,
      searchUrl: `hotels/listings?region=18417&currency=${props.paymentInfo.currency}&startDate=${moment().add(1, 'days').format('DD/MM/YYYY')}&endDate=${moment().add(2, 'days').format('DD/MM/YYYY')}&rooms=%5B%7B"adults":2,"children":%5B%5D%7D%5D`,
    },
    {
      id: 16471,
      query: 'Paris',
      image: `${Config.getValue('basePath')}images/destinations/Paris.png`,
      searchUrl: `hotels/listings?region=16471&currency=${props.paymentInfo.currency}&startDate=${moment().add(1, 'days').format('DD/MM/YYYY')}&endDate=${moment().add(2, 'days').format('DD/MM/YYYY')}&rooms=%5B%7B"adults":2,"children":%5B%5D%7D%5D`,
    },
    {
      id: 15375,
      query: 'Sydney',
      image: `${Config.getValue('basePath')}images/destinations/Sydney.png`,
      searchUrl: `hotels/listings?region=15286&currency=${props.paymentInfo.currency}&startDate=${moment().add(1, 'days').format('DD/MM/YYYY')}&endDate=${moment().add(2, 'days').format('DD/MM/YYYY')}&rooms=%5B%7B"adults":2,"children":%5B%5D%7D%5D`,
    },
  ];

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
        {pictures.map((dest, i) => {
          return (
            <div key={i} className="popular-destination-image-container">
              <div onClick={() => props.handleDestinationPick({ id: dest.id, query: dest.query })}>
                <img src={dest.image} alt={dest.query} />
              </div>
            </div>
          );
        })}
      </OwlCarousel>
    </div>
  );
}

PopularDestinationsCarousel.propTypes = {
  listings: PropTypes.array,
  listingType: PropTypes.string,

  // Redux props
  paymentInfo: PropTypes.object,
};

export default connect(mapStateToProps)(PopularDestinationsCarousel);

function mapStateToProps(state) {
  const { paymentInfo } = state;
  return {
    paymentInfo
  };
}