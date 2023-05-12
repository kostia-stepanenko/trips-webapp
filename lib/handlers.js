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

    if (auth.isValidUser(username, password)) {
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
    res.render('wishList');
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