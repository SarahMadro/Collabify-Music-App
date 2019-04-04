import React from 'react';
import TrackList from './TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.target.setSelectionRange(0, event.target.value.length);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter' && event.target.value) {
      this.props.onSave();
    }
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className='Playlist'>
        <input
          id='Playlist-name'
          placeholder='Enter a playlist name'
          defaultValue={this.props.playlistName}
          onChange={this.handleNameChange}
          onKeyPress={this.handleKeyPress}
          onClick={this.handleClick}
        />
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
        <button className='Playlist-save' onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}

export default Playlist;
