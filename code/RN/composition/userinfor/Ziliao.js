import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, AsyncStorage, Dimensions, TouchableOpacity, Image, ToastAndroid, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

const { width, scale } = Dimensions.get('window');
const s = width / 640;

const options = {
  title: '请选择',
  cancelButtonTitle: "取消",
  takePhotoButtonTitle: "拍照",
  chooseFromLibraryButtonTitle: "选择相册",
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class Ziliao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      uid: '',
      imageUrl: '',
      uimage: '',
      uclass: '',
      flag: '1',
      uclassplay: false,
      color1: '#000',
      borderColor1: '#000',
      color2: '#000',
      borderColor2: '#000',
      color3: '#000',
      borderColor3: '#000',
      color4: '#000',
      borderColor4: '#000',
      color5: '#000',
      borderColor5: '#000',
      color6: '#000',
      borderColor6: '#000',
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('uid')
      .then((res) => {
        res === null ?
          this.setState({ uid: '' })
          :
          this.setState({ uid: res })
        this.mine();
      })
  }
  mine = () => {
    fetch('http://116.62.14.0:8402/login/me/' + this.state.uid + '/' + this.state.uid)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          data: res.data,
          uname: res.data.uname,
          uimage: res.data.uimage,
          uemail: res.data.uemail,
          udescribe: res.data.udescribe,
          uclass: res.data.uclass,
        });
        console.log(this.state.uimage);
      })
  }
  takephoto = (e) => {
    var formData = new FormData();
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        console.log('Error:', response.error);
      } else if (response.customButton) {
        console.log('custom:', response.customButton);
      } else {
        const source = { uri: response.uri };
        const file = { uri: response.uri, type: response.type, name: response.fileName };
        formData.append('image', file);
        this.setState({
          imageUrl: source.uri,
        }, () => {
          fetch('http://116.62.14.0:8402/upload', {
            method: 'POST',
            body: formData
          }).then(res => res.json())
            .then(res => {
              console.log(res.status);
              console.log(res.data);
              this.setState({
                uimage: res.data
              })
            })
        });
      }
    });
  }
  // onChange = (e) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append('image', file);
  //   fetch('http://116.62.14.0:8402/upload', {
  //   method: 'POST',
  //     body: formData,
  //   }).then(res=>res.json()).then(res=>
  //       this.setState({
  //           data3:res.data
  //       },console.log(res.data))
  //   )
  // };
  fetchFeedback = () => {
    let data = {
      uid: this.state.uid,
      uname: this.state.uname,
      udescribe: this.state.udescribe,
      uimage: this.state.uimage
    }
    fetch('http://116.62.14.0:8402/login/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ data3: data.data })
        console.log(data);
        switch (data.status) {
          case "0": {
            console.log(data.data);
            ToastAndroid.show('修改资料成功', 100);
            Actions.pop(this.props.refresh());
            break;
          }
          default: {
            ToastAndroid.show('修改资料失败，请重试', 100);
            console.log(data.data);
            break;
          }
        }
      })
  }
  _uclass = (uclass) => {
    if(uclass === '高一'){
      this.setState({uclassplay: true,color1: 'red',borderColor1: 'red',color2: '#000',borderColor2: '#000',color3: '#000',borderColor3: '#000',color4: '#000',borderColor4: '#000',color5: '#000',borderColor5: '#000',color6: '#000',borderColor6: '#000'})
    } else if(uclass === '高二'){
      this.setState({uclassplay: true,color2: 'red',borderColor2: 'red',color1: '#000',borderColor1: '#000',color3: '#000',borderColor3: '#000',color4: '#000',borderColor4: '#000',color5: '#000',borderColor5: '#000',color6: '#000',borderColor6: '#000'})
    } else if(uclass === '高三'){
      this.setState({uclassplay: true,color3: 'red',borderColor3: 'red',color1: '#000',borderColor1: '#000',color2: '#000',borderColor2: '#000',color4: '#000',borderColor4: '#000',color5: '#000',borderColor5: '#000',color6: '#000',borderColor6: '#000'})
    } else if(uclass === '初一'){
      this.setState({uclassplay: true,color4: 'red',borderColor4: 'red',color1: '#000',borderColor1: '#000',color3: '#000',borderColor3: '#000',color2: '#000',borderColor2: '#000',color5: '#000',borderColor5: '#000',color6: '#000',borderColor6: '#000'})
    } else if(uclass === '初二'){
      this.setState({uclassplay: true,color5: 'red',borderColor5: 'red',color1: '#000',borderColor1: '#000',color3: '#000',borderColor3: '#000',color4: '#000',borderColor4: '#000',color2: '#000',borderColor2: '#000',color6: '#000',borderColor6: '#000'})
    } else if(uclass === '初三'){
      this.setState({uclassplay: true,color6: 'red',borderColor6: 'red',color1: '#000',borderColor1: '#000',color3: '#000',borderColor3: '#000',color4: '#000',borderColor4: '#000',color5: '#000',borderColor5: '#000',color2: '#000',borderColor2: '#000'})
    }else if(uclass === '无'){
      this.setState({uclassplay: true,color6: '#000',borderColor6: '#000',color1: '#000',borderColor1: '#000',color3: '#000',borderColor3: '#000',color4: '#000',borderColor4: '#000',color5: '#000',borderColor5: '#000',color2: '#000',borderColor2: '#000'})
    }
  }
  _uclass_false = () => {
    this.setState({ uclassplay: false })
  }
  _uclass_update = (uid,uclass) => {
    if(uclass === '高一'){
      this.setState({color1: 'red',borderColor1: 'red',color2: '#000',borderColor2: '#000',color3: '#000',borderColor3: '#000',color4: '#000',borderColor4: '#000',color5: '#000',borderColor5: '#000',color6: '#000',borderColor6: '#000'})
    } else if(uclass === '高二'){
      this.setState({color2: 'red',borderColor2: 'red',color1: '#000',borderColor1: '#000',color3: '#000',borderColor3: '#000',color4: '#000',borderColor4: '#000',color5: '#000',borderColor5: '#000',color6: '#000',borderColor6: '#000'})
    } else if(uclass === '高三'){
      this.setState({color3: 'red',borderColor3: 'red',color1: '#000',borderColor1: '#000',color2: '#000',borderColor2: '#000',color4: '#000',borderColor4: '#000',color5: '#000',borderColor5: '#000',color6: '#000',borderColor6: '#000'})
    } else if(uclass === '初一'){
      this.setState({color4: 'red',borderColor4: 'red',color1: '#000',borderColor1: '#000',color3: '#000',borderColor3: '#000',color2: '#000',borderColor2: '#000',color5: '#000',borderColor5: '#000',color6: '#000',borderColor6: '#000'})
    } else if(uclass === '初二'){
      this.setState({color5: 'red',borderColor5: 'red',color1: '#000',borderColor1: '#000',color3: '#000',borderColor3: '#000',color4: '#000',borderColor4: '#000',color2: '#000',borderColor2: '#000',color6: '#000',borderColor6: '#000'})
    } else if(uclass === '初三'){
      this.setState({color6: 'red',borderColor6: 'red',color1: '#000',borderColor1: '#000',color3: '#000',borderColor3: '#000',color4: '#000',borderColor4: '#000',color5: '#000',borderColor5: '#000',color2: '#000',borderColor2: '#000'})
    }
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
            this.mine();
            break;
          }
          default: {
            console.log(data.data);
            break;
          }
        }
      })
  }
  back=()=>{
    Actions.pop(this.props.refresh)
  }
  render() {
    console.log(this.state.color1);
    return (
      <View>
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
          <View style={{ width: width * 0.9, top: 100 * s, left: width * 0.05, backgroundColor:'#fff' }}>
            <View style={styles.header}>
              <Text style={styles.fon}>请选择年级</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.cbox}>高中:</Text>
              <View style={styles.zbox}>
                <View><Text onPress={() => {this._uclass_update(this.state.uid,'高一')}} style={[styles.box,{borderColor:this.state.borderColor1,color:this.state.color1}]}>高一</Text></View>
                <View><Text onPress={() => {this._uclass_update(this.state.uid,'高二')}} style={[styles.box,{borderColor:this.state.borderColor2,color:this.state.color2}]}>高二</Text></View>
                <View><Text onPress={() => {this._uclass_update(this.state.uid,'高三')}} style={[styles.box,{borderColor:this.state.borderColor3,color:this.state.color3}]}>高三</Text></View>
              </View>
            </View>
            <View style={styles.container}>
              <Text style={styles.cbox}>初中:</Text>
              <View style={styles.zbox}>
                <View><Text onPress={() => {this._uclass_update(this.state.uid,'初一')}} style={[styles.box,{borderColor:this.state.borderColor4,color:this.state.color4}]}>初一</Text></View>
                <View><Text onPress={() => {this._uclass_update(this.state.uid,'初二')}} style={[styles.box,{borderColor:this.state.borderColor5,color:this.state.color5}]}>初二</Text></View>
                <View><Text onPress={() => {this._uclass_update(this.state.uid,'初三')}} style={[styles.box,{borderColor:this.state.borderColor6,color:this.state.color6}]}>初三</Text></View>
              </View>
            </View>
          </View>
        </Modal>
        <View>
          <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20 * s, paddingRight: 20 * s }}>
            <TouchableOpacity onPress={() => this.back()}>
              <Icon size={36 * s} style={{ color: '#000' }} name='left' />
            </TouchableOpacity>
            <View>
              <Text style={{ fontSize: 30 * s }}>个人信息</Text>
            </View>
            <TouchableOpacity onPress={this.fetchFeedback} style={{ borderColor: 'red', borderWidth: s, padding: 2 * s, borderRadius: 10 * s, paddingLeft: 10 * s, paddingRight: 10 * s }}>
              <Text style={{ color: 'red', fontSize: 26 * s }}>保存</Text>
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: "white", width: width * 0.96, marginTop: 15 / scale, marginLeft: '2%', marginRight: '2%' }}>
            <TouchableOpacity onPress={() => { this.takephoto() }} style={{ width: width * 0.96, height: 70 * s, backgroundColor: 'white', position: 'relative', marginTop: 20 * s, borderBottomWidth: 2 * s, borderBottomColor: 'gray' }}>
              <Text style={{ position: 'absolute', left: '4%', fontSize: 24 * s, top: '10%' }}>头像：</Text>
              <Image
                source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.uimage }}
                style={{ width: 66 * s, height: 66 * s, borderRadius: 66 * s, position: 'absolute', left: width * 0.82, bottom: '14%' }}
              />
            </TouchableOpacity>
            <View style={{ width: width * 0.96, height: 70 * s, backgroundColor: 'white', position: 'relative', marginTop: 20 * s, borderBottomWidth: 2 * s, borderBottomColor: 'gray' }}>
              <Text style={{ position: 'absolute', left: '4%', fontSize: 24 * s, top: '10%' }}>昵称：</Text>
              <TextInput
                value={this.state.uname}
                onChangeText={(text) => { this.setState({ uname: text }) }}
                style={{ position: 'absolute', fontSize: 24 * s, color: '#333', right: '4%' }}
                editable={true}
                maxLength={20}
                numberOfLines={1}
              />
            </View>
            <TouchableOpacity style={{ width: width * 0.96, height: 70 * s, backgroundColor: 'white', position: 'relative', marginTop: 20 * s, borderBottomWidth: 2 * s, borderBottomColor: 'gray' }}>
              <Text style={{ position: 'absolute', left: '4%', fontSize: 24 * s, top: '10%' }}>邮箱：</Text>
              <Text style={{ position: 'absolute', fontSize: 24 * s, color: '#333', right: '4%', top: '8%' }} >{this.state.uemail}</Text>
            </TouchableOpacity>
            <View onPress={() => Actions.feedback({ uid: this.state.uid })} style={{ width: width * 0.96, height: 70 * s, backgroundColor: 'white', position: 'relative', marginTop: 20 * s, borderBottomWidth: 2 * s, borderBottomColor: 'gray' }}>
              <Text style={{ position: 'absolute', left: '4%', fontSize: 24 * s, top: '10%' }}>个性签名：</Text>
              <TextInput
                value={this.state.udescribe}
                onChangeText={(text) => { this.setState({ udescribe: text }) }}
                style={{ position: 'absolute', fontSize: 24 * s, color: '#333', right: '4%' }}
                editable={true}
                maxLength={20}
                numberOfLines={1}
              />
            </View>
            <TouchableOpacity style={{ width: width * 0.96, height: 70 * s, backgroundColor: 'white', position: 'relative', marginTop: 20 * s, borderBottomWidth: 2 * s, borderBottomColor: 'gray' }}>
              <Text style={{ position: 'absolute', left: '4%', fontSize: 24 * s, top: '10%' }}>年级：</Text>
              {this.state.uclass === null ?
              <Text onPress={() => this._uclass('无')} style={{ position: 'absolute', fontSize: 24 * s, color: '#333', right: '4%', top: '8%' }} >请选择年级</Text>
              :<Text onPress={() => this._uclass(this.state.uclass)} style={{ position: 'absolute', fontSize: 24 * s, color: '#333', right: '4%', top: '8%' }} >{this.state.uclass}</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    height: 90 * s,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: s,
    width: '100%',
    padding: 20*s
  },
  fon: {
    width:'100%',
    fontSize: 24*s,
    textAlign: 'center'
  },
  container: {
    padding: 40*s,
    justifyContent: 'center',
  },
  cbox: {
    fontSize: 24 * s
  },
  zbox: {
    flexDirection: 'row',
    justifyContent:'space-between'
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
  cover: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
},
})