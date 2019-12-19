import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {Icon,NavBar} from 'antd-mobile';
export default class Search extends Component {
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
        fetch('http://116.62.14.0:8402/search/article', {
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
        let arr=this.props.location.pathname.split('/');
        if(arr.length===3){
            var data1='/home';
        }else if(arr.length===4){
            var data1='/home/follow/'+this.props.location.state;
        }else{
            var data1='/home/crnew';
        }
        console.log(data1);
        let item = this.state.search;
        console.log(item);
        return (
            <div style={{backgroundColor:'#f5f5f9',padding:'3%'}}>
                <Link to={{pathname:data1,state:this.props.location.state}}><img src='/images/write/left.png' style={{width:'6%',float:'left',marginTop:'2.5%'}} /></Link> 
                <input className='sousuo' type='text' placeholder="输入关键字搜索作文"  style={{border:'none',width:'75%',height:'35px',marginLeft:'3%',marginRight:'3%'}}/>
                <input onClick={(e)=>{this.fetchSousuo(e)}} type='button' value='搜索'  style={{marginTop:'2%',backgroundColor:'#fff',color:'#da4036',borderRadius:'15%',outline:'none',border:'1px solid #da4036',padding:'1.5%'}}/>
                <div style={{width:'98%',marginTop:'2%',float:'left',paddingBottom:'2%'}}>
                {this.state.data.map(data=>(
                    // <div><Link to={{pathname:'/home/home/search/search/article/'+data.aid,state1:data.aid,state:this.props.location.state,state2:data.uid}}>{data.atitle}</Link></div>
                    <div style={{width:'100%',whiteSpace:"pre-wrap",marginBottom:'2%',backgroundColor:'#fff',float:'left'}}>
                            <div style={{width:'94%',marginTop:'3%',marginLeft:'3%',marginRight:'3%',backgroundColor:'#fff',float:'left',paddingBottom:'2%',height:'180px'}}>
                                            
                                                
                                <div style={{float:'left',width:'90%',marginLeft:'5%',marginRight:'5%'}}>
                                    <Link to={{pathname:'/home/home/search/search/article/'+data.aid+'/'+data.uid,state1:data.aid,state:this.props.location.state,state2:data.uid,mtab2:data.mid}} style={{}}>  
                                    <div style={{textAlign:'center',color:'#000',fontSize:'150%',marginTop:'3%',marginBottom:'3%'}}><a href="#" dangerouslySetInnerHTML={{__html: this.warpTag(data.atitle, this.state.search , "span")}}></a></div>
                                    <div style={{height:'70px',overflow:'hidden',color:'#000',fontSize:'120%',marginBottom:'5%'}}>{data.acontent}</div>
                                    <div style={{color:'#000',fontSize:'120%',marginBottom:'3%'}}>#{data.atag}</div>
                                    
                                        <a style={{fontSize:'16px',color:'#5a6d95'}}>...查看全文</a>
                                    </Link>
                                </div>
                                                
                            </div>
                        </div>
                ))}
            </div>
            </div>
        )
    }
}
