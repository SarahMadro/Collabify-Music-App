import React, { Component } from 'react';
import Track from './Track';


class ExistingPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: []
    }
  }

  render() {
    return (
      <div>
        <Track />
      </div>
    )
  }
}
export default ExistingPlaylist;