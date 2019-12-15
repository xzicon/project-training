import React, { Component } from 'react'

export default class Xselect extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
        
    } 
    componentDidMount(){
        let state = this.props.location.state;
        console.log(state);
        fetch('http://116.62.14.0:8402/usort/msid/'+state)
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
               this.state.data?
                <div>{this.props.history.push({pathname:'/composition/composition/'+this.props.location.state,state:this.props.location.state})}</div>:
                <div>{this.props.history.push({pathname:'/select',state:this.props.location.state})}</div>
                }
            </div>
        )
    }
}
