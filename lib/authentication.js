const db = require("./db");

exports.isValidUser = async (providedUsername, providedPassword) => {

    const userFromDb =
        await db.getUserWithWishList({username: providedUsername, password: providedPassword} );

    return userFromDb !== null;

};