const hotels = [
    { 
        id: 1,
        name: 'Paradise Aparthotel & SPA',
        type: 'hotel',
        averageRating: 4.1,
        userCurrencyPrice: 340,
        locCurrencyPrice: 2.24,
        pictures: [
            {
                original: "https://alpha.lockchain.co:8443/static_app/lockchain/listings/images/listing_full_1516585181474_Memoire Palace-6.jpg",
                sortOrder: 0,
                thumbnail: "https://alpha.lockchain.co:8443/static_app/lockchain/listings/images/listing_thumbnail_1516585181474_Memoire Palace-6.jpg"
            },
            {
                original: "https://alpha.lockchain.co:8443/static_app/lockchain/listings/images/listing_full_1516585181091_Memoire Palace-10.jpg",
                sortOrder: 1,
                thumbnail: "https://alpha.lockchain.co:8443/static_app/lockchain/listings/images/listing_thumbnail_1516585181091_Memoire Palace-10.jpg"
            },
            {
                original: "https://alpha.lockchain.co:8443/static_app/lockchain/listings/images/listing_full_1516585180718_Memoire Palace-20.jpg",
                sortOrder: 2,
                thumbnail: "https://alpha.lockchain.co:8443/static_app/lockchain/listings/images/listing_thumbnail_1516585180718_Memoire Palace-20.jpg"

            }
        ],
        descriptions: {
            general: 'Nice one',
        },
        amenities: [ 2, 4, 66 ],
    },
    { 
        id: 1,
        name: 'Hotel 2',
        type: 'hotel',
        averageRating: 4.1,
        userCurrencyPrice: 350, 
        locCurrencyPrice: 1.2,
        pictures: [],
        descriptions: {
            general: 'Really good one',
        },
        amenities: [ 2, 4, 66 ],
    },
];

export async function getHotels() {
    return { content: hotels };
}