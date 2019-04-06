import React, { Component } from 'react';
import './App.css';
import './Header.css';
import Header from './Header';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import CreatePlaylist from './CreatePlaylist';
import CollabList from './CollabList';
import Spotify from './Spotify/Spotify';

class App extends Component {
  constructor() {
    super();

    this.state = {
      playlistName: 'New Playlist',
      playlistDesc: '',
      playlistID: '',
      searchResults: [],
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.updatePlaylistDesc = this.updatePlaylistDesc.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {}

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (!tracks.find(trackIndex => trackIndex.id === track.id)) {
      tracks.push(track);
      this.setState({ playlistTracks: tracks });
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let newTracks = tracks.filter(trackIndex => trackIndex.id !== track.id);
    this.setState({ playlistTracks: newTracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  updatePlaylistDesc(desc) {
    this.setState({ playlistDesc: desc });
  }

  savePlaylist() {
    let tracks = this.state.playlistTracks;
    if (tracks.length && this.state.playlistName) {
      let trackURIs = tracks.map(trackIndex => trackIndex.uri);
      Spotify.savePlaylist(this.state.playlistName, this.state.playlistDesc, trackURIs).then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        });
        document.getElementById('Playlist-name').value = this.state.playlistName;
      });
    }
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(results => {
      this.setState({ searchResults: results });
    });
    return document.cookie;
  }

  getPLID = plID => {
    this.setState({
      playlistID: plID
    });
  };

  render() {
    return (
      <div>
        <Header />
        <SearchBar onSearch={this.search} />
        <section className='container'>
          <div className='row'>
            <CreatePlaylist
              playlistName={this.state.playlistName}
              playlistDesc={this.state.playlistDesc}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onDescChange={this.updatePlaylistDesc}
              onSave={this.savePlaylist}
            />
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
          </div>
          <div className='Collab-List'>
            <CollabList />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
