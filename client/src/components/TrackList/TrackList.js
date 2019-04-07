import React from 'react';
import Spotify from '../../Spotify/Spotify';
import './TrackList.css';
import collabs from './collabs.jpg';

class CollabList extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUsersPlaylists: []
    };

    this.getPlaylists = this.getPlaylists.bind(this);
  }

  componentDidMount() {
    this.getPlaylists();
  }

  getPlaylists() {
    Spotify.getPlaylists().then(playlists => {
      // console.log('made it to CollabList', playlists);
      return this.setState({ currentUsersPlaylists: playlists });
    });
  }

  render() {
    return (
      <div className='BodyWrapper col'>
        <div className='TrackList'>
          <h3 className='MyTrackList'>Track List</h3>
          <div className='list-group' />
          <ul className='list-group'>
            <li className='list-group-item TrackItem'>
              <div className='media'>
                <img src={collabs} className='mr-3 TrackImg' alt='...' />
                <div className='media-body'>
                  <h5 className='mt-0'>Song Name</h5>
                  <p className='ArtistName'>Artist Name</p>
                  <p className='SongDuration'>5:40</p>
                </div>
              </div>
              <button type='button' className='btn btn-success Remove'>
                Remove
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default CollabList;
