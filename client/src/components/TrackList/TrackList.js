import React, { Component } from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsersPlaylists: [],
    };
  }


  render() {
    return (
      <div className='BodyWrapper col'>
        <div className='TrackList'>
          <h3 className='MyTrackList'>Track List</h3>
          <div className='list-group' />
          <ul className='list-group'>
            <Track
              playlistID ={this.props.playlistID}
              tracks={this.props.playlistTracks}
              remove={this.props.remove}
            />
          </ul>
        </div>
      </div>
    );
  }
}

export default TrackList;
