import React, { Component } from 'react';
import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      userId: '',
      loggedIn: token ? true : false,
      playlistName: '',
      playlistDesc:'',
      playlistID:''
      };
    this.createPlaylist = this.createPlaylist.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePLDescChange = this.handlePLDescChange.bind(this);
  }

  componentDidMount() {
    spotifyApi.getMe().then(response => {
      const userId = response.id;
      this.setState({
        userId: userId
      });
    });
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  handleNameChange(event) {
    let name = event.target.value;
    this.setState({
      playlistName: name
    });
  }

  handlePLDescChange(event) {
    let playlistImage = event.target.value;
    this.setState({
      playlistImage: playlistImage
    });
  }

  createPlaylist(e) {
    e.preventDefault();
    const { userId, playlistName, playlistDesc} = this.state;
    const options = {
      name: playlistName,
      collaborative: true,
      public: false,
      description: playlistDesc
    };
    spotifyApi.createPlaylist(userId, options).then(response => {
      console.log("PLAYLIST CREATED!");
      this.setState({
        playlistID: response.id
      })
    }, function(err){
      console.log("Something went wrong!", err)
    })
  }


  render() {
    return (
      <div className='App'>
        <a href='http://localhost:8080'> Login to Spotify</a><br />
        {this.state.loggedIn && (
          <form>
            <label>Playlist Name: *</label>
            <input defaultValue={'New Playlist'} onChange={this.handleNameChange} /><br />
            <label>Playlist Description: </label>
            <input placeholder='Enter description here...' onChange={this.handlePLDescChange} /> <br />
            <button onClick={this.createPlaylist}>Create new Playlist!</button>
          </form>
        )}
      </div>
    );
  }
}

export default App;
