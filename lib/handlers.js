const user = require("./user");

exports.home = async (req, res) => {
    res.render('home', {username: user.getRandomUser()});
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