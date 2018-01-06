import {
    Config
} from "./config";
const host = Config.getValue("apiHost");

const RequestMethod = {
    GET: 0,
    POST: 1
}

function getHeaders(headers = null) {
    headers = headers || {};
    if (localStorage.getItem(Config.getValue("domainPrefix") + '.auth.lockchain')) {
        headers["Authorization"] = localStorage[Config.getValue("domainPrefix") + ".auth.lockchain"];
    }
    return headers;
}

async function sendRequest(endpoint, method, postObj = null, captchaToken = null, headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Captcha': captchaToken
}) {
    let allHeaders = getHeaders(headers);

    let getParams = {
        headers: getHeaders()
    }

    let postParams = {
        headers: allHeaders,
        method: "POST",
        body: JSON.stringify(postObj)
    }

    return fetch(endpoint, RequestMethod.GET === method ? getParams : postParams)
        .then(res => {
            return {
                response: res,
                success: true
            }
        })
        .catch(err => {
            return {
                response: err,
                success: false
            }
        });
}

export function getListings() {
    return sendRequest(`${host}listings?page=1&size=10`, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function getCountries() {
    return sendRequest(`${host}countries?size=10000&sort=name,asc`, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function getCities(countryId) {
    return sendRequest(`${host}countries/${countryId}/cities?size=10000&sort=name,asc`, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function getPropertyTypes() {
    return sendRequest(`${host}property_types`, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function getAmenitiesByCategory() {
    return sendRequest(`${host}categories`, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function getCurrencies() {
    return sendRequest(`${host}currencies`, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function getListingsByFilter(searchTerms) {
    return sendRequest(`${host}/api/filter_listings?${searchTerms}`, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function getAmenitiesFilters() {
    return sendRequest(`${host}amenities`, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function getPropertyById(id) {
    return sendRequest(`${host}listings/${id}`, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function requestBooking(requestInfo, captchaToken) {
    return sendRequest(`${host}reservations/request`, RequestMethod.POST, requestInfo, captchaToken).then(res => {
        return {
            status: res.status,
            body: res.response.json()
        }
    });
}

export async function getLocRate() {
    return sendRequest('https://lockchain.co/marketplace/internal_api/loc_price.php', RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function getCurrentLoggedInUserInfo() {
    return sendRequest(`${host}users/me/edit`, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function updateUserInfo(userObj, captchaToken) {
    return sendRequest(`${host}users/me`, RequestMethod.POST, userObj, captchaToken).then(res => {
        return {
            success: res.success
        };
    });
}

export async function register(userObj, captchaToken) {
    return sendRequest(`${host}users/signup`, RequestMethod.POST, userObj, captchaToken).then(res => {
        return {
            success: res.success
        };
    });
}

export async function login(userObj, captchaToken) {
    return sendRequest(`${host}login`, RequestMethod.POST, userObj, captchaToken, {
    }).then(res => {
        return {
            body: res.response,
            success: (""+res.response.status).indexOf("20") === 0
        };
    });
}

export async function createListing(listingObj, captchaToken) {
    return sendRequest(`${host}listings`, RequestMethod.POST, listingObj, captchaToken).then(res => {
        return {
            success: (""+res.response.status).indexOf("20") === 0
        };
    });
}

export async function editListing(id, listingObj, captchaToken) {
    return sendRequest(`${host}/me/listings/${id}/edit`, RequestMethod.POST, listingObj, captchaToken).then(res => {
        return {
            success: res.success
        };
    });
}

export async function getMyListingById(id) {
    return sendRequest(`${host}/me/listings/${id}`, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function getMyListings(searchTerm) {
    return sendRequest(`${host}users/me/listings${searchTerm !== null && searchTerm !== undefined ? `${searchTerm}&` : '?'}sort=id,desc`, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function getAllMyListings() {
    return sendRequest(`${host}users/me/listings?size=1000000`, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function getMyReservations(searchTerm, size = 20) {
    return sendRequest(`${host}users/me/reservations${searchTerm !== null && searchTerm !== undefined ? `${searchTerm}&` : '?'}sort=id,desc&size=${size}`, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function getMyTrips(searchTerm, size = 20) {
    return sendRequest(`${host}users/me/trips${searchTerm !== null && searchTerm !== undefined ? `${searchTerm}&` : '?'}sort=id,desc&size=${size}`, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function publishCalendarSlot(listingId, slotObj, captchaToken) {
    return sendRequest(`${host}listings/${listingId}/calendar`, RequestMethod.POST, slotObj, captchaToken).then(res => {
        return {
            success: res.success
        }
    });
}

export async function cancelReservation(id, captchaToken) {
    return sendRequest(`${host}reservations/${id}/cancel`, RequestMethod.POST, '', captchaToken).then(res => {
        return res.response.json();
    });
}

export async function acceptReservation(id, captchaToken) {
    return sendRequest(`${host}reservations/${id}/accept`, RequestMethod.POST, '', captchaToken).then(res => {
        return res.response.json();
    });
}

export async function cancelTrip(id, captchaToken) {
    return sendRequest(`${host}trips/${id}/cancel`, RequestMethod.POST, '', captchaToken).then(res => {
        return res.response.json();
    });
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
    const startDateParam = `${startDate.getUTCDate()}/${startDate.getUTCMonth() + 1}/${startDate.getUTCFullYear()}`;
    const endDateParam = `${endDate.getUTCDate()}/${endDate.getUTCMonth() + 1}/${endDate.getUTCFullYear()}`;
    return sendRequest(`${host}calendars/search/findAllByListingIdAndDateBetween?listing=${listingId}&startDate=${startDateParam}&endDate=${endDateParam}&page=${page}&size=${results}${toCode !== null ? "&toCode=" + toCode : ''}`, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}