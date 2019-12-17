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
            console.log(this.state.data);
            if(res.data.length === 0){
                this.props.history.push({pathname:'/select',state:this.props.location.state});
                console.log(1);
            }else{
                this.props.history.push({pathname:'/composition/composition',state:this.props.location.state});
                console.log(2);
            }
        })
        console.log(this.state.data);
    }
    render() {
        console.log(this.state.data);
        return (
            <div></div>
        )
    }
}
