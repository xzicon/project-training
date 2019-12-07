import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
import Home from './home/Home';
import Composition from './composition/Composition';
import Mine from './mine/Mine';

export default class AppTab3 extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedTab: 'yellowTab'
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
            unselectedTintColor="#2c2c2c"
            tintColor="#da4036"
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
                  background: 'url(images/apptab/composition1.png) center center /  21px 21px no-repeat' }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(images/apptab/composition.png) center center /  21px 21px no-repeat' }}
                />
              }
              title="作文"
              key="Composition"
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab',
                });
              }}
            >
              <Composition/>
            </TabBar.Item>
            <TabBar.Item
              icon={{ uri: 'images/apptab/mine1.png' }}
              selectedIcon={{ uri: 'images/apptab/mine.png' }}
              title="我的"
              key="Mine"
              selected={this.state.selectedTab === 'yellowTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'yellowTab',
                });
              }}
            >
                <Mine/>
            </TabBar.Item>
          </TabBar>
        </div>
      );
    }
  }