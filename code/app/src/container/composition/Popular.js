import React, { Component } from 'react'
import {NavLink,Link,Route} from 'react-router-dom';
export default class Popular extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    
    componentDidMount(){
        let page = this.props.location.mtab3;
        let search = this.props.location.search.split('=')[1];
        let id = this.props.location.search.split('=')[1] ? `tab/`+page:'tiaoguo';
        fetch('http://116.62.14.0:8402/usort/'+id)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.location.search !== this.props.location.search){
            let page = this.props.location.mtab3;
            let id = this.props.location.search.split('=')[1] ? `tab/`+page:'tiaoguo';
            fetch('http://116.62.14.0:8402/usort/'+id)
                .then((res)=>res.json())
                .then((res)=>{
                    this.setState({data:res.data});
                })
        }
    }
    render() {
        return (
            <div style={{marginTop:'25%'}}>
                {this.state.data.map(data=>(
                    data.mtab==='sucai'?
                        (data.mimage===''?
                        <div style={{backgroundColor:'#fff',marginBottom:'4%',padding:'2%',height:'200px'}}>
                            <Link to={{pathname:'/composition/label/s/sdetails/'+data.mid,mtab2:data.mid,state:this.props.location.state,mtab:data.mtab}} style={{color:'#000',fontSize:'120%'}}>
                                <div style={{width:'100%',float:'left',fontSize:'90%',padding:'2%'}}>素材--{data.msname}</div>
                                <div style={{width:'100%',float:'left',height:'60%',float:'left',fontWeight:'500',textAlign:'left',paddingTop:'10%',fontSize:'120%',paddingLeft:'2%',paddingBottom:'2%'}}>{data.mtitle}</div>
                                <div style={{width:'100%',float:'left',color:'gray',textAlign:'right',fontSize:'90%'}}>{data.mlocal}</div>
                            </Link>
                        </div> : 
                        // <div style={{marginBottom:'4%',paddingBottom:'2%',height:'300px',backgroundColor:'#fff'}}>
                        //     <Link to={{pathname:'/composition/label/s/sdetails/'+data.mid,mtab2:data.mid,state:this.props.location.state}} style={{color:'#000',fontSize:'110%'}}>
                        //         <div style={{width:'100%',height:'75%',position:'relative',float:'left',backgroundImage:'url(http://116.62.14.0:8402/images/'+data.mimage+')',backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'cover',zIndex:'99'}}>
                        //             <div style={{float:'left' ,position:'absolute',top:'5%',left:'3%',color:'#000',fontSize:'90%'}}>素材--{data.msname}</div>
                        //         </div>
                        //         <div style={{width:'100%',height:'25%',float:'left',fontWeight:'600',fontSize:'120%',paddingTop:'5%',paddingLeft:'2%',paddingRight:'2%'}}>
                                    
                        //             {data.mtitle}
                        //         </div>
                            
                        //     </Link>
                        // </div>
                        (data.mimage.split('.')[1] === 'mp4'?
                        // <div style={{marginTop:'14%',whiteSpace:"pre-wrap",float:'left',zIndex:'99',width:'94%',paddingBottom:'2%',marginLeft:'3%',marginRight:'3%',height:'300px'}}>              
                        //     <video src={`http://116.62.14.0:8402/images/`+data.mimage} id="myPlayer" poster='' controls playsInline webkit-playsinline style={{width:'100%'}}></video>
                        //     <div ref={el => (this.componentRef = el)}>
                        //     <div style={{width:'100%',float:'left',fontWeight:'bold',textAlign:'center',fontSize:'150%',paddingLeft:'2%',paddingBottom:'2%',marginTop:'8%'}}>{data.mtitle}</div>
                                                             
                        //     </div>
                        // </div>  

                        <div style={{marginBottom:'4%',paddingBottom:'2%',height:'270px',backgroundColor:'#fff'}}>
                            <Link to={{pathname:'/composition/label/s/sdetails/'+data.mid,mtab2:data.mid,state:this.props.location.state,mtab:data.mtab}} style={{color:'#000',fontSize:'110%'}}>
                                <video src={`http://116.62.14.0:8402/images/`+data.mimage} id="myPlayer" poster='' controls playsInline webkit-playsinline style={{width:'100%'}}></video>
                                <div ref={el => (this.componentRef = el)}></div>
                                <div style={{width:'100%',height:'25%',float:'left',fontWeight:'600',fontSize:'120%',paddingTop:'5%',paddingLeft:'2%',paddingRight:'2%'}}>
                                    
                                    {data.mtitle}
                                </div>

                            </Link>
                        </div>
                        :      
                        <div style={{marginBottom:'4%',paddingBottom:'2%',height:'300px',backgroundColor:'#fff'}}>
                            <Link to={{pathname:'/composition/label/s/sdetails/'+data.mid,mtab2:data.mid,state:this.props.location.state,mtab:data.mtab}} style={{color:'#000',fontSize:'110%'}}>
                                <div style={{width:'100%',height:'75%',position:'relative',float:'left',backgroundImage:'url(http://116.62.14.0:8402/images/'+data.mimage+')',backgroundPosition:'center',zIndex:'99'}}>
                                    <div style={{float:'left' ,position:'absolute',top:'5%',left:'3%',color:'#000',fontSize:'90%'}}>素材--{data.msname}</div>
                                </div>
                                <div style={{width:'100%',height:'25%',float:'left',fontWeight:'600',fontSize:'120%',paddingTop:'5%',paddingLeft:'2%',paddingRight:'2%'}}>
                                    
                                    {data.mtitle}
                                </div>
                            
                            </Link>
                        </div>
                        )
                    
                ):(data.mtab==='fanwen'?
                    (data.mimage===''?
                        <div style={{backgroundColor:'#fff',marginBottom:'4%',padding:'2%',height:'200px'}}>
                            <Link to={{pathname:'/composition/label/s/sdetails/'+data.mid,mtab2:data.mid,state:this.props.location.state,mtab:data.mtab}} style={{color:'#000',fontSize:'120%'}}>
                                <div style={{width:'100%',float:'left',fontSize:'90%',padding:'2%'}}>范文--{data.msname}</div>
                                <div style={{width:'100%',float:'left',height:'80%',float:'left',fontWeight:'600',textAlign:'left',paddingTop:'10%',fontSize:'120%',paddingLeft:'2%',paddingBottom:'2%'}}>{data.mtitle}</div>
                            </Link>
                        </div> : 
                        <div style={{marginBottom:'4%',paddingBottom:'2%',height:'300px',backgroundColor:'#fff'}}>
                            <Link to={{pathname:'/composition/label/s/sdetails/'+data.mid,mtab2:data.mid,state:this.props.location.state,mtab:data.mtab}} style={{color:'#000',fontSize:'110%'}}>
                                <div style={{width:'100%',height:'75%',position:'relative',float:'left',backgroundImage:'url(http://116.62.14.0:8402/images/'+data.mimage+')',backgroundRepeat:'no-repeat',backgroundPosition:'center',zIndex:'99'}}>
                                    <div style={{float:'left' ,position:'absolute',top:'5%',left:'3%',color:'#000',fontSize:'90%'}}>范文--{data.msname}</div>
                                </div>
                                <div style={{width:'100%',height:'25%',float:'left',fontWeight:'600',fontSize:'120%',paddingTop:'5%',paddingLeft:'2%',paddingRight:'2%'}}>
                                    
                                    {data.mtitle}
                                </div>
                            
                            </Link>
                        </div>
                    )
                    :(data.mimage===''?
                    <div style={{backgroundColor:'#fff',marginBottom:'4%',padding:'2%',height:'200px'}}>
                        <Link to={{pathname:'/composition/label/s/sdetails/'+data.mid,mtab2:data.mid,state:this.props.location.state,mtab:data.mtab}} style={{color:'#000',fontSize:'120%'}}>
                            <div style={{width:'100%',float:'left',fontSize:'90%',padding:'2%'}}>技法--{data.msname}</div>
                            <div style={{width:'100%',float:'left',height:'80%',float:'left',fontWeight:'600',textAlign:'left',paddingTop:'10%',fontSize:'120%',paddingLeft:'2%',paddingBottom:'2%'}}>{data.mtitle}</div>
                        </Link>
                    </div> : 
                    <div style={{marginBottom:'4%',paddingBottom:'2%',height:'300px',backgroundColor:'#fff'}}>
                        <Link to={{pathname:'/composition/label/s/sdetails/'+data.mid,mtab2:data.mid,state:this.props.location.state,mtab:data.mtab}} style={{color:'#000',fontSize:'110%'}}>
                            <div style={{width:'100%',height:'75%',position:'relative',float:'left',backgroundImage:'url(http://116.62.14.0:8402/images/'+data.mimage+')',backgroundRepeat:'no-repeat',backgroundPosition:'center',zIndex:'99'}}>
                                <div style={{float:'left' ,position:'absolute',top:'5%',left:'3%',color:'#000',fontSize:'90%'}}>技法--{data.msname}</div>
                            </div>
                            <div style={{width:'100%',height:'25%',float:'left',fontWeight:'600',fontSize:'120%',paddingTop:'5%',paddingLeft:'2%',paddingRight:'2%'}}>
                                
                                {data.mtitle}
                            </div>
                            {/* <img src={'http://116.62.14.0:8402/images/'+data.mimage} style={{width:'100%',height:'100%'}} /> */}
                            
                        
                        </Link>
                    </div>
                )

                )
                ))}
            </div>
        )
    }
}
