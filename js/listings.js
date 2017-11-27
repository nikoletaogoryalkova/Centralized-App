function generateListingImageSubTemplate(listing) {
    let htmlItems = "";

    $.each(listing.pictures, function(i, item) {
        if (i === 0) {
            htmlItems += "<div class='item active'><a class='fancybox' data-fancybox-group='group-" + listing.id + "' href='" + item.original + "'><img src='" + item.thumbnail + "' /></a></div>";
        } else {
            htmlItems += "<div class='item'><a class='fancybox' data-fancybox-group='group-'" + listing.id + "href='" + item.original + "'><img src='" + item.thumbnail + "' /></a></div>";
        }
    });

    let listingPictures = $('<div>')
        .addClass('list-image')
        .append(
            $('<div>')
                .addClass('carousel slide')
                .attr('data-ride', 'carousel')
                .attr('id', 'myCarousel-' + listing.id)
                .append(
                    $('<div>').addClass('carousel-inner').append(
                        htmlItems +
                        '<a class="left-carousel" href="#myCarousel-' + listing.id + '" data-slide="prev"></a>' +
                        '<a class="right-carousel" href="#myCarousel-' + listing.id + '" data-slide="next"></a>'
                    )
                )
        );

    return listingPictures;
}

function generateListingContentSubTemplate(listing) {
    let listingContent = $('<div>').addClass('list-content')
        .append(
            $('<h2>')
                .text(listing.name)
        )
        .append(
            $('<div>')
                .addClass('list-hotel-rating')
                .append(
                    $('<div>')
                        .addClass('list-hotel-rating-count')
                        .text('Excellent 4.1/5')
                )
                .append(
                    $('<div>')
                        .addClass('list-hotel-rating-stars')
                        .append(
                            $('<span>')
                                .addClass('full-star')
                        )
                        .append(
                            $('<span>')
                                .addClass('full-star')
                        )
                        .append(
                            $('<span>')
                                .addClass('full-star')
                        )
                        .append(
                            $('<span>')
                                .addClass('full-star')
                        )
                        .append(
                            $('<span>')
                                .addClass('empty-star')
                        )
                )
                .append(
                    $('<div>')
                        .addClass('list-hotel-rating-review')
                        .text('73 Reviews')
                )
        )
        .append(
            $('<div>')
                .addClass('clearfix')
        )
        .append(
            $('<div>')
                .addClass('list-hotel-text')
                .text(listing.description.substr(0, 200))
        )
        .append(
            $('<div>')
                .addClass('list-hotel-comfort')
                .append(
                    $('<div>')
                        .addClass('icon-hotel-4')
                )
                .append(
                    $('<div>')
                        .addClass('icon-hotel-4')
                )
                .append(
                    $('<div>')
                        .addClass('icon-hotel-4')
                )
                .append(
                    $('<div>')
                        .addClass('icon-hotel-4')
                )
        );

    return listingContent;
}

function generateListingPriceSubTemplate(listing) {
    let listingPrice = $('<div>').addClass('list-price')
        .append(
            $('<div>')
                .addClass('list-hotel-price-bgr')
                .text('Price for 1 night')
        )
        .append(
            $('<div>')
                .addClass('list-hotel-price-curency')
                .text(listing.defaultDailyPrice)
        )
        .append(
            $('<div>')
                .addClass('list-hotel-price-loc')
                .text('(LOC 1.2)')
        )
        .append(
            $('<a>')
                .addClass('list-hotel-price-button btn btn-primary')
                .attr('href', '#')
                .text('Book now')
        );
    return listingPrice;
}

function generateListingTemplate(listing) {
    let listingTemplate = $('<div>').addClass('list-hotel')
        .append(
            generateListingImageSubTemplate(listing)
        )
        .append(
            generateListingContentSubTemplate(listing)
        )
        .append(
            generateListingPriceSubTemplate(listing)
        )
        .append(
            $('<div>')
                .addClass('clearfix')
        );

    return listingTemplate;
}