import React, { Component } from 'react';
import {HashRouter as Router,Route} from 'react-router-dom';
import Header from './components/Header';
import Login from './container/Login';
import Home from './container/Home';
import Forgetpwd from './container/Forgetpwd';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Header/>
        <div style={{width:'100%',height:'100%',float:'left'}}>
          <div className='main' style={{width:'100%',height:'500px',float:'left'}}>
            <Route exact path='/' component={Login}/>
            <Route path='/home' component={Home}/>
            <Route path='/forgetpwd' component={Forgetpwd}/>
          </div>
        </div>
      </Router>
    )
  }
}
