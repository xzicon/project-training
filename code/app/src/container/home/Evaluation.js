import React, { Component } from 'react'
import {Checkbox, NavBar,Flex, List, Radio, WhiteSpace} from 'antd-mobile';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Result from './Result';
const CheckboxItem = Checkbox.CheckboxItem;
export default class Evaluation extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.history.push('');
    }
    state = {
        data: ['1', '2','3','4','5', '6'],
        item: ['1','2','3','4'],
        value: 0
    };
    onChange = (value) => {
        console.log('checkbox');
        this.setState({
            value,
        });
    };
    componentDidMount() {
        this.setState({
            item: ['1','2','3','4'],
            data: ['1','2','3','4','5', '6']
        })
    }
    render() {
        // const font = [
        //     {
        //         question:'躺在床上脑子里全是白天见过的人和发生的事，难以入眠',
        //         answer:[
        //             { value: 0, label: '经常' },
        //             { value: 1, label: '有时' },
        //             { value: 2, label: '很少' },
        //             { value: 3, label: '从未' },
        //         ]
        //     },
        //     {
        //         question:'入睡后稍有动静就能知道',
        //         answer:[
        //             { value: 0, label: '经常' },
        //             { value: 1, label: '有时' },
        //             { value: 2, label: '很少' },
        //             { value: 3, label: '从未' },
        //         ]
        //     },
        //     {
        //         question:'整夜做梦，醒来时觉得很累',
        //         answer:[
        //             { value: 0, label: '经常' },
        //             { value: 1, label: '有时' },
        //             { value: 2, label: '很少' },
        //             { value: 3, label: '从未' },
        //         ]
        //     },
        //     {
        //         question:'有点不顺心的事就彻夜难眠',
        //         answer:[
        //             { value: 0, label: '经常' },
        //             { value: 1, label: '有时' },
        //             { value: 2, label: '很少' },
        //             { value: 3, label: '从未' },
        //         ]
        //     },
        //     {
        //         question:'换个地方就难以入睡',
        //         answer:[
        //             { value: 0, label: '经常' },
        //             { value: 1, label: '有时' },
        //             { value: 2, label: '很少' },
        //             { value: 3, label: '从未' },
        //         ]
        //     },
        //     {
        //         question:'使用安眠药才能安然入睡',
        //         answer:[
        //             { value: 0, label: '经常' },
        //             { value: 1, label: '有时' },
        //             { value: 2, label: '很少' },
        //             { value: 3, label: '从未' },
        //         ]
        //     }
        // ];
        const font = [
            { value: 0, label: '脑子全是白天见过的人和事，难以入眠' },
            { value: 1, label: '入睡后稍有动静就能知道' },
            { value: 2, label: '整夜做梦，醒来时觉得很累' },
            { value: 3, label: '有点不顺心的事就彻夜难眠' },
            { value: 4, label: '换个地方就难以入睡' },
            { value: 5, label: '使用安眠药才能安然入睡' },
        ];
        return (
            <div style={{backgroundColor:'#F5F5F5',color:'#000'}}>
                <NavBar
                    style={{backgroundColor:'#F5F5F5',color:'#000'}}
                    leftContent={[
                        <img src="images/home/fanhui.png" style={{marginRight: '16px'}}  onClick={this.handleClick} />
                    ]}
                    >睡眠测评</NavBar>
                <div style={{width:'100%'}}><img src="images/home/ceping_01.png" style={{width:'100%'}} /></div>
                <div>
                {/* {this.state.data.map((val) => (
                    <List renderHeader={() => font[`${val}`-1].question}>
                        {this.state.item.map((i,idx) => (
                        <RadioItem key={idx} onChange={() => this.onChange(idx)}>
                            {font[val-1].answer[i-1].label}
                        </RadioItem>
                        ))}
                    </List>
                ))} */}
                    <List renderHeader={() => '请选出以下自己有过的情况'}>
                        {this.state.data.map(i => (
                            <CheckboxItem style={{fontSize:'14px'}} key={font[i-1].value} onChange={() => this.onChange(font[i-1].value)}>
                                {font[i-1].label}
                            </CheckboxItem>
                        ))}
                    </List>
                </div>
                <div style={{width:'100%',marginTop:'16px',marginBottom:'16px'}}>
                    {/* <Link to="/result" > */}
                    <Link to={{ pathname : '/result' , query : { name : 'sunny' }}}>
                        <button style={{backgroundColor:'#009bc7',textAlign:'center',width:'50%',height:'50px',marginLeft:'25%',fontSize:'24px',borderRadius:'10px',color:'#000',border:'solid #F5F5F5 0.5px'}}>提交测评</button>
                    </Link>
                </div>
            </div>
        )
    }
}
