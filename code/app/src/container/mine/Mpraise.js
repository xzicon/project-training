import React, { Component } from 'react'
import {Icon,NavBar,Flex} from 'antd-mobile';
import {Link,Route} from 'react-router-dom';
export default class Mpraise extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[]
        }
    }
    componentDidMount(){
        let uid=this.props.location.state;
        console.log(uid);
        fetch('http://116.62.14.0:8402/login/likes/'+uid)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    render() {
        return (
            <div>
                <NavBar
                    icon={<Link to={{pathname:'/mine',state1:this.props.location.state1,state:this.props.location.state}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}>获赞</NavBar>
                {/* {this.state.data.length!==0?this.state.data.map(data=>(
                <div style={{width:'100%',position:'absolute',top:'50px',fontSize:'16px'}}>
                    
                    <div style={{width:'96%',margin:'2% 2% auto',height:'40px',backgroundColor:'#fff',marginTop:'10px',padding:'4% 4%'}}>
                        <Flex>
                            <div style={{marginRight:'22%'}}>{data.uid}点赞了{data.aid}</div>
                            <div>{data.actime}</div>
                        </Flex>
                    </div>
                    
                </div>
                )):<div>你还没有收到赞</div>} */}
            </div>
        )
    }
}
