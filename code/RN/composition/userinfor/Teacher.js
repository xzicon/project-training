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
  TouchableNativeFeedback,
  AsyncStorage,
  Modal
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import { Flex, Carousel } from '@ant-design/react-native';
// import moment from 'momnet';
const search = require('../../assets/input_search.png');
const xinxin = require('../../assets/xinxin.png');
const { width } = Dimensions.get('window');
const s = width / 640;
const xinxin0 = require('../../assets/xinxin0.png');



export default class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      data: [],
      keyWord: '',
      text:'',
      uclass:'',
      select_tid:undefined,
      uclassplay:false,
      teacheryear:''
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('uid').then(res => {
      res === null ? this.setState({uid: ''}) : this.setState({uid: res,refreshing: true,},
        ()=>{
          this.list();
          fetch('http://116.62.14.0:8402/login/me/' + this.props.uid + '/' + this.props.uid)
          .then((res) => res.json())
          .then((res) => {
              this.setState({ uclass: res.data.uclass },()=>{
                this.state.uclass==null||this.state.uclass==''?
                this._uclass()
                :
                this._uclass_false()
              });
              console.log(res.data);
          })
        });
      
    });
  }
_uclass = () => {
  this.setState({ uclassplay: true },()=>{
    this.moren(this.state.uclass)
  })
}
moren=(uclass)=>{
  if (uclass === '高一') {
    this.setState({ uclass: '高一', color1: 'red', borderColor1: 'red', color2: '#000', borderColor2: '#000', color3: '#000', borderColor3: '#000', color4: '#000', borderColor4: '#000', color5: '#000', borderColor5: '#000', color6: '#000', borderColor6: '#000' }
    )
} else if (uclass === '高二') {
    this.setState({ uclass: '高二', color2: 'red', borderColor2: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color4: '#000', borderColor4: '#000', color5: '#000', borderColor5: '#000', color6: '#000', borderColor6: '#000' }
    )
} else if (uclass === '高三') {
    this.setState({ uclass: '高三', color3: 'red', borderColor3: 'red', color1: '#000', borderColor1: '#000', color2: '#000', borderColor2: '#000', color4: '#000', borderColor4: '#000', color5: '#000', borderColor5: '#000', color6: '#000', borderColor6: '#000' }
    )
} else if (uclass === '初一') {
    this.setState({ uclass: '初一', color4: 'red', borderColor4: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color2: '#000', borderColor2: '#000', color5: '#000', borderColor5: '#000', color6: '#000', borderColor6: '#000' }
    )
  } else if (uclass === '初二') {
    this.setState({ uclass: '初二', color5: 'red', borderColor5: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color4: '#000', borderColor4: '#000', color2: '#000', borderColor2: '#000', color6: '#000', borderColor6: '#000' }
    )
  } else if (uclass === '初三') {
    this.setState({ uclass: '初三', color6: 'red', borderColor6: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color4: '#000', borderColor4: '#000', color5: '#000', borderColor5: '#000', color2: '#000', borderColor2: '#000' }
    )
  }
}
_uclass_false = () => {
    this.setState({ uclassplay: false ,teacheryear:(this.state.uclass=='高一'||this.state.uclass=='高二'||this.state.uclass=='高三')?'高中老师':'初中老师'})
}
update_uclass=(uclass,uid)=>{
  let data = {
    uid: uid,
    uclass: uclass,
  }
  fetch('http://116.62.14.0:8402/login/uclass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        switch (data.status) {
          case "0": {
            console.log(data.data);
            this.setState({
              uclassplay: false,
            });
            break;
          }
          default: {
            console.log(data.data);
            break;
          }
        }
      })
    }
    _uclass_update = (uclass) => {

    if (uclass === '高一') {
        this.setState({ uclass: '高一', color1: 'red', borderColor1: 'red', color2: '#000', borderColor2: '#000', color3: '#000', borderColor3: '#000', color4: '#000', borderColor4: '#000', color5: '#000', borderColor5: '#000', color6: '#000', borderColor6: '#000' }
        ,()=>{
          this.update_uclass(this.state.uclass,this.state.uid);
        })
    } else if (uclass === '高二') {
        this.setState({ uclass: '高二', color2: 'red', borderColor2: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color4: '#000', borderColor4: '#000', color5: '#000', borderColor5: '#000', color6: '#000', borderColor6: '#000' }
        ,()=>{
          this.update_uclass(this.state.uclass,this.state.uid);
        })
    } else if (uclass === '高三') {
        this.setState({ uclass: '高三', color3: 'red', borderColor3: 'red', color1: '#000', borderColor1: '#000', color2: '#000', borderColor2: '#000', color4: '#000', borderColor4: '#000', color5: '#000', borderColor5: '#000', color6: '#000', borderColor6: '#000' }
        ,()=>{
          this.update_uclass(this.state.uclass,this.state.uid);
        })
    } else if (uclass === '初一') {
        this.setState({ uclass: '初一', color4: 'red', borderColor4: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color2: '#000', borderColor2: '#000', color5: '#000', borderColor5: '#000', color6: '#000', borderColor6: '#000' }
        ,()=>{
          this.update_uclass(this.state.uclass,this.state.uid);
        })
      } else if (uclass === '初二') {
        this.setState({ uclass: '初二', color5: 'red', borderColor5: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color4: '#000', borderColor4: '#000', color2: '#000', borderColor2: '#000', color6: '#000', borderColor6: '#000' }
        ,()=>{
          this.update_uclass(this.state.uclass,this.state.uid);
        })
      } else if (uclass === '初三') {
        this.setState({ uclass: '初三', color6: 'red', borderColor6: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color4: '#000', borderColor4: '#000', color5: '#000', borderColor5: '#000', color2: '#000', borderColor2: '#000' }
        ,()=>{
          this.update_uclass(this.state.uclass,this.state.uid);
        })
      }
}
  list=()=>{
    this.setState({
      refreshing: true,
    },()=>{
      fetch('http://116.62.14.0:8402/cteacher/list/'+this.state.uid)
        .then(res => res.json())
        .then(res => {
          console.log('res===>>', res);
          this.setState({data: res.data,refreshing: false});
          console.log(res.data);
        });
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
  _change=(text)=>{
    this.setState({
      text:text
    },()=>{
      this._search(text)
    })
  }
  _search=(key)=>{
    let data = {
      search:key
    }
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
              data:res.status==0?res.data:null,
            })
      })
  }

  ItemSeparatorComponent = () => {
    return <View style={{ height: 1, backgroundColor: '#ddd' }} />;
  };

  _renderEmptyComponent=()=>{
    return (
    <View>
      <Text>没有查询到</Text>
    </View>
    )
  }
  add = (isgrade) => {
    let data = {
      atitle: this.props.atitle,
      acontent: this.props.acontent,
      uid: this.props.uid,
    }
    console.log(this.state.select_tid);
    if(this.state.select_tid==''||this.state.select_tid==undefined){
      ToastAndroid.show('请选择老师',100);
    }else{
      this.grade(this.props.aid,this.state.select_tid,this.state.uclass,this.props.atitle,this.props.acontent,this.props.uid);
    }
             
                
           
  }
  grade=(aid,tid,gclass,atitle,acontent,uid)=>{
    var date = new Date();
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
    let data = {
        aid: aid,
        tid: tid,
        gclass: gclass,
        atitle: atitle,
        acontent: acontent,
        invitetime: Y + M + D + h + m,
        uid: uid
    }
    fetch('http://116.62.14.0:8402/grade/invite', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then((res) => {
            console.log(res.data)
            if (res.status == 0) {
                ToastAndroid.show('邀请点评成功', 100);
                Actions.pop(this.props.refresh());
                
            } else {
                ToastAndroid.show('邀请点评失败', 100)
            }

        })
  }
  _select=(select_tid,bol)=>{
    this.setState({
      select_tid:bol==true?select_tid:undefined
    })
  }
  switch=(teacheryear)=>{
    this.setState({
      teacheryear:teacheryear=='初中老师'?'高中老师':'初中老师'
    })
  }
  cont=(item)=>{
    return(
      this.state.teacheryear=='高中老师'?
            (
              (item.tyear=='高一'||item.tyear=='高二'||item.tyear=='高三')?
              item.state === 0 ? <View></View>:
              <Flex
            align="center"
            justify="between"
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity onPress={() => {Actions.teacherdetail({tid:item.tid}) }}>

            <View style={{flexDirection: 'row'}}>
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
              <View style={{marginLeft: 30 * s}}>
                <Text style={{fontSize: 24 * s}}>
                  {item.tname}
                  <Text style={{color: 'orange', fontSize: 18 * s}}>
                    &nbsp;&nbsp;教龄：{item.tage}年/{item.tyear}
                  </Text>
                </Text>
                <Text style={{color: 'gray', marginTop: 10}}>
                  {item.tschool ? item.tschool : '暂无介绍'}
                </Text>
              </View>
              
            </View>
            
            </TouchableOpacity>
            <View
              style={{
                marginLeft: 200 * s,
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              {
                this.state.select_tid==item.tid?
                <TouchableNativeFeedback
                  style={{ width: '100%' }}
                  background={TouchableNativeFeedback.SelectableBackground()}
                  onPress={() => { this._select(item.tid,false) }}
                >
                <Image style={{ width: 30 * s, height: 30 * s }} source={require('../../assets/composition/composition/checked.png')} />
                </TouchableNativeFeedback>

                :
                <TouchableNativeFeedback
                  style={{ width: '100%' }}
                  background={TouchableNativeFeedback.SelectableBackground()}
                  onPress={() => { this._select(item.tid,true) }}
                >
                <Image style={{ width: 30 * s, height: 30 * s }} source={require('../../assets/composition/composition/check.png')} />
                </TouchableNativeFeedback>

              }
              {/* <TouchableOpacity onPress={()=>{this._like(item.tid)}}>
                {
                  item.look==null?
                  <Image
                    source={xinxin}
                    style={{width: 30, height: 30, marginLeft: 15}}
                  />
                  :
                  <Image
                    source={xinxin0}
                    style={{width: 30, height: 30, marginLeft: 15}}
                  />

                }
                
              </TouchableOpacity> */}
            </View>

          </Flex>
              :
              <View></View>
            )
            :
            (
              (item.tyear=='初一'||item.tyear=='初二'||item.tyear=='初三')?
              item.state === 0 ? <View></View>:
              <Flex
            align="center"
            justify="between"
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity onPress={() => {Actions.teacherdetail({tid:item.tid}) }}>

            <View style={{flexDirection: 'row'}}>
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
              <View style={{marginLeft: 30 * s}}>
                <Text style={{fontSize: 24 * s}}>
                  {item.tname}
                  <Text style={{color: 'orange', fontSize: 18 * s}}>
                    &nbsp;&nbsp;教龄：{item.tage}年/{item.tyear}
                  </Text>
                </Text>
                <Text style={{color: 'gray', marginTop: 10}}>
                  {item.tschool ? item.tschool : '暂无介绍'}
                </Text>
              </View>
              
            </View>
            
            </TouchableOpacity>
            <View
              style={{
                marginLeft: 200 * s,
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              {
                this.state.select_tid==item.tid?
                <TouchableNativeFeedback
                  style={{ width: '100%' }}
                  background={TouchableNativeFeedback.SelectableBackground()}
                  onPress={() => { this._select(item.tid,false) }}
                >
                <Image style={{ width: 30 * s, height: 30 * s }} source={require('../../assets/composition/composition/checked.png')} />
                </TouchableNativeFeedback>

                :
                <TouchableNativeFeedback
                  style={{ width: '100%' }}
                  background={TouchableNativeFeedback.SelectableBackground()}
                  onPress={() => { this._select(item.tid,true) }}
                >
                <Image style={{ width: 30 * s, height: 30 * s }} source={require('../../assets/composition/composition/check.png')} />
                </TouchableNativeFeedback>

              }
              {/* <TouchableOpacity onPress={()=>{this._like(item.tid)}}>
                {
                  item.look==null?
                  <Image
                    source={xinxin}
                    style={{width: 30, height: 30, marginLeft: 15}}
                  />
                  :
                  <Image
                    source={xinxin0}
                    style={{width: 30, height: 30, marginLeft: 15}}
                  />

                }
                
              </TouchableOpacity> */}
            </View>

          </Flex>
              :
              <View></View>
            )
    
    )
  }
  render() {
    return (
      <View style={{ flex: 1 , backgroundColor:'#FFF'}}>
        <Modal
          animationType='silde'
          onRequestClose={this._uclass_false}//安卓必须设置
          transparent={true}
          visible={this.state.uclassplay}
          autoFocus={true}
        >
            <TouchableOpacity style={styles.cover}
                onPress={this._uclass_false}>
            </TouchableOpacity>
            <View style={{ width: width * 0.9, top: 100 * s, left: width * 0.05, backgroundColor: '#fff' }}>
                <View style={styles.header}>
                    <Text style={styles.fon}>请选择年级</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.cbox}>高中:</Text>
                    <View style={styles.zbox}>
                        <View><Text onPress={() => { this._uclass_update('高一') }} style={[styles.box, { borderColor: this.state.borderColor1, color: this.state.color1 }]}>高一</Text></View>
                        <View><Text onPress={() => { this._uclass_update('高二') }} style={[styles.box, { borderColor: this.state.borderColor2, color: this.state.color2 }]}>高二</Text></View>
                        <View><Text onPress={() => { this._uclass_update('高三') }} style={[styles.box, { borderColor: this.state.borderColor3, color: this.state.color3 }]}>高三</Text></View>
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={styles.cbox}>初中:</Text>
                    <View style={styles.zbox}>
                        <View><Text onPress={() => { this._uclass_update('初一') }} style={[styles.box, { borderColor: this.state.borderColor4, color: this.state.color4 }]}>初一</Text></View>
                        <View><Text onPress={() => { this._uclass_update('初二') }} style={[styles.box, { borderColor: this.state.borderColor5, color: this.state.color5 }]}>初二</Text></View>
                        <View><Text onPress={() => { this._uclass_update('初三') }} style={[styles.box, { borderColor: this.state.borderColor6, color: this.state.color6 }]}>初三</Text></View>
                    </View>
                </View>
            </View>
        </Modal>
        <View style={{flexDirection:'row',height:70*s,alignItems:'center',justifyContent:'space-between',margin:20*s}}>
          <TouchableOpacity onPress={()=>{Actions.pop()}}>
            <Text>
              取消
            </Text>
          </TouchableOpacity>
          <Text>是否邀请点评</Text>
          <TouchableOpacity onPress={()=>{this.add(true)}}>
            <Text>
              确认邀请
            </Text>
          </TouchableOpacity>
        </View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              height:50*s,
              marginTop: 14*s,
              paddingVertical: 5,
              width: width - 30,
              marginLeft: 15,
              marginBottom:14*s,
              backgroundColor:'rgba(255,255,255,0.3)',
              borderRadius:35*s,
              backgroundColor:'#F0F0F0'
            }}>
            <Image
              source={search}
              style={{marginLeft: 20, width: 25, height: 25}}
            />
            <TextInput
            returnKeyType="search"//设置键盘样式
              style={{
                paddingVertical: 5,
                marginLeft: 10,
                width: width - 100,
              }}
              clearButtonMode={'while-editing'}
              onChangeText={(text)=>{this._change(text)}}
              value={this.state.text}
              keyboardType={'default'}
              placeholder={'请输入教师名称'}
              placeholderTextColor = '#8F8F8F'
              onSubmitEditing={()=>{this._search(this.state.text)}}
            />
            </View>
            <View style={{flexDirection:'row',margin:20*s,justifyContent:'space-between',alignItems:'center'}}>
              <TouchableOpacity 
              onPress={()=>{this._uclass()}}
              style={{flexDirection:'row'}}>
                <Text>班级：</Text>
                <Text>{this.state.uclass}</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=>{this.switch(this.state.teacheryear)}}
               style={{flexDirection:'row',alignItems:'center'}}>
                <Text>{this.state.teacheryear}</Text>
                <Icon name='down' size={20*s}/>
              </TouchableOpacity>
            </View>
        {
          this.state.data==null?
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:90*s}}>
              <Text>
                没有查询到
              </Text>
          </View>
          :
          <FlatList
          // ItemSeparatorComponent={this.ItemSeparatorComponent}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.data}
          numColumns={1}
          renderEmptyComponent={
            this._renderEmptyComponent()
          }
          renderItem={({ item }) => (
            this.cont(item)
        )}
      />
        }
        
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
  cover: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
},
header: {
  backgroundColor: '#fff',
  height: 90 * s,
  flexDirection: 'row',
  alignItems: 'center',
  borderBottomColor: 'gray',
  borderBottomWidth: s,
  width: '100%',
  padding: 20 * s
},
fon: {
  width: '100%',
  fontSize: 24 * s,
  textAlign: 'center'
},
container: {
  padding: 40 * s,
  justifyContent: 'center',
},
cbox: {
  fontSize: 24 * s
},
zbox: {
  flexDirection: 'row',
  justifyContent: 'space-between'
},
box: {
  fontSize: 20 * s,
  borderWidth: s,
  borderRadius: 10 * s,
  paddingTop: 20 * s,
  paddingBottom: 20 * s,
  paddingLeft: 40 * s,
  paddingRight: 40 * s,
  marginTop: 20 * s
},
});