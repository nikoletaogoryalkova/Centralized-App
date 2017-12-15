import { Config } from "./config";
const host = Config.getValue("apiHost");

export async function getListings() {
    const res = await fetch(`${host}api/listings?projection=singleListing&page=1&size=10`);
    return res.json();
}

export async function getCountries() {
    const res = await fetch(`${host}api/countries?projection=singleCountry`);
    return res.json();
}

export async function getCities(countryId) {
    const res = await fetch(`${host}api/countries/${countryId}/cities?projection=cityNameAndId`);
    return res.json();
}

export async function getPropertyTypes() {
    const res = await fetch(`${host}api/property_types?projection=property_type`);
    return res.json();
}

export async function getAmenitiesByCategory() {
    const res = await fetch(`${host}api/categories?projection=singleCategory`);
    return res.json();
}

export async function getCurrencies() {
    const res = await fetch(`${host}api/currencies?projection=currencyNameAndId`);
    return res.json();
}

export async function getPropertyTypesWithIds() {
    const res = await fetch(`${host}api/property_types?projection=property_type_name_and_id`);
    return res.json();
}

export async function getListingsByFilter(searchTerms) {
    const res = await fetch(`${host}api/listings/search/getAllByFilter?${searchTerms}&projection=listings`);
    return res.json();
}

export async function getAmenitiesFilters() {
    const res = await fetch(`${host}api/amenities?projection=amenity_aggregation`);
    return res.json();
}

export async function getPropertyById(id) {
    const res = await fetch(`${host}api/listings/${id}?projection=singleListing`);
    return res.json();
}

export async function requestBooking(requestInfo) {
    const res = await fetch(`${host}reservation/request`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(requestInfo)
    });

    return res.json();
}

export async function getLocRate() {
    const res = await fetch('https://lockchain.co/marketplace/internal_api/loc_price.php');
    return res.json();
}

export async function register(user) {
    const res = await fetch(`${host}users/signup`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: user
    });
    return res;
}

export async function login(user) {
    const res = await fetch(`${host}login`, {
        method: "POST",
        body: user
    });

    return res;
}

/**
 *
 * @param {int} listingId
 * @param {Date} startDate
 * @param {date} endDate
 * @param {int} page
 * @param {int} results
 * @returns {Promise.<*>}
 */

export async function getCalendarByListingIdAndDateRange(listingId, startDate, endDate, page = 0, results = 20) {
    const startDateParam = `${startDate.getUTCDate()}/${startDate.getUTCMonth()+1}/${startDate.getUTCFullYear()}`;
    const endDateParam = `${endDate.getUTCDate()}/${endDate.getUTCMonth()+1}/${endDate.getUTCFullYear()}`;
    const res = await fetch(`${host}api/calendars/search/findAllByListingIdAndDateBetween?listing=${listingId}&startDate=${startDateParam}&endDate=${endDateParam}&page=${page}&size=${results}&projection=singlePropertyCalendar`);
    return res.json();
}