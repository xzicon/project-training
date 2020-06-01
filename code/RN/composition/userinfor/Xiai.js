import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, Dimensions, AsyncStorage, StyleSheet, ScrollView,ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import { Flex, Carousel } from '@ant-design/react-native';
const xinxin = require('../../assets/xinxin.png');
const xinxin0 = require('../../assets/xinxin0.png');
const { width, scale } = Dimensions.get('window');
const s = width / 640;
export default class Xiai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            uid: ''
        };
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
            .then((res) => {
                res === null ?
                    this.setState({ uid: '' })
                    :
                    this.setState({ uid: res })
        this.teacher_list()
        })
    }
    teacher_list = () => {
        fetch('http://116.62.14.0:8402/cteacher/ulist/' + this.state.uid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data });
                console.log(res.data);
            })
    }
    _like=(tid)=>{
        let data = {
            uid: this.state.uid,
            tid: tid
        }
        fetch('http://116.62.14.0:8402/cteacher/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((res) => {
                console.log(res)
                if (res.status == 0) {
                    // this.list();
                    ToastAndroid.show('喜爱成功', 100);
                } else if (res.status == 1) {
                    // this.list();
                    ToastAndroid.show('取消喜爱', 100);
                    this.teacher_list();
                } else {
                    console.log(res);
                }
            })
      }
    render() {
        return (
            <View style={{flex:1}}>
                
                <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center',justifyContent:'space-between' }}>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <Icon size={35 * s} style={{ color: '#000', marginLeft: 20 * s }} name='left' />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 26 * s,  }}>喜爱的老师</Text>
                    </View>
                    <TouchableOpacity>
                        <Icon size={35 * s} style={{ color: '#FFF', marginLeft: 20 * s }} name='left' />
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                    <FlatList
                    style={{ backgroundColor: '#F4F4F4' }}
                    data={this.state.data}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <Flex
              align="center"
              justify="between"
              style={{
                paddingHorizontal: 20,
                paddingVertical: 20,
                backgroundColor: '#fff',
              }}>
              <TouchableOpacity onPress={() => { Actions.teacherdetail({ tid: item.tid, state: item.state }) }}>

                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Image
                      source={{
                        uri: 'http://116.62.14.0:8402/images/' + item.timage,
                      }}
                      style={{
                        width: 70 * s,
                        height: 70 * s,
                        borderRadius: 35 * s,
                      }}
                    />
                  </View>
                  <View style={{ marginLeft: 30 * s }}>
                    <Text style={{ fontSize: 24 * s }}>
                      {item.tname}
                      <Text style={{ color: 'orange', fontSize: 18 * s }}>
                        &nbsp;&nbsp;{item.tage}年教龄/{item.tyear}
                      </Text>
                    </Text>
                    <Text style={{ color: 'gray', marginTop: 10 }}>
                      {item.tschool ? item.tschool : '暂无介绍'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginLeft: 160 * s,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {item.state == 0 ?
                    <Text style={{width: 60*s,height:30*s,backgroundColor:'#cdcdcd',textAlign:'center',lineHeight:30*s}}>休息</Text>
                  :
                    <Text style={{width: 60*s,height:30*s,backgroundColor:'green',textAlign:'center',lineHeight:30*s,color:'#fff'}}>在线</Text>
                  }
                </View>
                <TouchableOpacity onPress={()=>{this._like(item.tid)}}>
                 
                      <Image
                        source={xinxin0}
                        style={{ width: 30*s, height: 30*s, marginLeft: 20*s }}
                      />

                  

                </TouchableOpacity>
              </View>

            </Flex>
                    )}
                    />
                </View>
            </View>
        )
    }
}
