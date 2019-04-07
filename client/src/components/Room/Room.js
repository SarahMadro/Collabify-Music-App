import React, { Component } from 'react';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../../Spotify/Spotify';
import SearchResults from '../SearchResults/SearchResults';
import SDK from '../../Spotify/SDK';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    };
    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    // this.removeTrack = this.removeTrack.bind(this);
  }

  // onRemove={this.removeTrack}

  // removeTrack(track) {
  //   let tracks = this.state.playlistTracks;
  //   let newTracks = tracks.filter(trackIndex => trackIndex.id !== track.id);
  //   this.setState({ playlistTracks: newTracks });
  // }

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
        <SearchBar onSearch={this.search} />
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
        <SDK onLoad={true}/>
      </div>
    );
  }
}
export default Room;
