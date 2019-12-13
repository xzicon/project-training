import React, { Component } from 'react';
import {HashRouter as Router,Route} from 'react-router-dom';

//首页
import Write from './container/home/Write';
import Article from './container/home/Article';
import Collection from './container/home/collection/Collection';
import News from './container/home/news/News';
import Essay from './container/home/collection/Essay';
import Praise from './container/home/news/Praise';
import Manage from './container/home/Manage';
import Comment from './container/home/Comment';
import Home from './container/home/Home';
import Composition from './container/composition/Composition';
import Mine from './container/mine/Mine';
import Follow from './container/home/Follow';
import Create from './container/home/Create';
import Start from './launch/Start';
import Login from './launch/Login';
import Register from './launch/Register';
import Forgetpwd from './launch/Forgetpwd';
import Modify from './launch/Modify';
import Crnew from './container/home/Crnew';

//作文页
import Material from './container/composition/material/Material'

//我的
import Write2 from './container/mine/Write';
import Collect2 from './container/mine/Collect';
import Praise2 from './container/mine/Praise';
import Follow2 from './container/mine/Follow';
import Fans from './container/mine/Fans';
import Mnew from './container/mine/Mnew';
import Mpraise from './container/mine/Mpraise';
import Marticle from './container/mine/Marticle';
import Search from './container/home/Search';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    {/* 作文 */}
                    <Route path='/' exact component={Start}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/forgetpwd' component={Forgetpwd}/>
                    <Route path='/modify' component={Modify}/>
                    <Route path='/home' exact component={Home}/>
                    {/* <Route path='/home/recommend' component={Recommend}/> */}
                    <Route path='/home/follow' component={Follow}/>
                    <Route path='/home/create' exact component={Create}/> 
                    <Route path='/home/write' component={Write}/>
                    <Route path='/home/article/:page' component={Article}/>
                    <Route path='/home/collection' component={Collection}/>
                    <Route path='/home/news' component={News}/>
                    <Route path='/home/essay' component={Essay}/>
                    <Route path='/home/praise' component={Praise}/>
                    <Route path='/home/manage' component={Manage}/>
                    <Route path='/home/comment' component={Comment}/>
                    <Route path='/home/crnew' component={Crnew}/>
                    <Route path='/home/search' component={Search}/>

                    {/* 素材 */}
                    <Route path='/composition' exact component={Composition}/>
                    <Route path='/composition/material' component={Material}/>
                    {/* <Route path='/composition/essay' component={Essay1}/>
                    <Route path='/composition/skill' component={Skill}/>
                    <Route path='/composition/all' component={All}/>
                    <Route path='/composition/add' component={Add}/>
                    <Route path='/composition/inform' component={Inform}/>
                    <Route path='/composition/character' component={Character}/>
                    <Route path='/composition/word' component={Word}/>
                    <Route path='/composition/figure' component={Figure}/>
                    <Route path='/composition/write' component={Write1}/>
                    <Route path='/composition/writing' component={Writing}/> */}

                    {/* 我的 */}
                    <Route path='/mine' exact component={Mine}/>
                    <Route path='/mine/write' component={Write2}/>
                    <Route path='/mine/collect' component={Collect2}/>
                    <Route path='/mine/praise' component={Praise2}/>
                    <Route path='/mine/follow' component={Follow2}/>
                    <Route path='/mine/fans' component={Fans}/>
                    <Route path='/mine/mnew' exact component={Mnew}/>
                    <Route path='/mine/mpraise' component={Mpraise}/>
                    <Route path='/mine/marticle' component={Marticle}/>
                </div>
            </Router>
        )
    }
}
//state:uid 用户id
//state1:aid 作文id
//state2:upid 作文详情用户id
//state3:aid 我的作文id
//state4:uid 关注的用户