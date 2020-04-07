import React, { Component } from 'react';
import {HashRouter as Router,Route} from 'react-router-dom';

//作文
import Write from './container/home/Write';
import Article from './container/home/Article';
import News from './container/home/news/News';
import Praise from './container/home/news/Praise';
import Manage from './container/home/Manage';
import Comment from './container/home/Comment';
import Home from './container/home/Home';
import Composition from './container/composition/Composition';
import Mine from './container/mine/Mine';
import Follow from './container/home/Follow';
import Start from './launch/Start';
import Login from './launch/Login';
import Register from './launch/Register';
import Forgetpwd from './launch/Forgetpwd';
import Modify from './launch/Modify';
import Crnew from './container/home/Crnew';
import Search from './container/home/Search';
import Fopeople from './container/home/Fopeople';

//素材
import Material from './container/composition/material/Material'
import All from './container/composition/All';

//我的
import Write2 from './container/mine/Write';
import Collect2 from './container/mine/Collect';
import Praise2 from './container/mine/Praise';
import Follow2 from './container/mine/Follow';
import Fans from './container/mine/Fans';
import Mnew from './container/mine/Mnew';
import Mpraise from './container/mine/Mpraise';
import Marticle from './container/mine/Marticle';
import Mmaterial from './container/composition/Mmaterial';
import Sdetails from './container/composition/Sdetails';
import Mdetails from './container/composition/Mdetails';
import Tdetails from './container/composition/Tdetails';
import Lwrite from './container/composition/Lwrite';
import Lcomment from './container/composition/Lcomment';
import Select from './launch/Select';
import Xselect from './launch/Xselect';
import Mcnew from './container/mine/Mcnew';
import Csearch from './container/composition/Csearch';
import Edit from './container/mine/Edit';
import Writing from './container/composition/material/Writing';
import Gselect from './launch/Gselect';
import Feedback from './container/mine/Feedback';
import Personal from './container/mine/Personal';
import Myset from './container/mine/Myset';
import Question from './container/mine/Question';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    {/* 启动 */}
                    <Route path='/' exact component={Start}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/forgetpwd' component={Forgetpwd}/>
                    <Route path='/modify' component={Modify}/>
                    <Route path='/:page/select' component={Select}/>
                    <Route path='/:page/xselect' component={Xselect}/>
                    <Route path='/:page/gselect' component={Gselect}/>

                    {/* 作文 */}
                    <Route path='/:page/mine/mcn/mcn/mcn/mcn/mcn/prise/prise/fopeople/fowrite/fowrite/article/:page/:page' component={Article}/>
                    <Route path='/:page/home' exact component={Home}/>
                    <Route path='/:page/home/follow' exact component={Follow}/>
                    <Route path='/:page/home/write' exact component={Write}/>
                    <Route path='/:page/home/write/follow' exact component={Write}/>
                    <Route path='/:page/home/home/crnew/write' component={Write}/>
                    <Route path='/:page/home/article/:page/:page1' component={Article}/>
                    <Route path='/:page/home/follow/article/:page/:page1' component={Article}/>
                    <Route path='/:page/home/home/crnew/article/:page/:page1' component={Article}/>
                    <Route path='/:page/home/home/search/search/article/:page/:page1' component={Article}/>
                    <Route path='/:page/home/h/fopeople/fowrite/fowrite/article/:page/:page1' component={Article}/>
                    <Route path='/:page/home/mine/p/fopeople/fowrite/fowrite/article/:page/:page1' component={Article}/>
                    <Route path='/:page/home/mine/prise/prise/fopeople/fowrite/fowrite/article/:page/:page1' component={Article}/>
                    <Route path='/:page/home/news' component={News}/>
                    <Route path='/:page/home/praise' component={Praise}/>
                    <Route path='/:page/home/manage' component={Manage}/>
                    <Route path='/:page/:page/:page/home/comment' component={Comment}/>
                    <Route path='/:page/:page/:page/composition/writin/comment' component={Comment}/>
                    <Route path='/:page/home/crnew' component={Crnew}/>
                    <Route path='/:page/home/search' exact component={Search}/>
                    <Route path='/:page/home/search/follow' exact component={Search}/>
                    <Route path='/:page/home/home/crnew/search' component={Search}/>
                    <Route path='/:page/:page/:page/home/fopeople' component={Fopeople}/>
                    <Route path='/:page/:page/:page/home/f/fopeople/follow' component={Fopeople}/>
                    <Route path='/:page/:page/:page/home/c/c/home/crnew/fopeople' component={Fopeople}/>
                    <Route path='/:page/:page/:page/home/a/a/a/home/home/article/fopeople' component={Fopeople}/>
                    <Route path='/:page/:page/:page/com/w/w/w/w/com/com/com/writing/fopeople' component={Fopeople}/>
                    <Route path='/:page/:page/:page/mine/m/m/m/m/m/mine/com/com/com/mine/fopeople' component={Fopeople}/>

                    {/* 素材 */}
                    <Route path='/:page/composition/composition' component={Composition}/>
                    <Route path='/:page/composition/material/:page' component={Material}/>
                    <Route path='/:page/composition/mmaterial' component={Mmaterial}/>
                    <Route path='/:page/composition/all' component={All}/>
                    <Route path='/:page/:page/composition/sdetails/:page' component={Sdetails}/>
                    <Route path='/:page/:page/composition/label/s/sdetails/:page' component={Sdetails}/>
                    <Route path='/:page/:page/composition/search/sucai/s/s/s/sdetails/:page' component={Sdetails}/>
                    <Route path='/:page/:page/composition/article/sucai/s/s/s/s/s/sdetails/:page' component={Sdetails}/>
                    <Route path='/:page/:page/mine/mn/mn/mn/mn/mn/sucai/s/s/s/s/s/sdetails/:page' component={Sdetails}/>
                    {/* <Route path='/composition/w/a/w/sucai/s/s/s/s/s/sdetails/:page' component={Sdetails}/> */}
                    <Route path='/:page/:page/composition/mdetails/:page' component={Mdetails}/>
                    <Route path='/:page/:page/home/composition/mdetails/:page' component={Mdetails}/>
                    <Route path='/:page/home/f/s/tdetails/:page' component={Tdetails}/>
                    <Route path='/:page/:page/lwrite' component={Lwrite}/>
                    <Route path='/:page/:page/c/c/c/c/c/lwrite' component={Lwrite}/>
                    <Route path='/:page/:page/m/m/c/c/c/c/c/lwrite' component={Lwrite}/>
                    <Route path='/:page/:page/mat' component={Lcomment}/>
                    <Route path='/:page/:page/com/mat' component={Lcomment}/>
                    <Route path='/:page/:page/comm/mat/mat' component={Lcomment}/>
                    <Route path='/:page/composition/csearch' component={Csearch}/>
                    <Route path='/:page/composition/writing/:page/:page1' component={Writing}/>

                    {/* 我的 */}
                    <Route path='/:page/mine' exact component={Mine}/>
                    <Route path='/:page/mine/write' component={Write2}/>
                    <Route path='/:page/mine/collect' component={Collect2}/>
                    <Route path='/:page/mine/praise' component={Praise2}/>
                    <Route path='/:page/mine/follow/:page' component={Follow2}/>
                    <Route path='/:page/mine/fans/:page' component={Fans}/>
                    <Route path='/:page/mine/mnew' exact component={Mnew}/>
                    <Route path='/:page/mine/mpraise' component={Mpraise}/>
                    <Route path='/:page/mine/marticle/:page' component={Marticle}/>
                    <Route path='/:page/mine/mcnew' component={Mcnew}/>
                    <Route path='/:page/mine/edit/:page' component={Edit}/>
                    <Route path='/:page/mine/feedback' component={Feedback}/>
                    <Route path='/:page/mine/personal' component={Personal}/>
                    <Route path='/:page/mine/myset' component={Myset}/>
                    <Route path='/:page/mine/question' component={Question}/>
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
//mtab:sucai,fanwen,jifa
//mtab1:gexing
//mtab2:素材详情mid
//mtab3:用户关注标签msid