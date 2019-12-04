import React, { Component } from 'react'

export default class Result extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.history.push('');
    }
    render() {
        const result = [
            {title:'你的情况属于压力大，情绪紧张。',proposal:'建议保持愉悦心情，配合瑜伽运动，保持情绪稳定，注意饮食清淡，多吃安神镇静作用的食物。'},
            {title:'你的情况属于入睡困难或单纯的睡眠障碍。',proposal:'建议适当运动锻炼，睡前放松心态，进行心理调理，进行食物调理或中药调理。'}
        ];
        return (
            <div style={{background:'url(images/home/result.png) center center / cover no-repeat',width:'100%',height:'100vh'}}>
                <div style={{width:'100%',textAlign:'center',fontSize:'26px'}}><br/><br/>测评结果</div>
            <div style={{fontSize:'20px',margin:'100px 2% auto',color:'#696969'}}><br/>{result[0].title}<br/><br/>{result[0].proposal}</div>
                <div style={{width:'100%',marginTop:'200px',marginBottom:'16px'}}><button onClick={this.handleClick} style={{backgroundColor:'none',backgroundColor:'rgba(255,255,240,0.2)',textAlign:'center',width:'50%',height:'50px',marginLeft:'25%',fontSize:'24px',borderRadius:'10px',color:'#000',border:'solid #F5F5F5 0.5px'}}>返回首页</button></div>
            </div>
        )
    }
}
