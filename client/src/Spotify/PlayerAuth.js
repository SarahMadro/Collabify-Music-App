import React, { Component } from 'react';


class SDKauth extends Component {

play = ({
  spotify_uri,
  playerInstance: {
    _options: {
      getOAuthToken,
      id
    }
  }
}) => {
  getOAuthToken(access_token => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        uris: [spotify_uri]
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
    });
  });
};

// player({
//   playerInstance: new Spotify.Player({
//     name: "..."
//   }),
//   spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
// });
render() {
  return(
    <div>

    </div>
    )
  }
}
export default SDKauth;