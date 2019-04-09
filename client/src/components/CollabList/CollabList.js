import React, { Component } from 'react';
import Spotify from '../../Spotify/Spotify';
import './CollabList.css';

class CollabList extends Component {
  constructor() {
    super();
    this.state = {
      currentUsersPlaylists: []
    };
  }

  componentDidMount() {
    this.getPlaylists();
  }

  getPlaylists = () => {
    Spotify.getPlaylists().then(playlists => {
      return this.setState({ currentUsersPlaylists: playlists });
    });
  }

  render() {
    return (
      <div className='Dashboard col' alignt='center'>
        <div className='CollabList'>
          <h3 className='MyCollabs'>My Collabs</h3>
          <div className='Collablist list-group'>
            {this.state.currentUsersPlaylists.map(playlist => (
              <a href={'/room/?pl=' + playlist.id} className='list-group-item list-group-item-action CollabItem'>
                <p style={{ marginBottom: '2px' }} className='CollabPlayListName'>
                  {playlist.name}
                </p>
                <p className='CollabPlayInfo'>This playlist has {playlist.tracks.total} Tracks</p>
              </a>
            ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default CollabList;
