import React, { Component } from "react";
import PropTypes from "prop-types";

//NEED TOMAKE PLAYLIST COMPONENT
class Track extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  };

  renderAction() {
    return this.props.isRemoval ?
      <a className="Track-action" onClick={this.removeTrack}>-</a> :
      <a className="Track-action" onClick={this.addTrack}>+</a>;
  };

  addTrack() {
    this.props.onAdd(this.props.track);
  };

  removeTrack() {
    this.props.onRemove(this.props.track)
  };

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p> {this.props.track.artist} |  {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
};

Track.propTypes = {
  isRemoval: PropTypes.bool,
  track: PropTypes.object,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func
};

export default Track;