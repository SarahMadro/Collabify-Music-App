import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreatePlaylist from './components/CreatePlaylist/CreatePlaylist';
import Room from './components/Room/Room';

const routing = (
  <Router>
    <div>
      <Route path='/' exact component={App} />
      <Route path='/CreatePlaylist' component={CreatePlaylist} />
      <Route path='/Room' component={Room} />
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById('root'));
