import React from 'react';
import { TabBar } from 'antd-mobile';
import Home from "./home/Home";
import Sleep from "./sleep/Sleep";
import Share from './share/Share';
import Me from './me/Me';
export default class Apptab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab'
    };
  }
  render() {
    return (
      <div style={{ 
        position: 'fixed', 
        height: '100%', 
        width: '100%', 
        top: 0 
      }}>
        <TabBar
          unselectedTintColor="#e6e6e6"//没选中的颜色
          tintColor="#09134A"
          barTintColor="white"
        >
          <TabBar.Item
            title="首页"
            key="Home"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(images/apptab/home1.png) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(images/apptab/home.png) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
          >
            <Home />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(images/apptab/moon1.png) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(images/apptab/moon.png) center center /  21px 21px no-repeat' }}
              />
            }
            title="Sleep"
            key="Sleep"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
          >
            <Sleep/>
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(images/apptab/share1.png) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(images/apptab/share.png) center center /  21px 21px no-repeat' }}
              />
            }
            title="分享"
            key="Share"
            dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
             <Share/>
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: 'images/apptab/me1.png' }}
            selectedIcon={{ uri: 'images/apptab/me.png' }}
            title="我的"
            key="My"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
              <Me/>
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
