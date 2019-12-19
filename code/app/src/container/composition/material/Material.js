import React, { Component } from 'react';
import { NavBar,Tabs,Icon, Flex} from 'antd-mobile';
import {NavLink,Link,Route} from 'react-router-dom';
export default class Material extends Component {
    constructor(props){
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.state={
            data:[],
            src:[
                {photo:'/images/write/sp1.png'},
                {photo:'/images/write/sp2.png'},
                {photo:'/images/write/sp3.png'},
            ]
        }
        
    }
    componentDidMount(){
        let mtab1 = this.props.location.mtab1;
        let state = this.props.location.state;
        let id = this.props.location.search.split('=')[1]==='zuire' || this.props.location.search==='' ? 'zuire/':'zuixin/';
        console.log(mtab1,id);
        console.log(state);
        fetch('http://116.62.14.0:8402/material/'+id+mtab1)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.location.search !== this.props.location.search){
            let mtab1 = this.props.location.mtab1;
            let id = this.props.location.search.split('=')[1]==='zuire' || this.props.location.search==='' ? 'zuire/':'zuixin/';
            fetch('http://116.62.14.0:8402/material/'+id+mtab1)
                .then((res)=>res.json())
                .then((res)=>{
                    this.setState({data:res.data});
                })
        }
    }
    Change5=(e)=>{
        document.getElementById("A5").style.color="red"
        document.getElementById("A5").style.borderBottom="4px solid #ffdf41"
        document.getElementById("A6").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A6").style.color="#000"
    }
    Change6=(e)=>{
        document.getElementById("A6").style.color="red"
        document.getElementById("A6").style.borderBottom="4px solid #ffdf41"
        document.getElementById("A5").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A5").style.color="#000"
    }
    render() {
        let path = this.props.match.path;
        return (
            <div>
                <NavBar
                    icon={<Link to={{pathname:'/composition/all',mtab:this.props.location.mtab,state:this.props.location.state,mtab1:this.props.location.mtab1}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{width:'100%',position:'fixed',backgroundColor:'#fff',color:'#000',top:'0',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}>{this.props.location.msname}</NavBar>
                    
                    <div style={{position:'absolute',top:'50px',width:'100%'}}>
                    <div style={{backgroundColor:'#fff',marginBottom:'2%',float:'left',width:'100%',height:'35px',lineHeight:'35px'}}>
                        <NavLink to={{pathname:`${path}`,search:'?id=zuire',mtab1:this.props.location.mtab1,state:this.props.location.state,state1:this.props.location.state1}} style={{color:'red',fontSize:'130%',marginLeft:'8%',borderBottom:"4px solid #ffdf41"}} id='A5' onClick={(e)=>{this.Change5(e)}}>最热</NavLink>     
                        <NavLink to={{pathname:`${path}`,search:'?id=zuixin',mtab1:this.props.location.mtab1,state:this.props.location.state,state1:this.props.location.state1}} style={{color:'#000',fontSize:'130%',marginLeft:'8%',}} id='A6' onClick={(e)=>{this.Change6(e)}}>最新</NavLink>
                    </div>
                    <div style={{float:'left',width:'100%'}}>
                    { 
                        this.state.data.map(data=>(
                            data.mimage===''? 
                                <div style={{backgroundColor:'#fff',margin:'3%',width:'94%',height:'180px'}}>
                                    <Link to={{pathname:'/composition/sdetails/'+data.mid,mtab2:data.mid,state:this.props.location.state,state1:this.props.location.state1,mtab1:this.props.location.mtab1}} style={{color:'#000',fontSize:'120%'}}>
                                        
                                        <div style={{width:'94%',float:'left',height:'60%',float:'left',fontWeight:'500',textAlign:'left',fontSize:'120%',marginTop:'15%',marginLeft:'3%',marginRight:'3%'}}>{data.mtitle}</div>
                                    </Link>
                                </div>
                                :(data.mimage.split('.')[1] === 'mp4'?
                                    // <div style={{backgroundColor:'#fff',margin:'3%',width:'94%',height:'200px'}}>
                                    //     <Link to={{pathname:'/composition/sdetails/'+data.mid,mtab2:data.mid,state:this.props.location.state,state1:this.props.location.state1,mtab1:this.props.location.mtab1}} style={{color:'#000',fontSize:'120%'}}>
                                    //         <div style={{width:'92%',float:'left',fontSize:'110%',fontSize:'120%',margin:'4%',color:'red'}}>视频</div>
                                    //         <div style={{width:'94%',float:'left',height:'60%',float:'left',fontWeight:'500',textAlign:'left',fontSize:'150%',marginTop:'8%',marginLeft:'3%',marginRight:'3%'}}>{data.mtitle}</div>
                                    //     </Link>
                                    // </div> 
                                    <div style={{height:'270px',backgroundColor:'#fff',width:'94%',margin:'3%'}}>
                                        <Link to={{pathname:'/composition/sdetails/'+data.mid,mtab2:data.mid,state:this.props.location.state}} style={{color:'#000',fontSize:'110%'}}>
                                            <video src={`http://116.62.14.0:8402/images/`+data.mimage} id="myPlayer" poster='' controls playsInline webkit-playsinline style={{width:'100%'}}></video>
                                            <div ref={el => (this.componentRef = el)}></div>
                                            <div style={{width:'100%',height:'25%',float:'left',fontWeight:'600',fontSize:'120%',paddingTop:'5%',paddingLeft:'2%',paddingRight:'2%'}}>
                                                
                                                {data.mtitle}
                                            </div>

                                        </Link>
                                    </div>
                                    : 
                                
                                    <div style={{height:'300px',width:'94%',margin:'3%'}}>
                                        <Link to={{pathname:'/composition/sdetails/'+data.mid,mtab2:data.mid,state:this.props.location.state,state1:this.props.location.state1,mtab1:this.props.location.mtab1}} style={{color:'#000',fontSize:'120%'}}>
                                            <div style={{width:'100%',height:'75%',position:'relative',float:'left',backgroundImage:'url(http://116.62.14.0:8402/images/'+data.mimage+')',backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'cover',zIndex:'99'}}></div>
                                            <div style={{width:'94%',height:'22%',float:'left',fontWeight:'600',fontSize:'120%',paddingTop:'3%',paddingLeft:'3%',paddingRight:'3%',backgroundColor:'#fff'}}>                       
                                                {data.mtitle}
                                            </div>
                                    
                                        </Link>
                                    </div>
                                )
                    ))}
                    
                    </div>
                    </div>
            </div>
        )
    }
}
