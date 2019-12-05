import React, { Component } from 'react'
import { NavBar, Icon ,List, Switch,Button, Picker,WhiteSpace} from 'antd-mobile';
import './sleep.css';
export default class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          checked: true,
          colorValue: ['5min'],
        };
      }
      componentDidMount(){
        
        console.log(this.state.checked);
        console.log(this.state.checked1);

        console.log(this.state.colorValue)

    }
    componentDidUpdate(){
      console.log(this.state.checked);
      console.log(this.state.checked1);

      console.log(this.state.colorValue)
    }
      onChangeColor = (color) => {
        this.setState({
          colorValue: color,
        });
      };
    back=()=>{
        this.props.history.push('/sleep');
    }
    baocun=()=>{
      this.props.history.push('/sleep');
      
    }
    render() {
        const colors = [
            {
              label:
              (<div>
                <span
                  style={{  backgroundColor: '#FF0000' }}
                />
                <span>5min</span>
              </div>),
              value: '5min',
            },
            {
              label:
              (<div>
                <span
                  style={{  backgroundColor: '#00FF00' }}
                />
                <span>20min</span>
              </div>),
              value: '20min',
            },
            {
              label:
              (<div>
                <span
                  style={{  backgroundColor: '#0000FF' }}
                />
                <span>30min</span>
              </div>),
              value: '30min',
            },
          ];
        
        return (
            <div style={{background:'url(images/sleep/background2.jpg) no-repeat',width:'100%',backgroundSize:'100% 100%',position: 'absolute',top: '0px',bottom: '0px'}}>
                <NavBar
                style={{backgroundColor:'rgba(255,255,255,0.3)',color:'#fff'}}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={this.back}>
                    设置
                </NavBar>
                <List
                renderHeader={() => '设置'}
                >
                    
                    <List.Item
                      extra={<Switch
                        checked={this.state.checked}
                        onChange={() => {
                          this.setState({
                            checked: !this.state.checked,
                          });
                        }}
                      />}
                    >助眠音乐</List.Item>
                     <WhiteSpace />
                    <Picker
                    data={colors}
                    value={this.state.colorValue}
                    cols={1}
                    onChange={this.onChangeColor}
                    >
                    <List.Item arrow="horizontal">助眠音乐自动停止播放</List.Item>
                    </Picker>
                </List>
                <WhiteSpace />
                {/* <List>
                    <Button>恢复默认设置</Button>
                </List> */}
                <Button onClick={this.baocun} style={{width:'50%',margin:'0 auto',height:'30px',backgroundColor: 'rgba(255, 255, 255, 0.6)'}} icon={<img src="images/sleep/baocun.png" alt=""/>}>
                   保存
                </Button>
            </div>
        )
    }
}
