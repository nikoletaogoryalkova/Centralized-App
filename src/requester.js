const host = 'http://localhost:8080/';

export async function getListings() {
    const res = await fetch(`${host}api/listings?projection=listings&page=1`);
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

export async function getPropertyById(id) {
    const res = await fetch((`${host}api/listings/${id}?projection=singleListing`));
    return res.json();
}