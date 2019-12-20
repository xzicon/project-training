import React, { Component } from 'react'
import {Icon,NavBar} from 'antd-mobile';
import {Link,Route} from 'react-router-dom';
export default class Fowrite extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[]
        }
    }
    componentDidMount(){
        let uid=this.props.location.state4;
        console.log(uid);
        fetch('http://116.62.14.0:8402/login/article/'+uid)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    render() {
        return (
            <div>
                        <div style={{width:'100%',backgroundColor:'#f1edea'}}>
                        {this.state.data.length!==0?this.state.data.map(data=>(
                               <div style={{width:'100%',whiteSpace:"pre-wrap"}}>
                               <div style={{width:'94%',marginBottom:'3%',marginLeft:'3%',marginRight:'3%',backgroundColor:'#fff',float:'left',paddingBottom:'2%',height:'180px'}}>           
                                   <div style={{float:'left',width:'90%',marginLeft:'5%',marginRight:'5%'}}>
                                       <div style={{textAlign:'center',color:'#000',fontSize:'150%',marginTop:'3%',marginBottom:'3%'}}>{data.atitle}</div>
                                       <div style={{height:'75px',overflow:'hidden',color:'#000',fontSize:'120%',marginBottom:'5%'}}>{data.acontent}</div>
                                       <div style={{color:'#000',fontSize:'110%',marginBottom:'5%'}}>#{data.atag}</div>
                                       <Link to={{pathname:'/home/h/fopeople/fowrite/fowrite/article/'+data.aid+'/'+data.uid,state1:data.aid,state:this.props.location.state,state2:data.uid,mtab2:data.mid,state4:this.props.location.state4}} style={{}}>
                                           <a style={{fontSize:'16px',color:'#5a6d95'}}>...查看全文</a>
                                       </Link>
                                   </div>
                                               
                               </div>
                           </div>
                            )):<div>他还没有发表过文章</div>}
                        </div>
                    
                </div>
        )
    }
}
