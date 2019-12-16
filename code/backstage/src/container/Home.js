import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Leader from '../components/Leader';
import Sider from '../components/Sider';
import System from './SysManage';
import ComManage from './ComManage';
import UserManage from './UserManage';
import WorksManage from './WorksManage';
import CountManage from './CountManage';
import Sucai from './MaterialManage/Sucai';
import Sucaicomment from './Sucaicomment';
import Zuowencomment from './Zuowencomment';
import AddMaterial from './MaterialManage/AddMaterial';
import UpdateMaterial from './MaterialManage/UpdateMaterial';
import MaterialManage from './MaterialManage/MaterialManage';
import FeedBack from './FeedBack';

export default class Home extends Component {
    render() {
        return (
            <Router>
            <div>
                <div style={{float:'left'}}>
                    <Leader/>
                </div>
                <div className='content'>
                    <Switch>
                    <Route exact path='/home/' component={System}/>
                    <Route path='/home/users' component={UserManage}/>
                    <Route path='/home/material/updatematerial' component={UpdateMaterial}/>
                    <Route path='/home/material/addmaterial' component={AddMaterial}/>
                    <Route path='/home/material/:mtab' component={Sucai}/>
                    <Route path='/home/material' component={MaterialManage}/>
                    <Route path='/home/works' component={WorksManage}/>
                    <Route path='/home/comment' component={ComManage}/>
                    <Route path='/home/count' component={CountManage}/>
                    <Route path='/home/feedback' component={FeedBack}/>
                    <Route path='/home/sucaicomment' component={Sucaicomment}/>
                    <Route path='/home/zuowencomment' component={Zuowencomment}/>
                    </Switch>
                </div>
                <div className='sider'>
                    <Sider/>
                </div>
            </div>
            </Router>
        )
    }
}
