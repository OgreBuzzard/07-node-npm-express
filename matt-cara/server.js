'use strict';

// Load Express
const express = require('express');

// Instantiate Express so that we can use its functionality
const app = express();

// Designate a port to serve our app on
const PORT = process.env.PORT || 3000;

// Define which directory we will serve files from
app.use(express.static('./public'));

// Here is our articles route...
app.get('/articles', (request, response) => {
  console.log('Articles');
  res.send('OMG Articles!!!')
})

app.get('/new', (request, response) => {
  console.log('Here is new.html');
  response.sendFile('/public/new.html', { root: '.'});
})

// REVIEW: There is a package here called body-parser, which is used by the provided POST route. Be sure to install that and save it as a dependency after you create your package.json.

const bodyParser = require('body-parser').urlencoded({extended: true});

app.post('/articles', bodyParser, function(request, response) {
  // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);
  res.send('Record posted to server!!');
})

// 404 everything except for our routes and index.html
app.use((request, response, next) => {
  console.log('404!!!');
  response.status(404).sendFile('404.html', { root: './public' });
});

// Now let's tell the app to listen so that it can do its thing
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
