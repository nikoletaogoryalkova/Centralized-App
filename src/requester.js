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
            if (!res.ok) {
                return {
                    response: res.json().then(r => {
                        if (r.errors && r.errors["ExpiredJwt"]) {
                            localStorage.removeItem(Config.getValue("domainPrefix") + ".auth.lockchain");
                            localStorage.removeItem(Config.getValue("domainPrefix") + ".auth.username");
                            window.location.reload();
                        }
                        return r;
                    }),
                    success: res.ok
                }
            } else {
                return {
                    response: res,
                    success: res.ok
                }
            }
        });
}

export function getListings() {
    return sendRequest(`${host}listings?page=1&size=10`, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function getCountries(hasListings = false) {
    let url = `${host}countries?`;
    if (hasListings) {
        url += "hasListings=true&";
    }
    url += "size=10000&sort=name,asc";

    return sendRequest(url, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function getCities(countryId, hasListings = false) {
    let url = `${host}countries/${countryId}/cities?`;
    if (hasListings) {
        url += "hasListings=true&";
    }
    url += "size=10000&sort=name,asc";

    return sendRequest(url, RequestMethod.GET).then(res => {
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
    return sendRequest(`${host}api/filter_listings?${searchTerms}`, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function getMyConversations() {
    return sendRequest(`${host}users/me/conversations`, RequestMethod.GET).then(res => {
        return res.response.json();
    });
}

export async function getChatMessages(id, page = 0) {
    return sendRequest(`${host}users/me/conversations/${id}?page=${page}`, RequestMethod.GET).then(res => {
        return res.response.json();
    })
}

export async function changeMessageStatus(conversationObj) {
    return sendRequest(`${host}users/me/conversations`, RequestMethod.POST, conversationObj).then(res => {
        return res.response.json();
    })
}

export async function sendMessage(messageObj, id) {
    return sendRequest(`${host}users/me/conversations/${id}`, RequestMethod.POST, messageObj).then(res => {
        return res.response.json();
    })
}

export async function getCountOfUnreadMessages() {
    return sendRequest(`${host}users/me/messages/count`, RequestMethod.GET).then(res => {
        return res.response.json();
    })
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
    return fetch('https://api.coinmarketcap.com/v1/ticker/lockchain/?convert=EUR').then(res => {
        return res.json();
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
        return res;
    });
}

export async function login(userObj, captchaToken) {
    return sendRequest(`${host}login`, RequestMethod.POST, userObj, captchaToken, {}).then(res => {
        return res;
    });
}

export async function createListing(listingObj, captchaToken) {
    return sendRequest(`${host}listings`, RequestMethod.POST, listingObj, captchaToken).then(res => {
        return res;
    });
}

export async function editListing(id, listingObj, captchaToken) {
    return sendRequest(`${host}me/listings/${id}/edit`, RequestMethod.POST, listingObj, captchaToken).then(res => {
        return {
            success: ("" + res.response.status).indexOf("20") === 0
        };
    });
}

export async function deleteListing(id, captchaToken) {
    return sendRequest(`${host}me/listings/${id}/delete`, RequestMethod.POST, {}, captchaToken).then(res => {
        return {
            success: ("" + res.response.status).indexOf("20") === 0
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

export async function cancelTrip(id, cancelTripObj, captchaToken) {
    return sendRequest(`${host}trips/${id}/cancel`, RequestMethod.POST, cancelTripObj, captchaToken).then(res => {
        return res.response.json();
    });
}

/**
 *
 * @param {obj} email
 */
export async function postRecoveryEmail(email, captchaToken) {
    return sendRequest(`${host}users/resetPassword/token`, RequestMethod.POST, email, captchaToken).then(res => {
        return {
            success: (""+res.response.status).indexOf("20") === 0
        };
    });
}

/**
 *
 * @param {String} token
 */
export async function sendRecoveryToken(token) {
    return sendRequest(`${host}users/resetPassword/confirm?token=${token}`, RequestMethod.GET).then(res => {
        return {
            success: (""+res.response.status).indexOf("20") === 0
        };
    });
}

/**
 * 
 * Object should contain password and token
 * @param {obj} postObj
 */
export async function postNewPassword(postObj, captchaToken) {
    return sendRequest(`${host}users/resetPassword/change`, RequestMethod.POST, postObj, captchaToken).then(res => {
        return {
            success: (""+res.response.status).indexOf("20") === 0
        };
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