import React, { Component } from 'react';
import { NavBar,Tabs,Icon} from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class Figure extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.history.push('/composition');
    }
    render() {
        return (
            <div>
                {/* <div style={{}}>
                    <img />
                </div> */}
                <NavBar mode="light" icon={<Icon type="left" style={{color:'#000'}} />} onLeftClick={() => this.handleClick()}></NavBar>
            </div>
        )
    }
}
