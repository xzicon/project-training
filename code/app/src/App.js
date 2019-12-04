import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Start from './launch/Start';
import Login from './launch/Login';
import Register from './launch/Register';
import Apptab from './container/Apptab';
import Forgetpwd from './launch/Forgetpwd';
import Mydetail from './container/me/Mydetail';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path='/' exact component={Start}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/tab' component={Apptab}/>
                    <Route path='/forgetpwd' component={Forgetpwd}/>
                    <Route path='/mydetail' component={Mydetail}/>
                </div>
            </Router>
        )
    }
}
