import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Topic extends Component {
    constructor(){
        super();
        this.state = {
            data: [
                {
                    photo:'topic.png',
                    topicIcon:'topic2.png',
                    topic:'#每日睡眠打卡#',
                    peopleIcon:'topic3.png',
                    people:'1000参与'
                },
                {
                    photo:'topic.png',
                    topicIcon:'topic2.png',
                    topic:'#每日睡眠打卡#',
                    peopleIcon:'topic3.png',
                    people:'1000参与'
                },
                {
                    photo:'topic.png',
                    topicIcon:'topic2.png',
                    topic:'#每日睡眠打卡#',
                    peopleIcon:'topic3.png',
                    people:'1000参与'
                },
                {
                    photo:'topic.png',
                    topicIcon:'topic2.png',
                    topic:'#每日睡眠打卡#',
                    peopleIcon:'topic3.png',
                    people:'1000参与'
                },
                {
                    photo:'topic.png',
                    topicIcon:'topic2.png',
                    topic:'#每日睡眠打卡#',
                    peopleIcon:'topic3.png',
                    people:'1000参与'
                },
        ]
        }
    }
    render() {
        return (
            
            <div>
                
                {
                    this.state.data.map((item)=>(
                        //<button onClick={()=>useHistory().push('/topic/Know')} >
                        <Link to='/know'>
                            <div style={{backgroundColor:'#fff',float:'left',marginBottom:'1%'}}>
                                <div style={{marginTop:'3%',marginLeft:'3%',marginBottom:'4%'}}>
                                    <div >
                                        <img src={'./images/share/'+item.photo} style={{width:'40%',height:'40%',float:"left",marginRight:'3%'}}/>
                                    </div>
                                    <div >
                                        <img src={'./images/share/'+item.topicIcon} style={{width:'9%',height:'10%',float:'left'}} /> <a style={{float:'left',marginTop:'2%',color:'#8fa0cb'}}>{item.topic}</a>
                                        <br/>
                                        <br/>
                                        <img src={'./images/share/'+item.peopleIcon} style={{width:'10%',height:'10%',float:'left'}} /><a style={{fontSize:'10%',float:'left',color:'#8fa0cb',marginTop:'2%'}}>{item.people}</a>
                                        <br/>
                                    </div>
                                </div>
                                
                                
                            </div>
                        </Link>
                        
                    ))
                }

                
            </div>
        )
    }
}
