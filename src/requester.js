import {Config} from "./config";
const host = Config.getValue("apiHost");

export async function getListings() {
    const res = await fetch(`${host}api/listings?projection=listings&page=1&size=10`);
    return res.json();
}

export async function getCountries() {
    const res = await fetch(`${host}api/countries?projection=singleCountry`);
    return res.json();
}

export async function getPropertyTypes() {
    const res = await fetch(`${host}api/property_types?projection=property_type`);
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