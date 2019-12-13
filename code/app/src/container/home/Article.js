import React, { Component } from 'react'
import {Icon,NavBar} from 'antd-mobile';
import {Link,Route} from 'react-router-dom';
import Commentzuire from './Commentzuire';
export default class Article extends Component {
    constructor(props){
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.state={
            data:[]
        }
        
    }
    
    componentDidMount(){
        let page = this.props.location.state1;
        console.log(page);
        fetch('http://116.62.14.0:8402/article/xiangqing/'+page)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    fetchGood = (e)=>{
        let data = {
            uid:this.props.location.state,
            aid:this.props.location.state1
        }
        // let imgObj = document.getElementsByClassName(shoucang);
        // let Flag=(imgObj.getAttribute("src",2)=="/images/home/zan.png");
        console.log(data);
        fetch('http://116.62.14.0:8402/likes/article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            switch (data.status) {
                case "-1":{
                    console.log(data.data);
                    
                    
                    // imgObj.src=Flag?"/images/zan1.png":"/images/home/zan.png";
                    break;
                }
                default:{
                    console.log(data.data);
                    break;
                }
            }
        })
    }
    fetchConcern = (e)=>{
        let data = {
            uid:this.props.location.state,
            upid:this.props.location.state2
        }
        // let imgObj = document.getElementsByClassName(shoucang);
        // let Flag=(imgObj.getAttribute("src",2)=="/images/home/zan.png");
        console.log(data);
        fetch('http://116.62.14.0:8402/login/userconcern', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            switch (data.status) {
                case "0":{
                    console.log(data.data);
                    
                    
                    // imgObj.src=Flag?"/images/zan1.png":"/images/home/zan.png";
                    break;
                }
                default:{
                    console.log(data.data);
                    break;
                }
            }
        })
    }
    render() {
        const item = [
            {title:'322',img:'pinglun'},
            {title:'322',img:'zan'},
        ];
        return (
            <div>
                {this.state.data.map(data=>(
                    <div>
                <NavBar
                    icon={<Link to={{pathname:'/home',state1:this.props.location.state1,state:this.props.location.state,state2:this.props.location.state2}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={
                        <input type='button' onClick={(e)=>{this.fetchConcern(e)}} style={{backgroundColor:'#da4036',fontSize:'18px',color:'#fff',border:'1px solid #da4036'}} value='关注' class='concern'/>
                    }
    ><img src="/images/home/touxiang.png" style={{height:'80%',marginLeft:'2%',marginTop:'1%',marginRight:'1%'}} />{data.uname}</NavBar>
                
                <div style={{top:'40px',position:'absolute',zIndex:'99',width:'100%'}}>
                    
                        
                    <div style={{margin:'2% 2% auto',backgroundColor:'#f1edea'}}>
                        <h2 style={{textAlign:'center'}}>{data.atitle}</h2>
                        {data.acontent}<br/>
                        <br/><br/>{data.atag}<br/>
                    </div>
                    </div></div>
                    ))}
                    <div style={{margin:'2% 2% auto',position:'absolute',top:'200px',zIndex:99}}>
                        <hr/>
                        <Link to={{pathname:'/home/article/zuixin',state1:this.props.location.state1,state:this.props.location.state}}><span style={{fontSize:'18px'}}>精彩评论</span></Link>
                        <Route path={`/home/article/zuixin`} component={Commentzuire} />
                    </div>
                    {/* state:uid */}
                    <footer style={{width:'100%',marginTop:'10px',backgroundColor:'#fff', bottom:'0px',position:'fixed'}}>
                                <Link to={{pathname:'/home/comment',state1:this.props.location.state1,state:this.props.location.state}}>
                                <div style={{width:'8%',float:'left',margin:'0% 12%',color:'#000'}}><img src={`/images/home/${item[0].img}.png`} /></div>
                                </Link>
                                <div onClick={(e)=>{this.fetchGood(e)}} style={{width:'8%',float:'left',margin:'0% 12%',color:'#000'}} className="shoucang"><img src={`/images/home/${item[1].img}.png`} /></div>
                    </footer>
                    
                
            </div>
        )
    }
}
