import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom';
import {Icon,NavBar, Toast} from 'antd-mobile';
export default class Collect extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[]
        }
    }
    componentDidMount(){
        let uid=this.props.location.state;
        console.log(uid);
        fetch('http://116.62.14.0:8402/login/materialcollection/'+uid)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    fetchDelete = (e)=>{
        let item = e.target.parentNode.parentNode;
        console.log(item);
        console.log(item.children[0].innerHTML);
        let obj = {mid:item.children[0].innerHTML}
        
        let data = {
            uid:this.props.location.state,
            mid:obj.mid
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/likes/delmaterial', {
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
                    Toast.success('取消收藏成功',1);
                    item.parentElement.removeChild(item)
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
        return (
            <div>
            <NavBar
                icon={<Link to={{pathname:'/mine',state1:this.props.location.state1,state:this.props.location.state}}><Icon type="left" style={{color:'#000'}}/></Link>}
                style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                onLeftClick={() => console.log('onLeftClick')}>收藏</NavBar>
            
            <div style={{width:'100%',position:'absolute',top:'50px'}}>
                
                {this.state.data.length!==0?this.state.data.map(data=>(
                    <div style={{width:'94%',float:'left',marginTop:'2%',marginLeft:'3%',marginRight:'3%',backgroundColor:'#fff',paddingBottom:'2%'}}>
                        <div style={{color:'#fff',width:'99%'}}>{data.mid}</div>
                        <Link to={{pathname:'/composition/mdetails/'+data.mid,mtab2:data.mid,state:this.props.location.state}}>
                            <div style={{width:'93%',backgroundColor:'#fff',paddingLeft:'3%',paddingRight:'3%',float:'left',paddingBottom:'3%'}}>                      
                                <div style={{height:'26px',fontSize:'14px',float:'left',width:'100%',color:'#000'}}>
                                    {data.mtime}
                                </div>
                                <div style={{width:'100%',color:'#000',fontSize:'130%',float:'left',fontWeight:'bold'}}>{data.mtitle}</div>
                                {/* <div style={{width:'100%',color:'#000',fontSize:'100%',float:'left',marginTop:'2%',textAlign:'right'}}>{data.mlocal}</div> */}
                                {/* <div style={{width:'100%',color:'gray',fontSize:'110%',float:'left',marginTop:'2%'}}>{data.manalyse}</div> */}
                            </div>
                        </Link>
                        <div style={{float:'left',marginTop:'1%',width:'100%'}}>
                                <input type='button' className='delete' value='删除' onClick={(e)=>{this.fetchDelete(e)}}  style={{width:'80px',backgroundColor:'red',color:'#fff',border:'none',borderRadius:'15%',border:'1px solid #fff',float:'right',marginRight:'5%',fontSize:'120%',padding:'1% 2% '}} />
                            </div>
                    </div>
                )):<div style={{height:'35px',lineHeight:'35px',marginTop:'3%',fontSize:'120%',marginLeft:'3%'}}>你还没有收藏哦~  </div>
            }
                
            </div>
        </div>
        )
    }
}
