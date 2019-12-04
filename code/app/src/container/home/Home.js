import React, { Component } from 'react'
import { NavBar, Carousel, WingBlank, WhiteSpace, Flex, SearchBar } from 'antd-mobile';
import {Link} from 'react-router-dom';
var todo=['开始测评'];
var todo1=['您还未测评，快开始测评吧！'];
export default class Home extends Component {
    state = {
        data: ['1', '2','3','4'],
        items: ['1','2','3','4'],
        imgHeight: 130
    }
    componentDidMount() {
        this.setState({
            items: ['1','2','3','4']
        })
        setTimeout(() => {
          this.setState({
            data: ['1', '2','3','4'],
          });
        }, 100);
    }
    handleResult=()=>{
        todo=['重新测试']
        todo1=['你的情况属于压力大，情绪紧张。建议保持愉悦心情，配合瑜伽运动，保持情绪稳定，注意饮食清淡，多吃安神镇静作用的食物。']
    }
    // jump=()=>{
    //     //pathname：要跳转的路径
    //     //state：要传递的值
    //     this.props.router.push({ pathname: '/classes'});
    // }
    render() {
        const classify = [
            {title:'饮食课程',img:'1'},
            {title:'运动课程',img:'2'},
            {title:'情绪课程',img:'3'},
            {title:'环境课程',img:'4'}
        ];
        const font = [
            {title:'莴笋',img:'1'},
            {title:'瑜伽',img:'2'},
            {title:'睡前心情',img:'3'},
            {title:'卧室环境',img:'4'}
        ];
        // const p = this.props.location.search.split("&")[0];
        return (
            <div style={{backgroundColor:'#F5F5F5'}}>
                <div>
                    <Flex wrap="wrap">
                        <div style={{width:'100%',height:'240px',background:'url(images/home/ceping.jpg) center center / cover no-repeat'}}>
                            <SearchBar placeholder="输入关键字搜索" style={{backgroundColor:'rgba(255,255,240,0)',width:'100%',textAlign:'center',color:'',top:'0',position:'fixed',zIndex:'1000'}} />
                            <Link to='/evaluation'>
                                <button onClick={this.handleResult} style={{textAlign:'center',width:'50%',height:'50px',backgroundColor:'none',fontSize:'24px',marginLeft:'25%',marginTop:'44%',backgroundColor:'rgba(255,255,240,0.2)',border:'solid #808080 0.5px',borderRadius:'10px',color:'#000'}}>{todo}</button>
                            </Link>
                        </div>
                        <div style={{fontSize:'20px',width:'96%',margin:'2% 2% auto'}}>
                            <br/>
                            {todo1}
                            <br/>
                            <br/>
                        </div>
                    </Flex>
                </div>
                <div style={{marginTop:'20px'}}>
                    <div style={{fontSize:'14px',textAlign:'center',width:'100%',color:'#A9A9A9'}}>
                        ----为你推荐----
                    </div>
                    <br/>
                    <WingBlank style={{margin:0,position:'relative'}}>
                        <Carousel
                        autoplay={true}
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => console.log('slide to', index)}
                        >
                        {
                            this.state.data.map((val) => (
                            <Link to='/classification'>
                            <a
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight,color:'#000' }}
                            >    
                                <div style={{zIndex:'999',marginTop:'28%',position:'absolute',fontSize:'28px',textAlign:'center',width:'100%'}}>
                                    {font[`${val}`-1].title}
                                </div>
                                <img
                                    src={`images/home/${font[`${val}`-1].img}.png`}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top', zIndex:'1' }}
                                    onLoad={() => {
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            </a>
                            </Link>
                        ))}
                        </Carousel>
                    </WingBlank>
                </div>
                <br/>
                <br/>
                <div>
                    <div style={{fontSize:'14px',textAlign:'center',width:'100%',color:'#A9A9A9'}}>
                        ----课程分类----
                    </div>
                    <div style={{width:'100%',height:'400px'}}>
                        <Flex wrap="wrap">
                        {
                            this.state.items.map((items,idx) => (
                                <div key={idx} style={{width:'48%',height:'186px',textAlign:'center',marginTop:'10px',marginLeft:'5px',backgroungColor:'#fff',border:'#A9A9A9 solid 0.5px',fontSize:'14px'}}>
                                    <Link to='/classes'>
                                    <img src={`images/home/1${classify[`${items}`-1].img}.png`} style={{width:'100%',height:'160px'}}/>
                                        {classify[`${items}`-1].title}
                                    </Link>
                                </div>
                                )
                            )
                        }
                        </Flex>
                    </div>
                </div>
            </div>
        )
    }
}
