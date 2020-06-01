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
  ToastAndroid,
  Modal
} from 'react-native';
// import Icon from 'react-native-vector-icons/AntDesign';
import { Scene, Actions, Tabs } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign'
import { Flex, Carousel } from '@ant-design/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Banner from './Banner'
const search = require('../../assets/input_search.png');
const xinxin = require('../../assets/xinxin.png');
const xinxin0 = require('../../assets/xinxin0.png');
const { width } = Dimensions.get('window');
const s = width / 640;


const urlArr = ['http://116.62.14.0:8402/images/lunbo1.png', 'http://116.62.14.0:8402/images/lunbo2.png', 'http://116.62.14.0:8402/images/lunbo3.png']

export default class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      data: [],
      keyWord: '',
      refreshing: false,
      searchlist: [],
      com: false,
      clear: false,
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('uid').then(res => {
      res === null ? this.setState({ uid: '' }) : this.setState({ uid: res, refreshing: true, }, () => { this.list() });

    });
  }
  list = () => {
    this.setState({
      refreshing: true,
    }, () => {
      fetch('http://116.62.14.0:8402/cteacher/list/' + this.state.uid)
        .then(res => res.json())
        .then(res => {
          console.log('res===>>', res);
          this.setState({ data: res.data, refreshing: false });
          console.log(res.data);
        });
    })

  }
  _like = (tid) => {
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
          this.list();
          ToastAndroid.show('喜爱成功', 100);
        } else if (res.status == 1) {
          this.list();
          ToastAndroid.show('取消喜爱', 100);
        } else {
          console.log(res);
        }
      })
  }
  ItemSeparatorComponent = () => {
    return <View style={{ height: 1, backgroundColor: '#ddd' }} />;
  };


  _search = (key) => {
    let data = {
      search: key
    }
    if (search !== '') {
      this.setState({
        clear: true
      })
      fetch('http://116.62.14.0:8402/search/teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
        .then((res) => {
          console.log(res.data);
          this.setState({
            data: res.data,
            com: true
          })
        })
    } else {
      this.setState({
        clear: false
      }, () => { this.list() })
    }
  }
  _clear = () => {
    this.setState({
      clear: false,
      keyWord: ''
    }, () => { this.list() })
  }
  _comment_false = () => {
    this.setState({
      com: false
    })
  }
  change = (text) => {
    this.setState({
      keyWord: text,

    } );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Modal
            style={styles.container}
            animationType='silde'
            onRequestClose={this._comment_false}//安卓必须设置
            transparent={true}
            visible={this.state.com}
            autoFocus={true}
        >
          <TouchableOpacity style={styles.cover}
              onPress={this._comment_false}>
          </TouchableOpacity>
          <View style={{ backgroundColor: 'rgba(0, 0, 0, 0)', position: 'absolute', top: 84*s, right: 0, left: 40, flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{flex:1,flexDirection:'row',width:width-50,marginRight:10,backgroundColor:'#FFF',height:250*s}}>
            <FlatList
            data={this.state.searchlist}
            numColumns={1}
            renderItem={({item}) => (
              <Text style={{height:70*s}} onPress={() => {this.setState({com:false},()=>Actions.teacherdetail({tid:item.tid}) )}}>
                <Image
                style={{width:40*s,height:40*s,borderRadius: 25 * s,}}
                source={{
                  uri: 'http://116.62.14.0:8402/images/' + item.timage,
                }}
                
                />
                <Text>{item.tname}</Text>
              </Text>
            )}
            />
           
            </View>
          </View>
          </Modal> */}
        {/* <View>
          <Banner dataSource={urlArr} />
          <View style={{height:70*s}}></View>
          <View
            style={{
              // position: 'absolute',
              alignItems: 'center',
              flexDirection: 'row',
              height: 65 * s,
              top: 14 * s,
              paddingVertical: 5,
              width: width - 30,
              left: 15,
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: 35 * s
            }}>
            <Image
              source={search}
              style={{ marginLeft: 20, width: 25, height: 25 }}
            />
            <TextInput
              returnKeyType="search"//设置键盘样式
              style={{
                paddingVertical: 5,
                marginLeft: 10,
                width: width - 100,
              }}
              clearButtonMode={'while-editing'}
              onChangeText={(text) => { this.change(text) }}
              value={this.state.keyWord}
              keyboardType={'default'}
              placeholder={'请输入教师名称'}
              placeholderTextColor='#8F8F8F'
              onSubmitEditing={() => { this._search(this.state.keyWord) }}
            />
            {
              this.state.clear ?
                <TouchableOpacity onPress={this._clear} style={{ position: 'absolute', left: width - 80 }}>
                  <Icon name='close' size={35 * s} color='#666666' />
                </TouchableOpacity>
                :
                <Text></Text>
            }
          </View>
        </View> */}
        <View style={{  backgroundColor:'#2dbdf9',height:150*s,flexDirection:'row'}}>
            <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              height: 65 * s,
              top: 14 * s,
              paddingVertical: 5,
              width: width - 30,
              left: 15,
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: 35 * s
            }}>
              <Image
                source={search}
                style={{ marginLeft: 20, width: 25, height: 25 }}
              />
              <TextInput
              returnKeyType="search"//设置键盘样式
              style={{
                paddingVertical: 5,
                marginLeft: 10,
                width: width - 100,
              }}
              clearButtonMode={'while-editing'}
              onChangeText={(text) => { this.change(text) }}
              value={this.state.keyWord}
              keyboardType={'default'}
              placeholder={'请输入教师名称'}
              placeholderTextColor='#8F8F8F'
              onSubmitEditing={() => { this._search(this.state.keyWord) }}
            />
            </View>
            
            
        </View>
        <View style={{ position: 'absolute',top: 100*s,alignItems:'center',justifyContent:'center',flexDirection:'row',width:'100%'}}>
            <TouchableOpacity onPress={()=>{Actions.yelp({tid:''}) }} style={{width:'95%'}}>
              <Image style={{height:100,width:'100%'}} source={require('../../assets/composition/mine/shangchuan.png')}/>
            </TouchableOpacity>
        </View>
        <View style={{height:100*s}}>

        </View>
        <View style={{flexDirection:'row',height:70*s,alignItems:'center',justifyContent:'center',backgroundColor:'#F0F0F0'}}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <Text>名师推荐</Text>
            <Image style={{width:30*s,height:30*s}} source={require('../../assets/composition/mine/tuijian.png')}/>
          </View>
        </View>
        {
          this.state.data=='没有查询到'?
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:90*s}}>
              <Text>
                还没有该老师
              </Text>
          </View>:
        <FlatList
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.data}
          numColumns={1}
          onRefresh={() => {
            this.list()
          }}
          refreshing={this.state.refreshing}

          renderItem={({ item }) => (
            // 
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
                <TouchableOpacity onPress={() => { this._like(item.tid) }}>
                  {
                    item.look == null ?
                      <Image
                        source={xinxin}
                        style={{ width: 30*s, height: 30*s, marginLeft: 20*s }}
                      />
                      :
                      <Image
                        source={xinxin0}
                        style={{ width: 30*s, height: 30*s, marginLeft: 20*s }}
                      />

                  }

                </TouchableOpacity>
              </View>

            </Flex>
            // </TouchableOpacity>
          )}
        />}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cover: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  wrapper: {
    //    flex:1,
    height: 100,
    width: width,
  },
})
