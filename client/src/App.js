import React, { Component } from 'react';
import './App.css';
import './components/Header/Header.css';
import Header from './components/Header/Header';
import CreatePlaylist from './components/CreatePlaylist/CreatePlaylist';
import CollabList from './components/CollabList/CollabList';
import Spotify from './Spotify/Spotify';

class App extends Component {
  constructor() {
    super();

    this.state = {
      playlistName: '',
      playlistDesc: '',
      playlistID: '',
      playlistTracks: []
    };

    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.updatePlaylistDesc = this.updatePlaylistDesc.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  updatePlaylistDesc(desc) {
    this.setState({ playlistDesc: desc });
  }

  savePlaylist() {
    let tracks = this.state.playlistTracks;
    if (!this.state.playlistName) {
      alert('Playlist must have a name');
    }
    let trackURIs = tracks.map(trackIndex => trackIndex.uri);
    Spotify.savePlaylist(this.state.playlistName, this.state.playlistDesc, trackURIs).then(response => {
      this.setState ({
        playlistID: response.playlistID,
        })
      })
    };
  

  render() {
    return (
      <div style={{ height: '100vh' }}>
        <Header />
        <section className='container full-screen'>
          <div className='row Dash'>
            <CreatePlaylist
              playlistID={this.state.playlistID}
              playlistName={this.state.playlistName}
              playlistDesc={this.state.playlistDesc}
              playlistTracks={this.state.playlistTracks}
              onNameChange={this.updatePlaylistName}
              onDescChange={this.updatePlaylistDesc}
              onSave={this.savePlaylist}
            />

            <CollabList />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
