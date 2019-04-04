import React, { Component } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import PlayList from './PlayList';
import Spotify from './Spotify/Spotify';
// import NewPlaylist from './newPlaylist';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    // const params = this.getHashParams();
    // const token = params.access_token;
    // if (token) {
    //   spotifyApi.setAccessToken(token);
    // }
    this.state = {
<<<<<<< HEAD
      // userId: '',
      // loggedIn: token ? true : false,
      // playlistName: '',
      playlistName: 'New Playlist',
      // playlistDesc: '',
      playlistID: '',
      searchResults: [],
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
=======
      loggedIn: token ? true : false,
      userId: '',
      playlistName: '',
      playlistDesc:'',
      playlistID:''
      };

>>>>>>> 9136b3d9e15600c299315be93c5bceae692e6969
  }

  componentDidMount() {
    // spotifyApi.getMe().then(response => {
    //   const userId = response.id;
    //   this.setState({
    //     userId: userId
    //   });
    // });
  }

  // getHashParams() {
  //   var hashParams = {};
  //   var e,
  //     r = /([^&;=]+)=?([^&;]*)/g,
  //     q = window.location.hash.substring(1);
  //   e = r.exec(q);
  //   while (e) {
  //     hashParams[e[1]] = decodeURIComponent(e[2]);
  //     e = r.exec(q);
  //   }
  //   return hashParams;
  // }

  // getPLNameChange = nameData => {
  //   this.setState({
  //     playlistName: nameData
  //   });
  // };

  // getPLDescChange = descData => {
  //   this.setState({
  //     playlistDesc: descData
  //   });
  // };

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (!tracks.find(trackIndex => trackIndex.id === track.id)) {
      tracks.push(track);
      this.setState({ playlistTracks: tracks });
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let newTracks = tracks.filter(trackIndex => trackIndex.id !== track.id);
    this.setState({ playlistTracks: newTracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    let tracks = this.state.playlistTracks;
    if (tracks.length && this.state.playlistName) {
      let trackURIs = tracks.map(trackIndex => trackIndex.uri);
      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        });
        document.getElementById('Playlist-name').value = this.state.playlistName;
      });
    }
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(results => {
      this.setState({ searchResults: results });
    });
  }

  getPLID = (plID) => {
    this.setState({
      playlistID: plID
    })
  }

  render() {
    return (
<<<<<<< HEAD
      <div>
        <h1>Collabs</h1>
        <div className='App'>
          <SearchBar onSearch={this.search} />
          <div className='App-playlist'>
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <PlayList
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
=======
      <div className='App'>
      {!this.state.loggedIn && (
    <a href='http://localhost:8080'> Login to Spotify</a>)}
      {this.state.loggedIn && (
        <NewPlaylist plInfo={this.state} getPLID={this.getPLID} getPLNameChange={this.getPLNameChange} getPLDescChange={this.getPLDescChange} />
        )}
>>>>>>> 9136b3d9e15600c299315be93c5bceae692e6969
      </div>
    );
  }
}

export default App;
