import React from 'react';
import { withRouter } from 'react-router-dom';

import StarCheckbox from './StarCheckbox';
import FiltersCheckbox from './FiltersCheckbox';

import ReactBootstrapSlider from 'react-bootstrap-slider';

import { getPropertyTypes, getAmenitiesFilters } from '../../requester';

class Filters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            propertyTypeFilters: [],
            amenitiesFilters: [],
            selectedStars: new Set(),
            priceValue: [100, 10000],
            selectedPropertyTypes: new Set(),
            selectedAmenities: new Set(),
            loading: true,
        };

        this.changeValue = this.changeValue.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
    }

    async getData() {
        const [propertyTypeFilters, amenitiesFilters] = await Promise.all([getPropertyTypes(), getAmenitiesFilters()]);
        this.setState({
            propertyTypeFilters: propertyTypeFilters.content,
            amenitiesFilters: amenitiesFilters.content,
            loading: false
        });
    }

    componentDidMount() {
        Promise.all([getPropertyTypes(), getAmenitiesFilters()])
            .then((arr) => {
                const [propertyTypeFilters, amenitiesFilters] = arr;
                return [propertyTypeFilters, amenitiesFilters];
            })
            .then(([propertyTypeFilters, amenitiesFilters]) => {
                this.setState({
                    propertyTypeFilters: propertyTypeFilters.content,
                    amenitiesFilters: amenitiesFilters.content,
                    loading: false
                });
            });
    };

    componentWillMount() {
        if (this.props.paramsMap.has("priceMin") && this.props.paramsMap.has("priceMax")) {
            this.setState({ priceValue: this.getPriceValue() });
        }

        this.setState({
            selectedStars: this.getSelectedFilters('propertyStars'),
            selectedPropertyTypes: this.getSelectedFilters('propertyTypes'),
            selectedAmenities: this.getSelectedFilters('propertyAmenities')
        })
    };

    componentWillUnmount() {
        this.setState({ propertyTypeFilters: '', loading: true })
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    toggleStar(label) {
        let stars = this.state.selectedStars;
        if (stars.has(label)) {
            stars.delete(label);
        } else {
            stars.add(label);
        }

        this.props.updateParamsMap('propertyStars', Array.from(stars).join(','));
        this.setState({
            selectedStars: stars,
        });
    };

    toggleAmenity(label) {
        let amenities = this.state.selectedAmenities;
        if (amenities.has(label)) {
            amenities.delete(label);
        } else {
            amenities.add(label);
        }

        this.props.updateParamsMap('propertyAmenities', Array.from(amenities).join(','));
        this.setState({
            selectedAmenities: amenities
        });
    };

    togglePropertyType(label) {
        let propertyTypes = this.state.selectedPropertyTypes;
        if (propertyTypes.has(label)) {
            propertyTypes.delete(label);
        } else {
            propertyTypes.add(label);
        }

        this.props.updateParamsMap('propertyTypes', Array.from(propertyTypes).join(','));
        this.setState({
            selectedPropertyTypes: propertyTypes,
        })
    };

    changeValue(e) {
        let min = e.target.value[0].toString();
        let max = e.target.value[1].toString();

        this.props.updateParamsMap('priceMin', min);
        this.props.updateParamsMap('priceMax', max);
        this.setState({ 
            priceValue: e.target.value 
        });
    }

    getPriceValue() {
        let min = Number(this.props.paramsMap.get("priceMin")) > 100 ? Number(this.props.paramsMap.get("priceMin")) : 100;
        let max = Number(this.props.paramsMap.get("priceMax")) < 5000 ? Number(this.props.paramsMap.get("priceMax")) : 5000;
        return [min, max];
    }

    getSelectedFilters(property) {
        let value = this.props.paramsMap.get(property);
        let result = new Set();
        let selected = [];
        if (value) {

            selected = value.split(',');
            for (let i = 0; i < selected.length; i++) {
                result.add(selected[i]);
            }
        }

        return result;
    };

    clearFilters(e) {
        let stars = new Set();
        let prices = [100, 5000];
        let types = new Set();
        let amenities = new Set();

        this.setState({
            selectedStars: stars,
            priceValue: prices,
            selectedAmenities: amenities,
            selectedPropertyTypes: types,
        });

        this.props.updateParamsMap('propertyStars', Array.from(stars).join(','))
        this.props.updateParamsMap('priceMin', '100');
        this.props.updateParamsMap('priceMax', '5000');
        this.props.updateParamsMap('propertyTypes', Array.from(types).join(','))
        this.props.updateParamsMap('propertyAmenities', Array.from(amenities).join(','))
        this.props.handleSearch(e);
    }

    render() {
        const { loading } = this.state;

        if (loading) {
            return (<div className="loader" />);
        }

        let selectedStars = this.state.selectedStars;
        let selectedPropertyTypes = this.state.selectedPropertyTypes;
        let selectedAmenities = this.state.selectedAmenities;

        return (
            <div className="filter-box">

                <div className="form-group" id="filter-star">
                    <label>Star Rating</label>

                    <div className="filter-stars">
                        <span onClick={() => this.toggleStar("1")}><StarCheckbox text={"1"}
                            checked={selectedStars.has("1")} /></span>
                        <span onClick={() => this.toggleStar("2")}><StarCheckbox text={"2"}
                            checked={selectedStars.has("2")} /></span>
                        <span onClick={() => this.toggleStar("3")}><StarCheckbox text={"3"}
                            checked={selectedStars.has("3")} /></span>
                        <span onClick={() => this.toggleStar("4")}><StarCheckbox text={"4"}
                            checked={selectedStars.has("4")} /></span>
                        <span onClick={() => this.toggleStar("5")}><StarCheckbox text={"5"}
                            checked={selectedStars.has("5")} /></span>
                    </div>
                </div>
                <div className="clearfix" />

                <div className="form-group" id="filter-price">
                    <label>Pricing</label>

                    <div className="filter-price-box">
                        <ReactBootstrapSlider
                            value={this.state.priceValue}
                            slideStop={this.changeValue}
                            step={5}
                            max={5000}
                            min={100}
                            orientation="horizontal"
                            range={true} />
                        <div className="clearfix" />
                    </div>

                    <div id="slider-range" />
                </div>
                <div className="clearfix" />

                <div className="form-group" id="filter-type">
                    <label>Property Type</label>
                    <div className="filter-check-box" id="filter-propertyType">
                        {this.state.propertyTypeFilters.map((item, i) => {
                            return (
                                <div key={i} onClick={() => this.togglePropertyType(item.name)}>
                                    <FiltersCheckbox
                                        key={i}
                                        text={item.name}
                                        count={item.count}
                                        checked={selectedPropertyTypes.has(item.name)} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="form-group" id="filter-amenities">
                    <label>Facility</label>
                    <div className="filter-check-box" id="filter-amenity">
                        {this.state.amenitiesFilters.map((item, i) => {
                            return (
                                <div key={i} onClick={() => this.toggleAmenity(item.name)}>
                                    <FiltersCheckbox
                                        key={i}
                                        text={item.name}
                                        count={item.count}
                                        checked={selectedAmenities.has(item.name)} />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="clearfix" />

                <div className="clearfix" />
                <div className="form-group" id="clear-filter-button">
                    <button type="submit" onClick={this.clearFilters} className="btn btn">Clear Filters</button>
                </div>
                <div className="form-group submit-search-button" id="filter-button">
                    <button type="submit" onClick={this.props.handleSearch} className="btn btn-primary">See Hotels</button>
                </div>
            </div>
        )
    }
}

export default withRouter(Filters);