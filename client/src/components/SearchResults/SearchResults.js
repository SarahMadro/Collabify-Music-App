import React from 'react';
import './SearchResults.css';

const SearchResults = props => {
  const options = props.results.map(song => (
    <li
      key={song.id}
      className='list-group-item TrackItemResult'
      onClick={() => {
        props.addSong(props.playlistID, song.uri);
      }}
    >
      <div className='media'>
        <div className='media-body'>
          <h5 className='mt-0 TrackNameResult'>{song.name}</h5>
          <p className='ArtistNameResult'>{song.artist}</p>
        </div>
      </div>
    </li>
  ));
  return <div className='Results'>{options}</div>;
};

export default SearchResults;
