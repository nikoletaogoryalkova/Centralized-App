class ListingsView {
    static renderHotels(listingsResponse) {
        let hotelHolder = $("#hotels-render");
        listingsResponse.content.forEach(listing => {
            let active = " active";
            let hotelTemplate = `
<div class="list-hotel">
    <div class="list-image">
        <div class="carousel slide" data-ride="carousel" id="myCarousel-{{id}}">
            <div class="carousel-inner">
 `;
            listing.pictures.forEach(p => {
                hotelTemplate += ` 
                <div class="item${active}">
                    <a href="#"><img src="${p.thumbnail}"/></a>
                </div>
`;
                active = "";
            });
            hotelTemplate += `
                <a class="left-carousel" href="#myCarousel-${listing.id}" data-slide="prev"></a>
                <a class="right-carousel" href="#myCarousel-${listing.id}" data-slide="next"></a>
            </div>
        </div>
    </div>
    <div class="list-content">
        <h2><a href="#">${listing.name}</a></h2>
        <div class="list-hotel-rating">
            <div class="list-hotel-rating-count"></div>
            <div class="list-hotel-rating-stars">
                <span class="empty-star"></span>
                <span class="empty-star"></span>
                <span class="empty-star"></span>
                <span class="empty-star"></span>
                <span class="empty-star"></span>
            </div>
            <div class="list-hotel-rating-review">${listing.reviewsCount} Reviews</div>
        </div>
        <div class="clearfix"></div>
        <div class="list-hotel-text">
            ${listing.description}
        </div>
        <div class="list-hotel-comfort">
            <div class="icon-hotel-4"></div>
            <div class="icon-hotel-4"></div>
            <div class="icon-hotel-4"></div>
            <div class="icon-hotel-4"></div>
        </div>
    </div>
    <div class="list-price">
        <div class="list-hotel-price-bgr">Price for 1 night</div>
        <div class="list-hotel-price-curency">${localStorage.getItem('sign')} ${Math.ceil(listing.prices[localStorage.getItem('fromCurrency')])}</div>
        <div class="list-hotel-price-loc">(LOC ${Math.round(listing.prices['EUR'] / locRate, 3)} )</div>
        <a class="list-hotel-price-button btn btn-primary" href="#">Book now</a>
    </div>
    <div class="clearfix"></div>
</div>
                            `;
            hotelHolder.append(hotelTemplate);
        });

        return Promise.resolve(listingsResponse);
    }

    static renderPager(listingsResponse) {
        let pages = listingsResponse.page.totalPages;
        let currentPage = listingsResponse.page.number;
        let pagerTemplate = `
<ul class="pagination">`;
        if (currentPage > 0) {
            pagerTemplate += `
    <li>
        <a class="page-click" data-page="${currentPage-1}" href="#">Previous page</a>
    </li>
`;
        }
        for (let page = 1; page <= pages; page++) {
            let active = (page-1) == currentPage ? "active" : "";
            pagerTemplate += `
    <li class="${active}">
        <a class="page-click" data-page="${page-1}" href="#">${page}</a>
    </li>
            `;
        }
        if (currentPage < pages) {
            pagerTemplate += `    
    <li>
        <a href="#">Next page</a>
    </li>
</ul>
`;
            $(".pagination-box").append(pagerTemplate);

            return Promise.resolve(listingsResponse);
        }
    }
}