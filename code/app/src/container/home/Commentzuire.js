import React, { Component } from 'react'

export default class Commentzuire extends Component {
    constructor(props){
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.state={
            data:[]
        }
    }
    
    componentDidMount(){
        // let page = this.props.location.state1;
        // console.log(page);
        let arr=this.props.location.pathname.split('/');
        let arr1 = arr.reverse();
        console.log(arr1);
        fetch('http://116.62.14.0:8402/article/zuixin/'+arr1[1])
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    // componentDidUpdate(){
    //     let page = this.props.location.state1;
    //     console.log(page);
    //     fetch('http://116.62.14.0:8402/article/zuixin/'+page)
    //     .then((res)=>res.json())
    //     .then((res)=>{
    //         this.setState({data:res.data});
    //         console.log(res.data);
    //     })
    // }
    render() {
        return (
            <div style={{}}>
                {
                    this.state.data.length!==0?this.state.data.map((data)=>(
                        <div style={{float:'left',backgroundColor:'#cfc5bb',marginTop:'2%',width:'100%'}}>
                            <div style={{float:'left',width:'100%',color:'#000',float:'left'}}>
                                <img src={'http://116.62.14.0:8402/images/'+data.uimage} style={{width:'50px',height:'50px',marginLeft:'2%',marginTop:'1%',marginRight:'3%',borderRadius:'50%',float:'left'}} />
                                <div style={{float:'left',paddingTop:'2%',width:'80%'}}>
                                    <div style={{float:'left',width:'100%',marginBottom:'2%'}}><a style={{fontSize:'110%'}}>{data.uname}</a></div>
                                    <div style={{float:'left',width:'100%',fontSize:'90%',color:'gray'}}>{data.actime}</div>                  
                                </div>
                                                  
                            </div>
                            <div style={{float:'left',fontSize:'120%',margin:'3%'}}>
                                {data.accontent}
                            </div>  
                            
                            
                        </div>
                    )):<div style={{height:'35px',lineHeight:'35px',marginTop:'3%',fontSize:'120%',marginLeft:'3%'}}>目前还没有人评论哦~  </div>
                }
            </div>
        )
    }
}
