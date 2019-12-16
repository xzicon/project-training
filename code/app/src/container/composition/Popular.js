import React, { Component } from 'react'
import {NavLink,Link,Route} from 'react-router-dom';
export default class Popular extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    
    componentDidMount(){
        let page = this.props.location.mtab3;
        let search = this.props.location.search.split('=')[1];
        let id = this.props.location.search.split('=')[1] ? `tab/`+page:'tiaoguo';
        fetch('http://116.62.14.0:8402/usort/'+id)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.location.search !== this.props.location.search){
            let page = this.props.location.mtab3;
            let id = this.props.location.search.split('=')[1] ? `tab/`+page:'tiaoguo';
            fetch('http://116.62.14.0:8402/usort/'+id)
                .then((res)=>res.json())
                .then((res)=>{
                    this.setState({data:res.data});
                })
        }
    }
    render() {
        return (
            <div>
                {
                        this.state.data.map(data=>(
                            <div>
                                <Link to={{pathname:'/composition/label/sdetails/'+data.mid,mtab2:data.mid,state:this.props.location.state}}>{data.mtitle}</Link>
                            </div>
                ))}
            </div>
        )
    }
}
