import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import { Grid } from 'antd-mobile';
let data1 = [
  {
    icon: "images/apptab/收藏夹.png",
    text: "收藏夹"
  },
  {
    icon: "images/apptab/创作.png",
    text: "我的创作"
  },
  {
    icon: "images/apptab/我的关注.png",
    text: "我的关注"
  },
  {
    icon: "images/apptab/我的任务.png",
    text: "我的任务"
  },
  {
    icon: "images/apptab/赞.png",
    text: "赞"
  },
  
];




export default class Mine extends Component {
  render() {
    return (
      <div>
        <div style={{width:'100%',height:'25px',backgroundColor:'white'}}>
          <img src='images/apptab/信封.png' style={{width:'20px',height:'20px',float:'right',marginRight:'10px',marginTop:'3px'}} />
        </div>
        <Link to='/mydetail'>
          <div style={{width:'100%',height:'80px',backgroundColor:'white',float:'left'}}>
            <img style={{marginLeft:'10px',marginTop:'10px',borderRadius:'100%',width:'60px',height:'60px',backgroundColor:'white'}} src='images/apptab/inform (2).png'/>
            <div style={{width:'80%',height:'100%',float:'right',backgroundColor:'white'}}>
              <a style={{color:'black',float:'left',marginTop:'21px',fontSize:'10px',marginLeft:'5px'}}>ARBITRARY</a>
              <button style={{backgroundColor:'white',float:'left',marginTop:'20px',marginLeft:"10px",border:'0.2px solid black',fontSize:"10px",width:"45px"}}>编辑</button>
              <a style={{float:'right',marginTop:'5px',marginRight:'177px',fontSize:'10px',color:"gray"}}>本宝宝还没有想到个性签名</a>
              <a style={{float:'left',marginTop:'5px',marginLeft:'3px',fontSize:'10px',color:'gray'}}>ID#4108693</a>
              <img style={{marginLeft:'180px',marginTop:'0px',float:'left',width:'25px',height:'25px'}} src='images/apptab/Notepad-记事本-1.png'/>
            </div>
            <div style={{width:'100%',height:'70px',backgroundColor:'yellow',float:'left'}}>
              <div style={{width:'25%',height:'100%',backgroundColor:'white',float:'left'}}>
                <p style={{fontSize:"15px",color:'black',marginTop:'10px',float:'left',marginLeft:'30px'}}>0 人</p>
                <p style={{fontSize:'15px',color:"black",float:"left",marginLeft:'30px',marginTop:'-2px'}}>粉丝</p>
              </div>
              <div style={{width:'25%',height:'100%',backgroundColor:'white',float:'left'}}>
                <p style={{fontSize:"15px",color:'black',marginTop:'10px',float:'left',marginLeft:'30px'}}>0 个</p>
                <p style={{fontSize:'15px',color:"black",float:"left",marginLeft:'30px',marginTop:'-2px'}}>获赞</p>
              </div>
              <div style={{width:'25%',height:'100%',backgroundColor:'white',float:'left'}}>
                <p style={{fontSize:"15px",color:'black',marginTop:'10px',float:'left',marginLeft:'30px'}}>0 字</p>
                <p style={{fontSize:'15px',color:"black",float:"left",marginLeft:'20px',marginTop:'-2px'}}>累计创作</p>
              </div>
              <div style={{width:'25%',height:'100%',backgroundColor:'white',float:'left'}}>
                <p style={{fontSize:"15px",color:'black',marginTop:'10px',float:'left',marginLeft:'30px'}}>0 天</p>
                <p style={{fontSize:'15px',color:"black",float:"left",marginLeft:'20px',marginTop:'-2px'}}>累计打卡</p>
              </div>
              <div style={{width:'100%',height:'80px',float:'left',backgroundColor:'white',marginTop:'10px'}}> 
                <div>
                  <Grid data={data1} activeStyle={false} columnNum={5} hasLine={false}/>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}
