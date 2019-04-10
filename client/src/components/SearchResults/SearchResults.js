import React from 'react';
import './SearchResults.css';

const SearchResults = props => {
  const options = props.results.map(song => (
    <li
      key={song.id}
      className='list-group-item TrackItem'
      onClick={() => {
        props.addSong(song.uri);
      }}
    >
      <div className='media'>
        {/* <img src={song.album.images[0].url} className='mr-3 TrackImg' alt='album-cover' /> */}
        <div className='media-body'>
          <h5 className='mt-0 TrackName'>{song.name}</h5>
          <p className='ArtistName'>{song.artist}</p>
          <button>ADD SONG</button>
        </div>
      </div>
    </li>
  ));
  return (
    <div className='Results'>
      <ul>{options}</ul>
    </div>
  );
};

export default SearchResults;
