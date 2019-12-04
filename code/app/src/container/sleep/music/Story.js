import React, { Component } from 'react'
import { Accordion, List ,Flex} from 'antd-mobile';
import '../sleep.css'
export default class Story extends Component {
    constructor(){
        super();
        this.state={
            data:[
                {
                    pic:'star',
                    name:'河马的故事',
                    detail:[
                        {
                            pic:'star',
                            title:'第一天'
                        },
                        {
                            pic:'star',
                            title:'第二天'
                        },
                        {
                            pic:'star',
                            title:'第三天'
                        },
                    ]
                },
                {
                   
                    name:'故事',
                    detail:[
                        {
                            pic:'star',
                            title:'第一天'
                        },
                        {
                            pic:'star',
                            title:'第二天'
                        },
                        {
                            pic:'star',
                            title:'第三天'
                        },
                    ]
                },
                {
                   
                    name:'故事2',
                    detail:[
                        {
                            pic:'star',
                            title:'第一天'
                        },
                        {
                            pic:'star',
                            title:'第二天'
                        },
                        {
                            pic:'star',
                            title:'第三天'
                        },
                    ]
                }
            ]
            
        }
    }
    componentDidUpdate(){
        console.log(this.state.data)
    }
    onChange = (key) => {
        console.log(key);
    }
    clickFun(text) {
    this.props.pfn(text)//这个地方把值传递给了props的事件当中
    }
    render() {
        return (
            <div style={{}}>
               
                    {
                        this.state.data.map((item)=>(
                            <div style={{width:'95%',margin:'2.5%'}}>
                            <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange} >
                                <Accordion.Panel header={item.name}>
                                    <List className="my-list">{
                                        item.detail.map((item0,idx0)=>(
                                            <List.Item onClick={this.clickFun.bind(this, item0.title)}>
                                                <Flex>
                                                <img src={`images/sleep/${item0.pic}.png`}/>
                                                <div>{item0.title}</div>
                                                </Flex>
                                            </List.Item>
                                        ))
                                    }
                                  </List>
                                </Accordion.Panel>
                            </Accordion>
                            </div>
                           
                            
                        ))
                    }
            </div>
        )
    }
}
