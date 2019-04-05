var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var rp = require('request-promise');
var bodyParser = require('body-parser')


require('dotenv').config();

var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret
var redirect_uri = 'http://localhost:8080/callback'; // Or Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app
  .use(express.static(__dirname + '/public'))
  .use(cookieParser())
  .use(bodyParser.json());

//cookie session ///

// app.set('trust proxy', 1); // trust first proxy

app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 8999393939999
  })
);

//cookie session ends here.

app.use(function(req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  }
  next(); // <-- important!
});

app.get('/', function(req, res) {
  console.log('COOKIES!!!!!!', req.cookies);
});

// Requesting login information from user
app.get('/login', function(req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  // your application requests authorization
  var scope =
    'user-read-private user-read-email user-read-playback-state playlist-modify-public playlist-modify-private';
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
});

// your application requests refresh and access tokens
app.get('/callback', function(req, res) {
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  //client is running on 3000
  //server is running on 8080

  if (state === null || state !== storedState) {
    res.redirect(
      '/' +
        querystring.stringify({
          error: 'state_mismatch'
        })
    );
  } else {
    // res.clearCookie(stateKey);

    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64')
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          // Add something here
        });

        req.session.token = access_token;
        // we can also pass the token to the browser to make requests from there
        res.redirect('/');
      } else {
        res.redirect(
          '/#' +
            querystring.stringify({
              error: 'invalid_token'
            })
        );
      }
    });
  }
});

app.get('/search', (req, res) => {
  var searchTerm = 'Adriatique';
  const headers = {
    Authorization: `Bearer ${req.session.token}`,
    limit: 2
  };
  // Call Spotify API with search term
  request(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, { headers: headers }, function(
    err,
    result,
    body
  ) {
    console.log(result);
    res.send(result.body);
  });
});

app.post('/playlists', (req, res) => {
  const headers = {
    Authorization: `Bearer ${req.session.token}`,
    limit: 2
  };


  let userID;
  let playlistID;

  rp('https://api.spotify.com/v1/me', { headers, json: true })
    .then((body)=> {
      userID = body.id;
      return rp(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        headers,
        json: true,
        method: 'POST',
        body: ({
          name: req.body.playlistName
        })
      })
    })
    //post playlist to spotify
    .then((body) => {
      playlistID = body.id;
      //add conditional if statement to allow playlist to be created without songs
      return rp(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
        headers,
        json: true,
        method: 'POST',
        body: JSON.stringify({
        uris: req.body.trackURIs
        })
      })
    })
    .then(() => {
    res.json({playlistID, userID});
      })
  });

// app.get('/refresh_token', function(req, res) {
//   // requesting access token from refresh token
//   var refresh_token = req.query.refresh_token;
//   var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: { Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64') },
//     form: {
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     },
//     json: true
//   };

//   request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var access_token = body.access_token;
//       res.send({
//         access_token: access_token
//       });
//     }
//   });
// });

console.log('Listening on 8080');
app.listen(8080, function() {
  console.log('Server is running!');
});
