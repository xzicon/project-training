import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class Leader extends Component {
    constructor(){
        super();
        this.state={
            className:1
        }
    }
    handleClick = (e)=>{
        this.setState({
            className:e.target.getAttribute('index')
        })
    }
    // componentDidMount(){
    //     let newClassName = this.state.className;
    //         // console.log(newClassName);
    //         this.setState({
    //             className:newClassName
    //     })
    // }
    // componentDidUpdate(prevProps,prevState){
    //     if(prevState.className !== this.state.className){
    //         let newClassName = this.state.className;
    //         // console.log(newClassName);
    //         this.setState({
    //             className:newClassName
    //         })
    //     }
    // }
    render() {
        return (
            <div className='leaderwrap'>
                <Link to='/home'>
                    <button className={this.state.className==1?'leader_btns':'noset'} onClick={this.handleClick} index={1}>首页</button>
                </Link>
                <Link to='/home/users'>
                    <button className={this.state.className==2?'leader_btns':'noset'} onClick={this.handleClick} index={2}>用户管理</button>
                </Link>
                <Link to='/home/material'>
                    <button className={this.state.className==3?'leader_btns':'noset'} onClick={this.handleClick} index={3}>素材管理</button>
                </Link>
                <Link to='/home/works'>
                    <button className={this.state.className==4?'leader_btns':'noset'} onClick={this.handleClick} index={4}>作文管理</button>
                </Link>
                <Link to='/home/comment'>
                    <button className={this.state.className==5?'leader_btns':'noset'} onClick={this.handleClick} index={5}>评论管理</button>
                </Link>
                <Link to='/home/feedback'>
                    <button className={this.state.className==6?'leader_btns':'noset'} onClick={this.handleClick} index={6}>反馈管理</button>
                </Link>
                <Link to='/home/system'>
                    <button className={this.state.className==7?'leader_btns':'noset'} onClick={this.handleClick} index={7}>系统管理</button>
                </Link>
            </div>
        )
    }
}
