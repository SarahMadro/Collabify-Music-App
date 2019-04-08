import React from 'react';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.millisToMinutesAndSeconds = this.millisToMinutesAndSeconds.bind(this);
  }

  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  render() {
    return (
      <div>
        {this.props.tracks.map(track => (
          <li className='list-group-item TrackItem'>
            <div className='media'>
              <img src={track.track.album.images[0].url} className='mr-3 TrackImg' alt='album-cover' />
              <div className='media-body'>
                <h5 className='mt-0 TrackName'>{track.track.name}</h5>
                <p className='ArtistName'>{track.track.artists[0].name}</p>
                <p className='SongDuration'>{this.millisToMinutesAndSeconds(track.track.duration_ms)}</p>
              </div>
            </div>
            <button type='button' className='btn btn-success Remove'>
              Remove
            </button>
          </li>
        ))}
      </div>
    );
  }
}

export default Track;
