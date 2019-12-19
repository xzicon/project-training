import React, { Component } from 'react'

export default class Smcomment extends Component {
    constructor(props){
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.state={
            data:[]
        }
    }
    
    componentDidMount(){
        let page = this.props.location.mtab2;
        console.log(page);
        fetch('http://116.62.14.0:8402/material/xiangqing/pinglun/'+page)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    render() {
        return (
            <div >
                {
                    this.state.data.length!==0?this.state.data.map(data=>(
                        <div style={{float:'left',backgroundColor:'#cfc5bb',marginTop:'2%',width:'100%'}}>
                            <div style={{float:'left',width:'100%',color:'#000',float:'left'}}>
                                <img src={'http://116.62.14.0:8402/images/'+data.uimage} style={{width:'10%',height:'10%',marginLeft:'2%',marginTop:'1%',marginRight:'3%',borderRadius:'50%',float:'left'}} />
                                <div style={{float:'left',paddingTop:'2%',width:'80%'}}>
                                    <div style={{float:'left',width:'100%',marginBottom:'3%'}}><a style={{fontSize:'110%'}}>{data.uname}</a></div>
                                                        
                                </div>
                                                  
                            </div>
                            <div style={{float:'left',fontSize:'120%',margin:'3%'}}>
                                {data.mccontent}
                            </div>  
                            
                            
                        </div>
                )):<div style={{height:'35px',lineHeight:'35px',marginTop:'3%',fontSize:'120%',marginLeft:'3%'}}>当前还没有评论哦~  </div>
            }
            </div>
        )
    }
}
