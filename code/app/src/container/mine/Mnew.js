import React, { Component } from 'react'
import Mcnew from './Mcnew';
import {Link,Route} from 'react-router-dom';
import {Icon,NavBar,Toast} from 'antd-mobile';

export default class Mnew extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[],
          selectM:{
            color:'#d83e34',
            borderBottom:'4px solid #ffdf41'
        },
        selectA:{
            color:'#000',
            borderBottom:'1px solid #fff'
        }
        }
    }
    componentDidMount(){
        let state=this.props.location.state;
        console.log(state);
        fetch('http://116.62.14.0:8402/login/mcomment/'+state)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    fetchDelete = (e)=>{
        let item = e.target.parentNode.parentNode;
        console.log(item);
        console.log(item.children[1].innerHTML);
        let obj = {mcid:item.children[1].innerHTML}
        let obj1 = {mid:item.children[0].innerHTML}
        let data = {
            mcid:obj.mcid,
            mid:obj1.mid
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/comment/delmaterial', {
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
                    Toast.success('删除评论成功',1);
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
                    onLeftClick={() => console.log('onLeftClick')}>评论</NavBar>
                <div style={{width:'100%',position:'absolute',top:'55px',zIndex:'99'}}>
                    <Link to={{pathname:'/mine/mnew',state1:this.props.location.state1,state:this.props.location.state}}><span style={{color:this.state.selectM.color,borderBottom:this.state.selectM.borderBottom,fontSize:'18px',color:'#000',marginLeft:'5%'}}>素材评论</span></Link>
                    <Link to={{pathname:'/mine/mcnew',state1:this.props.location.state1,state:this.props.location.state}}><span style={{color:this.state.selectA.color,borderBottom:this.state.selectA.borderBottom,fontSize:'14px',color:'#000',marginLeft:'5%'}}>文章评论</span></Link>
                </div>
                <div style={{marginTop:'26%',float:'left',width:'100%'}}>
                    {this.state.data.length!==0?this.state.data.map(data=>(
                        <div style={{width:'94%',float:'left',zIndex:'99',backgroundColor:'#fff',marginLeft:'3%',marginRight:'3%',marginBottom:'3%',paddingBottom:'2%'}}>
                            <div style={{display:'none'}}>{data.mid}</div>
                            <div style={{display:'none'}}>{data.mcid}</div>
                            <Link to={{pathname:'/mine/mn/mn/mn/mn/mn/sucai/s/s/s/s/s/sdetails/'+data.mid+'/'+this.props.location.state,mtab2:data.mid,state:this.props.location.state}}>
                            <div style={{width:'90%',margin:'2% 5% auto',paddingTop:'2%',paddingBottom:'2%'}}>
                                <div style={{fontSize:'110%',marginBottom:'2%'}}>{data.mccontent}</div>
                                <div style={{fontSize:'90%',color:'gray'}}>{data.mctime}</div>
                            </div>
                            </Link>
                            <div>
                                
                            <input type='button' className='delete' value='删除' onClick={(e)=>{this.fetchDelete(e)}}  style={{width:'80px',backgroundColor:'red',color:'#fff',border:'none',borderRadius:'15%',border:'1px solid #fff',float:'right',marginRight:'5%',fontSize:'120%',padding:'1% 2% '}} />
                            </div>
                            
                    </div>
                    )):<div style={{position:'absolute',top:'70px',height:'35px',lineHeight:'35px',marginTop:'5%',fontSize:'120%',marginLeft:'3%'}}>你还没有评论素材哦~  </div>}
                </div>
            
            </div>
        )
    }
}
