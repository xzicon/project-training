import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
// import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import { Flex, Carousel } from '@ant-design/react-native';
import AsyncStorage from '@react-native-community/async-storage';
const search = require('../../assets/input_search.png');
const xinxin = require('../../assets/xinxin.png');
const { width } = Dimensions.get('window');
const s = width / 640;


const urlArr = ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588182898840&di=3dd7015c838685cd9778a50c9b2a31b5&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F5366d0160924ab1857f1cbae35fae6cd7a890b47.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588182898839&di=8b9c837eb517d344b55733173b961108&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg']

export default class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      data: [],
      keyWord: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('uid').then(res => {
      res === null ? this.setState({ uid: '' }) : this.setState({ uid: res });
      fetch('http://116.62.14.0:8402/teacher/choicelist')
        .then(res => res.json())
        .then(res => {
          console.log('res===>>', res);
          this.setState({ data: res.data });
          console.log(res.data);
        });
    });
  }
  ItemSeparatorComponent = () => {
    return <View style={{ height: 1, backgroundColor: '#ddd' }} />;
  };

  ListHeaderComponent = () => {
    return (
      <View>
        <View style={{flexDirection:'row',alignItems:'center',height:90*s,backgroundColor:'#fff',marginBottom:14*s, paddingLeft:30*s}}>
        <TouchableOpacity onPress={() => Actions.pop()}>
          <Icon size={36 * s} style={{ color: '#000' }} name='left' />
        </TouchableOpacity>
        <View>
          <Text style={{ fontSize: 26 * s, marginLeft: width*0.3 }}>教师列表</Text>
        </View>
        </View>
        <View style={{ backgroundColor: '#fff' }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              borderRadius: 6,
              backgroundColor: '#ddd',
              paddingVertical: 5,
              width: width - 60 * s,
              marginTop: 10 * s,
              marginLeft: 30 * s,
              marginBottom: 10 * s,
              marginRight: 30 * s
            }}>
            <Image
              source={search}
              style={{ marginLeft: 20, width: 25, height: 25 }}
            />
            <TextInput
              style={{
                paddingVertical: 5,
                marginLeft: 10,
                width: width - 120,
              }}
              clearButtonMode={'while-editing'}
              onChangeText={text => {
                this.setState({
                  keyWord: text,
                });
              }}
              value={this.state.keyWord}
              keyboardType={'default'}
              placeholder={'请输入关键字'}
            />
          </View>
        </View>

      </View>
    )
  }

  render() {
    const colorArr = ['#2c2', '#2c24', '#6ad', 'red'];
    return (
      <View style={{ flex: 1 }}>

        {/* <View
          style={{
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
            width: width,
            paddingBottom: 10,
            paddingTop: 50 * s,
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
          }}> */}

        <FlatList
          //   style={{flex: 1}}
          ListHeaderComponent={this.ListHeaderComponent}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.data}
          numColumns={1}
          renderItem={({ item }) => (
            //  onPress={() => {
            // Actions.teacherdetail({tid:item.tid,aid:this.props.aid, atitle: this.props.atitle, acontent: this.props.acontent}) }} style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: s, width: width, height: 100 * s, alignItems: 'center' }}
            <TouchableOpacity onPress={() => { Actions.teacherdetail({ tid: item.tid, aid: this.props.aid, atitle: this.props.atitle, acontent: this.props.acontent }) }}>
              <Flex
                align="center"
                justify="between"
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  backgroundColor: '#fff',
                }}>

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
                        &nbsp;&nbsp;{item.age}/{item.tyear}
                      </Text>
                    </Text>
                    <Text style={{ color: 'gray', marginTop: 10 }}>
                      {item.tschool ? item.tschool : '暂无介绍'}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginLeft: 200 * s,
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14 }}>教龄:</Text>
                    <Text style={{ fontSize: 12, marginLeft: 5, color: '#666' }}>
                      {item.texperience ? item.texperience : 0}年
                  </Text>
                  </View>
                  <Image
                    source={xinxin}
                    style={{ width: 30, height: 30, marginLeft: 15 }}
                  />
                </View>
              </Flex>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    //    flex:1,
    height: 100,
    width: width,
  },
});