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
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      playlistName: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  componentDidMount() {
    spotifyApi.getMe().then(response => {
      const userId = response.id;
      this.setState({
        userId: userId
      });
    });
    const userId = this.state.userId;
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

  createPlaylist(userId) {
    const { playlistName } = this.state;
    const options = {
      name: playlistName
    };
    spotifyApi.createPlaylist(userId, options).then(response => {
      console.log(response);
    });
  }

  render() {
    return (
      <div className='App'>
        <a href='http://localhost:8080'> Login to Spotify </a>
        <div>Now Playing: {this.state.nowPlaying.name}</div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
        </div>
        {this.state.loggedIn && (
          <form>
            <label>Playlist Name</label>
            <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
            <button onClick={() => this.createPlaylist(this.state.userId)}>Check Now Playing</button>
          </form>
        )}
      </div>
    );
  }
}

export default App;
