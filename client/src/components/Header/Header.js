import React, { Component } from 'react';
import './Header.css';
import Spotify from '../../Spotify/Spotify';


class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: 'Anonymous'
    };
  }

  componentDidMount () {
    Spotify.getUserInfo().then(response => {
      this.setState({
        userName: response.data.name
      })
    })
  }


  render() {
    return (
      <div>
        <header>
          <div className='wrapper'>
            <h1 className='logo'>Collabs</h1>
            {/* <button onClick={this.getUserInfo}>click to get name</button> */}
            <p className='logged-user'>Logged in as {this.state.userName}</p>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
