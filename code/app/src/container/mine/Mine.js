import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import { Grid } from 'antd-mobile';
import { Tabs, WhiteSpace } from 'antd-mobile';
import { List } from 'antd-mobile';
import { Button} from 'antd-mobile';


const Item = List.Item;
const Brief = Item.Brief;

let data1 = [
  {
    icon: "images/apptab/笔记.png",
    text: "我的创作"
  },
  {
    icon: "images/apptab/粉丝管理.png",
    text: "粉丝"
  },
  {
    icon: "images/apptab/赞 (2).png",
    text: "我赞过的"
  },
  {
    icon:'images/apptab/消息.png',
    text:'消息中心'
  }
]

// follow =(idx)=>{
//   var data = [...this.state.data];
//   if(!data[idx].isFollow){
      
//       data[idx].isFollow=!data[idx].isFollow;
//       data[idx].follow='已关注'
//       this.setState({
//           data
//       },()=>{
//           localStorage.setItem('data',this.state.data);
//       })      
      
//   }else{
//       data[idx].isFollow=!data[idx].isFollow;
//       data[idx].follow='关注'; 
//       this.setState({
//           data
//       },()=>{
//           localStorage.setItem('data',this.state.data);
//       })  
//   }
// }
// change1 = (idx)=>{
//   var data = [...this.state.data];
//   if(!data[idx].isLove){
      
//       data[idx].isLove=!data[idx].isLove;
//       data[idx].heart='heart2.png'
//       this.setState({
//           data
//       },()=>{
//           localStorage.setItem('data',this.state.data);
//       })      
      
//   }else{
//       data[idx].isLove=!data[idx].isLove;
//       data[idx].heart='heart1.png'
//       this.setState({
//           data
//       },()=>{
//           localStorage.setItem('data',this.state.data);
//       })  
//   }
// }
// change2 = (idx)=>{
//   var data = [...this.state.data];
//   if(!data[idx].isCollect){
      
//       data[idx].isCollect=!data[idx].isCollect;
//       data[idx].collect='collect2.png'
//       this.setState({
//           data
//       },()=>{
//           localStorage.setItem('data',this.state.data);
//       })      
      
//   }else{
//       data[idx].isCollect=!data[idx].isCollect;
//       data[idx].collect='collect1.png'
//       this.setState({
//           data
//       },()=>{
//           localStorage.setItem('data',this.state.data);
//       })  
//   }
// }
const guanzhu= [
  { title: '我的关注' },
  { title: '我的收藏' },
  // { title: 'Third Tab' },
];


export default class Mine extends Component {
  constructor(){
    super();
    this.state={
      data:[
        {
          pic:'头像 男孩.png',
          name:'不说话的鹦鹉',
          time:'1小时前',
          follow:'关注',
          isFollow:false,
          article:'好好学习，天天向上！',
          
          // // heart:'heart1.png',
          // isLove:false,
          // say:'say.png',
          // //collect:'collect1.png',
          // isCollect:false,
      },
      {
          pic:'神奇海螺.jpg',
          name:'神奇海螺',
          time:'4小时前',
          follow:'关注',
          isFollow:false,
          article:'好记性不如烂笔头',
          
          // //heart:'heart1.png',
          // isLove:false,
          // say:'say.png',
          // //collect:'collect1.png',
          // isCollect:false,
      },
      
    ],
    data2:[
      {
        pic:'头像 女孩.jpg',
        name:'神奇海螺',
        time:'4小时前',
        follow:'关注',
        isFollow:false,
        
        
      },
      {
        pic:'头像 男孩.svg',
        name:'议论文',
        time:'4小时前',
        follow:'收藏',
        isFollow:false,
      }
    ]
  }
}
follow =(idx)=>{
  var data = [...this.state.data];
  if(!data[idx].isFollow){
      
      data[idx].isFollow=!data[idx].isFollow;
      data[idx].follow='已关注'
      this.setState({
          data
      },()=>{
          localStorage.setItem('data',this.state.data);
      })      
      
  }else{
      data[idx].isFollow=!data[idx].isFollow;
      data[idx].follow='关注'; 
      this.setState({
          data
      },()=>{
          localStorage.setItem('data',this.state.data);
      })  
  }
}
follow1 =(idx)=>{
  var data = [...this.state.data];
  if(!data[idx].isFollow){
      
      data[idx].isFollow=!data[idx].isFollow;
      data[idx].follow='已收藏'
      this.setState({
          data
      },()=>{
          localStorage.setItem('data',this.state.data);
      })      
      
  }else{
      data[idx].isFollow=!data[idx].isFollow;
      data[idx].follow='收藏'; 
      this.setState({
          data
      },()=>{
          localStorage.setItem('data',this.state.data);
      })  
  }
}
// change1 = (idx)=>{
//   var data = [...this.state.data];
//   if(!data[idx].isLove){
      
//       data[idx].isLove=!data[idx].isLove;
//       data[idx].heart='heart2.png'
//       this.setState({
//           data
//       },()=>{
//           localStorage.setItem('data',this.state.data);
//       })      
      
//   }else{
//       data[idx].isLove=!data[idx].isLove;
//       data[idx].heart='heart1.png'
//       this.setState({
//           data
//       },()=>{
//           localStorage.setItem('data',this.state.data);
//       })  
//   }
// }
// change2 = (idx)=>{
//   var data = [...this.state.data];
//   if(!data[idx].isCollect){
      
//       data[idx].isCollect=!data[idx].isCollect;
//       data[idx].collect='collect2.png'
//       this.setState({
//           data
//       },()=>{
//           localStorage.setItem('data',this.state.data);
//       })      
      
//   }else{
//       data[idx].isCollect=!data[idx].isCollect;
//       data[idx].collect='collect1.png'
//       this.setState({
//           data
//       },()=>{
//           localStorage.setItem('data',this.state.data);
//       })  
//   }
// }
  render() {
    return (
      <div>
        {/* <div style={{width:'100%',height:'25px',backgroundColor:'white'}}>
          <img src='images/apptab/信封.png' style={{width:'20px',height:'20px',float:'right',marginRight:'10px',marginTop:'3px'}} />
        </div> */}
        <Link to='/mydetail'>
          <div style={{width:'100%',height:'80px',backgroundColor:'white',float:'left'}}>
            <img style={{marginLeft:'10px',marginTop:'10px',borderRadius:'100%',width:'60px',height:'60px',backgroundColor:'white'}} src='images/apptab/inform (2).png'/>
            <div style={{width:'80%',height:'100%',float:'right',backgroundColor:'white'}}>
              <a style={{color:'black',float:'left',marginTop:'21px',fontSize:'10px',marginLeft:'5px'}}>ARBITRARY</a>
              <button style={{backgroundColor:'white',float:'left',marginTop:'20px',marginLeft:"10px",border:'0.2px solid black',fontSize:"10px",width:"65px"}}>编辑资料</button>
              <a style={{float:'right',marginTop:'5px',marginRight:'177px',fontSize:'10px',color:"gray"}}>本宝宝还没有想到个性签名</a>
              <a style={{float:'left',marginTop:'5px',marginLeft:'3px',fontSize:'10px',color:'gray'}}>ID#4108693</a>
              {/* <img style={{marginLeft:'180px',marginTop:'0px',float:'left',width:'25px',height:'25px'}} src='images/apptab/Notepad-记事本-1.png'/> */}
            </div>
          </div> 
        </Link>  
            <div style={{width:'100%',height:'70px',backgroundColor:'yellow',float:'left'}}>
              <Link to='/fensi'>
                <div style={{width:'25%',height:'100%',backgroundColor:'white',float:'left'}}>
                  <img src='images/apptab/我的粉丝.png' style={{width:'25px',height:'25px',float:'left',marginLeft:'45px',marginTop:'10px'}}/>
                  <p style={{fontSize:'15px',fontFamily:'楷体',color:"black",float:"left",marginLeft:'25px',marginTop:'5px'}}>我的粉丝</p>
                </div>
              </Link>
              <Link to='/chuangzuo'>
                <div style={{width:'25%',height:'100%',backgroundColor:'white',float:'left'}}>
                  <img src='images/apptab/Notepad-记事本-1.png' style={{width:'25px',height:'25px',float:'left',marginLeft:'45px',marginTop:'10px'}}/>
                  <p style={{fontSize:'15px',fontFamily:'楷体',color:"black",float:"left",marginLeft:'25px',marginTop:'5px'}}>我的练笔</p>
                </div>
              </Link>
              <Link to='/wozanguo'>
              <div style={{width:'25%',height:'100%',backgroundColor:'white',float:'left'}}>
                <img src='images/apptab/赞 (2).png' style={{width:'25px',height:'25px',float:'left',marginLeft:'45px',marginTop:'10px'}}/>
                <p style={{fontSize:'15px',fontFamily:'楷体',color:"black",float:"left",marginLeft:'25px',marginTop:'5px'}}>我赞过的</p>
              </div>
              </Link>
              <Link to='/xiaoxi'>
              <div style={{width:'25%',height:'100%',backgroundColor:'white',float:'left'}}>
                <img src='images/apptab/信封.png' style={{width:'25px',height:'25px',float:'left',marginLeft:'45px',marginTop:'10px'}}/>
                <p style={{font:'15px',fontFamily:'楷体',color:"black",float:"left",marginLeft:'25px',marginTop:'5px'}}>消息中心</p>
              </div>
              </Link>
              
            </div>
            {/* <div style={{width:'100%',height:'80px',float:'left',backgroundColor:'white',marginTop:'10px'}}> */}
              {/* <div> */}
                {/* <Grid data={data1} activeStyle={false} columnNum={4} hasLine={false} onClick={_el => console.log(_el)} /> */}
                {/* {/* <Grid data={data1} isCarousel onClick={_el => console.log(_el)} /> */}
              {/* </div> */}
             {/* </div> */}
            <div style={{width:'100%',height:'1000px',backgroundColor:'white',float:"left"}}>
              <WhiteSpace />
              <Tabs tabs={guanzhu} initialPage={2} animated={false} useOnPan={false}>
                <div style={{ display: 'flex',  justifyContent: 'center', height: '800px', backgroundColor: 'white' }}>
             
                <div >
                {
                    this.state.data.map((item,idx)=>(
                        <div key={idx} style={{maxHeight:'200px',float:'left',overflow:'hidden', backgroundColor: 'white',marginBottom:'2%',width:'100%'}}>
                            <div >
                                <div style={{width:'65%',float:'left',marginTop:'3%',marginLeft:'3%'}}>
                                    <img src='/images/apptab/神奇海螺.jpg' style={{width:'60px',height:'60px',borderRadius:'50%',float:'left'}} />
                                    <div >
                                        <a style={{width:'60%', float:'left',marginLeft:'5%',marginTop:'3%',fontFamily:'黑体'}}>{item.name}</a>
                                        <a style={{fontSize:'80%',float:'left',color:'#968696',marginLeft:'5%',marginTop:'5%'}}>{item.time}</a>
                                    </div>
                                </div>
                                <div style={{width:'25%',float:'right',marginTop:'5%'}}>
                                    <button   onClick={()=>this.follow(idx)} style={{width:'80%',border:'1px solid #d3d3d3',outline:'none',borderRadius:'10%',backgroundColor:'#fff',paddingTop:'5%',paddingBottom:'5%',fontSize:'90%',fontFamily:'楷体'}} >{item.follow}</button>
                                    
                                </div>
                            </div>
                            <div style={{maxHeight:'50px',float:'left',fontSize:'98%',marginBottom:'5px',marginLeft:'3%',overflow:'hidden',fontFamily:'楷体'}}>
                                <a >{item.article}</a><br/>
                            </div>
                            <div style={{float:'left',color:'#8fa0cb'}}>
                                
                                {/* <div style={{width:'37%',float:'right',marginTop:'3%'}}>
                                    <img src={'./images/share/'+item.heart}  onClick={()=>this.change1(idx)} style={{width:'15%',height:'15%',marginLeft:'5%',marginRight:'18%'}} />
                                    <img src={'./images/share/'+item.say} style={{width:'15%',height:'15%',marginRight:'18%'}}  />
                                    <img src={'./images/share/'+item.collect} onClick={()=>this.change2(idx)} style={{width:'15%',height:'15%'}}  />
                                </div> */}
                                
                            </div>
                            
                        </div>
                        
                    ))
                }




            </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', height: '400px', backgroundColor: '#fff' }}>
                <div >
                {
                    this.state.data.map((item,idx)=>(
                        <div key={idx} style={{maxHeight:'200px',float:'left',overflow:'hidden', backgroundColor: 'white',marginBottom:'2%',width:'100%'}}>
                            <div >
                                <div style={{width:'65%',float:'left',marginTop:'3%',marginLeft:'3%'}}>
                                    <img src={'./images/apptab/'+item.pic} style={{width:'60px',height:'60px',borderRadius:'50%',float:'left'}} />
                                    <div >
                                        <a style={{width:'60%', float:'left',marginLeft:'5%',marginTop:'3%',fontFamily:'黑体'}}>{item.name}</a>
                                        <a style={{fontSize:'80%',float:'left',color:'#968696',marginLeft:'5%',marginTop:'5%'}}>{item.time}</a>
                                    </div>
                                </div>
                                <div style={{width:'25%',float:'right',marginTop:'5%'}}>
                                    <button   onClick={()=>this.follow1(idx)} style={{width:'80%',border:'1px solid #d3d3d3',outline:'none',borderRadius:'10%',backgroundColor:'#fff',paddingTop:'5%',paddingBottom:'5%',fontSize:'90%',fontFamily:'楷体'}} >{item.follow}</button>
                                    
                                </div>
                            </div>
                            {/* <div style={{maxHeight:'50px',float:'left',fontSize:'98%',marginBottom:'5px',marginLeft:'3%',overflow:'hidden',fontFamily:'楷体'}}>
                                <a >{item.article}</a><br/>
                            </div> */}
                            <div style={{float:'left',color:'#8fa0cb'}}>
                                
                                {/* <div style={{width:'37%',float:'right',marginTop:'3%'}}>
                                    <img src={'./images/share/'+item.heart}  onClick={()=>this.change1(idx)} style={{width:'15%',height:'15%',marginLeft:'5%',marginRight:'18%'}} />
                                    <img src={'./images/share/'+item.say} style={{width:'15%',height:'15%',marginRight:'18%'}}  />
                                    <img src={'./images/share/'+item.collect} onClick={()=>this.change2(idx)} style={{width:'15%',height:'15%'}}  />
                                </div> */}
                                
                            </div>
                            
                        </div>
                        
                    ))
                }
              </div>



                </div>
                {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                  Content of third tab
                </div> */}
              </Tabs>
              <WhiteSpace />
            </div>
            
            
         
      
         
      
      </div>
    )
  }
}
