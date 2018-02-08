import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { React_Bootstrap_Carousel } from 'react-bootstrap-carousel';

class ListingPictures extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leftIcon: <span className="left-carousel"> </span>,
            rightIcon: <span className="right-carousel"> </span>
        };
    }


    render() {
        let pictures = this.props.pictures;

        if (!pictures) {
            return <div className="loader"></div>;
        }

        if (typeof this.props.pictures === 'string') {
            pictures = JSON.parse(this.props.pictures);
        }

        return (
            <div>
                {pictures && 
                    <React_Bootstrap_Carousel
                        animation={true}
                        autoplay={false}
                        leftIcon={this.state.leftIcon}
                        rightIcon={this.state.rightIcon}
                        indicators={false}
                        className="carousel-fade">
                        {pictures.map((item, i) => {
                            return (
                                <div className="item" key={i}>
                                    <Link to={`/listings/${this.props.id}${this.props.location.search}`}><img src={item.thumbnail} alt="" /></Link>
                                </div>
                            );
                        })}
                    </React_Bootstrap_Carousel>
                }
            </div>
        );
    }
}

export default withRouter(ListingPictures);

ListingPictures.propTypes = {
    pictures: PropTypes.array,
    id: PropTypes.number
};