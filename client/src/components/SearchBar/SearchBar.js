import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.search();
    }
  }

  handleClick = event => {
    event.target.setSelectionRange(0, event.target.value.length);
  }

  handleKeyPress = event => {
    if (event.key === 'Enter' && event.target.value) {
      this.search();
    }
  }

  handleTermChange = event => {
    this.setState({ searchTerm: event.target.value });
  }

  search = () => {
    this.state.searchTerm && this.props.onSearch(this.state.searchTerm);
  }

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
          <button className='SearchButton btn btn-success' onClick={this.search}>
            Search
          </button>
          <br />
        </div>
      </div>
    );
  }
}

export default SearchBar;
