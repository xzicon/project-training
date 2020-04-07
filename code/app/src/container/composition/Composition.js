import React, { Component } from 'react'
import {Tabs,SearchBar,TabBar} from 'antd-mobile';
import {HashRouter as Router,Link,Route} from 'react-router-dom';
import Material from './material/Material'
import Popular from './Popular';
import Label from './Label';
export default class Composition extends Component {
    constructor(props) {
        let arr=props.location.pathname.split('/');
        super(props);
        this.state = {   
          selectedTab: '/'+arr[1]+'/composition/composition',
          data1:[],
          data2:[],
          data3:[],
          data4:[],
          data5:[],
        };
    }
    componentDidMount(){
        // let state = this.props.location.state;
        // console.log(state);
        let arr=this.props.location.pathname.split('/');
        console.log(arr[1]);
        // fetch('http://116.62.14.0:8402/usort/msid/'+state)
        fetch('http://116.62.14.0:8402/usort/msid/'+arr[1])
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({
                data1:res.data[0],
                data2:res.data[1],
                data3:res.data[2],
                data4:res.data[3],
                data5:res.data[4],
            });
            console.log(res.data);
        })
    }
    Change1=(e)=>{
        document.getElementById("A1").style.color="red"
        document.getElementById("A1").style.borderBottom="4px solid #ffdf41"
        document.getElementById("A2").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A3").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A4").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A5").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A6").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A2").style.color="#000"
        document.getElementById("A3").style.color="#000"
        document.getElementById("A4").style.color="#000"
        document.getElementById("A5").style.color="#000"
        document.getElementById("A6").style.color="#000"
}
Change2=(e)=>{
        document.getElementById("A2").style.color="red"
        document.getElementById("A1").style.color="#000"
        document.getElementById("A3").style.color="#000"
        document.getElementById("A4").style.color="#000"
        document.getElementById("A5").style.color="#000"
        document.getElementById("A6").style.color="#000"
        document.getElementById("A2").style.borderBottom="4px solid #ffdf41"
        document.getElementById("A1").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A3").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A4").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A5").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A6").style.borderBottom="0px solid #ffdf41"
}
Change3=(e)=>{

        document.getElementById("A3").style.color="red"
        document.getElementById("A2").style.color="#000"
        document.getElementById("A1").style.color="#000"
        document.getElementById("A4").style.color="#000"
        document.getElementById("A5").style.color="#000"
        document.getElementById("A6").style.color="#000"
        document.getElementById("A3").style.borderBottom="4px solid #ffdf41"
        document.getElementById("A2").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A1").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A4").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A5").style.borderBottom="0px solid #ffdf41"
        document.getElementById("A6").style.borderBottom="0px solid #ffdf41"
}
Change4=(e)=>{

    document.getElementById("A4").style.color="red"
    document.getElementById("A2").style.color="#000"
    document.getElementById("A3").style.color="#000"
    document.getElementById("A1").style.color="#000"
    document.getElementById("A5").style.color="#000"
    document.getElementById("A6").style.color="#000"
    document.getElementById("A4").style.borderBottom="4px solid #ffdf41"
    document.getElementById("A2").style.borderBottom="0px solid #ffdf41"
    document.getElementById("A3").style.borderBottom="0px solid #ffdf41"
    document.getElementById("A1").style.borderBottom="0px solid #ffdf41"
    document.getElementById("A5").style.borderBottom="0px solid #ffdf41"
    document.getElementById("A6").style.borderBottom="0px solid #ffdf41"

}
Change5=(e)=>{

    document.getElementById("A5").style.color="red"
    document.getElementById("A2").style.color="#000"
    document.getElementById("A3").style.color="#000"
    document.getElementById("A4").style.color="#000"
    document.getElementById("A1").style.color="#000"
    document.getElementById("A6").style.color="#000"
    document.getElementById("A5").style.borderBottom="4px solid #ffdf41"
    document.getElementById("A2").style.borderBottom="0px solid #ffdf41"
    document.getElementById("A3").style.borderBottom="0px solid #ffdf41"
    document.getElementById("A4").style.borderBottom="0px solid #ffdf41"
    document.getElementById("A1").style.borderBottom="0px solid #ffdf41"
    document.getElementById("A6").style.borderBottom="0px solid #ffdf41"
}
Change6=(e)=>{
    document.getElementById("A6").style.color="red"
    document.getElementById("A2").style.color="#000"
    document.getElementById("A3").style.color="#000"
    document.getElementById("A4").style.color="#000"
    document.getElementById("A5").style.color="#000"
    document.getElementById("A1").style.color="#000"
    document.getElementById("A6").style.borderBottom="4px solid #ffdf41"
    document.getElementById("A2").style.borderBottom="0px solid #ffdf41"
    document.getElementById("A3").style.borderBottom="0px solid #ffdf41"
    document.getElementById("A4").style.borderBottom="0px solid #ffdf41"
    document.getElementById("A5").style.borderBottom="0px solid #ffdf41"
    document.getElementById("A1").style.borderBottom="0px solid #ffdf41"
}

    render() {
        let url = this.props.match.url;
        console.log(url);
        let arr=this.props.location.pathname.split('/');
        console.log(arr[1]);
        // console.log(this.state.data.length);
        return (
            <div>
                <div style={{
                position: 'fixed',
                height: '100%', 
                width: '100%', 
                top: 0 
                }}>
                    <TabBar
                        unselectedTintColor="#2c2c2c"
                        tintColor="#da4036"
                        barTintColor="white"
                    >
                        <TabBar.Item
                        title="作文"
                        key="Home"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(images/apptab/home.png) center center /  21px 21px no-repeat' }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(images/apptab/home1.png) center center /  21px 21px no-repeat' }}
                        />
                        }
                        selected={this.state.selectedTab === '/'+arr[1]+'/home'}
                        onPress={() => {
                            this.setState({
                            selectedTab: '/'+arr[1]+'/home',
                            });
                            this.props.history.push({pathname:'/'+arr[1]+'/home'})
                        }}
                        >
                            {/* <Home/> */}
                        </TabBar.Item>
                        <TabBar.Item
                        icon={
                            <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(images/apptab/composition.png) center center /  21px 21px no-repeat' }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(images/apptab/composition1.png) center center /  21px 21px no-repeat' }}
                            />
                        }
                        title="素材"
                        key="Composition"
                        selected={this.state.selectedTab === '/'+arr[1]+'/composition/composition'}
                        onPress={() => {
                            this.setState({
                            selectedTab: '/'+arr[1]+'/composition/composition',
                            });
                            
                        }}
                        >
                            <div >
                                <div style={{position: 'fixed',top: '0',zIndex:'100000',width:'100%',backgroundColor:'#f5f5f9'}}>
                                <div style={{float:'left',width:'100%',paddingBottom:'2%'}}>
                                    <Link to={{pathname:'/'+arr[1]+'/composition/all',state:this.props.location.state,state1:this.props.location.state1}}><img src='/images/write/all.png' style={{float:'left',width:'7%',height:'7%',marginTop:'2%',marginLeft:'2%'}} /></Link>
                                    <Link to={{pathname:'/'+arr[1]+'/composition/csearch',state:this.props.location.state}}><SearchBar style={{width:'65%',backgroundColor:'#f5f5f9',float:'left'}} placeholder="输入关键字搜索"/></Link>
                                    <Link to={{pathname:'/'+arr[1]+'/gselect',state:this.props.location.state}} style={{color:'red'}}><div style={{width:'20%',marginTop:'3%',marginRight:'3%',float:'right',fontSize:'120%'}}>修改标签</div></Link>
                                </div>
                                <div style={{marginTop:'12%',backgroundColor:'#fff',fontSize:'130%',paddingBottom:'2%',}}>
                                    <Link to={{pathname:url,state:this.props.location.state}} style={{color:'red',marginLeft:'5%',borderBottom:"4px solid #ffdf41"}} id='A1' onClick={(e)=>{this.Change1(e)}}>推荐</Link>
                                {/* {this.state.data.map(data => ( */}
                                    <Link to={{pathname:url,search:`?msid=${this.state.data1.msid}`,mtab3:this.state.data1.msid,state:this.props.location.state}}>
                                                    <a style={{width:'15%',marginLeft:'3%',color:'#000'}} id='A2' onClick={(e)=>{this.Change2(e)}}>{this.state.data1.msname}</a>
                                                </Link>
                                                <Link to={{pathname:url,search:`?msid=${this.state.data2.msid}`,mtab3:this.state.data2.msid,state:this.props.location.state}}>
                                                    <a style={{width:'15%',marginLeft:'3%',color:'#000'}} id='A3' onClick={(e)=>{this.Change3(e)}}>{this.state.data2.msname}</a>
                                                </Link>
                                                <Link to={{pathname:url,search:`?msid=${this.state.data3.msid}`,mtab3:this.state.data3.msid,state:this.props.location.state}}>
                                                    <a style={{width:'15%',marginLeft:'3%',color:'#000'}} id='A4' onClick={(e)=>{this.Change4(e)}}>{this.state.data3.msname}</a>
                                                </Link>
                                                <Link to={{pathname:url,search:`?msid=${this.state.data4.msid}`,mtab3:this.state.data4.msid,state:this.props.location.state}}>
                                                    <a style={{width:'15%',marginLeft:'3%',color:'#000'}} id='A5' onClick={(e)=>{this.Change5(e)}}>{this.state.data4.msname}</a>
                                                </Link>
                                                <Link to={{pathname:url,search:`?msid=${this.state.data5.msid}`,mtab3:this.state.data5.msid,state:this.props.location.state}}>
                                                    <a style={{width:'15%',marginLeft:'3%',color:'#000'}} id='A6' onClick={(e)=>{this.Change6(e)}}>{this.state.data5.msname}</a>
                                                </Link>

                                {/* ))} */}
                                </div>
                                </div>
                                <div style={{width:'94%',marginLeft:'3%'}}>
                                    <Route path={`${url}`} exact component={Popular}/>
                                </div>
                            </div>
                        </TabBar.Item>
                        <TabBar.Item
                        icon={{ uri: 'images/apptab/mine.png' }}
                        selectedIcon={{ uri: 'images/apptab/mine1.png' }}
                        title="我的"
                        key="Mine"
                        selected={this.state.selectedTab === '/'+arr[1]+'/mine'}
                        onPress={() => {
                            this.setState({
                            selectedTab: '/'+arr[1]+'/mine',
                            });
                            this.props.history.push({pathname:'/'+arr[1]+'/mine',state:this.props.location.state})
                        }}
                        >
                        </TabBar.Item>
                    </TabBar>
                </div>
                
            </div>
        )
    }
}