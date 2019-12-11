import React from 'react';
import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <div>
            <header>
                <div style={{float:'left',lineHeight:'50px'}}>
                    <Link to={{pathname:'/mine/write'}}>练笔</Link>
                    <Link to={{pathname:'/mine/collect'}}>收藏</Link>
                    <Link to={{pathname:'/mine/praise'}}>点赞</Link>
                </div>
            </header>  
        </div>
    )
}
