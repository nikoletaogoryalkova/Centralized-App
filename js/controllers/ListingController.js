class ListingController {

    /**
     *
     * @param {LockchainRequester} requester
     */
    constructor(requester) {
        this._requester = requester;
    }

    viewAll(routeInfo) {
        console.log(routeInfo);
        return $.when($.get("templates/listings/all.html"))
            .then(allHtml => {
                $("main").html(allHtml);
                return this._requester.getListings();
            })
            .then(ListingsView.renderHotels)
            .then(ListingsView.renderPager);
    }
}