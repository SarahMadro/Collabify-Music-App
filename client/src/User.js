import React, {Component} from 'react';
import './App.css';

class User extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div>
      <script id="user-profile-template" type="text/x-handlebars-template">
      {/* <h1>Logged in as {{display_name}}</h1> */}
      <div className="media">
        <div className="pull-left">
          <img className="media-object" width="150" src="{{images.0.url}}" />
        </div>
        <div className="media-body">
          <dl className="dl-horizontal">
            {/* <dt>Display name</dt><dd className="clearfix">{{display_name}}</dd>
            <dt>Id</dt><dd>{{id}}</dd>
            <dt>Email</dt><dd>{{email}}</dd> */}
            <dt>Spotify URI</dt><dd><a href="{{external_urls.spotify}}">{{url}}</a></dd>
            {/* <dt>Link</dt><dd><a href="{{href}}">{{href}}</a></dd>
            <dt>Profile Image</dt><dd className="clearfix"><a href="{{images.0.url}}">{{img}}</a></dd>
            <dt>Country</dt><dd>{{country}}</dd> */}
          </dl>
        </div>
      </div>
    </script>
    </div>
    )
  }
}

export default User;