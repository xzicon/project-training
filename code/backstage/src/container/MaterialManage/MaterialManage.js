import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Search from '../../components/Search';

export default class MaterialManage extends Component {
    render() {
        return (
            <div style={{width:'100%',height:'60%',float:'left'}}>
                <Search/>
                <div style={{width:'100%',height:'41.5%',marginTop:'8.15%',marginLeft:'5%'}}>
                    <Link to='/home/material/sucai'><div className='items' style={{width:'14%',marginLeft:'5%'}}>句段素材</div></Link>
                    <Link to='/home/material/renwu'><div className='items'  style={{width:'14%',marginLeft:'5%'}}>人物素材</div></Link>
                    <Link to='/home/material/shishi'><div className='items'  style={{width:'14%',marginLeft:'5%'}}>时事素材</div></Link>
                    <Link to='/home/material/mingzhuyingshi'><div className='items'  style={{width:'14%',marginLeft:'5%'}}>名著影视</div></Link>
                    {/* <Link to='/home/material/zhenti'><div className='items'>真题解析</div></Link> */}
                    {/* <Link to='/home/material/jifa'><div className='items'>写作技法</div></Link> */}
                </div>
            </div>
        )
    }
}
