import React, { Component } from 'react';
import './RoomCover.css';

class RoomCover extends Component {
  render() {
    return (
      <div className='BodyWrapper'>
        <div className='container RoomCover'>
          <div className='row'>
            <div className='col-10 Col1'>
              <div className='media'>
                <img src={this.props.playlistInfo.playlistImage} className='mr-3 PlaylistImg' alt='...' />
                <div className='media-body PlaylistInfo'>
                  <h3 className='mt-0'>{this.props.playlistInfo.playlistName}</h3>
                  <p>{this.props.playlistInfo.playlistDesc}</p>
                </div>
              </div>
            </div>
            <div className='col-2 Col2'>
              <h5 className='HostMenu'>Menu</h5>
              <ul>
                <li>
                  <a href=''> Share</a>
                </li>
                <a href=''> Delete</a>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RoomCover;
