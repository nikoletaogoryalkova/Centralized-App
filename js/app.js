let requester = new LockchainRequester($, "//localhost:8080/");
let urlHandler = new URLHandler();
let locRate = requester.getLockRate();
let router = new Router(urlHandler);
let listingsController = new ListingController(requester);
router.addRoute("#listings", r => listingsController.viewAll(r));
$(document).ready(() => {
    $.when(
        $.get('templates/header.html', d => {
            $('header').html(d);
            requester
                .getCountries()
                .then(countries => {
                    countries.content.forEach(coun1try => {
                        $("#location-select").append(`<option id="${country.id}">${country.name}</option>`)
                    })
                })
                .then(() => {
                    $("#btn-home").click((e) => {
                        e.preventDefault();
                        let dates = $("#search-daterange").val().split("-");
                        let routeInfo = {
                            countryId: $("#location-select").val(),
                            startDate: dates[0].trim(),
                            endDate: dates[1].trim(),
                            guests: $("#guests-input").val()
                        };
                        urlHandler.setController(routeInfo, "listings");
                        urlHandler.toHash(routeInfo, false);
                    })
                })
        }),
        $.get('templates/footer.html', d => {
            $('footer').html(d);
            if (!localStorage.getItem("fromCurrency")) {
                localStorage.setItem("fromCurrency", "USD");
                localStorage.setItem("sign", "$");
            }

            $("#currency_currency").text(localStorage.getItem("fromCurrency"));
            $(".currency_selector").click((e) => {
                localStorage.setItem("fromCurrency", $(e.target).text());
                localStorage.setItem("sign", $(e.target).data("sign"));
                $("#currency_currency").text(localStorage.getItem("fromCurrency"));
            });
        }),
    ).then((d) => {
        $.get("templates/home/index.html", d => {
            $('main').html(d);
            router.listen();
        });
    })
});