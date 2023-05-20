const express = require('express');
const expressHandlebars = require('express-handlebars').engine;
const handlers = require('./lib/handlers')

const cookieParser = require("cookie-parser");
const expressSession = require('express-session');

const app = express();

//configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// cookie parser middleware
app.use(cookieParser());

// session middleware
app.use(expressSession({
  secret: 'my-secret',
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  resave: false
}));

// middleware to propagate session information to view
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static content: images, JS scripts and CSS
console.log(`Static content location: ${__dirname + '/public'}`);
app.use(express.static(__dirname + '/public'));

// home page handler
app.get('/', handlers.home);

// login page handler
app.get('/login', handlers.login);

// logout page handler
app.get('/logout', handlers.logout);

// authentication flow
app.post('/auth', handlers.auth);

// help page handler
app.get('/help', handlers.help);

// notes page handler
app.get('/notes', handlers.notes);

// Wish List handler
app.get('/wishList', handlers.wishList);

// Add new place to wishlist
app.post('/api/addToWishList', handlers.addToWishList);

// Delete place from wishlist
app.post('/api/deleteFromWishList', handlers.deleteFromWishList);

// show headers
app.get('/headers', handlers.showHeaders );

// custom 404 page
app.use(handlers.notFound);

// custom 500 page
app.use(handlers.serverError);

// Default server port
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(
  `trips-webapp server started at http://localhost:${port}; ` +
  `press Ctrl-C to terminate...`
));