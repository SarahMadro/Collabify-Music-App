import React from 'react';
import Spotify from '../../Spotify/Spotify';


class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      hideTrack: false
    }

    this.millisToMinutesAndSeconds = this.millisToMinutesAndSeconds.bind(this);

  }

  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  removeTrack(trackURI){
    this.props.remove(trackURI)
    this.setState({
      hideTrack: true
    })
  }

  

  render() {
    return (
      <div>
        {this.props.tracks.map(track => (
          <li className='list-group-item TrackItem'>
            <div className='media'>
              <img src={track.track.album.images[0].url} className='mr-3 TrackImg' alt='...' />
              <div className='media-body'>
                <h5 className='mt-0'>{track.track.name}</h5>
                <p className='ArtistName'>{track.track.artists[0].name}</p>
                <p className='SongDuration'>{this.millisToMinutesAndSeconds(track.track.duration_ms)}</p>
              </div>
            </div>
            <button type='button' className='btn btn-success Remove' onClick={() => {this.removeTrack(track.track.uri)}} >
              Remove
            </button>
          </li>
        ))}
      </div>
    );
  }
}

export default Track;
