import React, { Component } from 'react'

export default class Smcomment extends Component {
    constructor(props){
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.state={
            data:[]
        }
    }
    
    componentDidMount(){
        let page = this.props.location.mtab2;
        console.log(page);
        fetch('http://116.62.14.0:8402/material/xiangqing/pinglun/'+page)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    render() {
        return (
            <div style={{backgroundColor:'blue',height:'300px'}}>
                {
                        this.state.data.map(data=>(
                            <div>
                                {data.mccontent}
                            </div>
                ))}
            </div>
        )
    }
}
