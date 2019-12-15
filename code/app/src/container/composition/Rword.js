import React, { Component } from 'react'
import { NavBar,Tabs,Icon} from 'antd-mobile';
import {Link,Route} from 'react-router-dom';
export default class Rword extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
        
    }
    componentDidMount(){
        let mtab2 = this.props.location.mtab2;
        let m = this.props.location.search;
        console.log(mtab2,m);
        fetch('http://116.62.14.0:8402/material/xiangqing/lianbi/'+mtab2)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    render() {
        return (
            <div>
                {/* <div style={{zIndex:'100',top: '7%',position:'absolute',width:'96%',margin:'4% 2% auto'}}>
                    <Link to={{pathname:'/composition/word/'+this.props.location.mtab2,mtab2:this.props.location.mtab2}}>练笔</Link>
                    <Link to={{pathname:'/composition/smcomment/'+this.props.location.mtab2,mtab2:this.props.location.mtab2}}>评论</Link>
                </div> */}
                <div style={{width:'100%'}}>
                    {/* <div>
                        <Link to={{pathname:'/composition/word/'+this.props.location.mtab2,mtab2:this.props.location.mtab2}}>最热</Link>
                        <Link to={{pathname:'/composition/xword/'+this.props.location.mtab2,mtab2:this.props.location.mtab2}}>最新</Link>
                    </div> */}
                    <div>
                        {/* <Route path='/composition/xword' component={Xword}/> */}
                    </div>
                </div>
                {
                        this.state.data.map(data=>(
                            <div>
                                {data.atitle}
                            </div>
                ))}
            </div>
        )
    }
}
