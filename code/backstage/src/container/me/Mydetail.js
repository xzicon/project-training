import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import { Picker, List, InputItem } from 'antd-mobile';
import { TextareaItem } from 'antd-mobile';

const sexs = [
    {
      label:
      (<div>
        <span>男</span>
      </div>),
      value: '男',
    },
    {
      label:
      (<div>
        <span>女</span>
      </div>),
      value: '女',
    }
  ];

export default class Mydetail extends Component {
    constructor(){
        super();
        this.state={
            users:[
                {
                    title:'我今天一定要早睡',
                    sexValue:['女'],
                    age:'20岁'
                }
            ]
        }
    }
    onChangeSex = (sex) => {
        this.setState({
          sexValue: sex,
        });
    };
    render() {
        return (
            <div>
                <div>
                <NavBar style={{backgroundColor:'rgb(231, 231, 231)',color:'#000'}}>
                    <img src='/images/my/fanhui.jpg'/>
                    个人信息
                </NavBar>
                </div>
                <div style={{width:'100px',height:'100px',margin:'auto',marginTop:'10%',marginBottom:'10%'}}>
                    <img src='/images/my/head.jpg' style={{width:'100%',hieght:'100%'}}/>
                </div>
                <div>
                    <li style={{listStyle:'none',borderBottom:'1px solid gray'}}>
                        <List>
                        <InputItem
                            clear
                            placeholder="请在此输入昵称"
                        >昵称</InputItem>
                    </List>
                    </li>

                    <li style={{listStyle:'none',borderBottom:'1px solid gray'}}>
                        <Picker
                        data={sexs}
                        value={this.state.sexValue}
                            cols={1}
                            onChange={this.onChangeSex}
                        >
                        <List.Item arrow="horizontal">性别</List.Item>
                        </Picker>
                    </li>

                    <li style={{listStyle:'none'}}>
                        <List>
                        <TextareaItem
                        title="简介"
                        autoHeight
                        labelNumber={5}
                        />
                        <TextareaItem
                        rows={3}
                        placeholder="在这里填写个人简介哦！"
                        />
                        </List>
                    </li>
                </div>
            </div>
        )
    }
}
