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

// ======= Places ==================================
const placesSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: String,
    price: Number,
    season: Boolean,
    imgUrl: String
});


const Place = mongoose.model('Place', placesSchema);
module.exports.Place = Place;

module.exports.getPlaces = async (options = {}) => {
    return Place.find(options);
};

// ======= Users & WishList ==================================
const usersSchema = mongoose.Schema({
    username: String,
    password: String,
    wishList: Array
});

const User = mongoose.model('User', usersSchema);
module.exports.User = User;

module.exports.getUserWithWishList = async (options = {}) => {
    return User.findOne(options);
};
