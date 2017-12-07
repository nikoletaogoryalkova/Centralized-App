import React from 'react';
import {withRouter} from 'react-router-dom';
import {getPropertyTypes, getAmenitiesFilters} from '../../requester';
import FiltersCheckbox from './FiltersCheckbox';
import StarCheckbox from './StarCheckbox';
import ReactBootstrapSlider from 'react-bootstrap-slider';

class Filters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            propertyTypeFilters: [],
            amenitiesFilters: [],
            priceValue: [100, 10000],
            loading: true,
        };

        this.changeValue = this.changeValue.bind(this);
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
        this.selectedStars = this.getSelectedFilters('propertyStars');
        this.selectedPropertyTypes = this.getSelectedFilters('propertyTypes');
        this.selectedAmenities = this.getSelectedFilters('propertyAmenities');
    };

    componentWillUnmount() {
        this.setState({propertyTypeFilters: '', loading: true})
    };

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    };

    toggleStar(label) {
        if (this.selectedStars.has(label)) {
            this.selectedStars
                .delete(label);
        } else {
            this.selectedStars.add(label);
        }

        this.props.updateParamsMap('propertyStars', Array.from(this.selectedStars).join(','));
    };

    toggleAmenity(label) {
        if (this.selectedAmenities.has(label)) {
            this.selectedAmenities.delete(label);
        } else {
            this.selectedAmenities.add(label);
        }

        this.props.updateParamsMap('propertyAmenities', Array.from(this.selectedAmenities).join(','));
    };

    togglePropertyType(label) {
        if (this.selectedPropertyTypes.has(label)) {
            this.selectedPropertyTypes.delete(label);
        } else {
            this.selectedPropertyTypes.add(label);
        }

        this.props.updateParamsMap('propertyTypes', Array.from(this.selectedPropertyTypes).join(','));
    };

    changeValue(e) {

        let min = e.target.value[0].toString();
        let max = e.target.value[1].toString();

        this.props.updateParamsMap('priceMin', min);
        this.props.updateParamsMap('priceMax', max);
        this.setState({priceValue: e.target.value});
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

    render() {
        const {loading} = this.state;

        if (loading) {
            return (<div className="loader" />);
        }

        return (
            <div className="filter-box">

                <div className="form-group" id="filter-star">
                    <label>Star Rating</label>

                    <div className="filter-stars">
                        <span onClick={() => this.toggleStar("1")}><StarCheckbox text={"1"}
                                                                                 checked={this.selectedStars.has("1")}/></span>
                        <span onClick={() => this.toggleStar("2")}><StarCheckbox text={"2"}
                                                                                 checked={this.selectedStars.has("2")}/></span>
                        <span onClick={() => this.toggleStar("3")}><StarCheckbox text={"3"}
                                                                                 checked={this.selectedStars.has("3")}/></span>
                        <span onClick={() => this.toggleStar("4")}><StarCheckbox text={"4"}
                                                                                 checked={this.selectedStars.has("4")}/></span>
                        <span onClick={() => this.toggleStar("5")}><StarCheckbox text={"5"}
                                                                                 checked={this.selectedStars.has("5")}/></span>
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
                            range={true}/>
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
                                        checked={this.selectedPropertyTypes.has(item.name)}/>
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
                                        checked={this.selectedAmenities.has(item.name)}/>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="clearfix"/>

                <div className="clearfix"/>
                <div className="form-group" id="clear-filter-button">
                    <button type="submit" className="btn btn">Clear Filters</button>
                </div>
                <div className="form-group submit-search-button" id="filter-button">
                    <button type="submit" onClick={this.props.handleSearch} className="btn btn-primary">See Hotels</button>
                </div>
            </div>
        )
    }
}

export default withRouter(Filters);