import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../Header';
import PropertyInfo from './PropertyInfo';
import Footer from '../Footer';
import { getPropertyById } from '../../requester';
import moment from 'moment';
const queryString = require('query-string');

class PropertyPage extends React.Component {
    constructor(props) {
        super(props);

        let startDate = moment();
        let endDate = moment().add(1, 'days');

        if (this.props) {
            let queryParams = queryString.parse(this.props.location.search);

            if (queryParams.startDate && queryParams.endDate) {
                startDate = moment(queryParams.startDate, 'DD/MM/YYYY');
                endDate = moment(queryParams.endDate, 'DD/MM/YYYY');
            }
        }

        this.state = {
            startDate: startDate,
            endDate: endDate,
            nights: 0,
            data: null
        };


        this.handleApply = this.handleApply.bind(this);
    };

    componentDidMount() {
        getPropertyById(this.props.match.params.id).then(res => {
            this.setState({ data: res });
        });

        if (this.state.startDate && this.state.endDate) {
            this.calculateNights(this.state.startDate, this.state.endDate);
        }
    }

    handleApply(event, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate,
        });
        this.calculateNights(picker.startDate, picker.endDate);
    }

    calculateNights(startDate, endDate) {
        let checkIn = moment(startDate, 'DD/MM/YYYY');
        let checkOut = moment(endDate, 'DD/MM/YYYY');

        let diffDays = checkOut.diff(checkIn, 'days');

        if (checkOut > checkIn) {
            this.setState({ nights: diffDays })
        }
        else {
            this.setState({ nights: 0 })
        }
    }

    render() {

        if (this.state.data === null) {
            return <div>Loading...</div>;
        }
        return (
            <div key={1}>
                <Header />
                <section className="hotel-gallery">
                    <div className="hotel-gallery-bgr" style={{ 'backgroundImage': 'url(' + this.state.data.pictures[0].original + ')' }}>
                        <div className="container">
                            <a className="btn btn-primary btn-gallery">Open Gallery</a>
                        </div>
                    </div>
                </section>

                <nav id="hotel-nav">
                    <div className="container">
                        <ul className="nav navbar-nav">

                            <li>
                                <a href="#overview">Overview</a>
                            </li>
                            <li>
                                <a href="#facilities">Facilities</a>
                            </li>
                            {this.state.data.descriptionsAccessInfo &&
                                <li>
                                    <a href="#reviews">Access Info</a>
                                </li>
                            }
                            {this.state.data.reviews && this.state.data.reviews.lenght > 0 &&
                                <li>
                                    <a href="#reviews">Reviews</a>
                                </li>
                            }
                            <li>
                                <a href="#map">Location</a>
                            </li>

                        </ul>
                    </div>
                </nav>
                <PropertyInfo nights={this.state.nights} onApply={this.handleApply} startDate={this.state.startDate} endDate={this.state.endDate} data={this.state.data} currency={this.props.currency} currencySign={this.props.currencySign} />
                <Footer />
            </div>
        );
    }
}

export default withRouter(PropertyPage)