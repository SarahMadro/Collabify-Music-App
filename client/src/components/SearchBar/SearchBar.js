import React, { Component } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../Spotify/Spotify';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      playlistID: ''
    };
  }

  componentWillMount() {
    this.setState({
      playlistID: this.props.playlistID
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.search();
    }
  }

  handleClick = event => {
    event.target.setSelectionRange(0, event.target.value.length);
  };

  handleKeyPress = event => {
    if (event.key === 'Enter' && event.target.value) {
      this.search();
    }
  };

  handleTermChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  search = () => {
    this.state.searchTerm &&
      Spotify.search(this.state.searchTerm).then(results => {
        this.setState({ searchResults: results });
      });
  };

  addSong = (playlistID, uri) => {
<<<<<<< HEAD
    console.log('WOAH!', playlistID);
    console.log('HUH?', uri);
=======
>>>>>>> 47a00419be74a5f13267599fabcddcec8ac4a8ad
    Spotify.addTrack(playlistID, uri);
    let target = document.getElementById('SearchInput');
    target.value = '';
    this.setState({ searchResults: [] });
<<<<<<< HEAD
  };
=======
    this.props.reload()
  }
>>>>>>> 47a00419be74a5f13267599fabcddcec8ac4a8ad

  render() {
    return (
      <div className='BodyWrapper'>
        <div className='SearchBar'>
          <input
            id='SearchInput'
            className='SearchInput'
            placeholder='Enter a Song, Album, or Artist'
            onChange={this.handleTermChange}
            onKeyPress={this.handleKeyPress}
            onClick={this.handleClick}
          />
          {/* <button className='SearchButton btn btn-success' onClick={this.search}>
            Search
          </button> */}
          <br />
        </div>
        <SearchResults playlistID={this.props.playlistID} addSong={this.addSong} results={this.state.searchResults} />
      </div>
    );
  }
}

export default SearchBar;
