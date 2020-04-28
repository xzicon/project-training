import React, { Component } from 'react'
import { Text, View, AsyncStorage, TextInput, ToastAndroid, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native'
import RichTextView from './RichTextView'
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
const { width, scale ,height} = Dimensions.get('window');
const s = width / 640;
// const options = {
//   title: '请选择',
//   cancelButtonTitle: '取消',
//   takePhotoButtonTitle: '拍照',
//   chooseFromLibraryButtonTitle: '选择相册',
//   customButtons: [],
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//   },
// };
const options = {
  title: '请选择',
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  // quality: 0.8,
          cancelButtonTitle: "取消",
          takePhotoButtonTitle: "拍照",
          chooseFromLibraryButtonTitle: "选择相册",
          // allowsEditing: true,
          // noData: false,
  storageOptions: {
      skipBackup: true,
      path: 'images',
  },
};

export default class AddEssay extends Component {
  constructor() {
    super();
    this.state = ({
      uid: '',
      atitle: '',
      atag: '',
      inputValue: '',
      utime: '',
      aimage: '',
      imageUrl1: '',
      flag: '1'
    })
  }
  componentDidMount() {
    AsyncStorage.getItem('uid')
      .then((res) => {
        res === null ?
          this.setState({ uid: '6' })
          :
          this.setState({ uid: res })
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
            const file={uri: response.uri, type: response.type, name: response.fileName};
            formData.append('image', file);
            this.setState({
                imageUrl: source.uri,
            }, () => {
                fetch('http://116.62.14.0:8402/upload', {
                    method: 'POST',
                    // mode:"cors",          
                    body: formData
                }).then(res=>res.json())
                .then(res=>{
                  console.log(res.status);
                  console.log(res.data);
                  this.setState({
                    aimage:res.data
                  })
                  // let  swidth = Dimensions.get('window').width;
                  // Image.getSize(this.state.aimage,(width,height)=>{
                  //   this.setState({
                  //     w:0.6*swidth,
                  //     h:(0.6*swidth*height)/width
                  //   })
                  // })
                })
            });
        }
    });
  }

  add = () => {
    var date = new Date();
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());

    if (this.state.inputValue === '') {
      ToastAndroid.show('请输入作文内容', 100)
    } else if (this.state.inputValue.length >= 1000) {
      ToastAndroid.show('作文内容字数超出限制', 100)
    }
    else {
      console.log(this.props.mid)
      let data = {
        atitle: this.state.atitle,
        atag: this.state.atag,
        acontent: this.state.inputValue,
        uid: this.state.uid,
        utime: Y + M + D + h + m,
        aimage: this.state.aimage,
        mid: this.props.mid
      }
      fetch('http://116.62.14.0:8402/aud/addarticle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
        .then((res) => {
          console.log(res)
          if (res.status == 0) {
            this.setState({
              atitle:'',
              inputValue:'',
              aimage:''
            })
            ToastAndroid.show('写作成功,待审核', 100);
            // Actions.pop({ e: true })
            Actions.teacher({aid: res.data, atitle: data.atitle, acontent: data.acontent});
          } else {
            ToastAndroid.show('发布失败', 100)
          }

        })
    }
  }
  atitle = (atitle) => {
    if (atitle.length >= 10) {
      ToastAndroid.show('标题超出字数限制', 10)
    } else {
      this.setState({ atitle: atitle })
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 80 * s, marginBottom: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
          <View style={{
            width: 60, height: 50 * s,
            borderRadius: 15 * s,
            justifyContent: 'center', alignItems: 'center'
          }}>
            <TouchableOpacity onPress={Actions.pop}><Text>取消</Text></TouchableOpacity>
          </View>
          <View style={{ width: '60%' }}></View>
          <View style={{
            width: 60, height: 50 * s,
            borderWidth: 1, borderColor: 'red', borderRadius: 15 * s,
            justifyContent: 'center', alignItems: 'center'
          }}>
            <TouchableOpacity
              onPress={this.add}>
              <Text>下一步</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          style={{ backgroundColor: '#FFF', padding: 10, borderBottomWidth: 1, borderColor: 'grey' }}
          placeholder="在此输入作文标题"
          onChangeText={this.atitle}
        />
        <View style={{
          borderBottomWidth: 1, borderColor: 'grey',
          alignItems: 'center', flexDirection: 'row', backgroundColor: '#FFF'
        }}>
          <Text style={{ padding: 5 }}>#</Text>
          <TextInput placeholder="标签"
            onChangeText={(atag) => {
              this.setState({ atag: '#' + atag })
            }}
          />
        </View>
        <View>
          <ScrollView>
            <RichTextView
              style={{ height: 240, backgroundColor: '#FFF', marginBottom: 0, paddingBottom: 0 }}
              inputStyle={{ padding: 10 }}
              placeholder="在此输入作文内容"
              minHeight={240}
              maxLength={2000}
              onChangeText={(inputValue) => {
                this.setState({ inputValue: inputValue })
              }}
              showCount={true} // 展示剩余文字, 默认为true
            />
          </ScrollView>
        </View>
        {/* 样式没写好 */}
        {/* <View style={{flexDirection:'row',justifyContent:'flex-end',backgroundColor:'#FFF'}}>
              <Text>{this.state.inputValue.length}/1000</Text>
            </View> */}
        <TouchableOpacity onPress={() => { this.takephoto() }}>
            <Image style={{width:50,height:50}} source={require('../../assets/composition/essay/pic.png')}/>
        </TouchableOpacity>
        
        <Image style={{ width: '90%', height:300*s, marginTop: 10*s}}
        source={{uri:'http://116.62.14.0:8402/images/'+this.state.aimage}}
        />
      </View>
    )
  }
}
