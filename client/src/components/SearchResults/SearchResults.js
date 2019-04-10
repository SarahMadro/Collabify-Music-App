import React from 'react';


const SearchResults = (props) => {
  const options = props.results.map(song => (
    <li key={song.id} className='list-group-item TrackItem'>
    <div className='media'>
      {/* <img src={song.album.images[0].url} className='mr-3 TrackImg' alt='album-cover' /> */}
      <div className='media-body'>
        <h5 className='mt-0 TrackName'>{song.name}</h5>
        <p className='ArtistName'>{song.artist}</p>
      <button onClick={() => {props.addSong(props.playlistID, song.uri)}}>ADD SONG</button>
      </div>
      </div>
      </li>
  ))
  return <ul>{options}</ul>
}

export default SearchResults