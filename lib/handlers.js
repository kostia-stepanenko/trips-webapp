const db = require("./db");

exports.home = async (req, res) => {

     const places = await db.getPlaces();

    const context = {
        places: places.map(singlePlace => {
            return {
                name : singlePlace.name,
                price: `${singlePlace.price.toFixed(2)} RON`,
                inSeason: singlePlace.inSeason,
                imgUrl: singlePlace.imgUrl
            };
        }),
        user: {
            loggedin: req.session.loggedin,
            username: req.session.username
        }
    };

    res.render('home', context);
};

exports.login = async(req, res) => {
    res.render('login');
};

exports.auth  = async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    req.session.loggedin = true;
    req.session.username = username;

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