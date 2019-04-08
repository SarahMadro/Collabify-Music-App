import React, { Component } from 'react';
import './Header.css';
import Spotify from '../../Spotify/Spotify';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: 'Anonymous',
      userPhoto: ''
    };
  }

  componentDidMount() {
    Spotify.getUserInfo().then(response => {
      this.setState({
        userName: response.data.name,
        userPhoto: response.data.image
      });
    });
  }

  render() {
    return (
      <div>
        <header>
          <div class='Sound'>
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className='wrapper'>
            <h1 className='logo'>Collabify</h1>
            <div className='UserProfile'>
              <img className='UserPhoto' src={this.state.userPhoto} />
              <p className='UserName'> {this.state.userName}</p>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
