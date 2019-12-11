import React, { Component } from 'react'
import {Icon,NavBar} from 'antd-mobile';
import {Link} from 'react-router-dom';
export default class Essay extends Component {
    render() {
        const item = [
            {title:'322',img:'shoucang'},
            {title:'322',img:'pinglun'},
            {title:'322',img:'zan'},
        ];
        return (
            <div>
                <NavBar
                    icon={<Link to='/home/collection'><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={
                        <button style={{backgroundColor:'#da4036',fontSize:'18px',color:'#fff',border:'1px solid #da4036'}}>关注</button>
                    }
                >典故(寻找经典素材)</NavBar>
                <div style={{top:'50px',position:'absolute'}}>
                <div style={{margin:'2% 2% auto',backgroundColor:'#fff'}}><br/>望夏商周，穿越春秋战国，梦回大唐明清，寻找那些经典的素材。<br/><br/></div>
                <div style={{margin:'2% 2% auto',backgroundColor:'#fff'}}>
                    <img src="/images/home/diangu2.png" style={{width:'100%'}} />
                    <h2>与君痛饮黄龙，吟唱易水悲歌。</h2>
                    <div style={{textAlign:'right'}}>--妙笔</div>
                </div>
                <div style={{width:'96%',margin:'2% 2% auto',marginTop:'10px',backgroundColor:'#f1edea'}}>
                    <Link to='/home/article'>
                        <div style={{height:'26px',fontSize:'14px',float:'left',width:'100%',color:'#000'}}>
                            <img src="/images/home/touxiang.png" style={{height:'80%',marginLeft:'2%',marginTop:'1%',marginRight:'1%'}} />
                            两朵小花
                        </div>
                        <h2 style={{textAlign:'center',color:'#000'}}>生命的湖</h2>
                        <div style={{height:'160px',overflow:'hidden',color:'#000'}}>梭罗在《瓦尔登湖》中写道“多数人过着平静的绝望生活，他们心中的歌和他们一起进入了坟墓。”这又何尝不是在讲述着现在人们的生活，麻木的重复着一天又一天的事情，不再去关注生活中的点滴。<br/>生活像是望得见底的湖泊，它似乎打碎了人们对热爱的一切，给予人们绝望的感觉。而罗曼·罗兰却说“世界上只有一种真正的英雄主义，那就是认清生活的真相之后依然热爱生活。”生活本就是望得见的，我们无法逃脱这一片湖泊，也注定与它为伍。<br/>那么为什么我们不试着去了解它呢？当泛舟游湖时，当沉浸在冰凉的湖水时，当踏上湖心的亭子时，我们心中充满着的是对这一片湖泊的喜爱和对未来的向往。我们渴望着事物的永恒和时间的长留。正是我们希望事物的永恒和渴望时间的长久，才让我们对面生活时不选择放弃。<br/>去探索，去挖掘，去寻觅，利用时光去汲取智慧和能力，去找寻隐藏在湖中的我们尚未触及到的美好。而在那一刻，我们发现生活这一片湖泊，变得更加宽广和深沉，开始与他人的生活湖泊相联系。进发出了一股前所未有的力量和热情。<br/>当我们回望余生，还来不及哀叹自己逝去的时光和那些未完成的事情，就已经看见了自己手中那沉甸甸的财富，就已闻见当年随手播下的种子开出了淡淡的清香。<br/>而这一切都是在我们坚信自己的梦想，热爱着生活的前提之下获得的。而这一切也将自我的勋章，也就成为我们在祖国的建设中用力写下的痕迹。<br/>随着时代的变迁，科技的进步，我们的路与生活与前辈不再一样。贫猜的土地和落后的经济，不再是我们所要面对的问题；而那日益丰富的物质生活和丧失的坚持，却成为了一把利剑高悬于我们的头顶。<br/>而我们要做的是认清生活，看清自己的道路，一步一步地走向硕果累累的未来日子。<br/></div>
                        <span style={{fontSize:'16px',color:'#5a6d95'}}>...查看全文</span>
                    </Link>
                    </div>
                    <div style={{width:'93%',margin:'0 3.4% auto',backgroundColor:'#fff'}}>
                    {/* {
                        item.map((item)=>( */}
                            
                            <div style={{width:'8%',float:'left',margin:'0% 12%',color:'#000'}}><img src={`/images/home/${item[0].img}.png`} /></div>
                                <Link to='/home/comment'>
                                <div style={{width:'8%',float:'left',margin:'0% 12%',color:'#000'}}><img src={`/images/home/${item[1].img}.png`} /></div>
                                </Link>
                                <div style={{width:'8%',float:'left',margin:'0% 12%',color:'#000'}}><img src={`/images/home/${item[2].img}.png`} /></div>
                            
                        {/* ))
                    } */}
                    </div>
                </div>
            </div>
        )
    }
}
