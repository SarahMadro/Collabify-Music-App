const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const rp = require('request-promise');
const bodyParser = require('body-parser');
require('dotenv').config();

//SPOTIFY KEYS
const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri = 'http://localhost:8080/callback'; // Or Your redirect uri

//TWILIO KEYS
const twilioAccountSid = process.env.TWILIO_CLIENT_ID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(twilioAccountSid, twilioAuthToken);

const generateRandomString = function(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

const app = express();

app
  .use(express.static(__dirname + '/public'))
  .use(cookieParser())
  .use(bodyParser.json());

app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 8999393939999
  })
);

app.use(function(req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('Cookie created successfully');
  }
  next();
});

app.get('/sendtext', function(req, res) {
  let playlistID = req.query.playlistID;
  twilioClient.messages
    .create({
      from: '+12048179218',
      body: `https://open.spotify.com/playlist/${playlistID}/`,
      to: '+17783177270'
    })
    .then(message => console.log(message.sid));
}),
  // Requesting login information from user
  app.get('/login', function(req, res) {
    let state = generateRandomString(16);
    res.cookie(stateKey, state);
    // your application requests authorization
    const scope = 'user-read-private user-read-playback-state playlist-modify-private playlist-read-collaborative';
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

// your application requests access tokens
app.get('/callback', function(req, res) {
  // checking the state parameter
  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      '/' +
        querystring.stringify({
          error: 'state_mismatch'
        })
    );
  } else {
    let authOptions = {
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
        let access_token = body.access_token;
        let options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + access_token },
          json: true
        };

        req.session.token = access_token;
        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:3000');
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

// get current user's info
app.get('/userinfo', (req, res) => {
  const headers = {
    Authorization: `Bearer ${req.session.token}`
  };
  rp('https://api.spotify.com/v1/me', { headers, json: true }).then(body => {
    const userInfo = {
      name: body.display_name,
      id: body.id,
      uri: body.uri,
      image: body.images[0].url
    };
    res.send(userInfo);
  });
}),
  app.get('/search', (req, res) => {
    let searchTerm = req.query.searchTerm;
    const headers = {
      Authorization: `Bearer ${req.session.token}`
    };
    // Call Spotify API with search term
    request(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}&market=from_token&limit=5`,
      { headers: headers },
      function(err, result, body) {
        res.send(result.body);
      }
    );
  });

// get all playlists of current user
app.get('/getplaylists', (req, res) => {
  const headers = {
    Authorization: `Bearer ${req.session.token}`
  };
  rp('https://api.spotify.com/v1/me/playlists?limit=50', { headers, json: true }).then(body => {
    res.send(body.items);
  });
}),
  // get a specific playlist's details
  app.get('/getPlaylistDetails', (req, res) => {
    let playlistID = req.query.playlistID;
    const headers = {
      Authorization: `Bearer ${req.session.token}`
    };
    // Call Spotify API with Playlist ID
    request(`https://api.spotify.com/v1/playlists/${playlistID}`, { headers: headers }, function(err, result, body) {
      res.send(result.body);
    });
  });

// create a new playlist
app.post('/createplaylist', (req, res) => {
  const headers = {
    Authorization: `Bearer ${req.session.token}`
  };
  let userID;
  let playlistID;
  //post empty playlist to spotify
  rp('https://api.spotify.com/v1/me', { headers, json: true })
    .then(body => {
      userID = body.id;
      return rp(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        headers,
        json: true,
        method: 'POST',
        body: {
          name: req.body.playlistName,
          description: req.body.playlistDesc,
          collaborative: true,
          public: false
        }
      });
    })
    .then(body => {
      playlistID = body.id;
    })
    .then(() => {
      res.json({ playlistID, userID });
    });
});

// add tracks to Spotify playlist
app.post('/addtracks', (req, res) => {
  const headers = {
    Authorization: `Bearer ${req.session.token}`,
    'Content-Type': 'application/json'
  };
  let playlistID = req.body.playlistID;
  let addTracks = req.body.addTrack;
  return rp(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
    headers,
    json: true,
    method: 'POST',
    body: JSON.stringify({
      uris: addTracks
    })
  });
}),

// delete tracks from playlist
app.post('/deletetracks', (req, res) =>{
  const headers = {
    Authorization: `Bearer ${req.session.token}`
  }
  let playlistID = req.body.playlistID;
  return rp(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
    headers,
    json: true,
    method: 'DELETE',
    body: JSON.stringify({
      tracks: req.body.removeTracks,
    })
  })
}),

app.get('/sendtext', function(req, res) {
  let playlistID = req.query.playlistID;
  twilioClient.messages
  .create({
      from: '+12048179218',
      body: `https://open.spotify.com/playlist/${playlistID}/`,
      to: '+17783177270'
      })
  .then(message => console.log(message.sid));
}),

// checks if server is running
  console.log('Listening on 8080');
app.listen(8080, function() {
  console.log('Server is running!');
});
