// import React, { Component } from 'react';
// import {
//     StyleSheet,
//     Text,
//     View,
//     TouchableOpacity,
//     Platform,
//     Image,
//     Animated,
//     Easing,
//     TouchableNativeFeedback
// } from 'react-native';
import React,{Component} from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Drawer, List, WhiteSpace } from '@ant-design/react-native';


export default class Lesson extends Component {
    constructor(props) {
        super(props);
        // 初始状态
        // this.state = {
        //     fadeInOpacity: new Animated.Value(0),
            
        // };
        // this._onPress = this._onPress.bind(this);
        this.onOpenChange = isOpen => {
            /* tslint:disable: no-console */
            console.log('是否打开了 Drawer', isOpen.toString());
          };
    }

    // _onPress() {
    //     Animated.timing(this.state.fadeInOpacity, {
    //         toValue: 150,
    //         duration: 500,
    //         easing: Easing.linear,// 线性的渐变函数
    //     }).start();
    // }

    // render() {
    //     return (
    //         <View style={styles.container}>
    //             <Animated.View // 可选的基本组件类型: Image,Text,ScrollView,View(可以包裹任意子View) 
    //                 style={[styles.content, {opacity: 1,},{height:this.state.fadeInOpacity}]}>
    //                 <Text style={[{textAlign: 'center'}]}>Hello World!</Text>
    //             </Animated.View>
    //             <TouchableOpacity style={styles.content} onPress={this._onPress}>
    //                 <View style={styles.button}>
    //                     <Text style={styles.buttonText}>Press me!</Text>
    //                 </View>
    //             </TouchableOpacity>
    //             <TouchableNativeFeedback
    //                 // onPress={this._onPressButton}
    //                 background={TouchableNativeFeedback.SelectableBackground()}>
    //             <View style={{width: 150, height: 100}}>
    //                 <Text style={{margin: 30}}>Button</Text>
    //             </View>
    //             </TouchableNativeFeedback>
    //         </View>
    //     );
    // }
    render() {
    const itemArr = Array.apply(null, Array(20))
      .map(function(_, i) {
        return i;
      })
      .map((_i, index) => {
        if (index === 0) {
          return (
            <List.Item
              key={index}
              multipleLine
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text>Categories - {index}</Text>
                <Button
                  type="primary"
                  size="small"
                  onPress={() => this.drawer.closeDrawer()}
                >
                  close drawer
                </Button>
              </View>
            </List.Item>
          );
        }
        return (
          <List.Item
            key={index}
            thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
          >
            <Text>Categories - {index}</Text>
          </List.Item>
        );
      });
    // Todo: https://github.com/DefinitelyTyped/DefinitelyTyped
    const sidebar = (
      <ScrollView style={[styles.container]}>
        <List>{itemArr}</List>
      </ScrollView>
    );
    return (
      <Drawer
        sidebar={sidebar}
        position="left"
        open={false}
        drawerRef={el => (this.drawer = el)}
        onOpenChange={this.onOpenChange}
        drawerBackgroundColor="#ccc"
      >
        <View style={{ flex: 1, marginTop: 114, padding: 8 }}>
          <Button onPress={() => this.drawer && this.drawer.openDrawer()}>
            Open drawer
          </Button>
          <WhiteSpace />
        </View>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    // container: {
    //     marginTop:25,
    //     flex: 1,
    // },
    content: {
        backgroundColor: 'rgba(200, 230, 255, 0.8)',
        marginBottom:10,
        justifyContent:"center",
        alignSelf:"center",
    },
    button: Platform.select({
        ios: {},
        android: {
            elevation: 4,
            // Material design blue from https://material.google.com/style/color.html#color-color-palette
            backgroundColor: '#2196F3',
            borderRadius: 2,
            width:100,
            height:30,
        },
        justifyContent:"center",
        alignSelf:"center",
    }),
    buttonText: {
        alignSelf:"center",
    }
});
