import React, { Component } from 'react'

export default class Detail extends Component {
    constructor(){
        super();
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        let search = this.props.location;
        // console.log(search);
        // fetch(`'http://116.62.14.0:8402/material/'${search}`)
        // .then(res=>res.text())
        // .then((res)=>{
        //     console.log(res.data)
        // })
    }
    componentDidUpdate(){
        
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
