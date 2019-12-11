import React, { Component } from 'react';
import { NavBar,Tabs,Icon} from 'antd-mobile';
import Character from './mkind/Character';

// const tabs = [
//     { title: '个性' },
//     { title: '自律' },
//     { title: '成长' },
//     { title: '匠心' },
//     { title: '自信' },
//     { title: '坚持' },
//     { title: '梦想' },
//     { title: '热爱' },
//     { title: '亲情' },
//     { title: '友谊' },
//   ];

export default class Material extends Component {
    constructor(props){
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.state={
            data:[]
        }
        
    }
    
    componentDidMount(){
        let page = this.props.location.search;
        console.log(page);
        fetch('http://116.62.14.0:8402/material/'+page)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    
    render() {
        return (
            <div>
                {
                            this.state.data.map(data=>(
                        <div>
                            {data.mtitle}
                        </div>
     
                            ))}
            </div>
        )
    }
}
