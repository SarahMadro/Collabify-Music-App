import React, { Component } from 'react';
import './RoomCover.css';
import collabs from './collabs.jpg';

class RoomCover extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='BodyWrapper'>
        <div className='container RoomCover'>
          <div className='row'>
            <div className='col-10 Col1'>
              <div className='media'>
                <img src={collabs} className='mr-3 PlaylistImg' alt='...' />
                <div className='media-body PlaylistInfo'>
                  <h3 className='mt-0'>Cool Playlist</h3>
                  This is our Lighthouselabs final project cool and copllaborative playlist. Add your songs and let's
                  dance!
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
