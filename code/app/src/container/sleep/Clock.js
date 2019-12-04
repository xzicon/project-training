import React, { Component } from 'react'
import { NavBar, Icon ,DatePicker, List ,Picker,Button, Flex,WhiteSpace,Switch} from 'antd-mobile';
import { BrowserRouter as Router,Route,Link} from 'react-router-dom';

import './sleep.css'

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
if (minDate.getDate() !== maxDate.getDate()) {
  minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}

  const colors = [
    {
      label:
      (<div>
        <span>star</span>
      </div>),
      value:'star'
    },
    {
      label:
      (<div>
        <span>meet</span>
      </div>),
        value:'meet'
    },
  ]
export default class Clock extends Component{
  constructor(props) {
    super(props);
    this.state = {
      
        time1: now,
        time2: now,
        colorValue: '',
        checked: true,
        // disabled:true
    };
  }
    componentDidMount(){
        console.log(this.state.time);
        console.log(this.state.checked);
        console.log(this.state.colorValue)

    }
    componentDidUpdate(){
        console.log(this.state.time1);
        console.log(this.state.time2);
        console.log(this.state.checked);
        console.log(this.state.colorValue)
    }
    back=()=>{
        this.props.history.push('/');
    }
    onChangeColor = (color) => {
        this.setState({
          colorValue: color,
        });
    };
    baocun(){
      this.props.history.push('/');
      
    }
    
    render(){
      const naozhong= this.state.time1;
      var data = this.state.colorValue;
        return (
            <div style={{background:'url(images/sleep/background1.jpg) no-repeat',width:'100%',backgroundSize:'100% 100%',position: 'absolute',top: '0px',bottom: '0px'}}>
                <NavBar
                style={{backgroundColor:'rgba(255,255,255,0.5)',color:'#fff'}}
                mode="dark"
                icon={<Link to={{pathname:'/',query:'redTab' }}><Icon type="left" /></Link>}
                // onLeftClick={this.back}>
                >
                    闹钟
                </NavBar>
                <div style={{height:'30%'}}></div>
                <div style={{padding:'3%'}}>
                    <List.Item
                      extra={<Switch
                        checked={this.state.checked}
                        onChange={() => {
                          this.setState({
                            checked: !this.state.checked,
                          });
                        }}
                      />}
                    >闹钟</List.Item>
                     <WhiteSpace />

                    <DatePicker
                    mode="time"
                    value={this.state.time1}
                    onChange={time1 => this.setState({ time1 },()=>{
                        localStorage.setItem("wake",JSON.stringify({time1}));
                    })}
                    // disabled={this.state.disabled}
                    >
                        <List.Item arrow="horizontal">唤醒时间</List.Item>
                    </DatePicker>
                    <WhiteSpace />

                    <DatePicker
                    mode="time"
                    value={this.state.time2}
                    onChange={time2 => this.setState({ time2 },()=>{
                        localStorage.setItem("wake",JSON.stringify({time2}));
                    })}
                    // disabled={this.state.disabled}
                    >
                        <List.Item arrow="horizontal">入睡时间</List.Item>
                    </DatePicker>
                    <WhiteSpace />

                    <Picker
                    data={colors}
                    value={this.state.colorValue}
                    cols={1}
                    onChange={this.onChangeColor}
                    >
                        <List.Item arrow="horizontal">提示音</List.Item>
                    </Picker>
                    <WhiteSpace />
                    
                </div>
                <div>
                  {this.props.location.state}
                </div>
                <Button onClick={this.baocun.bind(this)} style={{width:'50%',margin:'0 auto',height:'30px',backgroundColor: 'rgba(255, 255, 255, 0.6)'}} icon={<img src="images/sleep/baocun.png" alt=""/>}>
                   保存
                </Button>
                
            </div>
        )
    }
}
