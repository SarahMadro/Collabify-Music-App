import React, { Component } from 'react';
import Header from '../Header/Header';
import TrackList from '../TrackList/TrackList';
import SearchBar from '../SearchBar/SearchBar';
import RoomCover from '../RoomCover/RoomCover';
import Spotify from '../../Spotify/Spotify';
// import SearchResults from '../SearchResults/SearchResults';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistID: '',
      playlistDesc: '',
      playlistTracks: [],
      playlistImage: '',
      playlistName: '',
      searchResults: [],
      tracksToRemove: []
    };

  }

  componentWillMount(){
    this.setState ({
      playlistID: this.getPlaylistFromUrl()
    })
  }

  componentDidMount(){
    this.getPlaylistDetails()
  }


  getPlaylistDetails = () => {
    Spotify.getPlaylistDetails(this.state.playlistID)
    .then(response => {
      return this.setState({
        playlistTrackIndex: response.tracks.index,
        playlistDesc: response.description,
        playlistTracks: response.tracks,
        playlistImage: response.image,
        playlistName: response.name
      });
    });
  }

  getPlaylistFromUrl = () => {
    let query = window.location.href;
    let vars = query.split('=');
    return vars[1];
  }

  addTrack = track => {
    let tracks = this.state.playlistTracks;
    if (!tracks.find(trackIndex => trackIndex.id === track.id)) {
      tracks.push(track);
      this.setState({ playlistTracks: tracks });
    }
  }

  removeTracks = trackURIToGo => {
    let newTracks = this.state.playlistTracks;
    this.setState({ tracksToRemove: [...this.state.tracksToRemove, trackURIToGo] }, () => {
      this.setState({ playlistTracks: newTracks.filter(trackIndex => trackIndex.track.uri !== trackURIToGo)}
        )
    })
  }

  search = searchTerm => {
    Spotify.search(searchTerm).then(results => {
      this.setState({ searchResults: results });
    });
    return document.cookie;
  }

  render() {
    return (
      <div>
        <Header />
        <RoomCover playlistInfo={this.state} />
        <SearchBar onSearch={this.search} />

        {/* <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} /> */}
        <TrackList
          playlistID={this.state.playlistID}
          playlistTracks={this.state.playlistTracks}
          remove={this.removeTracks}
        />
      </div>
    );
  }
}
export default Room;
