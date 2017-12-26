import {
    Config
} from "./config";
const host = Config.getValue("apiHost");

export async function getListings() {
    const res = await fetch(`${host}api/listings?projection=singleListing&page=1&size=10`, {
        headers: getHeaders()
    });
    return res.json();
}

export async function getCountries() {
    const res = await fetch(`${host}api/countries?projection=singleCountry`, {
        headers: getHeaders()
    });
    return res.json();
}

export async function getCities(countryId) {
    const res = await fetch(`${host}api/countries/${countryId}/cities?projection=cityNameAndId`, {
        headers: getHeaders()
    });
    return res.json();
}

export async function getPropertyTypes() {
    const res = await fetch(`${host}api/property_types?projection=property_type`, {
        headers: getHeaders()
    });
    return res.json();
}

export async function getAmenitiesByCategory() {
    const res = await fetch(`${host}api/categories?projection=singleCategory`, {
        headers: getHeaders()
    });
    return res.json();
}

export async function getCurrencies() {
    const res = await fetch(`${host}api/currencies?projection=currencyNameAndId`, {
        headers: getHeaders()
    });
    return res.json();
}

export async function getPropertyTypesWithIds() {
    const res = await fetch(`${host}api/property_types?projection=property_type_name_and_id`, {
        headers: getHeaders()
    });
    return res.json();
}

export async function getListingsByFilter(searchTerms) {
    const res = await fetch(`${host}/api/filter_listings?${searchTerms}&projection=listings`, {
        headers: getHeaders()
    });
    return res.json();
}

export async function getAmenitiesFilters() {
    const res = await fetch(`${host}api/amenities?projection=amenity_aggregation`, {
        headers: getHeaders()
    });
    return res.json();
}

export async function getPropertyById(id) {
    const res = await fetch(`${host}api/listings/${id}?projection=singleListing`, {
        headers: getHeaders()
    });
    return res.json();
}

export async function requestBooking(requestInfo) {
    const res = await fetch(`${host}reservation/request`, {
        headers: getHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        method: "POST",
        body: JSON.stringify(requestInfo)
    });

    return res.json();
}

export async function getLocRate() {
    const res = await fetch('https://lockchain.co/marketplace/internal_api/loc_price.php');
    return res.json();
}

export async function getCurrentLoggedInUserInfo() {
    const res = await fetch(`${host}users/me/edit`, {
        headers: getHeaders()
    });

    return res.json();
}

export async function updateUserInfo(userObj) {
    const res = await fetch(`${host}users/me`, {
        headers: getHeaders({
            'Content-Type': 'application/json'
        }),
        method: "PATCH",
        body: JSON.stringify(userObj)
    })
    return res;
}

export async function register(user) {
    const res = await fetch(`${host}users/signup`, {
        headers: getHeaders({
            'Content-Type': 'application/json'
        }),
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

export async function createListing(listingObj) {
    const res = await fetch(`${host}listings`, {
        headers: getHeaders({
            'Content-Type': 'application/json'
        }),
        method: "POST",
        body: JSON.stringify(listingObj)
    });

    return res;
}

export async function getMyListings() {
    const res = await fetch(`${host}users/me/listings`, {
        headers: getHeaders()
    });

    return res.json();
}

export async function getMyReservations() {
    const res = await fetch(`${host}users/me/reservations`, {
        headers: getHeaders({
            'Content-Type': 'application/json'
        }),
    });

    return res.json();
}

export async function getMyTrips() {
    const res = await fetch(`${host}users/me/trips`, {
        headers: getHeaders({
            'Content-Type': 'application/json'
        }),
    });

    return res.json();
}

export async function publishCalendarSlot(listingId, slotObj) {
    const res = await fetch(`${host}listings/${listingId}/calendar`, {
        headers: getHeaders({
            'Content-Type': 'application/json'
        }),
        method: "POST",
        body: JSON.stringify(slotObj)
    })

    return res;
}

export async function cancelReservation(id) {
    const res = await fetch(`${host}reservation/${id}/cancel`, {
        headers: getHeaders(),
        method: "POST"
    });

    return res.json();
}

export async function acceptReservation(id) {
    const res = await fetch(`${host}reservation/${id}/accept`, {
        headers: getHeaders(),
        method: "POST"
    });

    return res.json();
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

function getHeaders(headers = null) {
    headers = headers || {};
    if (localStorage.getItem('.auth.lockchain')) {
        headers["Authorization"] = localStorage[".auth.lockchain"];
    }
    return headers;
}