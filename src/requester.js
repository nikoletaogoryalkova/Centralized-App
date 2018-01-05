import {
    Config
} from "./config";
const host = Config.getValue("apiHost");

export async function getListings() {
    const res = await fetch(`${host}listings?page=1&size=10`);
    return res.json();
}

export async function getCountries() {
    const res = await fetch(`${host}countries`, {
        headers: getHeaders()
    });
    return res.json();
}

export async function getCities(countryId) {
    const res = await fetch(`${host}countries/${countryId}/cities`, {
        headers: getHeaders()
    });
    return res.json();
}

export async function getPropertyTypes() {
    const res = await fetch(`${host}property_types`, {
        headers: getHeaders()
    });
    return res.json();
}

export async function getAmenitiesByCategory() {
    const res = await fetch(`${host}categories`, {
        headers: getHeaders()
    });
    return res.json();
}

export async function getCurrencies() {
    const res = await fetch(`${host}currencies`, {
        headers: getHeaders()
    });
    return res.json();
}

export async function getListingsByFilter(searchTerms) {
    const res = await fetch(`${host}/api/filter_listings?${searchTerms}`, {
        headers: getHeaders()
    });
    return res.json();
}

export async function getAmenitiesFilters() {
    const res = await fetch(`${host}amenities`, {
        headers: getHeaders()
    });
    return res.json();
}

export async function getPropertyById(id) {
    const res = await fetch(`${host}listings/${id}`, {
        headers: getHeaders()
    });
    return res.json();
}

export async function requestBooking(requestInfo, captchaToken) {
    const res = await fetch(`${host}reservations/request`, {
        headers: getHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Captcha': captchaToken
        }),
        method: "POST",
        body: JSON.stringify(requestInfo)
    });

    return res;
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

export async function updateUserInfo(userObj, captchaToken) {
    const res = await fetch(`${host}users/me`, {
        headers: getHeaders({
            'Content-Type': 'application/json',
            'Captcha': captchaToken
        }),
        method: "POST",
        body: JSON.stringify(userObj)
    })
    return res;
}

export async function register(user, captchaToken) {
    const res = await fetch(`${host}users/signup`, {
        headers: getHeaders({
            'Content-Type': 'application/json',
            'Captcha': captchaToken
        }),
        method: "POST",
        body: user
    });
    return res;
}

export async function login(user, captchaToken) {
    const res = await fetch(`${host}login`, {
        headers: getHeaders(),
        method: "POST",
        body: user
    });

    return res;
}

export async function createListing(listingObj, captchaToken) {
    const res = await fetch(`${host}listings`, {
        headers: getHeaders({
            'Content-Type': 'application/json',
            'Captcha': captchaToken
        }),
        method: "POST",
        body: JSON.stringify(listingObj)
    });

    return res;
}

export async function editListing(id, listing, captchaToken) {
    const res = await fetch(`${host}/me/listings/${id}/edit`, {
        headers: getHeaders({
            'Content-Type': 'application/json',
            'Captcha': captchaToken
        }),
        method: "POST",
        body: JSON.stringify(listing)
    });

    return res;
}

export async function getMyListingById(id) {
    const res = await fetch(`${host}/me/listings/${id}`, {
        headers: getHeaders({
            'Content-Type': 'application/json'
        })
    });

    return res.json();
}

export async function getMyListings(searchTerm) {
    const res = await fetch(`${host}users/me/listings${searchTerm !== null && searchTerm !== undefined ? `${searchTerm}&` : '?'}sort=id,desc`, {
        headers: getHeaders({
            'Content-Type': 'application/json'
        })
    });

    return res.json();
}

export async function getAllMyListings() {
    const res = await fetch(`${host}users/me/listings?size=1000000`, {
        headers: getHeaders()
    });

    return res.json();
}

export async function getMyReservations(searchTerm) {
    const res = await fetch(`${host}users/me/reservations${searchTerm !== null && searchTerm !== undefined ? `${searchTerm}&` : '?'}sort=id,desc`, {
        headers: getHeaders({
            'Content-Type': 'application/json'
        }),
    });

    return res.json();
}

export async function getMyTrips(searchTerm) {
    const res = await fetch(`${host}users/me/trips${searchTerm !== null && searchTerm !== undefined ? `${searchTerm}&` : '?'}sort=id,desc`, {
        headers: getHeaders({
            'Content-Type': 'application/json'
        }),
    });

    return res.json();
}

export async function publishCalendarSlot(listingId, slotObj, captchaToken) {
    const res = await fetch(`${host}listings/${listingId}/calendar`, {
        headers: getHeaders({
            'Content-Type': 'application/json',
            'Captcha': captchaToken
        }),
        method: "POST",
        body: JSON.stringify(slotObj)
    })

    return res;
}

export async function cancelReservation(id, captchaToken) {
    const res = await fetch(`${host}reservations/${id}/cancel`, {
        headers: getHeaders({
            'Captcha': captchaToken
        }),
        method: "POST"
    });

    return res.json();
}

export async function acceptReservation(id, captchaToken) {
    const res = await fetch(`${host}reservations/${id}/accept`, {
        headers: getHeaders({
            'Captcha': captchaToken
        }),
        method: "POST"
    });

    return res.json();
}

export async function cancelTrip(id, captchaToken) {
    const res = await fetch(`${host}trips/${id}/cancel`, {
        headers: getHeaders({
            'Captcha': captchaToken
        }),
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
export async function getCalendarByListingIdAndDateRange(listingId, startDate, endDate, toCode = null, page = 0, results = 20) {
    const startDateParam = `${startDate.getUTCDate()}/${startDate.getUTCMonth()+1}/${startDate.getUTCFullYear()}`;
    const endDateParam = `${endDate.getUTCDate()}/${endDate.getUTCMonth()+1}/${endDate.getUTCFullYear()}`;
    const res = await fetch(`${host}calendars/search/findAllByListingIdAndDateBetween?listing=${listingId}&startDate=${startDateParam}&endDate=${endDateParam}&page=${page}&size=${results}${toCode !== null ? "&toCode=" + toCode : ''}`);
    return res.json();
}

function getHeaders(headers = null) {
    headers = headers || {};
    if (localStorage.getItem('.auth.lockchain')) {
        headers["Authorization"] = localStorage[".auth.lockchain"];
    }
    return headers;
}