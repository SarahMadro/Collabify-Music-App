import React, { Component } from 'react';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import TrackList from '../TrackList/TrackList';
// import SearchResults from '../SearchResults/SearchResults';
import RoomCover from '../RoomCover/RoomCover';
import Spotify from '../../Spotify/Spotify';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistID: '',
      playlistDesc: '',
      playlistTracks: [],
      playlistImage: '',
      playlistName: '',
      searchResults: []
    };

    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.getPlaylistFromUrl = this.getPlaylistFromUrl.bind(this);
    this.getPlaylistDetails = this.getPlaylistDetails.bind(this);

    // this.removeTrack = this.removeTrack.bind(this);
  }

  componentWillMount(){
    this.setState ({
      playlistID: this.getPlaylistFromUrl()
    })
  }

  componentDidMount(){
    this.getPlaylistDetails()
  }

  // onRemove={this.removeTrack}

  // removeTrack(track) {
  //   let newTracks = tracks.filter(trackIndex => trackIndex.id !== track.id);
  //   this.setState({ playlistTracks: newTracks });
  // }

  getPlaylistDetails() {
    Spotify.getPlaylistDetails(this.state.playlistID).then(response => {
      return this.setState({
        playlistDesc: response.description,
        playlistTracks: response.tracks,
        playlistImage: response.image,
        playlistName: response.name
      });
    });
  }

  getPlaylistFromUrl() {
    let query = window.location.href;
    let vars = query.split('=');
    return vars[1];
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (!tracks.find(trackIndex => trackIndex.id === track.id)) {
      tracks.push(track);
      this.setState({ playlistTracks: tracks });
    }
  }

  search(searchTerm) {
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
        <TrackList playlistTracks={this.state.playlistTracks} />
      </div>
    );
  }
}
export default Room;
