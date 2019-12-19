import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {Icon,NavBar} from 'antd-mobile';
export default class Csearch extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            search:''
        }
        
    }
    fetchSousuo = (e)=>{
        let data = {
            search:document.getElementsByClassName('sousuo')[0].value
        }
        console.log(data);
        // 获取value值
        this.setState({search:data.search+''})
        fetch('http://116.62.14.0:8402/search/material', {
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
                    console.log(data.data[0]);
                    this.setState({
                        data:data.data
                    })
                    break;
                }
                default:{
                    //错误，服务器
                    console.log(data.data);
                    break;
                }
            }
        })
    }
    // 高亮函数
    warpTag(content, keyword, tagName) {
        if (content === "No results") {
            return content
        }
        const a = content.toLowerCase();
        const b = keyword.toLowerCase();

        const indexof = a.indexOf(b);
        const c = indexof > -1 ? content.substr(indexof, keyword.length) : '';
        const val = `<${tagName} style="color:red;">${c}</${tagName}>`;
        const regS = new RegExp(keyword, 'gi');
        return content.replace(regS, val);
    }
    render() {
        let item = this.state.search;
        console.log(item);
        return (
            <div style={{backgroundColor:'#f5f5f9',padding:'3%',position:'relative',top:'0'}}>
                <Link to={{pathname:'/composition/composition',state:this.props.location.state}}><img src='/images/write/left.png' style={{width:'6%',float:'left',marginTop:'2.5%'}} /></Link>
                <input className='sousuo' type='text' placeholder="输入关键字搜索" style={{border:'none',width:'75%',height:'35px',marginLeft:'3%',marginRight:'3%'}}/>
                <input onClick={(e)=>{this.fetchSousuo(e)}} type='button' value='搜索'  style={{marginTop:'2%',backgroundColor:'#fff',color:'#da4036',borderRadius:'15%',outline:'none',border:'1px solid #da4036',padding:'1.5%'}}/>
                
                <div style={{position:'absolute',top:'60px',width:'100%'}}>
                    <div style={{borderTop:'0.5px solid #000',paddingTop:'3%',fontSize:'120%'}}>热门搜索</div>
                    <div style={{marginTop:'3%'}}>
                        <a style={{marginLeft:'7%',fontSize:'110%'}}>时事</a> <a style={{marginLeft:'7%',fontSize:'110%'}}>人生 </a> <a style={{marginLeft:'7%',fontSize:'110%'}}>个性</a> <a style={{marginLeft:'7%',fontSize:'110%'}}>梦想</a> <a style={{marginLeft:'7%',fontSize:'110%'}}>匠心</a>
                    </div>
                    
                </div>

                <div style={{position:'absolute',top:'59px'}}>
                    
                    
                {
                    this.state.data.map(data=>(
                        data.mimage===''?
                        <div style={{backgroundColor:'#fff',marginBottom:'2%',padding:'2%',height:'150px'}}>
                            <Link to={{pathname:'/composition/search/sucai/sdetails/'+data.mid,mtab2:data.mid,state:this.props.location.state}} style={{color:'#000',fontSize:'120%'}}>
                                <div style={{width:'100%',float:'left',fontSize:'110%'}}>{data.msname}</div>
                                <div style={{width:'100%',float:'left',height:'80%',float:'left',fontWeight:'500',textAlign:'left',paddingTop:'10%',fontSize:'120%',paddingLeft:'2%',paddingBottom:'2%'}}><a href="#" dangerouslySetInnerHTML={{__html: this.warpTag(data.mtitle, this.state.search , "span")}}></a></div>
                            </Link>
                        </div> : 
                        <Link to={{pathname:'/composition/search/sucai/s/s/s/sdetails/'+data.mid,mtab2:data.mid,state:this.props.location.state}} style={{color:'#000',fontSize:'120%'}}>
                            <div style={{position:'relative',marginBottom:'2%',paddingTop:'2%',paddingBottom:'2%',height:'150px'}}>
                                <img src={'http://116.62.14.0:8402/images/'+data.mimage} style={{width:'100%',height:'100%'}} />
                                <div style={{float:'left' ,position:'absolute',top:'10%',left:'6%',color:'#fff',fontSize:'110%'}}>{data.msname}</div>
                                <div style={{float:'left' ,position:'absolute',bottom:'8%',left:'3%',color:'#fff',fontWeight:'500',fontSize:'120%'}}><a href="#" dangerouslySetInnerHTML={{__html: this.warpTag(data.mtitle, this.state.search , "span")}}></a></div>
                            </div>
                        </Link>
                ))}
                </div>
            </div>
        )
    }
}
