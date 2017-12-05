const host = 'http://193.203.198.226:8080/lockchain/';
// const host = 'http://localhost:8080/';

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

export async function getListingsByFilter() {
    const res = await fetch(`${host}api/listings?projection=listings&page=1`);
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