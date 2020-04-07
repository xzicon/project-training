import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar,Icon,Tabs,WhiteSpace } from 'antd-mobile';

export default class Question extends Component {
    render() {
        let arr=this.props.location.pathname.split('/');
        return (
            <div style={{overflow:'hidden'}}>
                <NavBar
                    icon={<Link to={{pathname:'/'+arr[1]+'/mine',state1:this.props.location.state1,state:this.props.location.state}}><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}>常见问题</NavBar>

                <div style={{float:'left',marginTop:'10%',width:'100%'}}>
                    <div style={{backgroundColor:'#fff',width:'94%',margin:'3%',float:'left'}}>
                        <div style={{width:'94%',float:'left',fontSize:'120%',fontWeight:'600',padding:'3%'}}>Q:怎么寻找我想要的素材？</div>
                        <div style={{width:'94%',float:'left',fontSize:'110%',fontWeight:'400',padding:'3%'}}>A:可以通过素材页的搜索框进行关键词查找，也可以通过搜索框旁边的图标进去分类中寻找</div>
                    </div>
                    <div style={{backgroundColor:'#fff',width:'94%',marginLeft:'3%',marginRight:'3%',marginBottom:'3%',float:'left'}}>
                        <div style={{width:'94%',float:'left',fontSize:'120%',fontWeight:'600',padding:'3%'}}>Q:怎么修改之前进入时选择的标签？</div>
                        <div style={{width:'100%',float:'left',fontSize:'110%',fontWeight:'400',padding:'3%'}}>A:可以点击搜索框旁边的‘修改标签’选择你想要看的标签(最多5个)</div>
                    </div>
                    <div style={{backgroundColor:'#fff',width:'94%',marginLeft:'3%',marginRight:'3%',marginBottom:'3%',float:'left'}}>
                        <div style={{width:'94%',float:'left',fontSize:'120%',fontWeight:'600',padding:'3%'}}>Q:怎么修改我写过的练笔或创作？</div>
                        <div style={{width:'94%',float:'left',fontSize:'110%',fontWeight:'400',padding:'3%'}}>A:可以通过我的页面的‘创作’查看自己的创作，再点击查看全文即可编辑或修改你的练笔和创作</div>
                    </div>
                    <div style={{backgroundColor:'#fff',width:'94%',marginLeft:'3%',marginRight:'3%',marginBottom:'3%',float:'left'}}>
                        <div style={{width:'94%',float:'left',fontSize:'120%',fontWeight:'600',padding:'3%'}}>Q:练笔可以有专业的点评吗？</div>
                        <div style={{width:'94%',float:'left',fontSize:'110%',fontWeight:'400',padding:'3%'}}>A:正在努力开发中</div>
                    </div>
                    <div style={{backgroundColor:'#fff',width:'94%',marginLeft:'3%',marginRight:'3%',marginBottom:'3%',float:'left'}}>
                        <div style={{width:'94%',float:'left',fontSize:'120%',fontWeight:'600',padding:'3%'}}>Q:打印是免费的吗？</div>
                        <div style={{width:'94%',float:'left',fontSize:'110%',fontWeight:'400',padding:'3%'}}>A:不是的呢，没有是因为我们写不完了</div>
                    </div>
                    <div style={{backgroundColor:'#fff',width:'94%',marginLeft:'3%',marginRight:'3%',marginBottom:'3%',float:'left'}}>
                        <div style={{width:'94%',float:'left',fontSize:'120%',fontWeight:'600',padding:'3%'}}>Q:可以加好友聊天吗？</div>
                        <div style={{width:'94%',float:'left',fontSize:'110%',fontWeight:'400',padding:'3%'}}>A:不可以哦，我们不是一个聊天软件，不过您可以关注你喜欢的用户</div>
                    </div>
                </div>
                
            </div>
        )
    }
}
