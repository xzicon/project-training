import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, AsyncStorage, Dimensions, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

const { width, scale } = Dimensions.get('window');
const s = width / 640;

const options = {
  title: '请选择',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '选择相册',
  customButtons: [],
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
      flag: '1'
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
    AsyncStorage.getItem('imgurl').then((res) => {
      if (res !== null) {
        this.setState({
          imageUrl: JSON.parse(res),
          flag: '2'
        });
      }
    });
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
        });
        console.log(this.state.uimage);
      })
  }
  takephoto = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        console.log('Error:', response.error);
      } else if (response.customButton) {
        console.log('custom:', response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
          imageUrl: source,
          flag: '2'
        });
        AsyncStorage.setItem('imgurl', JSON.stringify(source), (err) => { });
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
            Actions.userinfor();
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
  render() {
    console.log(this.state.data);
    return (
      <View>
        <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => Actions.pop()}>
            <Icon size={40 * s} style={{ color: '#000', marginLeft: width * 0.04 }} name='left' />
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 30 * s, marginLeft: width * 0.26 }}>个人信息</Text>
          </View>
          <TouchableOpacity onPress={this.fetchFeedback} style={{ borderColor: 'red', borderWidth: s, padding: 2 * s, borderRadius: 10 * s, paddingLeft: 10 * s, paddingRight: 10 * s, marginLeft: width * 0.26 }}>
            <Text style={{ color: 'red', fontSize: 30 * s }}>保存</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "white", width: width * 0.96, marginTop: 15 / scale, marginLeft: '2%', marginRight: '2%' }}>
          <TouchableOpacity onPress={() => { this.takephoto() }} style={{ width: width * 0.96, height: 70 * s, backgroundColor: 'white', position: 'relative', marginTop: 20 * s, borderBottomWidth: 2 * s, borderBottomColor: 'gray' }}>
            <Text style={{ position: 'absolute', left: '4%', fontSize: 26 * s, top: '8%' }}>头像：</Text>
            {this.state.flag === '1' ?
              <Image
                source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.uimage }}
                style={{ width: 70 * s, height: 70 * s, borderRadius: 70 * s, position: 'absolute', left: width * 0.82, bottom: '14%' }}
              /> :
              <Image
                source={this.state.imageUrl}
                style={{ width: 70 * s, height: 70 * s, borderRadius: 70 * s, position: 'absolute', left: width * 0.82, bottom: '14%' }}
              />}
          </TouchableOpacity>
          <View style={{ width: width * 0.96, height: 70 * s, backgroundColor: 'white', position: 'relative', marginTop: 20 * s, borderBottomWidth: 2 * s, borderBottomColor: 'gray' }}>
            <Text style={{ position: 'absolute', left: '4%', fontSize: 26 * s, top: '8%' }}>昵称：</Text>
            <TextInput
              value={this.state.uname}
              onChangeText={(text) => { this.setState({ uname: text }) }}
              style={{ position: 'absolute', fontSize: 26 * s, color: '#333', right: '4%' }}
              editable={true}
              maxLength={20}
              numberOfLines={1}
            />
          </View>
          <TouchableOpacity style={{ width: width * 0.96, height: 70 * s, backgroundColor: 'white', position: 'relative', marginTop: 20 * s, borderBottomWidth: 2 * s, borderBottomColor: 'gray' }}>
            <Text style={{ position: 'absolute', left: '4%', fontSize: 26 * s, top: '8%' }}>邮箱：</Text>
            <Text style={{ position: 'absolute', fontSize: 26 * s, color: '#333', right: '4%', top: '8%' }} >{this.state.uemail}</Text>
          </TouchableOpacity>
          <View onPress={() => Actions.feedback({ uid: this.state.uid })} style={{ width: width * 0.96, height: 70 * s, backgroundColor: 'white', position: 'relative', marginTop: 20 * s, borderBottomWidth: 2 * s, borderBottomColor: 'gray' }}>
            <Text style={{ position: 'absolute', left: '4%', fontSize: 26 * s, top: '8%' }}>个性签名：</Text>
            <TextInput
              value={this.state.udescribe}
              onChangeText={(text) => { this.setState({ udescribe: text }) }}
              style={{ position: 'absolute', fontSize: 26 * s, color: '#333', right: '4%' }}
              editable={true}
              maxLength={20}
              numberOfLines={1}
            />
          </View>
        </View>
      </View>
    )
  }
}
