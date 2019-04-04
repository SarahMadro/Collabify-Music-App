import React, { Component } from "react";
import TrackList from './TrackList';
import PropTypes from "prop-types";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();


class Playlist extends Component {
  constructor(props) {
    super(props);
    //state with id name, tracks
    this.state = {
      playlistName: {
        playlistId: '',
        name: 'New Playlist',
        tracks: []
      }
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this)
  }


  //move to playlist
  handleNameChange(event) {
    let name = event.target.value;
    this.props.onNameChange(name);
  }

  //add track to playlist
  addTrack(track) {
    const { playlistName } = this.state;
    console.log('PLAYLISTNAMEEEEE', playlistName);
    const { playlistId } = this.state;
    //check if track is already in playlist
    let trackPresent = playlistName.tracks.some(playlistTrack => {
      return playlistTrack.id === track.id;
    })
    if (!trackPresent) {
      spotifyApi.addTracksToPlaylist(playlistId).then(response => {
        console.log(response);
      })
    } else {
      alert('This song is already in this playlist, would you like to duplicate it?');
    }
  };

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
        <TrackList tracks={this.props.tracks}
          onRemove={this.props.onRemove}
          isRemoved={true} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
Playlist.propTypes = {
  tracks: PropTypes.array,
  onRemove: PropTypes.func,
  onNameChange: PropTypes.func,
  onSave: PropTypes.func
};

export default Playlist;