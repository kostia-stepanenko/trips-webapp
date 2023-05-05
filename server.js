const express = require('express');
const expressHandlebars = require('express-handlebars').engine;
const handlers = require('./lib/handlers')

const app = express();

//configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// static content: images, JS scripts and CSS
console.log(`Static content location: ${__dirname + '/public'}`);
app.use(express.static(__dirname + '/public'));


// home page handler
app.get('/', handlers.home);


// help page handler
app.get('/help', handlers.help);

// Wish List handler
app.get('/wishList', handlers.wishList);


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
  `press Ctrl-C to terminate.`
));