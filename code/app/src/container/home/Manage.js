import React, { Component } from 'react'
import {Icon,NavBar} from 'antd-mobile';
import {Link} from 'react-router-dom';
export default class Manage extends Component {
    render() {
        return (
            <div>
                <NavBar
                    icon={<Link to='/home'><Icon type="left" style={{color:'#000'}}/></Link>}
                    style={{backgroundColor:'#fff',color:'#000',position:'fixed',top:'0',width:'100%',zIndex:'999'}}
                    onLeftClick={() => console.log('onLeftClick')}
                >妙笔作文管理细则</NavBar>
                <div style={{top:'40px',position:'absolute',zIndex:'99',margin:'2% 2% auto',backgroundColor:'#fff',width:'96%'}}>
                    <br/>
                    <div style={{backgroundColor:'#da4036',textAlign:'center',width:'50%',color:'#fff',fontSize:'20px',marginLeft:'25%'}}>妙笔作文简介</div>
                    <div><br/>妙笔作文是一款提供作文素材，练习写作，提高初高中学生写作能力的APP。<br/><br/></div>
                    <br/>
                    <div style={{backgroundColor:'#da4036',textAlign:'center',width:'50%',color:'#fff',fontSize:'20px',marginLeft:'25%'}}>妙笔社区是什么</div>
                    <div><br/>妙笔社区是妙笔作文APP内各位小妙笔们能发表自己观点和作品的地方，目前主要包括素材下的练笔区，自由创作区和素材、文章的评论区。大家可以练习作文，发表看法从而提高自己的写作能力。<br/><br/></div>
                    <br/>
                    <div style={{backgroundColor:'#da4036',textAlign:'center',width:'50%',color:'#fff',fontSize:'20px',marginLeft:'25%'}}>妙笔社区基本原则</div>
                    <div><br/>
                        1.传播正能量，互帮互助，团结友爱，与大家共同成长。<br/>
                        2.认真对待每次练笔，始终保持学习的姿态，以提高作文水平为第一要务。<br/>
                        3.宽容、理性地看待不同的看法、喜好和意见。<br/>
                        4.坚持原创，书写自己的语言，尊重他人著作。<br/>
                        6.自觉遵守社区规则，相互监督，共同维护社区的良好氛围。
                    <br/><br/></div>
                    <br/>
                    <div style={{backgroundColor:'#da4036',textAlign:'center',width:'50%',color:'#fff',fontSize:'20px',marginLeft:'25%'}}>妙笔社区违规行为</div>
                    <div><br/>
                        1.发布违禁信息。<br/>
                        2.发布营销广告信息。<br/>
                        3.恶意冒充他人或官方发布内容误导他人。<br/>
                        4.发布无意义文章或评论。<br/>
                        6.发布过度负能量、违背公序良俗的内容。
                    <br/><br/></div>
                    <br/>
                    <div style={{backgroundColor:'#da4036',textAlign:'center',width:'50%',color:'#fff',fontSize:'20px',marginLeft:'25%'}}>写在最后</div>
                    <div><br/>
                        不要做那片觉得自己毫无责任的雪花，良好的社区氛围靠的是我们每一个小纸条共同努力；也不要做那个只会抱怨环境而自己却无动于衷甚至甘愿充当帮凶的人，一个要征服星辰大海的人不应该如此。<h5>小妙笔们，冲鸭！</h5>
                    <br/></div>
                </div>
            </div>
        )
    }
}
