import React from 'react';
import { TabBar } from 'antd-mobile';

export default class Apptab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab'
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
              background: 'url(images/home1.png) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(images/home.png) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
          >
           首页
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(images/moon1.png) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(images/moon.png) center center /  21px 21px no-repeat' }}
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
            Sleep
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(images/share1.png) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(images/share.png) center center /  21px 21px no-repeat' }}
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
              分享
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: 'images/me1.png' }}
            selectedIcon={{ uri: 'images/me.png' }}
            title="我的"
            key="My"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
              我的
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
