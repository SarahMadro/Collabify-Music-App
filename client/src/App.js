import React, { Component } from 'react';
import './App.css';
import Playlist from '../src/NewPlaylist';
import User from '../src/User';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: {
        name: 'Not Checked',
        albumArt: '' },
      playList: {
        name: 'newPlaylist',
        tracks: []
      },
      // user: {
      //   userID: 'cookie.id'
      // }
    }
  }

  //taken from spotify API demo
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
              name: response.item.name,
              albumArt: response.item.album.images[0].url
            }
        });
      })
  }

    // Update playlist name
  updatePlaylistName(name)
  {
    this.setState({playList: {...this.state.playList, name: name}});
  }

  render() {
    return (
      <div className="App">
        <a href='/' > Login to Spotify </a>
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>
        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }
          <Playlist
          token={this.token}
          onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist}/>
      </div>
    );
  }
}

export default App;
