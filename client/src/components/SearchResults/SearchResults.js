import React from 'react';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
  render() {
    return (
      <div className='col' align='center'>
        <div className='SearchResults'>
          <h2>Results</h2>
          <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} />
          {/* <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} /> */}
        </div>
      </div>
    );
  }
}

export default SearchResults;
