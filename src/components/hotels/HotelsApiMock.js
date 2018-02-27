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
        descriptionText: 'In the historic quarter of Santo Spirito, on the left bank of th eriver Arno, studio apartment is perfect for those travelling alone or as a couple. To walk between Santo Spirito, Ponte Vecchio and Bobali Gardens is a magical experience. On the third floor of a typical Florentine building, the apartment consists of an entrance with wardrobes and loft with a double bed, equipped kitchen and bathroom with shower.',
        amenities: [
            { id: 0, name: 'beach' },
            { id: 1, name: 'pool' },
            { id: 2, name: 'spa' },
            { id: 3, name: 'parking' },
            { id: 4, name: 'breakfast' }
        ],
        street: 'Paradise Aparthotel & SPA, 9 Han Tervel Street',
        city: { name: '9101 Sozopol' },
        country: { name: 'Bulgaria' }
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
        amenities: [
            { id: 0, name: 'beach' },
            { id: 1, name: 'pool' },
            { id: 2, name: 'spa' },
            { id: 3, name: 'parking' },
            { id: 4, name: 'breakfast' }
        ],
    },
];

export async function getHotels() {
    return { content: hotels };
}