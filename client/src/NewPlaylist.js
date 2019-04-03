import React from 'react';
import PropTypes from 'prop-types';
// import child components
// import TrackList from '../TrackList/TrackList';


class Playlist extends React.Component
{
  constructor(props)
  {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    // this.state = {
    //   userID = cookie.id
    // }
  }


  handleNameChange(event)
  {
    // this.props.onNameChange(playList.name);
    this.setState({playList: {name: event.target.value}})
  }

  // savePlaylistToSpotify(name) {
  //   SpotifyWebApi.createPlaylist()
  //   .then((response) => {
  //     // this.setState ({
  //     //   userId:
  //     // }

  //   })

  // }

  render()
  {
    return(
      <div className="Playlist">
        <input defaultValue ={'New Playlist'} onChange= {this.handleNameChange}/>
        {/* <TrackList tracks = {this.props.tracks}
                   onRemove= {this.props.onRemove}
                   isRemoval={true}/> */}
        <button className="Playlist-save" onClick= {this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    );
  }
};

Playlist.propTypes = {
  tracks: PropTypes.array,
  onRemove: PropTypes.func,
  onNameChange: PropTypes.func,
  onSave : PropTypes.func
};
export default Playlist;