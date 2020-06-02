import React, { Component } from 'react'
import { Text, View, AsyncStorage, TextInput, ToastAndroid, TouchableOpacity, Modal,Dimensions, ScrollView, Image ,StyleSheet} from 'react-native'
import RichTextView from '../home/RichTextView'
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Progress from 'react-native-progress';


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

export default class AddORC extends Component {
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
      uclassplay:false,
      mid:undefined,
      mtitle:'',
      truetitle:'',
      update:false,
      ocrimg:['','','']
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
  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps')
   this.setState({update:nextProps.update,mid:nextProps.mid,mtitle:nextProps.mtitle,truetitle:nextProps.truetitle})
  }

  getMaterial = () => {
    fetch('http://116.62.14.0:8402/material/xiang/' + this.state.mid + '/' + this.state.uid)
        .then((res) => res.json())
        .then((res) => {
            console.log(res.data)
            this.setState({ mtitle: res.data[0].mtitle ,truetitle:res.data[0].truetitle});
        })
  }
  select_material=()=>{
    if(this.state.mid==undefined){
      Actions.materiallist();
    }else if(this.state.update==true){
      Actions.materiallist();
    }
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
  takephotoocr = (index) => {
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
                  ToastAndroid.show('上传成功',100)
                  console.log(res.status);
                  console.log(res.data);
                  var ocrimg=this.state.ocrimg;
                  ocrimg[index]=res.data;
                  this.setState({
                    ocrimg:ocrimg
                  })
                
                })
            });
        }
    });
  }
  _ocr_progress=(ocrimg)=>{
    for(var i=0;i<ocrimg.length;i++){
        if(ocrimg[i]==''){

        }else{
            this.ocr(ocrimg[i]);
        }
    }
  }
  ocr=(img)=>{
      console.log(img)
      if(img!=''){
        let data = {
            img:img
        }
        fetch('http://116.62.14.0:8402/ocr/article', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(res => res.json())
            .then((res) => {
                console.log(res.status);
              console.log(res.data);
              let words_result = JSON.parse(res.data).words_result;
                var words='';
                let words_result_num = JSON.parse(res.data).words_result_num;
                for(var i = 0; i < words_result_num; i++){
                    words += words_result[i].words;
                }
                console.log(words);
              if(res.status==0){
                ToastAndroid.show('识别成功',100)
                    this.setState({
                        inputValue: this.state.inputValue+'\n'+words
                    })
                    
              }else{
                  ToastAndroid.show('识别失败',100)
              }

            });
      }else{
        ToastAndroid.show('请添加要识别的图片',100)
      }
    //   let data = [{"words":"初来乍来节选"},{"words":"古人云:书中自有黄中屋"},{"words":"书给人的力量是无穷的,给人"},{"words":"长的勒响也是无穷的。许有叫书"},{"words":"中的一句,有叶是书中的故事。"},{"words":"和子望着远处,若有思地脱,前"},{"words":"不火,我煥米切尔·嗯的《犟"},{"words":"电》书中拼球了- 只小龟在前"},{"words":"吃树叶,想然听到一个息:王"},{"words":"八世要举脊婚礼了,并邀了"},{"words":"有的动物去多州。对从未见过世"},{"words":"面的小鸟电来揽,的确是一个很大"},{"words":"的感,它次定卷如,但是去洲"},{"words":"子到的路程偎起假运,丝过认真考"},{"words":",第一天,小乌电山路,途中"},{"words":"它遭到并多动物的嘲笑,走了并"},{"words":"路,在如王=十八世身士自"}];
    //   data.map((data)=>{
        
    //     console.log(data.words);
    // })
    // let aa = {"a":'0',"b":1};
    // console.log(aa.a);
    // console.log(aa.b);
    
  }
  // add11 = (isgrade)=>{

  // }
  add = (isgrade) => {
    var date = new Date();
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
    console.log(date);
    console.log(date.getHours())
    if (this.state.atitle === '') {
      ToastAndroid.show('请输入作文标题', 100)
    }
    else if (this.state.inputValue === '') {
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
        mid: this.state.mid==undefined?null:this.state.mid
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
                if(this.props.tid==''){
                  ToastAndroid.show('发布成功，积分+5,经验值+15', 100);
                  Actions.teacher({atitle: data.atitle,
                    acontent: data.acontent,
                    uid: data.uid,
                    aid:this.state.aid
                    });
                }else{
                  this.grade(res.data,this.props.tid,this.state.uclass,data.atitle,data.acontent,data.uid);
                }
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
                <ScrollView>
                {/* <Progress.Bar progress={0.3} width={200} /> */}
                {/* <Progress.Circle size={30} indeterminate={true} /> */}
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
              <Text>{this.props.tid==''?'下一步':'邀请'}</Text>
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
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Text>请选择你要识别的图片(最多3张)</Text>
        </View>
        <View style={{flexDirection:'row'}}>
        {
            this.state.ocrimg.map((item,index)=>{
                return(
                <View style={{width:'30%',height:240*s,marginTop:'0.5%',marginLeft:'1%',backgroundColor:'#fff'}}>
                {item==''?
                    <TouchableOpacity onPress={() => { this.takephotoocr(index) }}>
                        <Image style={{width:200*s,height:200*s,margin:'4%'}} source={require('../../assets/composition/essay/pic.png')}/>
                    </TouchableOpacity>
                    :
                    <Image style={{ width: 200*s, height:200*s,margin:'4%'}}
                    source={{uri:'http://116.62.14.0:8402/images/'+item}}
                    />
                }
          
                </View>
                )
            })
        }
        </View>
       
        <TouchableOpacity 
        style={{flexDirection:'row',justifyContent:'center',alignItems:'center'
        
        }}
        onPress={()=>{this._ocr_progress(this.state.ocrimg)}}>
            <View style={{borderRadius:40*s,backgroundColor:'#1296db',width:'80%',height:70*s,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                <Text style={{color:'#FFF'}}>确认识别</Text>
            </View>
          </TouchableOpacity>
        <View style={{width:'98%',marginTop:'0.5%',marginLeft:'1%',}}>
          <ScrollView>
            <RichTextView
              style={{ height:300, backgroundColor: '#FFF', marginBottom: 0, paddingBottom: 0 }}
              inputStyle={{ padding: 10 ,fontSize:25*s}}
              placeholder="识别的作文内容"
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
        <TouchableOpacity 
        onPress={()=>{this.select_material()}}
        style={{width:'98%',marginLeft:'1%',
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
            <Text style={{width:width-100*s,color:'#5a6d95'}} numberOfLines={1} ellipsizeMode='middle'>{(this.state.mtitle==''&&this.state.truetitle=='')?'参与素材话题':(this.state.mtitle==''?this.state.truetitle:this.state.mtitle)}</Text>
          </View>
          <Icon name='right' size={28*s} color={'#666'}/>
        </TouchableOpacity>
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
        </ScrollView>
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
 