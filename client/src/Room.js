import React, { Component } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';

class Room extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}
export default Room;
