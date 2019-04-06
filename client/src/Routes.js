import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App';
import Playlist from './PlayList';

//NEEDS WORK
//MOVE ROUTS TO APP COMPONENT, MOVE ALL OTHER COMPONENTS FROM APP
//TO HOME COMPONENT AFTER CREATED.
//
function AppRouter() {
  return(
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'> App </Link>
              <Link to='/Playlist'> Playlist </Link>

            </li>
          </ul>
        </nav>
        <Route path='/' exact component={App}/>
        <Route path='/Playlist' component={Playlist}/>
        <Route path='/whatever' render={(routingProps) => (
          <Playlist {...routingProps} playlistId="123"/>
        )}/>
      </div>
    </Router>
  )
}
export default AppRouter;
