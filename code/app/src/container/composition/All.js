import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class All extends Component {
    constructor(){
        super();
        this.state={
            tabs:[
                { title: '个性' },
                { title: '自律' },
                { title: '成长' },
                { title: '匠心' },
                { title: '自信' },
                { title: '坚持' },
                { title: '梦想' },
                { title: '热爱' },
                { title: '亲情' },
                { title: '友谊' },
              ],
            tabs2:[
                { title: '高中' },
                { title: '初中' },
                { title: '小学' },
            ],
        }
    }
    render() {
        return (
            <div>
                <div style={{backgroundColor:'#fff',marginBottom:'2%'}}>
                    <a style={{borderLeft:'8px  solid red',fontSize:'150%',paddingLeft:'5%',}}> 素材</a>
                    <div style={{marginTop:'3%',marginLeft:'3%',marginRight:'3%'}}>
                        {
                            this.state.tabs.map((item,idx)=>(
                                
                                <Link to='./material'  ><button style={{width:'15%',borderRadius:'10%',outline:'none',border:'1px solid #000',backgroundColor:'#fff',fontSize:'120%',paddingTop:'1%',paddingBottom:'1%',marginRight:'5%',marginBottom:'3%'}}>{item.title}</button></Link>
                                
                                
                            ))
                        }
                    </div>
                </div>
                <div style={{backgroundColor:'#fff',marginBottom:'2%'}}>
                    <a style={{borderLeft:'8px  solid red',fontSize:'150%',paddingLeft:'5%',}}> 范文</a>
                    <div style={{marginTop:'3%',marginLeft:'3%',marginRight:'3%'}}>
                        {
                            this.state.tabs.map((item,idx)=>(
                                
                                <Link to='./essay'  ><button style={{width:'15%',borderRadius:'10%',outline:'none',border:'1px solid #000',backgroundColor:'#fff',fontSize:'120%',paddingTop:'1%',paddingBottom:'1%',marginRight:'5%',marginBottom:'3%'}}>{item.title}</button></Link>
                                
                                
                            ))
                        }
                    </div>
                </div>
                <div style={{backgroundColor:'#fff',marginBottom:'2%'}}>
                    <a style={{borderLeft:'8px  solid red',fontSize:'150%',paddingLeft:'5%',}}> 技法</a>
                    <div style={{marginTop:'3%',marginLeft:'3%',marginRight:'3%'}}>
                        {
                            this.state.tabs2.map((item,idx)=>(
                                
                                <Link to='./skill'  ><button style={{width:'15%',borderRadius:'10%',outline:'none',border:'1px solid #000',backgroundColor:'#fff',fontSize:'120%',paddingTop:'1%',paddingBottom:'1%',marginRight:'5%',marginBottom:'3%'}}>{item.title}</button></Link>
                                
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}
