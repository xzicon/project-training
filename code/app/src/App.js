import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import AppTab from './container/AppTab';
import AppTab2 from './container/AppTab2';
import AppTab3 from './container/AppTab3';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path='/' component={AppTab}/>
                    <Route path='/compositon' component={AppTab2}/>
                    <Route path='/mine' component={AppTab3}/>
                </div>
            </Router>
        )
    }
}
