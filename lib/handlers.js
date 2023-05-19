const db = require("./db");
const auth = require('./authentication');


exports.home = async (req, res) => {

     const places = await db.getPlaces();

    const context = {
        places: places.map(singlePlace => {
            return {
                name : singlePlace.name,
                //price: `${singlePlace.price.toFixed(2)} RON`,
                //inSeason: singlePlace.inSeason,
                imgUrl: singlePlace.imgUrl
            };
        })
    };

    res.render('home', context);
};

exports.login = async(req, res) => {
    res.render('login');
};

exports.logout = async(req, res) =>  {
    req.session.destroy();
    res.redirect('/');
}

exports.auth  = async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const validUser = await auth.isValidUser(username, password);

    if (validUser) {
        req.session.user = {
            loggedin: true,
            username: username
        };
    }
    else {
        console.log("Invalid username/password");
    }

    res.redirect('/');
};

exports.help = async (req, res) => {
    res.render('help');
};

exports.wishList = async (req, res) => {

    const curUserName = req.session.user.username;

    console.log(`Getting user '${curUserName}' with WishList`);
    const curUserData = await db.getUserWithWishList({username: curUserName});

    //console.log(curUserData);

    // query places from user's wishList
    const placesFromWishlist = await db.getPlaces({ '_id': { $in: curUserData.wishList } });

    res.render('wishList', {
        placesFromWishlist: placesFromWishlist.map(singlePlace => {
            return {
                name : singlePlace.name,
                imgUrl: singlePlace.imgUrl,
                price: singlePlace.price
            };
        })
    });
};

exports.showHeaders = async(req, res) => {
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}: ${value}`);

    res.type('text/plain')
    res.send(headers.join('\n'));
};

exports.notFound = async(req, res) => {
    res.status(404);
    res.render('404');
};

exports.serverError = async(err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.render('500');
};