import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Leader from '../components/Leader';
import System from './SysManage'
import RecManage from './RecManage';
import ComManage from './ComManage';
import UserManage from './UserManage';
import WorksManage from './WorksManage';
import MaterialManage from './MaterialManage/MaterialManage';
import Sucai from './MaterialManage/Sucai';
import Fanwen from './MaterialManage/Fanwen';
import Jifa from './MaterialManage/Jifa';
import Sucaicomment from './Sucaicomment';
import Zuowencomment from './Zuowencomment'

export default class Home extends Component {
    render() {
        return (
            <Router>
            <div>
                <div style={{float:'left'}}>
                    <Leader/>
                </div>
                <div className='content'>
                    <Route exact path='/home/' component={System}/>
                    <Route path='/home/users' component={UserManage}/>
                    <Route path='/home/material' component={MaterialManage}/>
                    <Route path='/home/recommend' component={RecManage}/>
                    <Route path='/home/works' component={WorksManage}/>
                    <Route path='/home/comment' component={ComManage}/>
                    <Route path='/home/sucai' component={Sucai}/>
                    <Route path='/home/fanwen' component={Fanwen}/>
                    <Route path='/home/jifa' component={Jifa}/>
                    <Route path='/home/sucaicomment' component={Sucaicomment}/>
                    <Route path='/home/zuowencomment' component={Zuowencomment}/>
                </div>
            </div>
            </Router>
        )
    }
}
