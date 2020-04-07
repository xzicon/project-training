import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export default class Source extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
        
    } 
    componentDidMount(){
        let state = this.props.location.state;
        console.log(state);
        fetch('http://116.62.14.0:8402/material/mtab/sucai')
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    render() {
        let arr=this.props.location.pathname.split('/');
        return (
            <div style={{backgroundColor:'#fff',paddingBottom:'5%'}}>
                {
                    this.state.data.map(data=>(
                        <button style={{border:'1px solid #000',borderRadius:'18%',outline:'none',marginLeft:'10%',marginTop:'5%',backgroundColor:'#fff',width:'80px',height:'35px'}}>
                        <Link to={{pathname:'/'+arr[1]+'/composition/material/'+data.msid,mtab1:data.msid,state:this.props.location.state,msname:data.msname}}  style={{color:'#000',fontSize:'115%'}}>{data.msname}</Link>
                        </button>
                    ))}
            </div>
        )
    }
}
