const mongoose = require('mongoose');

/*
 * MongoDB connection string.
 * Use default port: 27017
 * Username: root
 * Password: root
 */
const mongoDbConnectionString = "mongodb://root:root@127.0.0.1:27017/test?authSource=admin";

mongoose.connect(mongoDbConnectionString);

const db = mongoose.connection
db.on('error', err => {
    console.error(`Can't connect to MongoDB: ${err.message}`);
    process.exit(1);
});

db.once("open", () => console.log("MongoDB connected"));

const placesSchema = mongoose.Schema({
    name: String,
    price: Number,
    inSeason: Boolean,
    imgUrl: String
});

const Place = mongoose.model('Place', placesSchema);
module.exports = Place;

module.exports.getPlaces = async (req, res) => {
    return Place.find();

    // const places = [
    //     {
    //         name: "Snagov Pool",
    //         description: "Visit snagov pool",
    //         price: 120.34,
    //         inSeason: true
    //     },
    //     {
    //         name: "Dracula Castle",
    //         description: "Visit Dracula castle",
    //         price: 300.00,
    //         inSeason: false
    //     }
    // ];
    //
    // return places;
};