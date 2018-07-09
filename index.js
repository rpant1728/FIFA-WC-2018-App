
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import { App }from './App'
import { MatchDetail } from './MatchDetail';
import { Home } from './Home';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/home" component={Home}/>
    <Route path="/match_detail" component={MatchDetail}/>
  </Router>
), document.getElementById('App'))