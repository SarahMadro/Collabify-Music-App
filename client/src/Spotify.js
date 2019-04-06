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

  savePlaylist(playlistName, playlistDesc, trackURIs) {
    return axios.post('/playlists', { playlistName, playlistDesc, trackURIs }).then(response => {
      console.log('SAVE PLAYLIST RESPONSE', response);
    });
  }
};

export default Spotify;