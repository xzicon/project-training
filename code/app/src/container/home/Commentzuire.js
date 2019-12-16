import React, { Component } from 'react'

export default class Commentzuire extends Component {
    constructor(props){
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.state={
            data:[]
        }
    }
    
    componentDidMount(){
        let page = this.props.location.state1;
        console.log(page);
        fetch('http://116.62.14.0:8402/article/zuixin/'+page)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    componentDidUpdate(){
        let page = this.props.location.state1;
        console.log(page);
        fetch('http://116.62.14.0:8402/article/zuixin/'+page)
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
                    this.state.data.map((data)=>(
                        <div>
                            {data.accontent}
                        </div>
                    ))
                }
            </div>
        )
    }
}
