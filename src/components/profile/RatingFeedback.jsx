import React from 'react';

export default class RatingFeedback extends React.Component {
    render() {
        return (
            <span className="rating-feedback">
                Excellent 4.1/5
                <span className="stars-outer stars-cnt stars-bg">
                    <span className="star"></span>
                    <span className="star"></span>
                    <span className="star"></span>
                    <span className="star"></span>
                    <span className="star"></span>
                    <span className="stars-cnt stars-fg" style={{width:'60%'}}> {/* 20% per rated star */}
                        <span className="stars-cnt stars-over">
                            <span className="star"></span>
                            <span className="star"></span>
                            <span className="star"></span>
                            <span className="star"></span>
                            <span className="star"></span>
                        </span>
                    </span>
                </span>
                78 Reviews
            </span>
        );
    }
}