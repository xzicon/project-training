import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export default class Technique extends Component {
    constructor(props){
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.state={
            data:[]
        }
        
    } 
    componentDidMount(){
        fetch('http://116.62.14.0:8402/material/mtab/jifa')
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    render() {
        return (
            <div>
                <div>
                    {
                        this.state.data.map(data=>(
                            <div>
                            <Link to={{pathname:'/composition/material/'+data.msid,mtab1:data.msid,state:this.props.location.state}}>{data.msname}</Link>
                            </div>
                    ))}
                </div>
            </div>
        )
    }
}