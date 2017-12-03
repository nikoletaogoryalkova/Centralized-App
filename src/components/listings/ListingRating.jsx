import React from 'react';
import { withRouter } from 'react-router-dom';

class ListingRating extends React.Component {
    getRatingString(ratingNumber, reviewsCount){
        if(reviewsCount === 0) {
            return '';
        }

        let result = "";
        let ratingRoundedNumber = Math.round(ratingNumber);

        if (ratingRoundedNumber === 5) {
            result += "Excellent";
        }
        else if (ratingRoundedNumber === 4) {
            result += "Very good";
        }
        else if (ratingRoundedNumber === 3) {
            result += "Good";
        }
        else if (ratingRoundedNumber === 2) {
            result += "Sufficient";
        }
        else if (ratingRoundedNumber === 1) {
            result += "Weak";
        }
        else if (ratingRoundedNumber === 0) {
            result += "Poor"
        }
        result += ' ';
        result += Math.round(ratingNumber * 100) / 100 + '/5';
        return result;
    }

    calculateStars(ratingNumber) {
        let starsElements = [];
        let rating = Math.round(ratingNumber);
        for (let i = 0; i < rating; i++) {
            starsElements.push(<span key={i} className="full-star"></span>);
        }
        for (let i = 0; i < 5 - rating; i++) {
            starsElements.push(<span key={100 - i} className="empty-star"></span>);
        }

        return starsElements;
    }

    render() {
        return (
            <div className="list-hotel-rating">
                <div className="list-hotel-rating-count">{this.getRatingString(this.props.rating, this.props.reviewsCount)}</div>
                <div className="list-hotel-rating-stars">
                    {this.calculateStars(this.props.rating)}
                </div>
                <div className="list-hotel-rating-review">{this.props.reviewsCount} Reviews</div>
            </div>
        )
    }
}

export default withRouter(ListingRating);