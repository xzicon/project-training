import React, { Component } from 'react'
import { Tabs, WhiteSpace ,Badge ,NavBar,Menu} from 'antd-mobile';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './sleep.css';
import Natural from './music/Natural';
import Meditation from './music/Meditation';
import Story from './music/Story';
import Custom from './music/Custom';

// let theAudio = null;
export default class Sleep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parentText: "star",
            audioUrl: `music/star.mp3`,//接口返回的音频地址
        }
    }
    fn(data) {
        this.setState({
            parentText: data //把父组件中的parentText替换为子组件传递的值
        },() =>{
           console.log(this.state.parentText);//setState是异步操作，但是我们可以在它的回调函数里面进行操作
        });
 
    }
    // componentWillReceiveProps(nextProps) {
    //     //通过接口获取音频地址 
    //       if (nextProps.getAudioUrl) {
    //         this.setState({ audioUrl: nextProps.getAudioUrl });
    //       } else {
    //         this.setState({ audioUrl: `music/${this.state.parentText}.mp3` });
    //       }
    //     }
    //     //这个周期在render后执行，此时你的audio对象是存在的
    //     componentDidUpdate() {
    //       if (this.state.audioUrl) {
    //         theAudio = this.audioValue;
    //         theAudio.src = `music/${this.state.parentText}.mp3`;
    //         theAudio.src = this.state.audioUrl;
    //         theAudio.load();
    //       }
    //       console.log(this.audioValue)
    //     }
    pause=()=>{
        const audio = document.getElementById('music');
        setTimeout(()=>{
            audio.pause()
            console.log('暂定')
        },2000);
        
    }
    render() {
        const tabs = [
            { title: <Badge >自然音</Badge> },
            { title: <Badge >冥想</Badge> },
            { title: <Badge >故事</Badge> },
          ];
        return (
            <div style={{background: 'url(images/sleep/background.jpg) no-repeat',width:'100%',backgroundSize:'100% 100%',position: 'absolute',top: '0px',bottom: '0px'}}>
               <div style={{height:'30%'}}>
                <div style={{height:'25%'}} to='/clock'>
                    {/* 闹钟 */}
                    <div style={{float:'left',margin:'7px',height:'30px'}}>
                        <img src='images/sleep/clock.png' style={{width:'30px',float:'left'}}/>
                        <Link to={
                        {pathname:'/clock',
                        state:'hello'}
                        }><span style={{float:'left',lineHeight:'30px',color:'#fff'}}>{this.props.clock}定时</span></Link>
                    </div>
                    {/* 设置 */}
                    <Link to='/setup'><div><img src='images/sleep/shezhi.png' style={{width:'30px',float:'right',margin:'7px'}}/></div></Link>
                </div>
                {/* 播放器 */}
                <div style={{width:'100%',height:'75%'}}>
                    <div style={{height:'75%'}}>
                        <div style={{textAlign:'center',background:'url(images/sleep/cloud.png) center center / 300px 150px no-repeat',
                        height:'100%',
                        width:'100%',
                        display:'flex'
                        }}>
                             {/* 音乐名称 */}
                            <div style={{margin:'auto auto'}}>{this.state.parentText}</div>
                        </div>
                    </div>
                    
                    <div style={{height:'25%'}}>
                        {/* 播放 */}
                        <audio onChange={this.pause} id='music'  src={`music/${this.state.parentText}.mp3`} controls="controls" style={{height:'25px',width:'100%',backgroundColor:'rgba(0,0,0,0.1)'}}>
                                Your browser does not support the audio element.
                        </audio>
                        {/*  <audio ref={(audio) => { this.audioValue = audio; }} controls preload="none" controlsList="nodownload" >
                            <track kind="captions" />
                            您的浏览器不支持 audio 元素。
                        </audio> */}


                    </div>
                </div>
               </div>
                {/* 音乐tab切换 */}
                <div style={{backgroundColor:'rgba(255,255,255,0.3)',height:'70%'}}>
                    <Tabs tabs={tabs}
                    initialPage={0}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    tabBarBackgroundColor='rgba(255,255,255,0)'
                    tabBarUnderlineStyle={{border:'0'}}
                    tabBarTextStyle={{fontSize:'13px'}}
                    >
                        <Natural pfn={this.fn.bind(this)}/>
                        <Meditation pfn={this.fn.bind(this)}/>
                        <Story pfn={this.fn.bind(this)}/>
                        {/* <Custom/> */}
                    </Tabs>
                </div>
            </div>
            
        )
    }
}
