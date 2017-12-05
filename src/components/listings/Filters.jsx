import React from 'react';
import { withRouter } from 'react-router-dom';
import { getPropertyTypes, getAmenitiesFilters } from '../../requester';
import FiltersSection from './FiltersSection';
import ReactBootstrapSlider from 'react-bootstrap-slider';

class Filters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            propertyTypeFilters: [],
            amenitiesFilters: [],
            loading: true
        }
    }

    componentDidMount() {
        getPropertyTypes().then(data => {
            this.setState({ propertyTypeFilters: data.content });
        });

        getAmenitiesFilters().then(data => {
            this.setState({ amenitiesFilters: data.content });
            this.setState({ loading: false });
        });
    };

    componentWillMount() {
        this.selectedStarFilters = new Set();

        toggleCheckbox = label => {
            if (this.selectedStarFilters.has(label)) {
                this.selectedStarFilters.delete(label);
            } else {
                this.selectedStarFilters.add(label);
            }
            this.selectedStarFilters.forEach(s => console.log(s));
        }
    }

    componentWillUnmount() {
        this.setState({ propertyTypeFilters: '', loading: true })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { loading } = this.state;

        if (loading) {
            return (<div className="loader"></div>);
        }

        return (
            <div className="filter-box">

                <div className="form-group" id="filter-star">
                    <label>Star Rating</label>

                    <div className="filter-stars">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </div>
                </div>
                <div className="clearfix"></div>

                <div className="form-group" id="filter-price">
                    <label>Pricing</label>

                    <div className="filter-price-box">
                        <ReactBootstrapSlider
                            slideStop={this.changeValue}
                            step={5}
                            max={10000}
                            min={100}
                            orientation="horizontal"
                            range={true} />
                        {/* <input id="price-slider" type="text" className="span2" value="" data-slider-min="100"
                            data-slider-max="10000" data-slider-step="5" data-slider-value="[100,10000]" />
                        <span className="pull-left"><span className="min-price-currency">$</span> 10</span>
                        <span className="pull-right"><span className="max-price-currency">$</span> 10000</span> */}
                        <div className="clearfix"></div>
                    </div>

                    <div id="slider-range"></div>
                </div>
                <div className="clearfix"></div>

                <div className="form-group" id="filter-type">
                    <label>Property Type</label>
                    <div className="filter-check-box" id="filter-propertyType">
                        {this.state.propertyTypeFilters.map((item, i) => {
                            return <FiltersSection key={i} text={item.name} count={item.count} />
                        })}
                    </div>
                </div>

                <div className="form-group" id="filter-amenities">
                    <label>Facility</label>
                    <div className="filter-check-box" id="filter-amenity">
                        {this.state.amenitiesFilters.map((item, i) => {
                            return <FiltersSection key={i} text={item.name} count={item.count} />
                        })}
                    </div>
                </div>
                <div className="clearfix"></div>

                <div className="clearfix"></div>
                <div className="form-group" id="clear-filter-button">
                    <button type="submit" className="btn btn">Clear Filters</button>
                </div>
                <div className="form-group submit-search-button" id="filter-button">
                    <button type="submit" className="btn btn-primary">See Hotels</button>
                </div>

            </div>
        )
    }
}

export default withRouter(Filters);