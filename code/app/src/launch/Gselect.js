import React, { Component } from 'react';
import {Checkbox,List,Toast} from 'antd-mobile';
import {Link} from 'react-router-dom';
export default class Gselect extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            data:[],
            value:[]
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
    fetchBiaoqian = (e)=>{
        let data = {
            uid:this.props.location.state,
            msid1:this.state.value[0],
            msid2:this.state.value[1],
            msid3:this.state.value[2],
            msid4:this.state.value[3],
            msid5:this.state.value[4]
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/usort/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            switch (data.status) {
                case "0":{
                    console.log(data.data);
                    Toast.success('修改成功', 1);
                    this.props.history.push({pathname:'/composition/composition/'+this.props.location.state,state:this.props.location.state});
                    break;
                }
                default:{
                    //错误，服务器
                    console.log(data.data);
                    break;
                }
            }
        })
    }
    handleChange(event) {
        let item = event.target.value;
        let items = this.state.value.slice();
        let index = items.indexOf(item);
        index === -1 ? items.push(item) : items.splice(index, 1);
        this.setState({value: items});
    }
    render() {  
        return (
            <div>
                <button className='biaoqian' type='text' onClick={(e)=>{this.fetchBiaoqian(e)}}>保存</button>
                <Link to={{pathname:'/composition/composition/'+this.props.location.state,state:this.props.location.state}}><button className='biaoqian2' type='text'>取消</button></Link>
                {this.state.data.map(data => (
                    <label><input type="checkbox" name="biaoqian" value={data.msid} onChange={this.handleChange}/>{data.msname}</label>
                ))}
            </div>
        )
    }
}