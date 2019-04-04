import React, { Component } from "react";
import PropTypes from "prop-types";
import Track from './Track';

// NEED TOMAKE PLAYLIST COMPONENT

class TrackList extends Component {
  render() {

    const tracks = this.props.tracks.map(track => {
      return(
        <Track key={track.id}
              track={track}
              onAdd={this.props.onAdd}
              isRemoved={this.props.isRemoved}
              onRemove={this.props.onRemove} />
      )
    });

    return (
      <div className="TrackList">
      {tracks}
      </div>
    )
  };
}

TrackList.propTypes = {
  isRemoval: PropTypes.bool,
  tracks: PropTypes.array,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func
};

export default TrackList
