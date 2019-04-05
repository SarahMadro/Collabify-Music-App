import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

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
    return axios.post('/playlists', {playlistName, trackURIs}).then(response => {
      console.log('SAVE PLAYLIST RESPONSE', response);
    })

  }
};

export default Spotify;
