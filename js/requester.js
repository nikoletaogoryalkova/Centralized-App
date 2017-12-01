class LockchainRequester {
     constructor(jquery, apiHost) {
         this._jq = jquery;
         this._apiHost = apiHost;
         if (!this._apiHost.endsWith("/")) {
             this._apiHost += "/";
         }
         this._lockRate = null;
     }

     getListings(filter = null, page = 0) {
         let url = this._apiHost + "api/listings/search/getAllByFilter";
         url += filter ? filter : "?";
         url += "&projection=listings";
         url += "&page=" + page;
         return this._jq.when(this._jq.get(url));
     }

     getListing(id) {
         let url = this._apiHost + "api/listings/" + id;
         url += "?projection=singleListing";
         return this._jq.when(this._jq.get(url))
     }

     getPropertyTypes() {
         const url = this._apiHost + "api/property_types?projection=property_type";
         return this._jq.when(this._jq.get(url));
     }

     getAmenities() {
         const url = this._apiHost + "api/amenities?projection=amenity_aggregation";
         return this._jq.when(this._jq.get(url));
     }

     getCountries() {
         const url = this._apiHost + "api/countries?projection=singleCountry";
         return this._jq.when(this._jq.get(url));
     }

     getLockRate() {
         if (this._lockRate) {
             return this._lockRate;
         }

         this._jq.ajax(
             {
                 url: "https://lockchain.co/marketplace/internal_api/loc_price.php",
                 async: false,
                 success: data => {
                     this._lockRate = parseFloat(data.loc);
                 }
             }
         );

         return this._lockRate;;
     }
}