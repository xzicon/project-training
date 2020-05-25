import React, { Component } from 'react'
import { Text, View, AsyncStorage, TextInput, ToastAndroid, TouchableOpacity, Modal,Dimensions, ScrollView, Image ,StyleSheet} from 'react-native'
import RichTextView from '../home/RichTextView'
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
const { width, scale ,height} = Dimensions.get('window');
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

export default class AddEssay extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      uid: '',
      atitle: '',
      atag: '',
      inputValue: '',
      utime: '',
      aimage: '',
      imageUrl: '',
      flag: '1',
      mid:null,
      uclassplay:false
    })
  }
  componentDidMount() {
    AsyncStorage.getItem('uid')
      .then((res) => {
        res === null ?
          this.setState({ uid: '' })
          :
          this.setState({ uid: res },()=>{
            fetch('http://116.62.14.0:8402/login/me/' + this.state.uid + '/' + this.state.uid)
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
          })
      })
     
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
                
                })
            });
        }
    });
  }

  add = (isgrade) => {
    var date = new Date();
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
    console.log(date);
    console.log(date.getHours())
    if (this.state.inputValue === '') {
      ToastAndroid.show('请输入作文内容', 100)
    } else if (this.state.inputValue.length >= 2500) {
      ToastAndroid.show('作文内容字数超出限制', 100)
    }
    else {
      let data = {
        atitle: this.state.atitle,
        atag: this.state.atag,
        acontent: this.state.inputValue,
        uid: Number(this.state.uid),
        utime: Y + M + D + h + m,
        aimage: this.state.aimage,
        mid: this.state.mid
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
              aid:res.data
            },()=>{
              if(isgrade==true){
                this.grade(res.data,this.props.tid,this.state.uclass,data.atitle,data.acontent,data.uid);
              }else{
                ToastAndroid.show('写作成功,待审核', 100);
                Actions.popTo('lesson');
                // setTimeout(()=> {
                //     Actions.refresh({refresh:1})
                // },100);
              }
            })
          } else {
            ToastAndroid.show('发布失败', 100)
          }

        })
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
                Actions.popTo('lesson');
                // setTimeout(()=> {
                //     Actions.refresh({refresh:1})
                // },100);
            } else {
                ToastAndroid.show('邀请点评失败', 100)
            }

        })
  }

  atitle = (atitle) => {
    if (atitle.length >= 25) {
      ToastAndroid.show('标题超出字数限制', 10)
    } else {
      this.setState({ atitle: atitle })
    }
  }

  back = ()=>{
    this.setState({
      atitle:'',
      inputValue:'',
      aimage:'',
      imageUrl: '',
    },()=>{Actions.pop()})
    
  }
  render() {
    return (
      <View style={{ flex: 1 ,backgroundColor:'#FFF'}}>
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
        <View style={{ height: 80 * s, marginBottom: 5, padding:15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff' }}>
          <View style={{
            width: 60, height: 50 * s,
            
            justifyContent: 'center', alignItems: 'center',
          }}>
            <TouchableOpacity onPress={()=>this.back()}>
              <Image 
              style={{width:30*s,height:30*s}}
              source={require('../../assets/composition/add/x.png')}/>
            </TouchableOpacity>
          </View>
          <View style={{ width: '60%' }}></View>
          <View style={{
            width: 60, height: 50 * s,
            borderWidth: 1, borderColor: 'red', borderRadius: 15 * s,
            justifyContent: 'center', alignItems: 'center'
          }}>
            <TouchableOpacity
              onPress={()=>{this.add(true)}}>
              <Text>邀请</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TextInput
          style={{ width:'98%',marginLeft:'1%',backgroundColor: '#FFF', padding: 10,fontSize:26*s  }}
          placeholder="输入作文标题~"
          placeholderTextColor="gray"
          onChangeText={this.atitle}
          maxLength={50}
          value={this.state.atitle}
        />
       
        <View style={{width:'98%',marginTop:'0.5%',marginLeft:'1%',}}>
          <ScrollView>
            <RichTextView
              style={{ height:300, backgroundColor: '#FFF', marginBottom: 0, paddingBottom: 0 }}
              inputStyle={{ padding: 10 ,fontSize:25*s}}
              placeholder="在此输入作文内容"
              value={this.state.inputValue}
              minHeight={300}
              maxLength={2500}
              onChangeText={(inputValue) => {
                this.setState({ inputValue: inputValue })
              }}
              showCount={true} // 展示剩余文字, 默认为true
            />
          </ScrollView>
        </View>
        <View style={{width:'98%',marginLeft:'1%',
          marginTop:'0.5%',
          paddingLeft:'3%',paddingRight:'3%',
          alignItems: 'center', flexDirection: 'row', backgroundColor: '#FFF',
          borderTopWidth:1/scale,borderBottomWidth:1/scale,
          borderColor:'#F0F0F0',
          height:90*s
        }}>
          <Text style={{ padding: 5 }}>#</Text>
          <TextInput placeholder="标签" placeholderTextColor="#5a6d95"
            style={{fontSize:20*s,color:'#5a6d95'}}
            onChangeText={(atag) => {
              this.setState({ atag: '#' + atag })
            }}
          />
        </View>
        <View style={{width:'98%',marginLeft:'1%',
          marginTop:'0.5%',
          paddingLeft:'3%',paddingRight:'3%',
          alignItems: 'center', flexDirection: 'row', backgroundColor: '#FFF',
          borderTopWidth:1/scale,borderBottomWidth:1/scale,
          borderColor:'#F0F0F0',
          height:90*s,
          justifyContent:'space-between'
        }}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image 
                style={{width:30*s,height:30*s,marginRight:10*s}}
                source={require('../../assets/composition/add/sucai.png')}/>
            <Text>参与素材话题</Text>
          </View>
          <Icon name='right' size={28*s} color={'#666'}/>
        </View>
        <View style={{width:'98%',height:240*s,marginTop:'0.5%',marginLeft:'1%',backgroundColor:'#fff'}}>
          {this.state.aimage===''?
            <TouchableOpacity onPress={() => { this.takephoto() }}>
                <Image style={{width:200*s,height:200*s,margin:'4%'}} source={require('../../assets/composition/essay/pic.png')}/>
            </TouchableOpacity>
            :
            <Image style={{ width: 200*s, height:200*s,margin:'4%'}}
            source={{uri:'http://116.62.14.0:8402/images/'+this.state.aimage}}
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
 