import React, { Component } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import ExistingPlaylist from './ExistingPlaylist';

class Room extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />

        <SearchBar />
      </div>
    );
  }
}
export default Room;
