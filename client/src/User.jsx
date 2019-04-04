import React, { Component, Fragment } from "react";
// import './App.css';
import axios from 'axios'
import oauthTemplate from "./utilities/spotifyApi";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  componentDidMount() {
    // axios
    //   .get({
    //     url: "https://api.spotify.com/v1/me",
    //     headers: {
    //       Authorization: "Bearer " + access_token
    //     }
    //   })
    //   .then(response => {
    //     const user = userProfileTemplate(response);
    //     user.setState = true;
    //   });

    // axios.get({
    //   url: '/refresh_token',
    //   data: {
    //     'refresh_token': refresh_token
    //   }
    //   })
    //   .then((data) => {
    //   access_token = data.access_token;
    //   oauthPlaceholder.innerHTML = oauthTemplate({
    //     access_token: access_token,
    //     refresh_token: refresh_token
    //   });
    // }, false);
  }

  render() {

    //condditional about logged in state

    return (
      <div></div>
      // <Fragment>
      //   <div className="container">
      //     <div id="login">
      //       <h1>This is an example of the Authorization Code flow</h1>
      //       <a href="/login" className="btn btn-primary">
      //         Log in with Spotify
      //       </a>
      //     </div>
      //     <div id="loggedin">
      //       <div id="user-profile" />
      //       <div id="oauth" />
      //       <button className="btn btn-default" id="obtain-new-token">
      //         Obtain new token using the refresh token
      //       </button>
      //     </div>
      //   </div>

      //   <h1>Logged in as Me</h1>
      //   <div className="media">
      //     <div className="pull-left">
      //       <img className="media-object" width="150" src="{{images.0.url}}" />
      //     </div>
      //     <div className="media-body">
      //       <dl className="dl-horizontal">
      //         <dt>Display name</dt>
      //         <dd className="clearfix">Me</dd>
      //         <dt>Id</dt>
      //         <dd></dd>
      //         <dt>Email</dt>
      //         <dd></dd>
      //         <dt>Spotify URI</dt>
      //         <dd>
      //           <a href="{{external_urls.spotify}}">External Spotify URL</a>
      //         </dd>
      //         <dt>Link</dt>
      //         <dd>
      //           <a href="{{href}}"></a>
      //         </dd>
      //         <dt>Country</dt>
      //         <dd>Country</dd>
      //       </dl>
      //     </div>
      //   </div>
      // </Fragment>
  )
  }
}

export default User;
