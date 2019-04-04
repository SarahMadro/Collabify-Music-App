import React, { Component } from 'react';
import './App.css';
import NewPlaylist from './newPlaylist';
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
      loggedIn: token ? true : false,
      userId: '',
      playlistName: '',
      playlistDesc:'',
      playlistID:''
      };

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

  getPLNameChange = (nameData) => {
    this.setState({
      playlistName: nameData
    })
  }

  getPLDescChange = (descData) => {
    this.setState({
      playlistDesc: descData
    })
  }

  getPLID = (plID) => {
    this.setState({
      playlistID: plID
    })
  }

  render() {
    return (
      <div className='App'>
      {!this.state.loggedIn && (
    <a href='http://localhost:8080'> Login to Spotify</a>)}
      {this.state.loggedIn && (
        <NewPlaylist plInfo={this.state} getPLID={this.getPLID} getPLNameChange={this.getPLNameChange} getPLDescChange={this.getPLDescChange} />
        )}
      </div>
    );
  }
}

export default App;
