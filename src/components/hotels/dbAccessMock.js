const countries = [
    { name: 'UK', id: 1 },
    { name: 'Bulgaria', id: 2 },
];

const cities = {
    UK: [ 
        { name: 'London', id: 1 }, 
        { name: 'Manchester', id: 2 } 
    ],
    Bulgaria: [ 
        { name: 'Sofia', id: 3 }, 
        { name: 'Dobrich', id: 4 } 
    ],
};

export async function getCountries() {
    return { content: countries };
}

export async function getCitiesByRegionName(name) {
    return { content: cities[name] };
}

export async function getCitiesByRegionId(id) {
    return { content: cities[countries.filter(x => x.id === Number(id))[0].name] };
}