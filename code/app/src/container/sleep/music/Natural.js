import React, { Component } from 'react'
import {Flex} from 'antd-mobile';
export default class Natural extends Component {
    constructor(){
        super();
        this.state={
            data:[
                {
                    name:'star',
                    map3:'star.mp3',
                    pic:'star1.png'
                },
                {
                    name:'meet',
                    map3:'meet.mp3',
                    pic:'meet.png'
                }

            ],
        }
    }
    clickFun(text) {
        this.props.pfn(text)//这个地方把值传递给了props的事件当中
    }
    render() {
        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Flex>
                    {
                        this.state.data.map((item,idx)=>(
                            <div style={{width:'20%',margin:'2.5%'}}  onClick={this.clickFun.bind(this, this.state.data[idx].name)}>
                                <img src={`images/sleep/`+item.pic} style={{width:'100%'}}/>
                                <div style={{width:'100%',float:'left',textAlign:'center',fontSize:'5px'}}><span>{item.name}</span></div>
                            </div>
                        ))
                    }
                    </Flex>
                </div>
                <div style={{textAlign:'center'}}>~到底了~</div>
            </div>
        )
    }
}
