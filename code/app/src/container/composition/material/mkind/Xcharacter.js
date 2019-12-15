import React, { Component } from 'react';
import { NavBar,Tabs,Icon} from 'antd-mobile';
import Word from '../Word';
import Character from './mkind/Character';
import {Link,Route} from 'react-router-dom';
export default class Xcharacter extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
        
    }
    componentDidMount(){
        let mtab = this.props.location.mtab;
        let search= this.props.location.search;
        console.log(mtab);
        fetch('http://116.62.14.0:8402/material/fenlei/zuixin/'+search+'&&'+mtab)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    render() {
        return (
            <div>
                {
                this.state.data.map(data=>(
                <div>
                 <div>
                    <Link to={{pathname:'/composition/word/',search:'?mtab='+data.mtab,mtab1:data.msid}}>最热</Link>
                    <Link to={{pathname:'/composition/word/',search:'?mtab='+data.mtab,mtab1:data.msid}}>最新</Link>
                 </div>
                 <div>
                    <Route path='/composition/Character' component={Character}/>
                 </div>
                 </div>
                ))}
            </div>
        )
    }
}