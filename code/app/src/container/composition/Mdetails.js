import React, { Component } from 'react'
import {Icon,NavBar,Toast} from 'antd-mobile';
import {Link,Route} from 'react-router-dom';
import Smcomment from './Smcomment';
import Mword from './Mword';
import Word from './material/Word';
import ReactToPrint from 'react-to-print';
export default class Mdetails extends Component {
    constructor(props){
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.state={
            data:[]
        }
        
    }
    
    componentDidMount(){
        let arr=this.props.location.pathname.split('/');
        let page1 = this.props.match.params;
        console.log(page1);
        fetch('http://116.62.14.0:8402/material/xiang/'+page1['page']+'/'+arr[1])
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    componentDidUpdate(){
        let arr=this.props.location.pathname.split('/');
        let page1 = this.props.match.params;
        console.log(page1);
        fetch('http://116.62.14.0:8402/material/xiang/'+page1['page']+'/'+arr[1])
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    fetchDelete = (e)=>{
        let arr=this.props.location.pathname.split('/');
        let page1 = this.props.match.params;
        let data = {
            uid:arr[1],
            mid:this.props.location.mtab2
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
                    Toast.success('收藏成功',1);
                    this.props.history.push({pathname:'/'+arr[1]+'/mine/collect',state:this.props.location.state});
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
        let url = this.props.match.url;
        let arr=this.props.location.pathname.split('/');
        let page1 = this.props.match.params;
        // if(arr.length===4){
        //     var data1='/'+arr[1]+'/mine/collect';
        // }else{
        //     var data1='/'+arr[1]+'/home/fopeople';
        // }
        var data1='/'+arr[1]+'/mine/collect';
        console.log(data1);
        return (
            <div>
                
                {this.state.data.map(data=>(
                    <div style={{float:'left'}}>
                    {/* <NavBar
                        icon={<Link to={{pathname:data1,mtab1:data.msid,state:this.props.location.state,mtab2:this.props.location.mtab2}}><Icon type="left" style={{color:'#000'}}/></Link>}
                        style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                        onLeftClick={() => console.log('onLeftClick')}
                        ></NavBar>   */}
                    <div style={{position:'fixed',top:'0',width:'100%',height:'40px',backgroundColor:'#fff',paddingBottom:'2%'}}> 
                        <Link to={{pathname:data1,mtab1:data.msid,state:this.props.location.state,state2:data.uid,state4:this.props.location.state4}}>
                            <img src='/images/write/left.png' style={{width:'8%',height:'50%',position:'absolute',top:'25%',left:'2%',}} />
                            
                        </Link>
                        <div style={{position:'absolute',right:'7%',bottom:'2%',zIndex:'9',color:'#000'}}><ReactToPrint trigger={() => <a style={{color:'#fff'}}>打印</a>} content={() => this.componentRef}  /> </div>
                            <img src='/images/write/dy.png' style={{width:'8%',height:'60%',position:'absolute',right:'6%',top:'15%'}} />
                    </div>
                    {data.mimage===''?
                        <div ref={el => (this.componentRef = el)} style={{marginTop:'14%',whiteSpace:"pre-wrap",float:'left',zIndex:'99',width:'94%',paddingBottom:'2%',marginLeft:'3%',marginRight:'3%',borderBottom:'1px dashed #000'}}>              
                            {/* <ReactToPrint trigger={() => <a>点此打印</a>} content={() => this.componentRef}/>  */}
                            <div style={{width:'100%',float:'left',fontWeight:'bold',textAlign:'center',fontSize:'150%',paddingLeft:'2%',paddingBottom:'2%'}}>{data.mtitle}</div>
                            <div style={{width:'100%',float:'left',textAlign:'right',fontSize:'100%',paddingBottom:'2%',color:'gray',marginTop:'3%'}}>{data.mlocal}</div>   
                            <div style={{width:'96%',float:'left',fontSize:'110%',paddingLeft:'2%',paddingRight:'2%',paddingBottom:'2%',marginTop:'3%'}}>{data.manalyse}</div>   
                            <div style={{width:'96%',float:'left',fontSize:'130%',marginTop:'5%',paddingLeft:'2%',paddingRight:'2%',paddingBottom:'2%'}}>{data.mcontent}</div>   

                        </div>
                    :(data.mimage.split('.')[1] === 'mp4'?
                    <div style={{marginTop:'14%',whiteSpace:"pre-wrap",float:'left',zIndex:'99',width:'94%',paddingBottom:'2%',marginLeft:'3%',marginRight:'3%',borderBottom:'1px dashed #000'}}>              
                        <video src={`http://116.62.14.0:8402/images/`+data.mimage} id="myPlayer" poster='' controls playsInline webkit-playsinline style={{width:'100%'}}></video>
                        <div ref={el => (this.componentRef = el)}>
                        <div style={{width:'100%',float:'left',fontWeight:'bold',textAlign:'center',fontSize:'150%',paddingLeft:'2%',paddingBottom:'2%',marginTop:'8%'}}>{data.mtitle}</div>
                        <div style={{width:'100%',float:'left',textAlign:'right',fontSize:'100%',paddingBottom:'2%',color:'gray',marginTop:'3%'}}>{data.mlocal}</div>   
                        <div style={{width:'96%',float:'left',fontSize:'110%',paddingLeft:'2%',paddingRight:'2%',paddingBottom:'2%',marginTop:'3%'}}>{data.manalyse}</div>   
                        <div style={{width:'96%',float:'left',fontSize:'130%',marginTop:'5%',paddingLeft:'2%',paddingRight:'2%',paddingBottom:'2%'}}>{data.mcontent}</div>                                   
                        </div>
                    </div>  
                     :      
                        <div ref={el => (this.componentRef = el)} style={{marginTop:'14%',whiteSpace:"pre-wrap",float:'left',zIndex:'99',width:'94%',paddingBottom:'2%',marginLeft:'3%',marginRight:'3%',borderBottom:'1px dashed #000'}}>              
                            <img src={'http://116.62.14.0:8402/images/'+data.mimage} style={{width:'100%',height:'200px'}} />
                            <div style={{width:'100%',float:'left',fontWeight:'bold',textAlign:'center',fontSize:'150%',paddingLeft:'2%',paddingBottom:'2%',marginTop:'8%'}}>{data.mtitle}</div>
                            <div style={{width:'100%',float:'left',textAlign:'right',fontSize:'100%',paddingBottom:'2%',color:'gray',marginTop:'3%'}}>{data.mlocal}</div>   
                            <div style={{width:'96%',float:'left',fontSize:'110%',paddingLeft:'2%',paddingRight:'2%',paddingBottom:'2%',marginTop:'3%'}}>{data.manalyse}</div>   
                            <div style={{width:'96%',float:'left',fontSize:'130%',marginTop:'5%',paddingLeft:'2%',paddingRight:'2%',paddingBottom:'2%'}}>{data.mcontent}</div>                           
                                        
                        </div>)
                    }
                            
                    <div style={{zIndex:'100',float:'left',width:'96%',margin:'2% 2% auto'}}>
                        <Link to={{pathname:url,mtab2:this.props.location.mtab2,state:this.props.location.state}} style={{color:'#000',marginRight:'5%',fontSize:'120%'}}>练笔</Link>
                        <Link to={{pathname:url+'/pinglun',mtab2:this.props.location.mtab2,state:this.props.location.state}} style={{color:'#000',fontSize:'120%'}}>评论</Link>
                    </div>
                    <div style={{width:'96%',float:'left',marginBottom:'14%'}}>
                        <div>
                        <Route path={`${url}`} exact component={Word}/>
                        <Route path={`${url}/pinglun/`} component={Smcomment}/>
                        </div>
                    </div>
                    <div style={{backgroundColor:'#fff',bottom:0,float:'left',width:'100%',position:'fixed',height:'50px',paddingTop:'1%'}}>
                        <div style={{float:'left',width:'30%',textAlign:'center'}} onClick={(e)=>{this.fetchGood(e)}}>
                            <div style={{height:'80%'}}>
                                {data.look===null?
                                <img src='/images/home/shoucang.png' style={{width:'20%',height:'20%'}}/>:
                                <img src='/images/home/shoucang1.png' style={{width:'20%',height:'20%'}}/>}
                            </div>
                            
                            {data.look===null?<a style={{}} >收藏&nbsp;&nbsp;{data.mcollect}</a>:<a style={{}}>已收藏&nbsp;&nbsp;{data.mcollect}</a>}
                        </div>
                        <div style={{float:'left',width:'30%',textAlign:'center'}}>
                            <Link to={{pathname:'/'+arr[1]+'/'+page1['page']+'/m/m/c/c/c/c/c/lwrite',state:this.props.location.state,mtab2:this.props.location.mtab2}}>
                                <div style={{height:'80%'}}>
                                    <img src='/images/write/write.png' style={{width:'20%',height:'20%'}}/>
                                </div>
                                <a style={{color:'#000'}}>练笔</a>
                            </Link>      
                        </div>         
                        <div style={{float:'left',width:'30%',textAlign:'center'}}>
                            <Link to={{pathname:'/'+arr[1]+'/'+page1['page']+'/comm/mat/mat',state:this.props.location.state,mtab2:this.props.location.mtab2}}>
                                <div style={{height:'80%'}}>
                                    <img src='/images/write/write.png' style={{width:'20%',height:'20%'}}/>
                                </div>
                                <a style={{color:'#000'}}>评论&nbsp;&nbsp;{data.mcomment}</a>
                            </Link>      
                        </div>               
                    </div>
                </div>
                
                ))}
            </div>
        )
    }
}
