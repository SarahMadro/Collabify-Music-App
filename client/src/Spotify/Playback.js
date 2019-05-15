import React, { Component } from 'react';

class Widget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <iframe
        src={'https://open.spotify.com/embed/user/spotify/playlist/' + this.props.playlistID}
        width='650'
        height='200'
        frameborder='0'
        allowtransparency='true'
        allow='encrypted-media'
      />
    );
  }
}
export default Widget;
