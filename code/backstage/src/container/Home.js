import React, { Component } from 'react';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import Leader from '../components/Leader';
import Manager from './UserManage/Manager';
import ComManage from './ComManage';
import UserManage from './UserManage/UserManage';
import StudentManage from './UserManage/StudentManage';
import TeachersManage from './UserManage/TeachersManage';
import WorksManage from './WorksManage';
import CountManage from './CountManage';
import Sucai from './MaterialManage/Sucai';
import Sucaicomment from './Sucaicomment';
import Zuowencomment from './Zuowencomment';
import AddMaterial from './MaterialManage/AddMaterial';
import UpdateMaterial from './MaterialManage/UpdateMaterial';
import MaterialManage from './MaterialManage/MaterialManage';
import FeedBack from './FeedBack';
import SearchDetail from './MaterialManage/SearchDetail';
import WorksDetail from './WorksDetail';
import Message from './Message'
import Recommend from './RecommendManage/Recommend'
import AddRec from './RecommendManage/AddRec';

export default class Home extends Component {
    render() {
        return (
            <Router>
            <div>
                <Leader/>
                <div className='content'>
                    <Switch>
                    <Route exact path='/home' component={CountManage}/>
                    <Route path='/home/users' component={UserManage}/>
                    <Route path='/home/stus' component={StudentManage}/>
                    <Route path='/home/teachers' component={TeachersManage}/>
                    <Route path='/home/search' component={SearchDetail}/>
                    <Route path='/home/material/updatematerial' component={UpdateMaterial}/>
                    <Route path='/home/material/addmaterial' component={AddMaterial}/>
                    <Route path='/home/material/:mtab' component={Sucai}/>
                    <Route path='/home/material' component={MaterialManage}/>
                    <Route path='/home/works' component={WorksManage}/>
                    <Route path='/home/worksdetail' component={WorksDetail}/>
                    <Route path='/home/comment' component={ComManage}/>
                    <Route path='/home/system' component={Manager}/>
                    <Route path='/home/feedback' component={FeedBack}/>
                    <Route path='/home/sucaicomment' component={Sucaicomment}/>
                    <Route path='/home/zuowencomment' component={Zuowencomment}/>
                    <Route path='/home/message' component={Message}/>
                    <Route path='/home/recommend/addrec' component={AddRec}/>
                    <Route path='/home/recommend' component={Recommend}/>
                    </Switch>
                </div>
            </div>
            </Router>
        )
    }
}
