import React, { Component } from 'react';
import {Link,Route} from 'react-router-dom'
import Detail from './Detail';

export default class Sucai extends Component {
    constructor(){
        super();
        this.state={
            tags:[]
        }
    }
    
    componentDidMount(){
        let url = this.props.match.url.split('/')[3];
        // console.log(url)
        fetch(`http://116.62.14.0:8402/material/mtab/${url}`)
        .then((res)=>res.json())
        .then((res)=>{
            // console.log(res.data);
            this.setState({
                tags: res.data
            })
        })
    }

    render() {
        let url = this.props.match.url;
        return (
            <div>
                <div style={{width:'150px',height:'28px',fontSize:'15px',margin:'15px 0 0 20px',lineHeight:'20px'}}>
                <a href='#/home/material' style={{color:'black'}}>
                    <img src='./images/return.png' alt='' style={{float:'left',width:'20px',height:'20px'}}/>
                    返回上一页
                </a>
                </div>
                <ul style={{width:'900px',height:'150px',margin:'10px 0 10px 60px'}}>
                {
                    this.state.tags.map((item,index)=>(
                        <li key={index} className='tags'>
                            <Link to={{pathname:`${url}/detail`,search:`?msid=${item.msid}`}}>
                                <button className='tag_btns'>{item.msname}</button>
                            </Link>
                            <Link to={{pathname:`/home/material/addmaterial`,search:`?msid=${item.msid}`}}>
                                <button className='add_btns'>点击添加</button>
                            </Link>
                        </li>    
                    ))
                }
                </ul>
                <div style={{padding:'0 30px'}}>
                    <Route path={`${url}/detail`} component={Detail}/>
                </div>
            </div>
        )
    }
}
