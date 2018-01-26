import FiltersCheckbox from './FiltersCheckbox';
import React from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import StarCheckbox from './StarCheckbox';
import { withRouter } from 'react-router-dom';

class Filters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            propertyTypeFilters: this.props.propertyTypes,
            citiesFilters: this.props.cities,
            selectedStars: new Set(),
            priceValue: [1, 10000],
            selectedPropertyTypes: new Set(),
            selectedCities: new Set(),
            loading: true,
        };

        this.changeValue = this.changeValue.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
    }

    componentWillMount() {
        if (this.props.paramsMap.has('priceMin') && this.props.paramsMap.has('priceMax')) {
            this.setState({ priceValue: this.getPriceValue() });
        }

        this.setState({
            selectedStars: this.getSelectedFilters('propertyStars'),
            selectedPropertyTypes: this.getSelectedFilters('propertyTypes')
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    toggleCity(label) {
        let cities = this.state.selectedCities;
        if (cities.has(label)) {
            cities.delete(label);
        } else {
            cities.add(label);
        }

        this.props.updateParamsMap('cities', Array.from(cities).join(','));
        this.setState({
            selectedCities: cities
        });
    }

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
        });
    }

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
        let min = Number(this.props.paramsMap.get('priceMin')) > 1 ? Number(this.props.paramsMap.get('priceMin')) : 1;
        let max = Number(this.props.paramsMap.get('priceMax')) < 5000 ? Number(this.props.paramsMap.get('priceMax')) : 5000;
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
    }

    clearFilters(e) {
        let stars = new Set();
        let prices = [1, 5000];
        let types = new Set();
        let cities = new Set();

        this.setState({
            selectedStars: stars,
            priceValue: prices,
            selectedCities: cities,
            selectedPropertyTypes: types,
        });

        this.props.updateParamsMap('propertyStars', Array.from(stars).join(','));
        this.props.updateParamsMap('priceMin', '1');
        this.props.updateParamsMap('priceMax', '5000');
        this.props.updateParamsMap('propertyTypes', Array.from(types).join(','));
        this.props.updateParamsMap('cities', Array.from(cities).join(','));
        this.props.handleSearch(e);
    }

    render() {
        const { loading } = this.state;

        if (this.props.cities === [] && this.props.propertyTypes === []) {
            return <div className="loader"></div>;
        }

        let selectedPropertyTypes = this.state.selectedPropertyTypes;
        let selectedCities = this.state.selectedCities;
        let citiesFilters = this.props.cities;
        console.log(this.props.cities);
        return (
            <div className="filter-box">
                <div className="form-group">
                    <label>City</label>
                    <div className="filter-check-box">
                        {this.props.cities.map((item, i) => {
                            return (
                                <div key={i} onClick={() => this.toggleCity(item.text)}>
                                    <FiltersCheckbox
                                        key={i}
                                        text={item.text}
                                        count={item.count}
                                        checked={selectedCities.has(item.text)} />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="clearfix" />

                <div className="form-group">
                    <label>Pricing</label>

                    <div className="filter-price-box">
                        <ReactBootstrapSlider
                            value={this.state.priceValue}
                            slideStop={this.changeValue}
                            step={5}
                            max={5000}
                            min={1}
                            orientation="horizontal"
                            range={true} />
                        <div className="clearfix" />
                    </div>
                </div>
                <div className="clearfix" />

                <div className="form-group">
                    <label>Property Type</label>
                    <div className="filter-check-box">
                        {this.props.propertyTypes.map((item, i) => {
                            return (
                                <div key={i} onClick={() => this.togglePropertyType(item.text)}>
                                    <FiltersCheckbox
                                        key={i}
                                        text={item.text}
                                        count={item.count}
                                        checked={selectedPropertyTypes.has(item.text)} />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="clearfix" />

                <div className="form-group">
                    <button type="submit" onClick={this.clearFilters} className="btn btn">Clear Filters</button>
                </div>

                <div className="form-group">
                    <button type="submit" onClick={this.props.handleSearch} className="btn btn-primary">Apply Filters</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Filters);