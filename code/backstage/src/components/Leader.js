import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class Leader extends Component {
    render() {
        return (
            <div className='leaderwrap'>
                <Link to='/home/'><button>系统管理</button></Link>
                <Link to='/home/users'><button>用户管理</button></Link>
                <Link to='/home/material'><button>素材管理</button></Link>
                <Link to='/home/works'><button>作文管理</button></Link>
                <Link to='/home/recommend'><button>推荐位管理</button></Link>
                <Link to='/home/comment'><button>评论管理</button></Link>
            </div>
        )
    }
}
