import axios from 'axios';

const Spotify = {
  search(searchTerm) {
    return axios.get('/search', { params: { searchTerm: searchTerm } }).then(response => {
      console.log(searchTerm);
      if (!response.data.tracks) {
        return [];
      }
      return response.data.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  savePlaylist(playlistName, trackURIs) {
    if (playlistName && trackURIs.length) {
      const accessToken = Spotify.getHashParams();
      const headers = {
        Authorization: `Bearer ${accessToken}`
      };
      let userID;
      let playlistID;
      return fetch('https://api.spotify.com/v1/me', { headers: headers })
        .then(
          response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Request failed!');
          },
          networkError => {
            console.log(networkError.message);
          }
        )
        .then(jsonResponse => {
          userID = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ name: playlistName })
          })
            .then(
              response => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error('Request failed!');
              },
              networkError => {
                console.log(networkError.message);
              }
            )
            .then(jsonResponse => {
              playlistID = jsonResponse.id;
              return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ uris: trackURIs })
              })
                .then(
                  response => {
                    if (response.ok) {
                      return response.json();
                    }
                    throw new Error('Request failed!');
                  },
                  networkError => {
                    console.log(networkError.message);
                  }
                )
                .then(jsonResponse => jsonResponse);
            });
        });
    } else {
      return;
    }
  }
};

export default Spotify;
