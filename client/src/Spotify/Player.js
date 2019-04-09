import React, { Component } from 'react';
import Script from 'react-load-script';
// import WebPlaybackReact from './Spotify/WebPlaybackReact.js';

class SDKPlayer extends Component {

  constructor(props) {
    super(props);
    this.handleLoadSuccess = this.handleLoadSuccess.bind(this);
    this.handleLoadFailure = this.handleLoadSuccess.bind(this);
    this.cb = this.cb.bind(this);
  }

  //   logInWithSpotify = () => {
  //     let client_id      = "bad9e04cf07e4ac89c75a71999f18955";
  //     let redirect_uri   = "https://spotify-web-playback-react.glitch.me";
  //     let scopes         = "streaming user-read-birthdate user-read-email user-read-private user-modify-playback-state";
  //     let scopes_encoded = scopes.replace(" ", "%20");
  //       console.log('AUTHORIZATION')
  //     window.location = [
  //       "https://accounts.spotify.com/authorize",
  //       `?client_id=${client_id}`,
  //       `&redirect_uri=${redirect_uri}`,
  //       `&scope=${scopes_encoded}`,
  //       "&response_type=token",
  //       "&show_dialog=true"
  //     ].join('');
  // }


  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.handleLoadSuccess();
    };
  }

  handleLoadSuccess() {
    this.setState({ scriptLoaded: true });
    console.log("Script loaded");
    const token = 'BQBze7a2Y2wbctMqPkKa5FH2HQcrYhAXOYeYQqsfPaHopi-vcos-6riP2KchyFCZBKrylyWA14bOZxZGWfYQUhyfj05PA-_BetNekLcbbyg6STcfxh8t-tM5bkp8VhPq3YtkP1-EyBMCEdlrwYF38rKmbXOlr8ZZO84j94tEuYqlHw4ekvaXyTVLUnCw';
    console.log('TOKEN IS HERE')

    this.player = new window.Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });
    console.log('@@@@@@@', this.player);

    // Error handling
    this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
    this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
    this.player.addListener('account_error', ({ message }) => { console.error(message); });
    this.player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    this.player.addListener('player_state_changed', state => { console.log(state); });

    // Ready
    this.player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      this.props.onPlayerCreated(this.player);
    });

    // Not Ready
    this.player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    this.player.connect();



  }

  cb(token) {
    return(token);
  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: true });
    console.log("Script created");
  }

  handleScriptError() {
    this.setState({ scriptError: true });
    console.log("Script error");
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true});
    console.log("Script loaded");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
      </div>
    );
  }
}
export default SDKPlayer;