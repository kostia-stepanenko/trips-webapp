exports.getPlaces = async (req, res) => {
    const places = [
        {
            sku: "sku-111",
            name: "Snagov Pool",
            description: "Visit snagov pool",
            price: 120.34,
            inSeason: true
        },
        {
            sku: "sku-222",
            name: "Dracula Castle",
            description: "Visit Dracula castle",
            price: 300.00,
            inSeason: false
        }
    ];

    return places;
};