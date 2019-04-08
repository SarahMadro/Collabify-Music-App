import React from 'react';
import Spotify from '../../Spotify/Spotify';
import './CollabList.css';

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
      playlists.forEach(playlist => {
        if (playlist.image === undefined) {
          console.log("This playlist doesn't have an image. Gotta find a sub");
        }
      });
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
              // ALL RESULTS GO HERE
              // access to
              // key: playlists.id,
              // collaborative: playlists.collaborative,
              // id: playlists.id,
              // name: playlists.name,
              // uri: playlists.uri,
              // image: playlists.images[0].url  IMAGES DOESN'T WORK RIGHT NOW
              <a href={'/room/?pl=' + playlist.id} className='list-group-item list-group-item-action CollabItem'>
                <p style={{ marginBottom: '2px' }} className='CollabPlayListName'>
                  {playlist.name}
                </p>
                <p className='CollabPlayInfo'>This playlist has {playlist.tracks.total} Tracks</p>
              </a>
            ))
            // NOT PAST HERE
            }
          </div>
        </div>
      </div>
    );
  }
}

export default CollabList;
