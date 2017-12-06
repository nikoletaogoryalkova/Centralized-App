import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Breadcrumb from '../Breadcrumb';
import Filters from './Filters';
import Listing from './Listing';
import {withRouter} from 'react-router-dom';
import { getListingsByFilter } from '../../requester';

class ListingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listings: [],
            listingLoading: true
        }
    }

    componentDidMount() {
        getListingsByFilter().then(data => {
            this.setState({ listings: data.content, listingLoading: false })
        });
    };

    componentWillMount() {
        this.paramsMap = this.getParamsMap();
    };

    getParamsMap() {
        const map = new Map();
        const pairs = this.props.location.search.substr(1).split('&');
        for (let i = 0; i < pairs.length; i++) {
            let pair = pairs[i].split('=');
            map.set(pair[0], this.parseParam(pair[1]));
        }

        return map;
    };

    parseParam(param) {
        return param.split('%20').join(' ');
    };

    render() {
        if (this.state.listingLoading) {
            return <div className="loader"></div>;
        }
        
        return (
            <div>
                <Header />
                <Breadcrumb />
                <section id="hotel-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <Filters paramsMap={this.paramsMap} />
                            </div>
                            <div className="col-md-9">
                                <div className="list-hotel-box" id="list-hotel-box">
                                    {this.state.listings.map((item, i) => {
                                        return <Listing key={i} listing={item} currency={this.props.currency} currencySign={this.props.currencySign} />
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}

export default withRouter(ListingsPage);