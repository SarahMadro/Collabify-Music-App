import React, { Component } from 'react';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import TrackList from '../TrackList/TrackList';
// import SearchResults from '../SearchResults/SearchResults';
import RoomCover from '../RoomCover/RoomCover';
import Spotify from '../../Spotify/Spotify';
<<<<<<< HEAD
import SearchResults from '../SearchResults/SearchResults';
import SDK from '../../Spotify/SDK';
=======
>>>>>>> 5901b69e6d034de12f21405fbe5b6b1de91a7b57

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistID: this.getPlaylistFromUrl(),
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

  componentDidMount(){
    this.getPlaylistDetails()
  }


  // onRemove={this.removeTrack}

  // removeTrack(track) {
  //   let newTracks = tracks.filter(trackIndex => trackIndex.id !== track.id);
  //   this.setState({ playlistTracks: newTracks });
  // }

  getPlaylistDetails(){
    Spotify.getPlaylistDetails(this.state.playlistID).then(response => {
    return this.setState ({
      playlistDesc: response.description,
      playlistTracks: response.tracks,
      playlistImage: response.image,
      playlistName: response.name
    })
    })
  }

  getPlaylistFromUrl(){
    let query = window.location.href;
    let vars = query.split("=");
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
        <RoomCover />
        <SearchBar onSearch={this.search} />
<<<<<<< HEAD
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
        <SDK onLoad={true}/>
=======
        {/* <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} /> */}
        <TrackList />
>>>>>>> 5901b69e6d034de12f21405fbe5b6b1de91a7b57
      </div>
    );
  }
}
export default Room;
