import React from 'react';
import Collab from './Collab';
import Spotify from './Spotify/Spotify';

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
      console.log('made it to CollabList', playlists);
      return this.setState({ currentUsersPlaylists: playlists });
    });
  }

  render() {
    return (
      <div className='col' alignt='center'>
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
              // image: playlists.images[0].url
              <a href='' className='list-group-item list-group-item-action CollabItem'>
                {playlist.name}
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
