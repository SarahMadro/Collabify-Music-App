import React, { Component } from 'react';
import './RoomCover.css';

class RoomCover extends Component {
  render() {
    return (
      <div className='BodyWrapper'>
        <div className='container RoomCover'>
          <div className='row'>
            <div className='col-8 Col1'>
              <div className='media'>
                <img src={this.props.playlistInfo.playlistImage} className='mr-3 PlaylistImg' alt='...' />
                <div className='media-body PlaylistInfo'>
                  <h3 className='mt-0 PlaylistN'>{this.props.playlistInfo.playlistName}</h3>
                  <p className='PlaylistDesc'>{this.props.playlistInfo.playlistDesc}</p>
                </div>
              </div>
            </div>
            <div className='col-4 Col2' />
          </div>
        </div>
      </div>
    );
  }
}

export default RoomCover;
