import React, { Component } from 'react';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom'
import Detail from './Detail';

export default class Sucai extends Component {
    constructor(){
        super();
        this.state={
            tags:[]
        }
    }
    componentDidMount(){
        fetch('http://116.62.14.0:8402/material/?mtab=sucai')
        .then((res)=>res.json())
        .then((res)=>{
            // console.log(res.data);
            this.setState({
                tags: res.data
            })
        })
    }

    render() {
        let url = this.props.match.url;///即home/sucai
        return (
            <div>
                <ul style={{width:'800px',height:'100px',margin:'20px 50px'}}>
                    {
                        this.state.tags.map((item,index)=>(
                            <Link to={{pathname:'',search:`?mtab=sucai&msid=${item.msid}`}} key={index}>
                                <li style={{margin:'10px 20px',listStyle:'none',float:'left',color:'#000'}}>{item.msname}</li>
                            </Link>
                        ))
                    }
                </ul>
                <div>
                    <Router>
                        <div style={{padding:'50px'}}>
                            <Route path={`${url}`} component={Detail}/>
                        </div>
                    </Router>
                </div>
            </div>
        )
    }
}
