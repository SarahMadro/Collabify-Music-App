import axios from 'axios';
import defaultPlaylistPic from '../components/RoomCover/collabs.jpg'

const Spotify = {

  search(searchTerm) {
    return axios.get('/search', { params: { searchTerm: searchTerm } })
    .then(response => {
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
        const userID = response.data.userId;
        const playlistID = response.data.playlistID;
        const responseData = response.data;
        if (trackURIs.length > 0) {
          return axios.post('/addtracks', { userID, playlistID, trackURIs });
        }
        return responseData
      })
  },

  addTrack(playlistID, trackURI){
    const addTrack = [];
    addTrack.push(trackURI);
    return axios.post('/addtracks', { playlistID, addTrack })
  },

  deleteTracks(playlistID, trackURIs){
    const removeTracks = []
    removeTracks.push({ uri: trackURIs })
    return axios.post('/deletetracks', { playlistID, removeTracks })
  },

  getPlaylists() {
    return axios.get('/getplaylists').then(response => {
      const allPlaylists = response.data.map(playlists => ({
        key: playlists.id,
        collaborative: playlists.collaborative, // boolean
        id: playlists.id,
        name: playlists.name,
        uri: playlists.uri,
        tracks: playlists.tracks //object
      }));
      // filters and returns only the collaborative playlists
      const collabPlaylists = [];
      allPlaylists.forEach(function(item) {
        if (item.collaborative === true) {
          collabPlaylists.push(item);
        }
      });
      return collabPlaylists;
    });
  },


  //try use this funciton to send token to skd player
  getPlaylistDetails(playlistID) {
    return axios.get('/getPlaylistDetails', { params: { playlistID: playlistID }})
    .then(response => {
      const pldata = {
        id: response.data.id,
        description: response.data.description,
        tracks: response.data.tracks.items,
        name: response.data.name,
      }
      if (response.data.images[0] === undefined) {
        pldata.image = defaultPlaylistPic
      }
      else { pldata.image = response.data.images[0].url }
    return pldata
    })
  },

  getUserInfo() {
    return axios.get('/userinfo')
  }
};

export default Spotify;
