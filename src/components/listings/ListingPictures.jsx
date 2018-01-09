import React from 'react';
import { Link } from 'react-router-dom';

import { React_Bootstrap_Carousel } from 'react-bootstrap-carousel';

export default class ListingPictures extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leftIcon: <span className="left-carousel"> </span>,
            rightIcon: <span className="right-carousel"> </span>
        };
    }

    render() {
        return (
            <React_Bootstrap_Carousel
                animation={true}
                autoplay={false}
                leftIcon={this.state.leftIcon}
                rightIcon={this.state.rightIcon}
                indicators={false}
                className="carousel-fade"    >
                {this.props.pictures.map((item, i) => {
                    return (
                        <div className="item" key={i}>
                            <Link to={`/listings/${this.props.id}`}><img src={item.thumbnail} alt="" /></Link>
                        </div>
                    )
                })}
            </React_Bootstrap_Carousel>
        )
    }
}