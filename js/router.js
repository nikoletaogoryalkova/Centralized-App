class Router {

    /**
     *
     * @param {URLHandler} urlHandler
     */
    constructor(urlHandler) {
        this._routes = [];
        this._urlHandler = urlHandler;
    }

    addRoute(controller, handler) {
        this._routes[controller] = handler;
    }

    listen() {
        $(window).on("hashchange", () => {
            let routeInfo = this._urlHandler.fromHash();
            let controller = this._urlHandler.getController(routeInfo);
            if (controller in this._routes) {
                this._routes[controller](routeInfo);
            }
        }).trigger("hashchange");
    }

}