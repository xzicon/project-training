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
            <div style={{backgroundColor:'#fff',paddingBottom:'3%'}}>
                {
                    this.state.data.map(data=>(
                        <button style={{border:'1px solid #000',borderRadius:'18%',outline:'none',marginLeft:'10%',marginTop:'3%',backgroundColor:'#fff',width:'80px',height:'35px'}}>
                            <Link to={{pathname:'/composition/material/'+data.msid,mtab1:data.msid,state:this.props.location.state,msname:data.msname}} style={{color:'#000',fontSize:'115%'}}>{data.msname}</Link>
                        </button>
                ))}
            </div>
        )
    }
}