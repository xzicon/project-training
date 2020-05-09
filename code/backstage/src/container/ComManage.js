import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class ComManage extends Component {
    constructor(){
        super();
        this.state={
            comments:[]
        }
    }
    render() {
        return (
            <div style={{width:'70%',height:'25%',marginTop:'15%',marginLeft:'15%'}}>
                <Link to='/home/sucaicomment'><div className='items' style={{marginRight:'15%'}}>素材评论</div></Link>
                <Link to='/home/zuowencomment'><div className='items'>作文评论</div></Link>
            </div>
        )
    }
}
