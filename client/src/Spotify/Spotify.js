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
    return axios
      .post('/createplaylist', { playlistName, playlistDesc })
      .then(response => {
        console.log('SAVE PLAYLIST RESPONSE', response.data);
        const userID = response.data.userId;
        const playlistID = response.data.playlistID;
        if (trackURIs.length > 0) {
          return axios.post('/addtracks', { userID, playlistID, trackURIs });
        }
      })
      .then(() => {
        this.getPlaylists();
      });
  },

  getPlaylists() {
    // call to backend
    return axios.get('/getplaylists').then(response => {
      // console.log('CLIENT SPOTIFY GET!', response.data[10].images[0].url);
      // get the playlist data we need from the response
      const allPlaylists = response.data.map(playlists => ({
        key: playlists.id,
        collaborative: playlists.collaborative,
        id: playlists.id,
        name: playlists.name,
        uri: playlists.uri,
        image: playlists.images[0],
        tracks: playlists.tracks //object
        })
      );      // filters and returns only the collaborative playlists
      const collabPlaylists = [];
      allPlaylists.forEach(function(item) {
        if (item.collaborative === true) {
          collabPlaylists.push(item);
        }
      });
      return collabPlaylists;
    });
  },

  getPlaylistDetails(playlistID) {
    console.log("SPOTIFY JS GOT IT", playlistID)
    return axios.get('/getPlaylistDetails', {playlistID: playlistID}).then(response => {
      console.log("DAAA RESPONSE", response)
    })
  },

  getUserInfo() {
    return axios.get('/userinfo')
  },

};

export default Spotify;
