const express = require('express');
const expressHandlebars = require('express-handlebars').engine;
const user = require('./lib/user')

const app = express();

//configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// static part, like logs, JS

console.log(`Static content location: ${__dirname + '/public'}`);
app.use(express.static(__dirname + '/public'));


// home page handler
app.get('/', (req, res) => {
  res.render('home', {username: user.getRandomUser()});
});


// help page handler
app.get('/help', (req, res) => res.render('help'));

// Wish List handler
app.get('/wishList', (req, res) => res.render('wishList'));


// show headers
app.get('/headers', (req, res) => {
  const headers = Object.entries(req.headers)
      .map(([key, value]) => `${key}: ${value}`);

  res.type('text/plain')
  res.send(headers.join('\n'));

});

// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
});

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
});

// Default node js port
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`));