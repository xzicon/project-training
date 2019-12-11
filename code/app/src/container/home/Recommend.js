import React, { Component } from 'react'
import {Carousel,WingBlank,Flex,TabBar,Tabs,SearchBar} from 'antd-mobile';
import {Link} from 'react-router-dom';
const tabs = [
    { title: '推荐' },
    { title: '创作' },
    { title: '关注' },
];
export default class Recommend extends Component {
    
    constructor(){
        super();
        this.state={
            // data1:[
            //     {
            //         name:'典故',
            //         title:'寻找经典素材',
            //         img:'diangu.png'
            //     },
            //     {
            //         name:'诗词',
            //         title:'古今诗词巨匠',
            //         img:'shici.png'
            //     },
            //     {
            //         name:'时政',
            //         title:'透过热词看时政',
            //         img:'shizheng.png'
            //     }
            // ],
            data: ['1', '2'],
            imgHeight: 100,
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: ['1', '2'],
            });
        }, 100);
    }
    render() {
        const font = [
            {title:'妙笔作文管理细则',img:'guanli'},
            {title:'欢迎评价妙笔作文',img:'pingjia'},
        ];
        const item = [
            {title:'322',img:'shoucang'},
            {title:'322',img:'pinglun'},
            {title:'322',img:'zan'},
        ];
        return (
            <div>
                <div>
                <WingBlank>
                    <Carousel
                    autoplay={true}
                    infinite
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                    >
                    {
                        this.state.data.map((val) => (
                            <Link to='/home/manage'>
                            <a
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight,color:'#000' }}
                            >    
                                <div style={{zIndex:'999',marginTop:'20%',position:'absolute',fontSize:'28px',textAlign:'center',width:'100%'}}>
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
                        ))
                    }
                    </Carousel>
                </WingBlank>
                </div>
                {/* <div style={{width:'93%',margin:'2% 4% auto',backgroundColor:'#fff'}}>
                        <div style={{fontSize:'18px',borderLeft:'4px solid #d83e34',paddingLeft:'2%'}}>
                            热门素材合集
                            <Link to='/home/collection'><span style={{color:'#000',float:'right',fontSize:'18px'}}>查看更多>></span></Link>
                        </div>
                        <Flex>
                        {
                            this.state.data1.map(item=>(
                                <Link to='/home/essay'>
                                    <div style={{position:'relative',marginBottom:'10px',marginTop:'10px',marginRight:'2%',color:'#000'}}>
                                        <img src={`images/home/`+item.img} style={{width:'100%',height:'100%'}}/>
                                        <div style={{width:'47%',position:'absolute',top:'30%',fontSize:'160%',marginLeft:'26%',textAlign:'center',border:'1px solid #fff',borderRadius:'50%',backgroundColor:'#fff'}}>{item.name}</div>
                                        <div style={{width:'100%',top:'74%',fontSize:'14px',marginLeft:'4%',backgroundColor:'#fff'}}>{item.title}</div>
                                    </div>
                                </Link>
                            ))
                        }
                        </Flex> 
                </div> */}
                <div style={{width:'100%'}}>
                    <div style={{width:'93%',margin:'0 3.4% auto',backgroundColor:'#f1edea'}}>
                        
                            <div style={{height:'26px',fontSize:'14px',float:'left',width:'100%',color:'#000'}}>
                                {/* <img src="images/home/touxiang.png" style={{height:'80%',marginLeft:'2%',marginTop:'1%',marginRight:'1%'}} />
                                两朵小花 */}
                            </div>
                            <Link to='/home/article'>
                                <div></div>
                            {/* <h2 style={{textAlign:'center',color:'#000'}}>生命的湖</h2>
                            <div style={{height:'160px',overflow:'hidden',color:'#000'}}>梭罗在《瓦尔登湖》中写道“多数人过着平静的绝望生活，他们心中的歌和他们一起进入了坟墓。”这又何尝不是在讲述着现在人们的生活，麻木的重复着一天又一天的事情，不再去关注生活中的点滴。<br/>生活像是望得见底的湖泊，它似乎打碎了人们对热爱的一切，给予人们绝望的感觉。而罗曼·罗兰却说“世界上只有一种真正的英雄主义，那就是认清生活的真相之后依然热爱生活。”生活本就是望得见的，我们无法逃脱这一片湖泊，也注定与它为伍。<br/>那么为什么我们不试着去了解它呢？当泛舟游湖时，当沉浸在冰凉的湖水时，当踏上湖心的亭子时，我们心中充满着的是对这一片湖泊的喜爱和对未来的向往。我们渴望着事物的永恒和时间的长留。正是我们希望事物的永恒和渴望时间的长久，才让我们对面生活时不选择放弃。<br/>去探索，去挖掘，去寻觅，利用时光去汲取智慧和能力，去找寻隐藏在湖中的我们尚未触及到的美好。而在那一刻，我们发现生活这一片湖泊，变得更加宽广和深沉，开始与他人的生活湖泊相联系。进发出了一股前所未有的力量和热情。<br/>当我们回望余生，还来不及哀叹自己逝去的时光和那些未完成的事情，就已经看见了自己手中那沉甸甸的财富，就已闻见当年随手播下的种子开出了淡淡的清香。<br/>而这一切都是在我们坚信自己的梦想，热爱着生活的前提之下获得的。而这一切也将自我的勋章，也就成为我们在祖国的建设中用力写下的痕迹。<br/>随着时代的变迁，科技的进步，我们的路与生活与前辈不再一样。贫猜的土地和落后的经济，不再是我们所要面对的问题；而那日益丰富的物质生活和丧失的坚持，却成为了一把利剑高悬于我们的头顶。<br/>而我们要做的是认清生活，看清自己的道路，一步一步地走向硕果累累的未来日子。<br/></div>
                            <span style={{fontSize:'16px',color:'#5a6d95'}}>...查看全文</span> */}
                        </Link>
                    </div>
                    <div style={{width:'93.5%',margin:'0 3.4% auto',backgroundColor:'#fff',height:'30px'}}>                        
                            <div style={{width:'33%',float:'left',paddingLeft:'10%',backgroundColor:'#fff'}}><img src={`images/home/${item[0].img}.png`} /></div>
                                <Link to='/home/comment'>
                                <div style={{width:'33%',float:'left',paddingLeft:'10%',backgroundColor:'#fff'}}><img src={`images/home/${item[1].img}.png`} /></div>
                                </Link>
                                <div style={{width:'33%',float:'left',paddingLeft:'10%',backgroundColor:'#fff'}}><img src={`images/home/${item[2].img}.png`} /></div>                       
                    </div>
                </div>
            </div>
        )
    }
}
