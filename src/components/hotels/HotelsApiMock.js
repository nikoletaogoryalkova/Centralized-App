const hotels = [
    { 
        id: 1,
        name: 'Paradise Aparthotel & SPA',
        type: 'hotel',
        averageRating: 4.1,
        userCurrencyPrice: 340,
        locCurrencyPrice: 2.24,
        pictures: [],
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