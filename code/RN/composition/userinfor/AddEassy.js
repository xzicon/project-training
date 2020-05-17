import React, { Component } from 'react'
import { Text, View, AsyncStorage, TextInput, ToastAndroid, TouchableOpacity, Dimensions, ScrollView, Image, StyleSheet,Modal } from 'react-native'
import RichTextView from '../home/RichTextView'
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
const { width, scale, height } = Dimensions.get('window');
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

export default class AddEassy extends Component {
  constructor() {
    super();
    this.state = ({
      uid: '',
      atitle: '',
      atag: '',
      aid1:'',
      inputValue: '',
      utime: '',
      aimage: '',
      acontent:'',
      imageUrl: '',
      flag: '1',
      uclass: '',
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
                aimage: res.data
              })
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
              atitle: data.atitle,
              inputValue: '',
              aimage: '',
              imageUrl: '',
              aid1: res.data,
              acontent: data.acontent
            })
            this._uclass();
            // this.comment(res.data, data.atitle, data.acontent);
            // Actions.LessonPage({ aid: res.data, atitle: data.atitle, acontent: data.acontent });
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

  back = () => {
    this.setState({
      atitle: '',
      inputValue: '',
      aimage: '',
      imageUrl: '',
    })
    Actions.pop();
  }
  comment = (aid, atitle, acontent, gclass) => {
    var date = new Date();
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes();
    let data = {
      aid: aid,
      tid: this.props.tid,
      gclass: gclass,
      atitle: atitle,
      acontent: acontent,
      invitetime: Y + M + D + h + m,
      uid: this.state.uid
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
          this.setState({ uclassplay: false })
          Actions.lesson();
          ToastAndroid.show('邀请点评成功', 100)
        } else {
          ToastAndroid.show('邀请点评失败', 100)
        }

      })
  }
  _uclass = () => {
    this.setState({ uclassplay: true })
  }
  _uclass_false = () => {
    this.setState({ uclassplay: false })
  }
  _uclass_update = (uclass) => {
    if (uclass === '高一') {
      this.setState({ uclass: '高一', color1: 'red', borderColor1: 'red', color2: '#000', borderColor2: '#000', color3: '#000', borderColor3: '#000', color4: '#000', borderColor4: '#000', color5: '#000', borderColor5: '#000', color6: '#000', borderColor6: '#000' })
      this.comment(this.state.aid1, this.state.atitle, this.state.acontent, '高一');
    } else if (uclass === '高二') {
      this.setState({ uclass: '高二', color2: 'red', borderColor2: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color4: '#000', borderColor4: '#000', color5: '#000', borderColor5: '#000', color6: '#000', borderColor6: '#000' })
      this.comment(this.state.aid1, this.state.atitle, this.state.acontent, '高二');
    } else if (uclass === '高三') {
      this.setState({ uclass: '高三', color3: 'red', borderColor3: 'red', color1: '#000', borderColor1: '#000', color2: '#000', borderColor2: '#000', color4: '#000', borderColor4: '#000', color5: '#000', borderColor5: '#000', color6: '#000', borderColor6: '#000' })
      this.comment(this.state.aid1, this.state.atitle, this.state.acontent, '高三');
    } else if (uclass === '初一') {
      this.setState({ uclass: '初一', color4: 'red', borderColor4: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color2: '#000', borderColor2: '#000', color5: '#000', borderColor5: '#000', color6: '#000', borderColor6: '#000' })
      this.comment(this.state.aid1, this.state.atitle, this.state.acontent, '初一');
    } else if (uclass === '初二') {
      this.setState({ uclass: '初二', color5: 'red', borderColor5: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color4: '#000', borderColor4: '#000', color2: '#000', borderColor2: '#000', color6: '#000', borderColor6: '#000' })
      this.comment(this.state.aid1, this.state.atitle, this.state.acontent, '初二');
    } else if (uclass === '初三') {
      this.setState({ uclass: '初三', color6: 'red', borderColor6: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color4: '#000', borderColor4: '#000', color5: '#000', borderColor5: '#000', color2: '#000', borderColor2: '#000' })
      this.comment(this.state.aid1, this.state.atitle, this.state.acontent, '初三');
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
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
        <View style={{ height: 80 * s, marginBottom: 5, padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff' }}>
          <View style={{
            width: 60, height: 50 * s,

            justifyContent: 'center', alignItems: 'center',
          }}>
            <TouchableOpacity onPress={this.back}><Text>取消</Text></TouchableOpacity>
          </View>
          <View style={{ width: '60%' }}></View>
          <View style={{
            width: 60, height: 50 * s,
            borderWidth: 1, borderColor: 'red', borderRadius: 15 * s,
            justifyContent: 'center', alignItems: 'center'
          }}>
            <TouchableOpacity
              onPress={this.add}>
              <Text>邀请</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          style={{ width: '98%', marginLeft: '1%', backgroundColor: '#FFF', padding: 10, fontSize: 26 * s, elevation: 10 }}
          placeholder="在此输入作文标题"
          placeholderTextColor="gray"
          onChangeText={this.atitle}
          maxLength={20}

        />
        <View style={{
          width: '98%', marginLeft: '1%',
          marginTop: '0.5%',
          alignItems: 'center', flexDirection: 'row', backgroundColor: '#FFF'
        }}>
          <Text style={{ padding: 5 }}>#</Text>
          <TextInput placeholder="标签" placeholderTextColor="#5a6d95"
            style={{ fontSize: 20 * s, color: '#5a6d95' }}
            onChangeText={(atag) => {
              this.setState({ atag: '#' + atag })
            }}
          />
        </View>
        <View style={{ width: '98%', marginTop: '0.5%', marginLeft: '1%', }}>
          <ScrollView>
            <RichTextView
              style={{ height: 380, backgroundColor: '#FFF', marginBottom: 0, paddingBottom: 0 }}
              inputStyle={{ padding: 10, fontSize: 25 * s }}
              placeholder="在此输入作文内容"

              minHeight={380}
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
        <View style={{ width: '98%', height: 340 * s, marginTop: '0.5%', marginLeft: '1%', backgroundColor: '#fff' }}>
          {this.state.aimage === '' ?
            <TouchableOpacity onPress={() => { this.takephoto() }}>
              <Image style={{ width: 54.5, height: 55.5, margin: '4%' }} source={require('../../assets/composition/essay/pic.png')} />
            </TouchableOpacity>
            :
            <Image style={{ width: '90%', height: 300 * s, marginTop: '3%', marginLeft: '5%' }}
              source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.aimage }}
            />
          }
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
  cover: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
})