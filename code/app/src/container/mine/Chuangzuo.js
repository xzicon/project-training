import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar,Icon,Tabs,WhiteSpace } from 'antd-mobile';

const tabs= [
    { title: '练笔 '},
    { title: '评论' },
    // { title: 'Third Tab' },
  ];
  
export default class Chuangzuo extends Component {

    render() {
        return (
            <div>
                <div>
                    <NavBar icon={<Link to='/mine'><Icon  type="left" /></Link>} style={{backgroundColor:'rgb(231, 231, 231)',color:'black'}} onLeftClick={() => console.log('onLeftClick')}>
                        我创作的
                    </NavBar>
                </div>
                <div>
                    <WhiteSpace />
                    <Tabs tabs={tabs} initialPage={2} animated={false} useOnPan={false}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px',width:'100%', backgroundColor: '#f4f4f4' }}>
                            <img src='images/apptab/Screenshot_2019_1212_083129.png' style={{width:"100%",height:'300px'}}/>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px',width:'100%', backgroundColor: '#f4f4f4' }}>
                        <img src='images/apptab/Screenshot_2019_1212_083129.png' style={{width:"100%",height:'300px'}}/>

                        </div>
                    </Tabs>
                    <WhiteSpace />
                </div>
            </div>
        )
    }
}
