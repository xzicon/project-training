import React, { Component } from 'react'
import {Icon,NavBar,List} from 'antd-mobile';
import {Link} from 'react-router-dom';
const Item = List.Item;
export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[]
        }
    }
    componentDidMount(){
        // let uid=this.props.location.state;
        let arr=this.props.location.pathname.split('/');
        console.log(arr);
        fetch('http://116.62.14.0:8402/message/pinglun/'+arr[1])
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    render() {
        let arr=this.props.location.pathname.split('/');
        return (
            <div>
                <NavBar
                    icon={<Link to={{pathname:'/'+arr[1]+'/mine',state:this.props.location.state}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}
                >消息通知</NavBar>
                <div style={{top:'40px',position:'absolute',zIndex:'99',margin:'2% 0% auto',width:'100%'}}>
                    <Link to={{pathname:'/'+arr[1]+'/home/praise',state:this.props.location.state}}>
                    <List>
                        <Item arrow="horizontal" multipleLine>
                            <img src="/images/home/zan1.png" />    点赞
                        </Item>
                    </List>
                    </Link>
                    <div style={{backgroundColor:'#fff',width:'100%',fontSize:'17px',margin:'2% 0% auto',float:'left'}}>
                        <img src="/images/home/pinglun1.png" style={{marginLeft:'4%',marginTop:'3%'}} />  回复列表
                        <br/>
                        <div style={{margin:'2%',width:'96%',textAlign:'center',float:'left',backgroundColor:'#fff'}}>
                        {this.state.data.length!==0?this.state.data.map(data=>(
                        <div style={{float:'left',backgroundColor:'#cfc5bb',width:'100%',marginTop:'2%'}}>
                            <div style={{float:'left',width:'100%',color:'#000',float:'left'}}>
                                <img src={'http://116.62.14.0:8402/images/'+data.uimage} style={{width:'50px',height:'50px',marginLeft:'2%',marginTop:'1%',marginRight:'3%',borderRadius:'50%',float:'left'}} />
                                <div style={{float:'left',paddingTop:'2%',width:'80%'}}>
                                    <div style={{float:'left',width:'100%',marginBottom:'2%',textAlign:'left'}}><a style={{fontSize:'110%'}}>{data.uname}</a></div>
                                    <div style={{float:'left',width:'100%',fontSize:'90%',color:'gray',textAlign:'left'}}>{data.actime}</div>                  
                                </div>
                                                  
                            </div>
                            <div style={{float:'left',fontSize:'90%',margin:'1%',color:'gray',width:'96%',textAlign:'left'}}>评论了&nbsp;&nbsp;&nbsp;&nbsp;{data.atitle}</div>
                            <div style={{float:'left',fontSize:'110%',margin:'2%',width:'96%',textAlign:'left'}}>
                                {data.accontent}
                            </div>  
                            
                            
                        </div>
                        )):<div style={{height:'35px',lineHeight:'35px',marginTop:'3%',fontSize:'110%',marginLeft:'3%'}}>你还没有收到消息哦~  </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
