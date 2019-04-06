import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from './Header';
// import NewPlaylist from './newPlaylist';
import CreatePlaylist from './CreatePlaylist';
import Room from './Room';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import TrackList from './TrackList';


const routing = (
  <Router >
  <div>
    <ul>
       <li>
         <Link to="/App">App</Link>
       </li>
       <li>
         <Link to="/CreatPlaylist">CreatePlaylist</Link>
       </li>
     </ul>
    <Route path='/' exact component={App}/>
    <Route path='/CreatePlaylist' component={CreatePlaylist}/>
  </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));
