import React from 'react';

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
                slideshowSpeed={7000}
                leftIcon={this.state.leftIcon}
                rightIcon={this.state.rightIcon}
                indicators={false}
                className="carousel-fade"    >
                {this.props.pictures.map((item, i) => {
                    return (
                        <div className="item" key={i}>
                            <img src={item.thumbnail} alt="" />
                        </div>
                    )
                })}
            </React_Bootstrap_Carousel>
        )
    }
}