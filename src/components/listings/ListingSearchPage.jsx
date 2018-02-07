import PropTypes from 'prop-types';
import React from 'react';
import Filters from './Filters';
import LPagination from '../common/LPagination';
import Listing from './Listing';

export default class ListingSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }
    
    render() {
        const listings = this.props.listings;
        const hasLoadedListings = listings ? true : false;
        const hasListings = hasLoadedListings && listings.length > 0 && listings[0].hasOwnProperty('defaultDailyPrice');

        let renderListings;

        if (!hasLoadedListings || this.props.loading === true) {
            renderListings = <div className="loader"></div>;
        } else if (!hasListings) {
            renderListings = <div className="text-center"><h3>No results</h3></div>;
        } else {
            renderListings = listings.map((item, i) => {
                return <Listing key={i} listing={item} />;
            });
        }

        const { countryId, cities, citiesToggled, propertyTypes, propertyTypesToggled, priceValue, loading, currentPage, totalItems } = this.props;
        const { setPriceValue, handleFilter, toggleFilter, clearFilters, onPageChange } = this.props;

        return (
            <div>
                <section id="hotel-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <Filters 
                                    countryId={countryId}
                                    cities={cities}
                                    citiesToggled={citiesToggled}
                                    propertyTypes={propertyTypes}
                                    propertyTypesToggled={propertyTypesToggled}
                                    priceValue={priceValue}
                                    setPriceValue={setPriceValue}
                                    handleFilter={handleFilter} 
                                    toggleFilter={toggleFilter}
                                    clearFilters={clearFilters} />
                            </div>
                            <div className="col-md-9">
                                <div className="list-hotel-box" id="list-hotel-box">
                                    
                                    {renderListings}

                                    <LPagination
                                        loading={loading}
                                        onPageChange={onPageChange}
                                        currentPage={currentPage}
                                        totalElements={totalItems}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

ListingSearchPage.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
};