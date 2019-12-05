import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Start from './launch/Start';
import Login from './launch/Login';
import Register from './launch/Register';
import Apptab from './container/Apptab';
import Apptab2 from './container/Apptab2';
import Apptab3 from './container/Apptab3';
import Apptab4 from './container/Apptab4';
import Forgetpwd from './launch/Forgetpwd';
import Mydetail from './container/me/Mydetail';
import MySettings from './container/me/MySettings';
import Know from './container/share/share/topic/Know';
import Topic from './container/share/share/Topic';
import Inform from './container/share/share/recommend/Inform';
import Add from './container/share/share/recommend/Add';
import Evaluation from './container/home/Evaluation';
import Result from './container/home/Result';
import Classification from './container/home/Classification';
import Classes from './container/home/Classes';
import Clock from './container/sleep/Clock';
import Setup from './container/sleep/Setup';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path='/' exact component={Start}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/home' component={Apptab}/>
                    <Route path='/sleep' component={Apptab2}/>
                    <Route path='/share' component={Apptab3}/>
                    <Route path='/me' component={Apptab4}/>
                    <Route path='/forgetpwd' component={Forgetpwd}/>
                    <Route path='/mydetail' component={Mydetail}/>
                    <Route path='/mySettings' component={MySettings}/>
                    <Route path='/topic' component={Topic} />
                    <Route path='/know' component={Know} />
                    <Route path='/inform' component={Inform} />
                    <Route path='/add' component={Add} />
                    <Route path='/evaluation' component={Evaluation} />
                    <Route path='/result' component={Result} />
                    <Route path='/classification' component={Classification} />
                    <Route path='/classes' component={Classes} />
                    <Route path='/clock' component={Clock} />
                    <Route path='/setup' component={Setup} />
                </div>
            </Router>
        )
    }
}
