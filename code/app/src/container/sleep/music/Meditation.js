import React, { Component } from 'react'
import {Flex} from 'antd-mobile';
export default class Meditation extends Component {
    constructor(){
        super();
        this.state={
            data:[
                {
                    name:'river',
                    map3:'river.mp3',
                    pic:'meditation.jpg',
                    key:'冥想助你入眠'
                },
                {
                    name:'haiou',
                    map3:'haiou.mp3',
                    pic:'meditation.jpg',
                    key:'冥想助你入眠'
                }

            ],
        }
    }
    clickFun(text) {
        this.props.pfn(text)//这个地方把值传递给了props的事件当中
    }
    render() {
        return (
            <div style={{width:'100%'}}>
                
                <div style={{width:'100%'}}>
                    {
                        this.state.data.map((item,idx)=>(
                            <Flex style={{width:'95%',height:'70px',margin:'2.5%',background: 'rgba(255,255,255, 0.6)' }}  onClick={this.clickFun.bind(this, item.name)}>
                                <img src={`images/sleep/`+item.pic} style={{width:'20%',padding:'2%'}}/>
                                <div style={{width:'100%',float:'left',textAlign:'center'}}>
                                    <span style={{fontWeight:'bold',fontSize:'25px'}}>{item.name}</span>
                                    <br/>
                                    <span>{item.key}</span>
                                </div>
                            </Flex>
                        ))
                    }
                   
                </div>
                <div style={{textAlign:'center'}}>~到底了~</div>
            </div>
        )
    }
}
