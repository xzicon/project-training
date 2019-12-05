import React, { Component } from 'react'
import { NavBar,Tabs,TextareaItem} from 'antd-mobile';
// import { createForm } from 'rc-form';

export default class Add extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
    }
    handleClick(){
        this.props.history.push('/share');
    }
    handleClick2(){
        this.props.history.push('/share');
    }
    
    render() {
        
        return (
            <div>
                <div style={{marginBottom:'2px'}}>
                    <NavBar style={{backgroundColor:'#fff'}}  leftContent={[
                            <img src="./images/share/x.png" style={{width:'15%',height:'40%'}}  onClick={this.handleClick} />
                        ]}></NavBar>
                </div>
                
                <div style={{backgroundColor:'#fff',marginBottom:'3px',fontSize:'100%'}}>
                    <TextareaItem rows={10} maxLength='500' placeholder='分享一下吧~' style={{border:'none',fontSize:'90%',}} ></TextareaItem>
                    
                    <a style={{}}>x/500</a>
                    <br/>

                </div>

                <div style={{height:'30px',backgroundColor:'#fff'}}>
                    <button onClick={this.handleClick2} style={{width:'35%',height:'100%',float:'right',backgroundColor:'#8fa0cb',color:'#fff',borderRadius:'5%',outline:'none',border:'none'}} >发布</button>
                </div>
            </div>
        )
    }
}
