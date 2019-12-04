import React, { Component } from 'react'
import { NavBar,Flex } from 'antd-mobile';
import {Link} from 'react-router-dom';
export default class Classes extends Component {
    state = {
        item: ['1'],
        imgHeight: 130
    }
    componentDidMount() {
        this.setState({
            item: ['1']
        })
    }
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.history.push('');
    }
    render() {
        const name = [
            {
                title:'饮食课程',
                img:'11',
                introduction:'睡眠不好该吃点什么？睡眠不好是可以通过全面调理而有所改进的。如果担心和害怕，会产生焦虑，反而使失眠加重。',
                classify : [
                    {title:'莴笋',img:'21'}
                ]
            },
            {
                title:'运动课程',
                img:'12',
                introduction:'进行适当的运动有增加血液循环，提高免疫力的作用，而最主要的是可以调节大脑皮质兴奋和抑制功能，从而为睡眠创造良好的心理基础。',
                classify : [
                    '瑜伽'
                ]
            },
            {
                title:'情绪课程',
                img:'13',
                introduction:'精神紧张是失眠的重要诱发因素之一，情绪以及心理状态的变化显著的影响着睡眠质量，要想改善睡眠，心境平和是关键。',
                classify : [
                    '睡前心情'
                ]
            },
            {
                title:'环境课程',
                img:'14',
                introduction:'环境因素可以说是影响睡眠的最大因素，人在什么样的环境下睡觉会直接影响到睡眠的品质，拥有一个宁静优雅、光线柔和、温度适宜的环境是相当重要的。',
                classify : [
                    '卧室环境'
                ]
            },
        ];
        console.log(this.props.location.state);
        return (
            <div>
                    <div style={{backgroundColor:'#F5F5F5',color:'#000'}}>
                        <NavBar
                            style={{backgroundColor:'#F5F5F5',color:'#000'}}
                            leftContent={[
                                <img src="images/home/fanhui.png" style={{marginRight: '16px'}}  onClick={this.handleClick} />
                            ]}
                            >{name[0].title}</NavBar>
                        <div style={{margin:'0 2% auto'}}>
                            <div style={{width:'34%',float:'left',marginRight:'6%'}}>
                                <img src={`images/home/${name[0].img}.png`} style={{width:'100%'}}/>
                            </div>
                            <div style={{width:'60%',float:'left',marginTop:'4%',fontSize:'15px'}}>
                                {name[0].introduction}
                            </div>
                        </div>
                        <div style={{margin:'2% 2% auto',width:'96%',float:'left'}}>
                            <Flex wrap="wrap">
                                {
                                    this.state.item.map(item => ( 
                                        <Link to="/classification">
                                        <div style={{width:'100%',position:'relative',marginBottom:'10px',color:'#000'}}>
                                            <img src={`images/home/${name[0].classify[`${item}`-1].img}.png`} style={{width:'100%',height:'140px'}}/>
                                            <div style={{width:'100%',position:'absolute',top:'40%',textAlign:'center',fontSize:'28px'}}>{name[0].classify[`${item}`-1].title}</div>
                                        </div>
                                        </Link>
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
