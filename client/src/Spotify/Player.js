import React, { Component } from 'react';
// import WebPlaybackReact from './Spotify/WebPlaybackReact.js';

class SDKPlayer extends Component {

  constructor(props) {
    super(props);
    this.cb = this.cb.bind(this);
  }


  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.handleLoadSuccess();
    };
  }

  handleLoadSuccess = () => {
    this.setState({ scriptLoaded: true });
    console.log("Script loaded");
    const token = 'BQCJ6hMNShS5wQLyyZNDgnFp0gNkLV4VqpqnM_aLbz-ZrRExSvtfRB9AywN9mRb1a6_3hORq7o_4vP_PaCGU08SfBVyJv3LDCDU6RNA_XAaxoCNcTCR3EBF12FYCXtkc3wFhMDmX5Z6s0XiQyVxjP4ZJvAkKpVEG9axS1pm93MBozyrtERANMQPxk5fS';
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
      <div>
      </div>
    );
  }
}
export default SDKPlayer;